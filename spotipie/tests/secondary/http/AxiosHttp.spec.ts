import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { vi } from 'vitest';
import { HttpPort } from '../../../src/domain/HttpPort';
import { AxiosHttp } from '../../../src/secondary/http/AxiosHttp';

const mockAxiosInstance: any = {
	get: vi.fn(),
	put: vi.fn(),
	post: vi.fn(),
	delete: vi.fn(),
} as any;

const mockAxiosResponse: AxiosResponse<any> = {
	data: {},
	status: 200,
	statusText: 'OK',
	headers: {} ,
	config: {} as InternalAxiosRequestConfig,
};

let axiosHttp: HttpPort;

beforeEach(() => {
	axiosHttp = new AxiosHttp(mockAxiosInstance);
});

afterEach(() => {
	vi.clearAllMocks();
});

describe('AxiosHttp', () => {
	describe('get', () => {
		it('should call axiosInstance.get with the URI', async () => {
			const uri = 'https://example.com';
			mockAxiosInstance.get.mockResolvedValueOnce(mockAxiosResponse);
  
			await axiosHttp.get(uri);
  
			expect(mockAxiosInstance.get).toHaveBeenCalledWith(uri);
		});
  
		it('should return the AxiosResponse', async () => {
			const uri = 'https://example.com';
			mockAxiosInstance.get.mockResolvedValueOnce(mockAxiosResponse);
  
			const response = await axiosHttp.get(uri);
  
			expect(response).toEqual(mockAxiosResponse);
		});
	});
  
	describe('post', () => {
		it('should call axiosInstance.post with the URI and data', async () => {
			const uri = 'https://example.com';
			const data = { key: 'value' };
			mockAxiosInstance.post.mockResolvedValueOnce(mockAxiosResponse);
  
			await axiosHttp.post(uri, data);
  
			expect(mockAxiosInstance.post).toHaveBeenCalledWith(uri, data);
		});
  
		it('should return the AxiosResponse', async () => {
			const uri = 'https://example.com';
			const data = { key: 'value' };
			mockAxiosInstance.post.mockResolvedValueOnce(mockAxiosResponse);
  
			const response = await axiosHttp.post(uri, data);
  
			expect(response).toEqual(mockAxiosResponse);
		});
	});

	describe('delete', () => {
		it('should call axiosInstance.delete with the URI', async () => {
			const uri = 'https://example.com';
			mockAxiosInstance.delete.mockResolvedValueOnce(mockAxiosResponse);

			await axiosHttp.delete(uri);

			expect(mockAxiosInstance.delete).toHaveBeenCalledWith(uri);
		});
	});

	it('should call axiosInstance.put with the correct arguments and return the response', async () => {
		const uri = '/api/user/123';
		const payload = { name: 'John Doe' };
		const expectedResult: AxiosResponse<any> = {
			data: { id: '123', name: 'John Doe' },
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {} as InternalAxiosRequestConfig,
		};
		const putSpy = vi.spyOn(mockAxiosInstance, 'put').mockResolvedValueOnce(expectedResult);

		const result = await axiosHttp.put<any, typeof payload>(uri, payload);

		expect(putSpy).toHaveBeenCalledWith(uri, payload);
		expect(result).toEqual(expectedResult);
	});
});