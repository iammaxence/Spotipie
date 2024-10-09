import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/interfaces/User'
import { UserAdapter } from '@/adapter/UserAdapter'
import type { UserPort } from '@/interfaces/UserPort'
import type { AuthorizationPort } from '@/interfaces/AuthorizationPort'
import { AuthorizationAdapter } from '@/adapter/AuthorizationAdapter'

export const useUserStore = defineStore('user', () => {
  const TOKEN_EXPIRATION_IN_SECS = 3000
  const ACCESS_TOKEN_LOCAL_STORAGE = 'accessToken'

  const user: Ref<User | null> = ref(null)

  const userPort: UserPort = new UserAdapter()
  const authorizationPort: AuthorizationPort = new AuthorizationAdapter()

  const getUser = () => {
    return user.value
  }

  const setUser = async () => {
    if(getAccessToken()) {
      user.value = await userPort.getUser(getAccessToken());
    } else {
      throw Error('Token not found')
    }
  }

  const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE)
  }

  const setToken = async (code: string, state: string) => {
    const token = await authorizationPort.getToken(code, state);
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE, token.accessToken);
    setTimeout(() => clearAll(), TOKEN_EXPIRATION_IN_SECS*1000);
  }

  const clearAll = () => {
    user.value = null;
  }

  return { getUser, setUser, getAccessToken, setToken }
})
