import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 주소
  withCredentials: true, // 세션 쿠키 사용할 때
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance