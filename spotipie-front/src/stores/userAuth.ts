import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'
import type { Token } from '@/interfaces/Token'

export const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)
  const token: Ref<Token | null> = ref(null)

  const getUser = () => {
    return user.value
  }

  const setUser = (newUser: User) => {
    user.value = newUser
  }

  const setToken = (newToken: Token) => {
    token.value = newToken
  }

  return { getUser, setUser, setToken }
})
