// /* eslint-disable no-global-assign */
// /* eslint-disable @typescript-eslint/no-empty-function */
// import { describe, expect, it, vi } from 'vitest';
// import { useLoginHelper } from '../../../../src/primary/pages/login/LoginHelper';
// import { act, renderHook } from '@testing-library/react';
// import { AuthorizationAdapterFixture } from '../../../secondary/authorization/AuthorizationAdapterFixture';
// import { UserAdapterFixture } from '../../../secondary/user/UserAdapterFixture';
// import { User } from '../../../../src/domain/User';
// import { useAuth } from '../../../../src/primary/hooks/useAuth';

// const authorizationAdapterMock = AuthorizationAdapterFixture();
// const userAdapterMock = UserAdapterFixture();

// describe('useLoginHelper', () => {

// 	beforeEach(() => {
// 		vi.clearAllMocks();
// 	});


// 	describe('Init', () => {
// 		it('Should go to to home page', async () => {
// 			const mockNavigation = vi.fn();
// 			vi.spyOn<any, any>(useAuth, 'useAuth').mockImplementation(() => ({
// 				login: vi.fn(),
// 				logout: vi.fn(),
// 				user: User.of('fake@mail.com', 'name', 'fr', 'fake_token')
// 			}));

// 			vi.mock('react-router-dom', () => ({
// 				useNavigate: () => ({
// 					navigation: () => mockNavigation,
// 				}),
// 				useLocation: () => ({
// 					search: vi.fn()
// 				})
// 			}));

// 			await act(async () => {
// 				renderHook(() => useLoginHelper({ authorizationAdapter: authorizationAdapterMock, userAdapter: userAdapterMock }));
// 			});

// 			expect(mockNavigation).toBeCalledWith('/home', { replace: true });
// 		});
// 	});

// 	// it('Should login', () => {
// 	// 	vi.spyOn(axiosHttp, 'post');
// 	// 	const { result } = renderHook(() => useLoginHelper({ axiosHttp }));

// 	// 	result.current.login();

// 	// 	expect(axiosHttp.post).toHaveBeenCalledWith('/login', {
// 	// 		clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
// 	// 		scope: 'user-read-private user-read-email',
// 	// 		redirectUri: 'http://localhost:1420/home',
// 	// 	});
// 	// });
// });