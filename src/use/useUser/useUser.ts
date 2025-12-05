import { computed, reactive } from 'vue'
import * as authService from '@/services/auth/authService'

const state = reactive({
  user: {},
  isAuthenticated: false,
})

export default function useUser() {
  const getUser = async () => {
    try {
      const { data } = await authService.getUserData()

      state.user = data.user
      state.isAuthenticated = data.isAuthenticated
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const user = computed(() => {
    return state.user
  })

  return {
    getUser,
    user,
  }
}
