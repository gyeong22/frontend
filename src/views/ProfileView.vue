<template>
  <div class="min-h-screen bg-[#F1F0EC]">
    <div class="mx-auto flex max-w-6xl gap-8 px-6 py-10">
      <!-- 왼쪽: 프로필 사이드바 -->
      <aside
        class="sticky top-10 h-fit w-64 flex-shrink-0 rounded-2xl border border-[#EAE9E3] bg-white p-6 shadow-sm"
      >
        <div class="flex flex-col items-center text-center">
          <!-- 프로필 이미지 -->
          <div
  class="h-20 w-20 rounded-full overflow-hidden shadow-sm
         flex items-center justify-center
         bg-gradient-to-br from-[#D9D5CA] to-[#F0EEE9]"
>
  <!-- 이미지 있을 때 -->
  <img
    v-if="user.profile_image_url"
    :src="`${S3_BASE_URL}/${user.profile_image_url}`"
    alt="profile"
    class="h-full w-full object-cover"
  />

  <!-- 이미지 없을 때 -->
  <span
    v-else
    class="text-white text-2xl font-bold"
  >
    {{ user.nickname.charAt(0) }}
  </span>
</div>


          <!-- 닉네임 / 아이디 -->
          <h1 class="mt-3 text-lg font-semibold text-[#2E2A24]">{{ user.nickname }}</h1>
          <p class="text-xs text-gray-500">@{{ user.user_id }}</p>

          <p class="mt-3 text-sm text-[#5E594F] leading-snug">
            {{user.bio}}
          </p>

          <!-- 팔로잉 / 팔로워 -->
          <div class="mt-4 flex gap-3 text-xs text-gray-600">
            <RouterLink
              :to="`/users/${store.userId}/followers`"
              class="hover:text-[#3C3832] hover:underline transition"
            >
              <strong>{{ followCount.followers }}</strong> 팔로워
            </RouterLink>

            <RouterLink
              :to="`/users/${store.userId}/followees`"
              class="hover:text-[#3C3832] hover:underline transition"
            >
              <strong>{{ followCount.followees }}</strong> 팔로잉
            </RouterLink>
          </div>

          <!-- 수정 버튼 -->
          <div class="mt-6 flex w-full justify-center gap-2">
            <RouterLink
              :to="`/users/${store.userId}/edit`"
              class="flex-1 rounded-full border border-[#DCD8D1] bg-[#F8F7F3] px-4 py-1.5 text-xs text-[#4B463B] hover:bg-[#EAE9E3] transition font-medium shadow-sm"
            >
              프로필 수정
            </RouterLink>

            <RouterLink
              :to="`/users/${store.userId}/settings`"
              class="flex-1 rounded-full border border-[#DCD8D1] bg-[#F8F7F3] px-4 py-1.5 text-xs text-[#4B463B] hover:bg-[#EAE9E3] transition font-medium shadow-sm"
            >
              설정
            </RouterLink>
          </div>

          <hr class="my-6 w-full border-[#EAE9E3]" />

          <div class="w-full text-left text-sm space-y-2">
            <button class="w-full text-[#3A3731] font-medium">📚 내 리뷰</button>
            <button class="w-full text-[#6B675E] hover:text-[#2F2C27] transition">
              💖 좋아요한 글
            </button>
            <button class="w-full text-[#6B675E] hover:text-[#2F2C27] transition">
              📖 내 서재
            </button>
          </div>
        </div>
      </aside>

      <!-- 오른쪽: 리뷰 피드 -->
      <main class="flex-1 flex justify-center">
        <div class="w-full max-w-2xl space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-[#2E2A24]">📚 나의 리뷰</h2>
            <div class="flex gap-2 text-xs text-gray-600">
              <button
                class="rounded-full border border-[#DDD9CF] px-3 py-1 hover:bg-[#EAE9E3] transition"
              >
                최신순
              </button>
              <button
                class="rounded-full border border-[#DDD9CF] px-3 py-1 hover:bg-[#EAE9E3] transition"
              >
                좋아요순
              </button>
            </div>
          </div>

          <!-- 리뷰 리스트 -->
          <section>
            <div
              v-for="item in reviews"
              :key="item.id"
              class="rounded-xl border border-[#EAE9E3] bg-white p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-base font-semibold text-[#2E2A24]">
                    {{ item.book.title }}
                  </h3>
                  <p class="text-xs text-gray-500">{{ item.book.author }}</p>
                </div>
                <span
                  class="rounded-full bg-[#F0EEE9] px-3 py-0.5 text-[11px] text-[#4B463B] border border-[#EAE9E3]"
                >
                  {{ item.progress }}p
                </span>
              </div>

              <p class="mt-3 text-[13px] text-[#4B463B] leading-relaxed">
                {{ item.content }}
              </p>

              <div class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="rounded-full bg-[#F7F6F3] px-2.5 py-0.5 text-[11px] text-[#5A564C] border border-[#EAE9E3]"
                >
                  #{{ tag }}
                </span>
              </div>

              <div class="mt-3 flex justify-between text-[11px] text-gray-500">
                <div class="flex gap-4">
                  <span>❤️ {{ item.likes }}</span>
                  <span>💬 {{ item.comments }}</span>
                  <span>🔁 {{ item.shares }}</span>
                </div>
                <span>{{ item.time }}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>



<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { getFollowCount, getUserInfo } from '@/api/user'

const store = useUserStore()
const followCount = ref({ followers: 0, followees: 0 })
const S3_BASE_URL =
  'https://mayangsik-uploaded-files.s3.ap-northeast-2.amazonaws.com'


const user = ref({
  userId : '',
  nickname : '',
  bio : '',
  profile_image_url : ''
})


watch(
  () => store.userId,
  async (newUserId) => {
    if (!newUserId) {
      console.log('userId 없음')
      return
    }

    try {
     const followRes = await getFollowCount(newUserId)
  followCount.value = followRes.data

  const userRes = await getUserInfo(newUserId)
  user.value = userRes.data

    } catch (err) {
      console.error('팔로우 수 불러오기 실패:', err)
    }
  },
  { immediate: true }
)

// 더미 리뷰
const reviews = [
  {
    id: '1',
    book: { title: '이방인', author: '알베르 카뮈' },
    content:
      '“오늘, 엄마가 죽었다.” 감정이 메마른 뫼르소의 시선은 우리 모두의 무심함을 비춘다.',
    progress: 234,
    tags: ['실존주의', '고전문학'],
    likes: 42,
    comments: 8,
    shares: 15,
    time: '2시간 전',
  },
  {
    id: '2',
    book: { title: '1984', author: '조지 오웰' },
    content:
      '감시받는 일상이 낯설지 않은 지금, “빅 브라더”는 이미 우리 곁에 있다.',
    progress: 189,
    tags: ['디스토피아', '정치소설'],
    likes: 35,
    comments: 6,
    shares: 12,
    time: '5시간 전',
  },
]
</script>
