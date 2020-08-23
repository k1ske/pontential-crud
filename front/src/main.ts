import Vue               from 'vue';
import App               from './App.vue';
import router            from './router';
import Vuetify           from './plugins/Vuetify';
import Axios             from './plugins/Axios';
import LoaderInterceptor from './plugins/LoaderInterceptor';
import store             from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

Vue.use(Axios, {
    baseURL: process.env.VUE_APP_API_URL
});

new Vue({
    router,
    store,
    vuetify: Vuetify,
    render : h => h(App),
    
    beforeMount() {
        Vue.use(LoaderInterceptor, this, store);
    }
}).$mount('#app');
