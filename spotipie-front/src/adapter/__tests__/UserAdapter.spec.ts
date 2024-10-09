import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/userAuth'
import { HttpHelper } from '@/adapter/HttpHelper'
import type { User } from '@/interfaces/User'
import { UserAdapter } from '@/adapter/UserAdapter'

vi.mock('@/adapter/HttpHelper', () => ({
  HttpHelper: {
    get: vi.fn()
  }
}))

vi.mock('@/stores/userAuth', () => ({
  useUserStore: vi.fn(() => ({
    setUser: vi.fn()
  }))
}))

describe('UserAdapter', () => {
  let userAuthStore;
  let userAdapter;

  beforeEach(() => {
    setActivePinia(createPinia());
    userAuthStore = useUserStore();
    userAdapter = new UserAdapter(userAuthStore);
  });

  it('should fetch user data and update store', async () => {
    // Given
    const mockUser: User = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com'
    };
    HttpHelper.get.mockResolvedValue({
      json: () => Promise.resolve(mockUser)
    });
    const token = 'mockToken';

    // When
    const user = await userAdapter.getUser(token);

    // Then
    expect(HttpHelper.get).toHaveBeenCalledWith(import.meta.env.VITE_SERVER_URL + '/user', 'token=' + token);
    expect(user).toEqual(mockUser);
    expect(userAuthStore.setUser).toHaveBeenCalledWith(mockUser);
  });
});
