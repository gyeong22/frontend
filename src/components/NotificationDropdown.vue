<template>
  <div
    :class="['z-40 overflow-hidden rounded-xl border bg-white shadow-xl', $attrs.class]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b px-4 py-3">
      <h2 class="text-sm font-semibold">알림</h2>
      <button class="text-xs text-gray-400 hover:text-gray-600">
        모두 읽기
      </button>
    </div>

    <!-- List -->
    <div class="max-h-96 overflow-y-auto">
      <div
        v-for="item in notifications"
        :key="item.id"
        class="flex gap-3 border-b px-4 py-3 last:border-b-0 hover:bg-gray-50"
      >
        <div class="mt-2 h-2 w-2 flex-shrink-0 rounded-full" :class="item.read ? 'bg-transparent' : 'bg-red-500'" />
        <div class="flex-shrink-0">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
            {{ item.avatarText }}
          </div>
        </div>
        <div class="flex-1 text-sm leading-relaxed">
          <p class="text-gray-800">
            <span class="font-semibold">{{ item.actor }}</span>
            <span class="text-gray-600"> {{ item.message }}</span>
          </p>
          <p class="mt-1 text-xs text-gray-400">{{ item.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const notifications = [
  {
    id: 1,
    actor: '박독자님이',
    message: '회원님의 리뷰를 좋아합니다.',
    time: '5분 전',
    avatarText: '박',
    read: false,
  },
  {
    id: 2,
    actor: '이작가님이',
    message: '회원님을 팔로우하기 시작했습니다.',
    time: '1시간 전',
    avatarText: '이',
    read: false,
  },
  {
    id: 3,
    actor: '최편집님이',
    message: '회원님의 리뷰에 댓글을 남겼습니다: "정말 공감되는 글이네요!"',
    time: '2시간 전',
    avatarText: '최',
    read: true,
  },
  {
    id: 4,
    actor: '정리더님이',
    message: '회원이 읽은 책도 읽기 시작했습니다.',
    time: '어제',
    avatarText: '정',
    read: true,
  },
]
</script>