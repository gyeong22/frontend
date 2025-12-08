<template>
  <!-- 화면 전체 흰색 + 최소 높이 -->
  <div class="bg-white min-h-screen">
    <!-- 폼 컨테이너: 너비 제한 + 가로 가운데 + 위에서 살짝 내려오기 -->
    <div class="mx-auto max-w-md px-4 pt-32">
      <section>
        <h1 class="text-2xl font-bold text-gray-900">회원가입</h1>
        <p class="mt-2 text-sm text-gray-500">
          자주 읽는 장르와 책을 기록하고, 다른 사람들의 리뷰도 함께 둘러보세요.
        </p>

        <form class="mt-8 space-y-6">
          <!-- 닉네임 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">닉네임</label>
            <input
              type="text"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="마양식에서 사용할 이름"
            />
          </div>

          <!-- 이메일 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">이메일</label>
            <input
              type="email"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          <!-- 비밀번호 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">비밀번호</label>
            <input
              type="password"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="8자 이상 입력"
            />
          </div>

          <!-- 비밀번호 확인 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">비밀번호 확인</label>
            <input
              type="password"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="비밀번호를 다시 입력"
            />
          </div>

          <!-- 버튼 -->
          <button
            type="submit"
            class="mt-4 w-full border border-black bg-black py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            회원가입 완료
          </button>
        </form>

        <p class="mt-6 text-xs text-gray-500">
          이미 계정이 있으신가요?
          <router-link to="/login" class="underline">
            로그인 하기
          </router-link>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>
