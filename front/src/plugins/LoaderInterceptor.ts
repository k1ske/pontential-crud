import {default as _Vue} from 'vue';
import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse
}                        from 'axios';

export default {
    install: function (Vue: any, root: _Vue & any) {
        Vue.api.interceptors.request.use((config: AxiosRequestConfig) => {
            if (config?.url) {
                root.$store.commit('setLoading');
            }
            
            return config;
        }, (error: AxiosError) => {
            if (error.config?.url) {
                root.$store.commit('unsetLoading');
            }
            
            return Promise.reject(error);
        });
        
        Vue.api.interceptors.response.use((response: AxiosResponse) => {
            if (response.config?.url) {
                root.$store.commit('unsetLoading');
            }
            
            return response;
        }, (error: AxiosError) => {
            if (error.config?.url) {
                root.$store.commit('unsetLoading');
            }
            
            return Promise.reject(error);
        });
    }
};
