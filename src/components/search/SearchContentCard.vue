<template>
  <article class="py-5">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
          >
            {{ categoryLabel }}
          </span>
          <span
            v-if="item.isMine"
            class="inline-flex items-center rounded-full bg-gray-900 px-2 py-0.5 text-xs font-medium text-white"
          >
            내 기록
          </span>
        </div>

        <h3 class="mt-2 truncate text-base font-semibold text-gray-900">
          {{ item.title }}
        </h3>

        <p v-if="item.summary" class="mt-1 line-clamp-2 text-sm text-gray-600">
          {{ item.summary }}
        </p>
        <p v-else class="mt-1 text-sm text-gray-500">
          리뷰 {{ item.recordCount ?? 0 }}개
        </p>

        <div v-if="item.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="t in item.tags"
            :key="t"
            class="rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-600"
          >
            #{{ t }}
          </span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-2">
        <div
          v-if="item.myProgress"
          class="rounded-xl bg-gray-900 px-3 py-2 text-right text-xs text-white"
          title="내 진행도"
        >
          <p class="font-medium">내가 읽은</p>
          <p v-if="item.myProgress.total" class="mt-0.5">
            {{ item.myProgress.current }} / {{ item.myProgress.total
            }}{{ unitLabel }}
          </p>
          <p v-else class="mt-0.5">
            {{ item.myProgress.current }}{{ unitLabel }}
          </p>
        </div>
        <p class="text-xs text-gray-400">
          {{ item.lastRecordedAtLabel }}
        </p>
      </div>
    </div>

    <div
      class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500"
    >
      <span>리뷰 {{ item.recordCount ?? 0 }}개</span>
      <template v-if="item.lastRecordedAtLabel">
        <span class="text-gray-300">·</span>
        <span>최근 활동 {{ item.lastRecordedAtLabel }}</span>
      </template>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: { type: Object, required: true },
});

const categoryLabel = computed(() => {
  const v = props.item.category;
  if (v === "book") return "도서";
  if (v === "webnovel") return "웹소설";
  if (v === "webtoon") return "웹툰";
  return "컨텐츠";
});

const unitLabel = computed(() => {
  const catId = Number(props.item.contentCategoryId);
  if (!Number.isNaN(catId)) {
    return catId === 1 ? "권" : "화"; // 1: 도서
  }
  return props.item.category === "book" ? "권" : "화";
});
</script>
