<template>
    <v-overlay v-if="isLoading">
        <div class="text-center">
            <v-progress-circular
                    indeterminate
                    color="primary"
            ></v-progress-circular>
        </div>
    </v-overlay>
</template>

<script>
    import {Component}  from "vue-property-decorator";
    import Vue          from "vue";
    import {mapGetters} from "vuex";
    
    @Component({
        computed: {
            ...mapGetters({
                isLoading: 'isLoading'
            })
        }
    })
    export default class Loader extends Vue {
    }
</script>
