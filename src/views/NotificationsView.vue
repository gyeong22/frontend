<template>
  <div class="mx-auto max-w-5xl px-4 pt-8 md:px-6">
    <header class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">알림</h1>
        <p class="mt-1 text-sm text-gray-500">최근 받은 알림을 확인하세요.</p>
      </div>
      <button class="text-xs text-gray-400 hover:text-gray-600">
        모두 읽기
      </button>
    </header>

    <NotificationDropdown class="w-full" />
  </div>
</template>

<script setup>
import NotificationDropdown from '@/components/NotificationDropdown.vue'
</script>