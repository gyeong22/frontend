<template>
  <aside class="hidden w-72 flex-shrink-0 border-l bg-white px-6 pt-8 lg:block">
    <section class="mb-8">
      <h2 class="mb-3 text-sm font-semibold text-gray-900">내가 읽은 책</h2>
      <div class="flex gap-2">
        <div v-for="n in 4" :key="n" class="h-16 w-12 flex-shrink-0 rounded-md bg-gray-100" />
      </div>
      <p class="mt-2 text-xs text-gray-400">총 24권</p>
    </section>

    <section class="mb-8">
      <h2 class="mb-3 text-sm font-semibold text-gray-900">내 리뷰</h2>
      <p class="text-2xl font-bold text-gray-900">42</p>
      <p class="text-xs text-gray-400">작성한 리뷰</p>
    </section>

    <section>
      <h2 class="mb-3 text-sm font-semibold text-gray-900">최근 읽은 책</h2>
      <div class="space-y-3 text-xs text-gray-600">
        <div v-for="n in 3" :key="n" class="flex items-center gap-3">
          <div class="h-10 w-8 flex-shrink-0 rounded-md bg-gray-100" />
          <div class="flex flex-col">
            <span>책 제목 {{ n }}</span>
            <span class="text-[11px] text-gray-400">저자명</span>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup>
</script>