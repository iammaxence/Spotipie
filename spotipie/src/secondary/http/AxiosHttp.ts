import { AxiosInstance, AxiosResponse } from 'axios';
import { AxiosConfig, HttpPort } from '../../domain/HttpPort';



export class AxiosHttp implements HttpPort {
	constructor(private axiosInstance: AxiosInstance) {}

	async get<Result>(uri: string, config?: AxiosConfig): Promise<AxiosResponse<Result>> {
		return this.axiosInstance.get<Result>(uri, config);
	}

	async put<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>> {
		return this.axiosInstance.put<Result>(uri, data);
	}

	async post<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>> {
		return this.axiosInstance.post<Result>(uri, data);
	}

	async delete<Result>(uri: string): Promise<AxiosResponse<Result>> {
		return this.axiosInstance.delete<Result>(uri);
	}
}
