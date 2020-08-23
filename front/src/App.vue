<template>
    <v-app>
        <Loader/>
        <v-app-bar app
                   color="primary"
                   dark>
            <v-spacer/>
            <span class="mr-2">Developers Test</span>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import Vue         from 'vue';
    import {Component} from 'vue-property-decorator';
    import Loader      from '@/components/Loader.vue';
    @Component({
        components: {Loader}
    })
    export default class App extends Vue
    {
    }
</script>
