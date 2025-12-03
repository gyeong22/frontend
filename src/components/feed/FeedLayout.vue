<script setup>
import SidebarLeft from "./SidebarLeft.vue";
import FeedContent from "./FeedContent.vue";
import SidebarRight from "./SidebarRight.vue";
import BottomNavigation from "./BottomNavigation.vue";
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-[1400px] mx-auto flex">
      <!-- Left sidebar -->
      <aside class="hidden lg:block w-60 sticky top-0 h-screen border-r border-gray-200">
        <SidebarLeft />
      </aside>

      <!-- Main feed -->
      <main class="flex-1 min-w-0 border-r border-gray-200">
        <FeedContent />
      </main>

      <!-- Right sidebar -->
      <aside class="hidden xl:block w-80 sticky top-0 h-screen overflow-y-auto border-r border-gray-200">
        <SidebarRight />
      </aside>
    </div>

    <!-- Mobile bottom nav -->
    <BottomNavigation />
  </div>
</template>
