<template>
  <div class="bg-white min-h-screen">
    <!-- 여기에 약간의 상단 패딩 추가 -->
    <div class="mx-auto max-w-md px-4 md:px-6 pt-32">
      <section>
        <h1 class="text-2xl font-bold text-gray-900">로그인</h1>
        <p class="mt-2 text-sm text-gray-500">
          마이페이지와 리뷰 작성 기능을 사용하려면 로그인이 필요합니다.
        </p>

        <form class="mt-8 space-y-6">
          <div>
            <label class="block text-xs font-medium text-gray-500">이메일</label>
            <input
              type="email"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-500">비밀번호</label>
            <input
              type="password"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>비밀번호를 잊으셨나요?</span>
          </div>

          <button
            type="submit"
            class="mt-4 w-full border border-black bg-black py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            로그인
          </button>
        </form>

        <p class="mt-6 text-xs text-gray-500">
          아직 계정이 없으신가요?
          <router-link to="/signup" class="underline">
            회원가입 하기
          </router-link>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>
