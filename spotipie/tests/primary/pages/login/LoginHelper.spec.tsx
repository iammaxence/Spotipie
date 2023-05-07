/* eslint-disable no-global-assign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, it, vi } from 'vitest';
import { AxiosHttpFixture } from '../../../config/AxiosHttpFixture';
import { useLoginHelper } from '../../../../src/primary/pages/login/LoginHelper';
import { renderHook } from '@testing-library/react';

vi.mock('../../src/config/AxiosHttp'); 
const axiosHttp = AxiosHttpFixture({
	post: vi.fn().mockResolvedValueOnce({
		data: { data: 'fake_url' },
		status: 200,
		statusText: '',
		headers: {},
		config: {},
	}) as any,
});


describe('useLoginHelper', () => {

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('Should login', () => {
		vi.spyOn(axiosHttp, 'post');
		const { result } = renderHook(() => useLoginHelper({ axiosHttp }));

		result.current.login();

		expect(axiosHttp.post).toHaveBeenCalledWith('/login', {
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			scope: 'user-read-private user-read-email',
			redirectUri: 'http://localhost:1420/home',
		});
	});
});