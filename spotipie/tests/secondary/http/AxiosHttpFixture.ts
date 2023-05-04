import { vi } from 'vitest';
import { AxiosHttp } from '../../../src/secondary/http/AxiosHttp';
import { AxiosInstance } from 'axios';
import { HttpPort } from '../../../src/domain/HttpPort';

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