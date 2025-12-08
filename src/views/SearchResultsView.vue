<template>
  <div class="mx-auto max-w-5xl px-4 pt-8 md:px-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">검색 결과</h1>
      <p class="mt-1 text-sm text-gray-500">'{{ query }}' 검색 결과</p>
    </header>

    <!-- 탭 -->
    <div class="mb-6 flex gap-6 border-b text-sm">
      <button class="border-b-2 border-gray-900 pb-3 font-semibold text-gray-900">
        전체
      </button>
      <button class="pb-3 text-gray-500">책</button>
      <button class="pb-3 text-gray-500">리뷰</button>
      <button class="pb-3 text-gray-500">사용자</button>
    </div>

    <!-- 책 결과 -->
    <section class="mb-8">
      <h2 class="mb-4 text-sm font-semibold text-gray-900">책</h2>
      <div class="space-y-3">
        <div
          v-for="book in books"
          :key="book.title"
          class="flex items-center gap-4 rounded-xl px-2 py-2 hover:bg-gray-50"
        >
          <div class="h-16 w-12 flex-shrink-0 rounded-md bg-gray-100" />
          <div class="flex flex-col text-sm">
            <span class="font-semibold text-gray-900">{{ book.title }}</span>
            <span class="text-xs text-gray-500">{{ book.author }}</span>
            <span class="mt-1 text-xs text-gray-400">
              리뷰 {{ book.reviewCount }}개 · 평균 진행도 {{ book.progress }}%
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 리뷰 결과 -->
    <section class="mb-8">
      <h2 class="mb-4 text-sm font-semibold text-gray-900">리뷰</h2>
      <div class="space-y-4">
        <div
          v-for="item in reviews"
          :key="item.id"
          class="rounded-xl px-2 py-2 hover:bg-gray-50"
        >
          <p class="text-sm font-semibold text-gray-900">
            {{ item.user }} · {{ item.book }}
          </p>
          <p class="mt-1 text-sm text-gray-700 line-clamp-2">
            {{ item.content }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = computed(() => route.query.q || '이방')

const books = [
  { title: '이방인', author: '알베르 카뮈', reviewCount: 342, progress: 87 },
  { title: '1984', author: '조지 오웰', reviewCount: 521, progress: 92 },
  { title: '데미안', author: '헤르만 헤세', reviewCount: 287, progress: 78 },
]

const reviews = [
  {
    id: 1,
    user: '김독자',
    book: '이방인',
    content: '이 책은 삶의 부조리함에 대해 깊이 있게 다루고 있습니다. 뫼르소의 무감각함이...',
  },
  {
    id: 2,
    user: '박리뷰',
    book: '1984',
    content: '전체주의의 공포를 섬뜩하게 그려낸 작품입니다. 빅브라더의 감시 사회가...',
  },
]
</script>