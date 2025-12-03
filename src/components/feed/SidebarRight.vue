<script setup>
import { Search } from "lucide-vue-next";

const recommendedBooks = [
  { id: 1, title: "불편한 편의점", cover: "📗", author: "김호연" },
  { id: 2, title: "달러구트 꿈 백화점 2", cover: "📕", author: "이미예" },
  { id: 3, title: "트렌드 코리아 2024", cover: "📘", author: "김난도" },
  { id: 4, title: "퓨처 셀프", cover: "📙", author: "벤저민 하디" }
];

const recommendedUsers = [
  { id: 1, name: "은지", avatar: "👩‍🦰", bio: "일주일에 책 3권 읽기" },
  { id: 2, name: "준호", avatar: "👨‍💼", bio: "비즈니스 서적 마니아" },
  { id: 3, name: "민서", avatar: "👧", bio: "시와 에세이를 사랑해요" }
];

const popularReviews = [
  {
    id: 1,
    user: "하늘",
    content: "이 책을 읽고 나서야 비로소 나 자신을 이해하게 된 느낌이에요.",
    likes: 128
  },
  {
    id: 2,
    user: "도윤",
    content: "조금은 불편하지만 꼭 필요한 질문들을 던져주는 책입니다.",
    likes: 93
  }
];
</script>

<template>
  <div class="p-4 space-y-4 bg-white">
    <!-- Search -->
    <div class="border border-gray-200 rounded-lg px-3 py-2 flex items-center space-x-2">
      <Search class="w-4 h-4 text-gray-400" :stroke-width="1.5" />
      <input
        type="text"
        placeholder="책, 리뷰, 사람 검색"
        class="w-full bg-transparent text-sm focus:outline-none placeholder:text-gray-400"
      />
    </div>

    <!-- Recommended books -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h2 class="text-base font-semibold text-gray-900 mb-3">오늘의 추천 도서</h2>
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="book in recommendedBooks"
          :key="book.id"
          class="flex items-center space-x-2"
        >
          <div
            class="w-10 h-14 rounded-md bg-gray-100 flex items-center justify-center text-xl flex-shrink-0"
          >
            <span>{{ book.cover }}</span>
          </div>
          <div class="min-w-0">
            <h3 class="font-medium text-gray-900 text-xs truncate">{{ book.title }}</h3>
            <p class="text-xs text-gray-500 truncate">{{ book.author }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Follow suggestions -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h2 class="text-base font-semibold text-gray-900 mb-3">팔로우 추천</h2>
      <div class="space-y-3">
        <div
          v-for="user in recommendedUsers"
          :key="user.id"
          class="flex items-center space-x-2.5"
        >
          <div
            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0"
          >
            <span>{{ user.avatar }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-medium text-gray-900 truncate">
              {{ user.name }}
            </h3>
            <p class="text-xs text-gray-500 truncate">
              {{ user.bio }}
            </p>
          </div>
          <button
            type="button"
            class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-xs font-medium text-gray-700"
          >
            팔로우
          </button>
        </div>
      </div>
    </div>

    <!-- Popular reviews -->
    <div class="border border-gray-200 rounded-lg p-4">
      <h2 class="text-base font-semibold text-gray-900 mb-3">인기 리뷰</h2>
      <div class="space-y-2">
        <div
          v-for="review in popularReviews"
          :key="review.id"
          class="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <p class="text-xs text-gray-700 mb-1.5 line-clamp-2">
            {{ review.content }}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-600">{{ review.user }}</span>
            <span class="text-xs text-gray-500">❤️ {{ review.likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
