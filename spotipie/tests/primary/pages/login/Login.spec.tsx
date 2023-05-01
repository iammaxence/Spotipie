import { describe, expect, it, vi } from 'vitest';
import { AxiosHttpFixture } from '../../../config/AxiosHttpFixture';
import { useLoginHelper } from '../../../../src/primary/pages/Login/LoginHelper';
import { renderHook } from '@testing-library/react';

vi.mock('../../src/config/AxiosHttp'); 
const axiosHttp = AxiosHttpFixture({
	post: vi.fn(() => Promise.resolve({
		data:'fake_url',
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
	})) as any,
});


describe('useLoginHelper', () => {

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('Should login', () => {
		const replaceMock = vi.fn();
		if (window.location) {
			window.location.href = 'http://localhost:1420/login';
			window.location.replace = replaceMock;
		}
		vi.spyOn(window.location, 'replace').mockImplementation(replaceMock);
		const { result } = renderHook(() => useLoginHelper({ axiosHttp }));

		result.current.login();

		expect(replaceMock).toHaveBeenCalledWith([['fake_url']]);
	});
});