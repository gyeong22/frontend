<template>
  <article class="py-6">
    <!-- 사용자 정보 -->
    <header class="mb-3 flex items-center gap-3 text-sm text-gray-500">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
        {{ review.user.name.charAt(0) }}
      </div>
      <div class="flex flex-col">
        <span class="font-medium text-gray-900">{{ review.user.name }}</span>
        <span class="text-xs text-gray-400">@{{ review.user.username }} · {{ review.time }}</span>
      </div>
    </header>

    <!-- 카드 영역 -->
    <div class="overflow-hidden rounded-2xl border bg-white">
      <div class="flex gap-4 px-5 py-4">
        <!-- 책 썸네일 -->
        <div class="h-20 w-16 flex-shrink-0 rounded-md bg-gray-100" />

        <!-- 텍스트 -->
        <div class="flex-1">
          <p class="text-sm font-semibold text-gray-900">
            {{ review.book.title }}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            {{ review.book.author }} · {{ review.progress }}p 진행 중
          </p>
          <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-700">
            {{ review.content }}
          </p>
        </div>
      </div>

      <!-- 태그 -->
      <div class="flex flex-wrap gap-2 px-5 pb-3 text-xs">
        <span
          v-for="tag in review.tags"
          :key="tag"
          class="rounded-full bg-gray-100 px-2 py-1 text-gray-600"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- 하단 액션 -->
      <footer class="flex items-center gap-6 border-t px-5 py-3 text-xs text-gray-500">
        <button class="flex items-center gap-1 hover:text-gray-700">
          <span>♡</span>
          <span>{{ review.likes }}</span>
        </button>
        <button class="flex items-center gap-1 hover:text-gray-700">
          <span>💬</span>
          <span>{{ review.comments }}</span>
        </button>
        <button class="flex items-center gap-1 hover:text-gray-700">
          <span>🔁</span>
          <span>{{ review.shares }}</span>
        </button>
      </footer>
    </div>
  </article>
</template>

<script setup>
defineProps({
  review: {
    type: Object,
    required: true,
  },
})
</script>