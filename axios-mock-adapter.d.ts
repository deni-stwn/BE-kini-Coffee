declare module 'axios-mock-adapter' {
  import { AxiosInstance } from 'axios';

  export default class AxiosMockAdapter {
    constructor(axiosInstance: AxiosInstance);

    public onAny(url?: any, data?: any, headers?: any): AxiosMockAdapter;
    public onGet(url: string, headers?: any): AxiosMockAdapter;
    public onPost(url: string, data?: any, headers?: any): AxiosMockAdapter;
    public onPut(url: string, data?: any, headers?: any): AxiosMockAdapter;
    public onDelete(url: string, headers?: any): AxiosMockAdapter;
    public onHead(url: string, headers?: any): AxiosMockAdapter;
    public onPatch(url: string, data?: any, headers?: any): AxiosMockAdapter;
    public reset(): void;
    public reply(
      statusCode: number,
      data?: any,
      headers?: any,
    ): AxiosMockAdapter;
    public replyOnce(
      statusCode: number,
      data?: any,
      headers?: any,
    ): AxiosMockAdapter;
    public networkError(): AxiosMockAdapter;
    public timeout(): AxiosMockAdapter;
    public passthrough(): AxiosMockAdapter;
  }
}
