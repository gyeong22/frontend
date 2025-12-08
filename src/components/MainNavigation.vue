<template>
  <header class="fixed inset-x-0 top-0 z-30 border-b bg-white/95 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
      <!-- Left: Logo -->
      <RouterLink to="/" class="text-xl font-bold text-gray-900">
        MaYangSik
      </RouterLink>

      <!-- Center: Menu -->
      <div class="hidden items-center gap-8 md:flex">
        <RouterLink
          to="/"
          class="relative pb-3 pt-4 text-sm font-medium transition-colors"
          :class="route.name === 'home' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'"
        >
          홈
          <span
            v-if="route.name === 'home'"
            class="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900"
          />
        </RouterLink>
        <RouterLink
          to="/ranking"
          class="relative pb-3 pt-4 text-sm font-medium transition-colors"
          :class="route.name === 'ranking' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'"
        >
          랭킹
          <span
            v-if="route.name === 'ranking'"
            class="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900"
          />
        </RouterLink>
      </div>

      <!-- Right: Search + Icons -->
      <div class="flex items-center gap-4">
        <!-- Search -->
        <form
          class="hidden items-center gap-2 rounded-full bg-gray-100 px-4 py-2 md:flex"
          @submit.prevent="onSearchSubmit"
        >
          <span class="text-gray-400">
            🔍
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="검색어 입력"
            class="w-40 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </form>

        <!-- Notification -->
        <div class="relative">
          <button
            class="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
            @click="toggleNotifications"
          >
            <span class="text-xl">🔔</span>
            <span
              class="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
            />
          </button>

          <NotificationDropdown
            v-if="showNotifications"
            class="absolute right-0 top-10 w-80"
            @close="showNotifications = false"
          />
        </div>

        <!-- Profile icon -->
        <RouterLink
          to="/profile/bookworm"
          class="hidden h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700 md:flex"
        >
          김
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import NotificationDropdown from '@/components/NotificationDropdown.vue'

const route = useRoute()
const router = useRouter()
const showNotifications = ref(false)
const searchQuery = ref('')

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const onSearchSubmit = () => {
  if (!searchQuery.value.trim()) return
  router.push({ name: 'search', query: { q: searchQuery.value.trim() } })
  showNotifications.value = false
}

</script>