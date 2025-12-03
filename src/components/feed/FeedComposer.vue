<script setup>
import { ImageIcon, Tag, Star, Camera, FileText } from "lucide-vue-next";
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-md p-4">
    <div class="flex space-x-3">
      <!-- Avatar -->
      <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="text-lg">😊</span>
      </div>

      <!-- Input -->
      <div class="flex-1">
        <textarea
          placeholder="오늘 어떤 문장을 기록하고 싶나요?"
          class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm resize-none
                 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          rows="3"
        ></textarea>

        <div class="mt-3 flex items-center justify-between">
          <div class="flex space-x-1.5">
            <button
              class="p-1.5 hover:bg-gray-50 rounded transition-colors"
              title="이미지 추가"
              type="button"
            >
              <ImageIcon class="w-4 h-4 text-gray-500" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 hover:bg-gray-50 rounded transition-colors"
              title="태그 추가"
              type="button"
            >
              <Tag class="w-4 h-4 text-gray-500" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 hover:bg-gray-50 rounded transition-colors"
              title="평점 남기기"
              type="button"
            >
              <Star class="w-4 h-4 text-gray-500" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 hover:bg-gray-50 rounded transition-colors"
              title="사진 촬영"
              type="button"
            >
              <Camera class="w-4 h-4 text-gray-500" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 hover:bg-gray-50 rounded transition-colors"
              title="텍스트 붙여넣기"
              type="button"
            >
              <FileText class="w-4 h-4 text-gray-500" :stroke-width="1.5" />
            </button>
          </div>

          <button
            type="button"
            class="bg-blue-500 text-white font-medium px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            게시
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
