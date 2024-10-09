import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userAuth'

// Mock interfaces
import type { User } from '@/interfaces/User'
import type { UserPort } from '@/interfaces/UserPort'
import type { AuthorizationPort } from '@/interfaces/AuthorizationPort'

// Mocking localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useUserStore', () => {
  let userStore: ReturnType<typeof useUserStore>;

  const mockUser: User = {
    id: 1,
    name: 'Maxence',
    email: 'maxence@example.com'
  };


  const userPortMock: UserPort = {
    getUser: vi.fn().mockResolvedValue(mockUser)
  };

  const authorizationPortMock: AuthorizationPort = {
    getToken: vi.fn().mockResolvedValue({ accessToken: 'mockAccessToken' })
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();

    //vi.spyOn(messages, 'getLatest')
    //userStore.userPort = vi.fn().mockResolvedValue(userPortMock);
    //userStore.authorizationPort.getToken = vi.fn().mockResolvedValue({ accessToken: 'mockAccessToken' })

    window.localStorage.clear();
  });

  it('should set user when access token exists', async () => {
    window.localStorage.setItem('accessToken', 'mockAccessToken');

    await userStore.setUser();

    expect(userStore.getUser()).toEqual(mockUser);
    expect(userPortMock.getUser).toHaveBeenCalledWith('mockAccessToken');
  });

  it('should throw error when token is not found', async () => {
    await expect(userStore.setUser()).rejects.toThrow('Token not found');
  });

  it('should store access token and set user', async () => {
    await userStore.setToken('mockCode', 'mockState');

    expect(window.localStorage.getItem('accessToken')).toBe('mockAccessToken');
    expect(authorizationPortMock.getToken).toHaveBeenCalledWith('mockCode', 'mockState');
  });

  it('should clear user after token expiration', async () => {
    vi.useFakeTimers();
    await userStore.setToken('mockCode', 'mockState');

    expect(userStore.getUser()).toBeNull();

    vi.advanceTimersByTime(3000 * 1000);

    expect(userStore.getUser()).toBeNull();
    vi.useRealTimers();
  });
});
