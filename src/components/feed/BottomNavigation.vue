<script setup>
import { Home, Search, PenSquare, Bell, User } from "lucide-vue-next";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Search, label: "Search", active: false },
  { icon: PenSquare, label: "Write", active: false },
  { icon: Bell, label: "Alert", active: false },
  { icon: User, label: "Profile", active: false }
];
</script>

<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
    <div class="flex items-center justify-around px-2 py-2">
      <button
        v-for="item in navItems"
        :key="item.label"
        type="button"
        class="flex flex-col items-center space-y-0.5 px-3 py-2 rounded-md transition-colors"
        :class="item.active
          ? 'text-gray-900 bg-gray-100'
          : 'text-gray-500 hover:text-gray-700'"
      >
        <component
          :is="item.icon"
          class="w-5 h-5"
          :stroke-width="1.5"
        />
        <span class="text-xs font-medium">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
