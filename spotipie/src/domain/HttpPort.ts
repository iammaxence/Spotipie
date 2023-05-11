import { AxiosResponse } from 'axios';

export interface AxiosConfig {
	headers: {
		Authorization: string,
	}
}

export interface HttpPort {
  get<Result>(uri: string, config?: AxiosConfig): Promise<AxiosResponse<Result>>;
  put<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>>;
  post<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>>;
  delete<Result>(uri: string): Promise<AxiosResponse<Result>>;
}