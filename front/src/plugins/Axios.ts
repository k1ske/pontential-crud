import {default as _Vue} from 'vue';
import axios, {
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosRequestConfig,
    AxiosResponse
}                        from 'axios';

export default {
    install: function (Vue: _Vue & any, options: AxiosRequestConfig) {
        const api = new Api(options);
        Vue.api = api;
        Vue.prototype.api = api;
    }
};

class Api implements Partial<AxiosInstance>
{
    private axiosInstance: AxiosInstance;
    public defaults: AxiosRequestConfig;
    public interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    
    constructor(config: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config);
        this.interceptors = this.axiosInstance.interceptors;
        this.defaults = this.axiosInstance.defaults;
    }
    
    public refreshInstance(config: AxiosRequestConfig) {
        this.axiosInstance = axios.create(config);
    }
    
    public delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.delete<T, R>(url, config);
    }
    
    public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.get<T, R>(url, config);
    }
    
    public getUri(config?: AxiosRequestConfig): string {
        return this.axiosInstance.getUri(config);
    }
    
    public head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.head<T, R>(url, config);
    }
    
    public options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.options<T, R>(url, config);
    }
    
    public patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.patch<T, R>(url, data, config);
    }
    
    public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.post<T, R>(url, data, config);
    }
    
    public put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.put<T, R>(url, data, config);
    }
    
    public request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.axiosInstance.request<T, R>(config);
    }
}

declare module 'vue/types/vue'
{
    interface Vue
    {
        api: Api;
    }
    
    interface VueConstructor
    {
        api: Api;
    }
}
