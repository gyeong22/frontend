<template>
  <div class="mx-auto flex max-w-5xl gap-8 px-4 pt-8 md:px-6">
    <!-- Left (피드) -->
    <section class="flex-1">
      <!-- 탭 -->
      <div class="mb-4 flex gap-4 border-b text-sm">
        <button
          class="border-b-2 pb-3 pt-2"
          :class="activeTab === 'recommend' ? 'border-gray-900 font-semibold text-gray-900' : 'border-transparent text-gray-500'"
          @click="activeTab = 'recommend'"
        >
          추천
        </button>
        <button
          class="pb-3 pt-2 text-gray-400"
          :class="activeTab === 'following' ? 'border-b-2 border-gray-900 font-semibold text-gray-900' : 'border-transparent text-gray-500'"
          @click="activeTab = 'following'"
        >
          팔로잉
        </button>
      </div>

      <!-- 필터 -->
      <div class="mb-4 flex gap-3 text-xs">
        <button class="rounded-full bg-gray-900 px-4 py-1.5 text-white">전체</button>
        <button class="rounded-full bg-gray-100 px-4 py-1.5 text-gray-700">내 진행도 이하</button>
        <button class="rounded-full bg-gray-100 px-4 py-1.5 text-gray-700">완독자</button>
      </div>

      <!-- 리뷰 리스트 -->
      <div class="divide-y">
        <ReviewCard v-for="item in reviews" :key="item.id" :review="item" />
      </div>
    </section>

    <!-- Right (사이드바) -->
    <HomeSidebar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReviewCard from '@/components/ReviewCard.vue'
import HomeSidebar from '@/components/HomeSidebar.vue'

const activeTab = ref('recommend')

const reviews = [
  {
    id: '1',
    user: { name: '김독서', username: 'bookworm' },
    book: { title: '이방인', author: '알베르 카뮈' },
    content:
      '소설의 첫 문장 "오늘, 엄마가 죽었다"는 정말 충격적이었습니다. 감정이 메마른 뫼르소의 시선으로 바라본 세상은 낯설면서도 어딘가 공감되는 부분이 있었어요. 우리는 얼마나 사회적 기대에 맞춰 살아가는지 돌아보게 되네요.',
    progress: 234,
    tags: ['실존주의', '고전문학'],
    likes: 42,
    comments: 8,
    shares: 15,
    time: '2시간 전',
  },
  {
    id: '2',
    user: { name: '이서평', username: 'readmore' },
    book: { title: '1984', author: '조지 오웰' },
    content:
      '빅 브라더가 지배하는 사회. 생각보다 현대 사회와 닮아있어서 소름 돋았습니다. 감시 카메라, SNS 검열... 우리는 모르는 사이에 오웰의 디스토피아에 살고 있는 건 아닐까요?',
    progress: 189,
    tags: ['디스토피아', 'SF'],
    likes: 35,
    comments: 6,
    shares: 12,
    time: '5시간 전',
  },
]
</script>