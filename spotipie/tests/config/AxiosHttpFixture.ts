import { vi } from 'vitest';
import { AxiosHttp } from '../../src/config/axios/AxiosHttp';
import { AxiosInstance } from 'axios';
import { HttpPort } from '../../src/config/HttpPort';

export const AxiosHttpFixture = (options: Partial<HttpPort> = {}): HttpPort => {
	const axiosInstanceMock = {
		get: vi.fn(),
		put: vi.fn(),
		post: vi.fn(),
		delete: vi.fn(),
		...options
	} as unknown as AxiosInstance;
	return new AxiosHttp(axiosInstanceMock);
};