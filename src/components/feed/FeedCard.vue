<script setup>
import { Heart, Bookmark, MessageCircle, Share2 } from "lucide-vue-next";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <article class="px-6">
    <div
      class="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
      :style="props.data.bgColor ? { backgroundColor: props.data.bgColor } : {}"
    >
      <!-- User info -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">
            <span>{{ props.data.user.avatar }}</span>
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-900">
              {{ props.data.user.name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ props.data.user.username }} · {{ props.data.time }}
            </p>
          </div>
        </div>
      </div>

      <!-- Book card -->
      <div
        v-if="props.data.book"
        class="flex items-center mb-3 p-3 rounded-lg bg-white/70 border border-gray-100"
      >
        <div
          class="w-10 h-14 rounded-md bg-gray-100 flex items-center justify-center text-xl mr-3 flex-shrink-0"
        >
          <span>{{ props.data.book.thumbnail }}</span>
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold text-gray-900 truncate">
            {{ props.data.book.title }}
          </p>
          <p class="text-xs text-gray-500">
            {{ props.data.book.author }}
          </p>
        </div>
      </div>

      <!-- Content -->
      <p class="text-sm text-gray-800 leading-relaxed whitespace-pre-line mb-2">
        {{ props.data.content }}
      </p>

      <!-- Hashtags -->
      <div class="flex flex-wrap gap-1.5 mb-3">
        <span
          v-for="tag in props.data.hashtags"
          :key="tag"
          class="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-700"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-4 text-xs mt-2">
        <button
          type="button"
          class="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors"
        >
          <Heart class="w-4 h-4" :stroke-width="1.5" />
          <span class="text-sm">{{ props.data.likes }}</span>
        </button>

        <button
          type="button"
          class="flex items-center space-x-1.5 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <MessageCircle class="w-4 h-4" :stroke-width="1.5" />
          <span class="text-sm">{{ props.data.comments }}</span>
        </button>

        <button
          type="button"
          class="flex items-center space-x-1.5 text-gray-500 hover:text-amber-500 transition-colors"
        >
          <Bookmark class="w-4 h-4" :stroke-width="1.5" />
          <span class="text-sm">{{ props.data.bookmarks }}</span>
        </button>

        <button
          type="button"
          class="flex items-center space-x-1.5 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <Share2 class="w-4 h-4" :stroke-width="1.5" />
        </button>
      </div>
    </div>
  </article>
</template>
