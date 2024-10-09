import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userAuth'

// Mock interfaces
import type { User } from '@/interfaces/User'

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

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();

    window.localStorage.clear();
  });

  it('should set user when access token exists', async () => {
    window.localStorage.setItem('accessToken', 'mockAccessToken');

    await userStore.setUser(mockUser);

    expect(userStore.getUser()).toEqual(mockUser);
  });

  it('should throw error when token is not found', async () => {
    await expect(userStore.setUser()).rejects.toThrow('Access token is not found');
  });

  it('should store access token', async () => {
    await userStore.setAccessToken('mockAccessToken');

    expect(window.localStorage.getItem('accessToken')).toBe('mockAccessToken');
  });

  it('should clear user after token expiration', async () => {
    vi.useFakeTimers();
    await userStore.setAccessToken('mockAccessToken');
    await userStore.setUser(mockUser);

    expect(userStore.getUser()).toEqual(mockUser);

    vi.advanceTimersByTime(3000 * 1000);

    expect(userStore.getUser()).toBeNull();
    vi.useRealTimers();
  });
});
