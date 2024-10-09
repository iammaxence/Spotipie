import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'

export const useUserStore = defineStore('user', () => {
  const TOKEN_EXPIRATION_IN_SECS = 3000
  const ACCESS_TOKEN_LOCAL_STORAGE = 'accessToken'

  const user: Ref<User | null> = ref(null)

  const getUser = () => {
    return user.value
  }

  const setUser = async (newUser: User) => {
    if(getAccessToken()) {
      user.value = newUser
    } else {
      throw Error('Access token is not found')
    }
  }

  const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE)
  }

  const setAccessToken = async (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, accessToken);
    setTimeout(() => clearAll(), TOKEN_EXPIRATION_IN_SECS*1000);
  }

  const clearAll = () => {
    user.value = null;
  }

  return { getUser, setUser, getAccessToken, setAccessToken }
})
