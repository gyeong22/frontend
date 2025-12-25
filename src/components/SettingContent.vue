<template>
  <div>
    <!-- 비밀번호 및 보안 -->
    <div v-if="selectedMenu === 'security'">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">비밀번호 및 보안</h2>
      <p class="text-sm text-gray-600 mb-4">
        비밀번호 변경 및 보안 설정을 관리하세요.
      </p>

      <div class="mt-5 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
          <input
            type="password"
            v-model="form.currentPassword"
            class="w-full rounded-lg border border-[#DAD8D2] bg-[#F8F7F4] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
          <input
            type="password"
            v-model="form.newPassword"
            class="w-full rounded-lg border border-[#DAD8D2] bg-[#F8F7F4] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            class="w-full rounded-lg border border-[#DAD8D2] bg-[#F8F7F4] px-3 py-2 text-sm"
          />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="cancelPasswordChange"
            class="rounded-full border border-[#DDD9CF] bg-white px-4 py-2 text-sm"
          >
            취소
          </button>
          <button
            @click="submitPasswordChange"
            class="rounded-full border border-[#D3CBC4] bg-[#E8E2DC] px-4 py-2 text-sm font-semibold"
          >
            변경하기
          </button>
        </div>
      </div>
    </div>

    <!-- 내 정보 및 권한 -->
<div v-else-if="selectedMenu === 'permissions'">
  <h2 class="text-lg font-semibold text-gray-800 mb-4">
    내 정보 및 권한
  </h2>
  <p class="text-sm text-gray-600">
    계정 권한, 활동 내역 및 접근 권한 관리.
  </p>

  <!-- 필요하면 여기에 항목 추가 -->
  <!-- 예: ROLE, 가입일, 로그인 방식 등 -->
</div>


<!-- 회원 탈퇴 -->
<div v-else-if="selectedMenu === 'withdraw'" class="space-y-4">
  <h2 class="text-lg font-semibold text-[#1f2937]">회원 탈퇴</h2>

  <p class="text-sm text-gray-600 leading-relaxed">
    탈퇴 시, 계정 정보와 활동 내역이 모두 삭제되며 복구가 불가능합니다.<br />
    탈퇴 전 결제 및 구독 상태를 반드시 확인해주세요.
  </p>

  <button
    @click="confirmWithdraw"
    class="mt-4 rounded-full border border-[#D9D1CA] bg-[#FBEAEA]
           px-4 py-2 text-sm font-semibold text-[#b91c1c]
           hover:bg-[#F9DADA] transition"
  >
    회원 탈퇴하기
  </button>
</div>



    <!-- 개인정보 수정 -->
    <div v-else-if="selectedMenu === 'personal'">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">개인정보 수정</h2>
      <p class="text-sm text-gray-600 mb-5">
        이메일 등 기본 정보를 수정할 수 있습니다.
      </p>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            v-model="personalForm.email"
            :disabled="!isEditingPersonal"
            :placeholder="currentEmail"
            class="w-full rounded-lg border border-[#DAD8D2] bg-[#F8F7F4] px-3 py-2 text-sm
                   disabled:bg-[#EFEDE8] disabled:text-gray-500"
          />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button
            v-if="isEditingPersonal"
            @click="cancelPersonalEdit"
            class="rounded-full border border-[#DDD9CF] bg-white px-4 py-2 text-sm"
          >
            취소
          </button>

          <button
            v-if="isEditingPersonal"
            @click="submitPersonalEdit"
            class="rounded-full border border-[#D3CBC4] bg-[#E8E2DC] px-4 py-2 text-sm font-semibold"
          >
            저장
          </button>

          <button
            v-else
            @click="isEditingPersonal = true"
            class="rounded-full border border-[#D3CBC4] bg-[#F1EFEA] px-4 py-2 text-sm font-semibold"
          >
            수정
          </button>
        </div>
      </div>
    </div>

    <!-- 차단 -->
    <div v-else-if="selectedMenu === 'block'">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">차단한 계정 관리</h2>

      <div v-if="blockedUsers.length" class="space-y-3">
        <div
          v-for="user in blockedUsers"
          :key="user.userId"
          class="flex justify-between rounded-xl border px-4 py-3"
        >
          <div>
            <p class="text-sm font-semibold">{{ user.nickname }}</p>
            <p class="text-xs text-gray-500">@{{ user.userId }}</p>
          </div>

          <button
            @click="handleUnblock(user.userId)"
            class="rounded-full border px-3 py-1 text-xs"
          >
            차단 해제
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-10">
        현재 차단한 사용자가 없습니다.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  passwordChange,
  getBlockUsers,
  unblockUser,
  getMyEmail,
  updateMyEmail,
  withdraw
} from '@/api/user'

defineProps({ selectedMenu: String })

/* 비밀번호 */
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const cancelPasswordChange = () => {
  form.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
}

const submitPasswordChange = async () => {
  await passwordChange({
    prevPass: form.value.currentPassword,
    newPass: form.value.newPassword,
  })
  alert('비밀번호가 변경되었습니다.')
  cancelPasswordChange()
}

/* 이메일 */
const currentEmail = ref('')
const personalForm = ref({ email: '' })
const isEditingPersonal = ref(false)

const getUserEmail = async () => {
  const res = await getMyEmail()
  console.log(res)
  currentEmail.value = res.data
}

const cancelPersonalEdit = () => {
  personalForm.value.email = ''
  isEditingPersonal.value = false
}

const submitPersonalEdit = async () => {
  if (!personalForm.value.email) {
    alert('새 이메일을 입력해주세요.')
    return
  }

  await updateMyEmail({ email: personalForm.value.email })
  alert('이메일이 수정되었습니다.')

  currentEmail.value = personalForm.value.email
  personalForm.value.email = ''
  isEditingPersonal.value = false
}

/* 차단 */
const blockedUsers = ref([])

const fetchBlockedUsers = async () => {
  const res = await getBlockUsers()
  blockedUsers.value = res.data
}

const handleUnblock = async (userId) => {
  await unblockUser(userId)
  blockedUsers.value = blockedUsers.value.filter(u => u.userId !== userId)
}

const confirmWithdraw = async () => {
  try {
    await withdraw()
    alert('탈퇴가 완료되었습니다.')
    router.replace('/login')
  } catch (err) {
    console.error('탈퇴하기 실패:', err)
  }
}


/* 초기 */
onMounted(() => {
  fetchBlockedUsers()
  getUserEmail()
  console.log(currentEmail)
})
</script>
