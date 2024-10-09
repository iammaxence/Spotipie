import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HttpHelper } from '@/adapter/HttpHelper'
import { useUserStore } from '@/stores/userAuth'
import type { Token } from '@/interfaces/Token'
import { AuthorizationAdapter } from '@/adapter/AuthorizationAdapter'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/adapter/HttpHelper', () => ({
  HttpHelper: {
    post: vi.fn()
  }
}))

vi.mock('@/stores/userAuth', () => ({
  useUserStore: vi.fn(() => ({
    setAccessToken: vi.fn()
  }))
}))

describe('AuthorizationAdapter', () => {
  let userAuthStore;
  let authorizationAdapter;

  beforeEach(() => {
    setActivePinia(createPinia());
    userAuthStore = useUserStore();
    authorizationAdapter = new AuthorizationAdapter(userAuthStore); // Pass the store to the adapter
  });

  it('should fetch authorization code successfully', async () => {
    const mockResponse = {
      text: vi.fn(() => Promise.resolve('mockAuthorizationCode'))
    }
    HttpHelper.post.mockResolvedValue(mockResponse)

    const authCode = await authorizationAdapter.getAuthorizationCode();

    expect(HttpHelper.post).toHaveBeenCalledWith(import.meta.env.VITE_SERVER_URL + '/login', {
      clientId: import.meta.env.VITE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_REDIRECT_URI,
      show_dialog: true
    });
    expect(authCode).toBe('mockAuthorizationCode');
  });

  it('should fetch token and update user store', async () => {
    // Given
    const mockToken: Token = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      expiresIn: 3600,
      tokenType: 'Bearer'
    }
    HttpHelper.post.mockResolvedValue({
      json: () => Promise.resolve(mockToken)
    })
    const code = 'mockCode';
    const state = 'mockState';

    // When
    const token = await authorizationAdapter.getToken(code, state);

    // Then
    expect(HttpHelper.post).toHaveBeenCalledWith(import.meta.env.VITE_SERVER_URL + '/token', {
      code,
      state,
      clientId: import.meta.env.VITE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_REDIRECT_URI,
      show_dialog: true
    });
    expect(token).toEqual(mockToken);
    expect(userAuthStore.setAccessToken).toHaveBeenCalledWith(mockToken.accessToken);
  });
});
