import api from './axios'

// 로그인
export const login = (data) => api.post('/login', data)

// 회원가입
export const signup = (data) => api.post('/users', data)