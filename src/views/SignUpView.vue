<template>
  <div class="bg-white min-h-screen">
    <div class="mx-auto max-w-md px-4 pt-32">
      <section>
        <h1 class="text-2xl font-bold text-gray-900">회원가입</h1>
        <p class="mt-2 text-sm text-gray-500">
          마양식의 독서 커뮤니티에 가입하고, 나만의 독서 기록을 시작해보세요.
        </p>

        <form @submit.prevent="handleSignUp" class="mt-8 space-y-6">
          <!-- 사용자 ID -->
          <div>
            <label class="block text-xs font-medium text-gray-500">아이디</label>
            <input
              v-model="userId"
              type="text"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="사용하실 아이디를 입력하세요"
            />
          </div>

          <!-- 이메일 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">이메일</label>
            <input
              v-model="email"
              type="email"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="example@email.com"
            />
          </div>

          <!-- 비밀번호 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">비밀번호</label>
            <input
              v-model="password"
              type="password"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <!-- 닉네임 -->
          <div>
            <label class="block text-xs font-medium text-gray-500">닉네임</label>
            <input
              v-model="nickname"
              type="text"
              class="mt-1 w-full border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
              placeholder="마양식에서 표시될 닉네임을 입력하세요"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '@/api/user' // ✅ user.js에 정의된 signup 메서드

const router = useRouter()
const userId = ref('')
const email = ref('')
const password = ref('')
const nickname = ref('')

const handleSignUp = async () => {
  if (!userId.value || !email.value || !password.value || !nickname.value) {
    alert('모든 정보를 입력해주세요.')
    return
  }

  
  try {
    
    const res = await signup({
      user_id: userId.value,
      email: email.value,
      level_id : 1,
      role: 'USER',
      password: password.value,
      nickname: nickname.value,
      withdraw: false,
      membership : false
    })

    console.log('✅ 회원가입 성공:', res.data)
    alert('회원가입이 완료되었습니다!')

    router.push('/login')
  } catch (err) {
    console.error('❌ 회원가입 실패:', err)
    alert('회원가입 중 오류가 발생했습니다.')
  }
}
</script>
