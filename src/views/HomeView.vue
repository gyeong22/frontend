<template>
  <div class="mx-auto flex max-w-5xl gap-8 px-4 pt-8 md:px-6">
    <!-- Left (피드) -->
    <section class="flex-1">
      <!-- 탭 -->
      <div class="mb-4 flex gap-4 border-b text-sm">
        <button
          class="border-b-2 pb-3 pt-2"
          :class="
            activeTab === 'recommend'
              ? 'border-gray-900 font-semibold text-gray-900'
              : 'border-transparent text-gray-500'
          "
          @click="activeTab = 'recommend'"
        >
          추천
        </button>
        <button
          v-if="isLoggedIn"
          class="pb-3 pt-2 text-gray-400"
          :class="
            activeTab === 'following'
              ? 'border-b-2 border-gray-900 font-semibold text-gray-900'
              : 'border-transparent text-gray-500'
          "
          @click="activeTab = 'following'"
        >
          팔로잉
        </button>
      </div>

      <!-- 리뷰 리스트 -->
      <div class="divide-y">
        <ReviewCard
          v-for="item in reviews"
          :key="item.id"
          :review="item"
          :is-logged-in="isLoggedIn"
        />
        <p
          v-if="!isLoading && !reviews.length"
          class="py-8 text-center text-sm text-gray-500"
        >
          표시할 리뷰가 없습니다.
        </p>
        <div ref="sentinel" class="h-1"></div>
        <p v-if="isLoadingMore" class="py-4 text-center text-xs text-gray-400">
          불러오는 중...
        </p>
      </div>
    </section>

    <!-- Right (사이드바) -->
    <HomeSidebar />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from "vue";
import ReviewCard from "@/components/ReviewCard.vue";
import HomeSidebar from "@/components/HomeSidebar.vue";
import { useUserStore } from "@/stores/user";
import { fetchHomeFeed } from "@/api/feed"; // TODO: 실제 API 경로에 맞춰 수정

const activeTab = ref("recommend");
const reviews = ref([]);
const isLoading = ref(false);
const isLoadingMore = ref(false);
const error = ref(null);
const page = ref(0);
const hasMore = ref(true);
const size = 10;
const sentinel = ref(null);
let observer = null;

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);

const formatDateLabel = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// const normalizeList = (payload) => {
//   const list = Array.isArray(payload)
//     ? payload
//     : Array.isArray(payload?.items)
//     ? payload.items
//     : [];

//   return list.map((r) => ({
//     ...r,

//     // ReviewCard가 쓰는 필드만 alias
//     id: String(r.reviewId),
//     body: r.content,
//     authorNickname: r.nickname ?? r.userId,
//     createdAtLabel: formatDateLabel(r.createdAt),

//     // 🔥 핵심
//     imageUrls: Array.isArray(r.imageUrls) ? r.imageUrls : [],

//     // 태그 문자열만 필요하면 여기서 변환
//     tags: Array.isArray(r.tags)
//       ? r.tags.map((t) => t?.tagName ?? t).filter(Boolean)
//       : [],
//   }));
// };

const normalizeList = (payload) => {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.items)
    ? payload.items
    : [];
  return list.map((r) => {
    const tagNames = Array.isArray(r.tags)
      ? r.tags.map((t) => t?.tagName ?? t).filter(Boolean)
      : [];
    return {
      id: String(r.reviewId ?? r.id ?? ""),
      title: r.title,
      body: r.content,
      createdAtLabel: formatDateLabel(r.createdAt),
      userId: r.userId,
      authorNickname: r.nickname || r.userId,
      contentTitle: r.contentName,
      contentAuthor: r.contentAuthor,
      contentCategoryId: r.contentCategoryId,
      categoryLabel: "", // 필요시 매핑
      spoilerUntil: Number(r.spoilerUntil ?? 0),
      spoiler: Boolean(r.spoiler),
      myProgress: r.myProgress ?? null,
      likeCount: r.likeCount,
      viewCount: r.viewCount,
      likedByMe: r.likedByMe,
      tags: tagNames,
      imageUrls: Array.isArray(r.imageUrls) ? r.imageUrls : [],
    };
  });
};

const loadFeed = async ({ append = false } = {}) => {
  if (!append) {
    isLoading.value = true;
    hasMore.value = true;
    page.value = 0;
    reviews.value = [];
  } else {
    if (!hasMore.value || isLoadingMore.value) return;
    isLoadingMore.value = true;
  }

  error.value = null;

  try {
    const targetPage = append ? page.value + 1 : 0;
    const tab = activeTab.value;
    const { data } = await fetchHomeFeed({ type: tab, page: targetPage, size });
    const list = normalizeList(data);

    if (append) {
      reviews.value = reviews.value.concat(list);
    } else {
      reviews.value = list;
    }

    page.value = targetPage;
    hasMore.value = list.length === size;
  } catch (e) {
    console.error("홈 피드 로드 실패", e);
    error.value = e;
  } finally {
    if (append) {
      isLoadingMore.value = false;
    } else {
      isLoading.value = false;
    }
  }
};

const startObserver = () => {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      loadFeed({ append: true });
    }
  });
  if (sentinel.value) observer.observe(sentinel.value);
};

onMounted(() => {
  userStore.loadUser();
  loadFeed();
  startObserver();
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

watch(activeTab, () => {
  // 로그인하지 않은 상태에서 팔로잉 탭 클릭을 방지
  if (activeTab.value === "following" && !isLoggedIn.value) {
    activeTab.value = "recommend";
    return;
  }
  loadFeed();
});
</script>
