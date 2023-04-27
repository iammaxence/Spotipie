import { AxiosResponse } from "axios";

export interface HttpPort {
  get<Result>(uri: string): Promise<AxiosResponse<Result>>;
  put<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>>;
  post<Result, Payload = never>(uri: string, data?: Payload): Promise<AxiosResponse<Result>>;
  delete<Result>(uri: string): Promise<AxiosResponse<Result>>;
}