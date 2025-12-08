<template>
  <div class="mx-auto max-w-5xl px-4 pt-8 md:px-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">랭킹</h1>
    </header>

    <!-- 필터 탭 -->
    <div class="mb-6 flex gap-3 text-sm">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="rounded-full px-4 py-2 font-medium transition-colors"
        :class="activeTab === tab.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 리스트 -->
    <section class="space-y-4">
      <article
        v-for="item in rankings"
        :key="item.rank"
        class="flex items-stretch gap-4 rounded-2xl border bg-white px-5 py-4"
      >
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
          {{ item.rank }}
        </div>
        <div class="flex h-24 w-20 flex-shrink-0 items-center justify-center rounded-md bg-gray-100" />
        <div class="flex flex-1 flex-col justify-center">
          <h2 class="text-base font-semibold text-gray-900">{{ item.book }}</h2>
          <p class="mt-1 text-xs text-gray-500">{{ item.author }}</p>
          <p class="mt-2 line-clamp-2 text-sm text-gray-700">
            {{ item.summary }}
          </p>
          <div class="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>작성자: {{ item.reviewer }}</span>
            <span class="flex items-center gap-1">
              ♡ <span>{{ item.likes }}</span>
            </span>
            <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600">
              {{ item.genre }}
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = [
  { key: 'all', label: '전체' },
  { key: 'genre', label: '장르별' },
  { key: 'likes', label: '좋아요 순' },
  { key: 'reviews', label: '리뷰수 순' },
  { key: 'completed', label: '완독자 리뷰만' },
]

const activeTab = ref('all')

const rankings = [
  {
    rank: 1,
    book: '이방인',
    author: '알베르 카뮈',
    summary: '소설의 첫 문장 "오늘, 엄마가 죽었다"는 정말 충격적이었습니다...',
    reviewer: '김독서',
    likes: 342,
    genre: '고전문학',
  },
  {
    rank: 2,
    book: '1984',
    author: '조지 오웰',
    summary:
      '빅 브라더가 지배하는 사회. 생각보다 현대 사회와 닮아있어서 소름 돋았습니다...',
    reviewer: '이서평',
    likes: 298,
    genre: 'SF',
  },
  {
    rank: 3,
    book: '데미안',
    author: '헤르만 헤세',
    summary: '싱클레어의 성장 과정이 너무나 공감됩니다...',
    reviewer: '박문학',
    likes: 256,
    genre: '성장소설',
  },
]
</script>