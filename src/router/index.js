import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RankingView from '@/views/RankingView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
import WriteView from '@/views/WriteView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'


const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/ranking', name: 'ranking', component: RankingView },
  { path: '/profile/:userId?', name: 'profile', component: ProfileView },
  { path: '/search', name: 'search', component: SearchResultsView },
  { path: '/write', name: 'write', component: WriteView },
  { path: '/notifications', name: 'notifications', component: NotificationsView },
  { path: '/login', name: 'login', component: LoginView},
  { path: '/signup', name: 'signup', component: SignUpView},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router