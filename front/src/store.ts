import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state    : {
        loading: 0
    },
    getters  : {
        isLoading(state) {
            return !!state.loading;
        }
    },
    mutations: {
        setLoading(state) {
            state.loading++;
        },
        unsetLoading(state) {
            state.loading = Math.max(0, state.loading - 1);
        }
    },
    actions  : {}
});

