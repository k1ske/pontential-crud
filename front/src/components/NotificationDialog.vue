<template>
    <v-overlay>
        <div class="text-center">
            <v-dialog
                    :value="true"
                    width="360"
            >
                <v-card>
                    <v-card-title class="headline grey lighten-2" v-html="title">
                    </v-card-title>
                    
                    <v-card-text>
                        <div class="card-text" v-html="text"></div>
                    </v-card-text>
                    
                    <v-divider></v-divider>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#0a0"
                               text
                               @click="$emit('confirm')">
                            Confirmar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-overlay>
</template>

<script lang="ts">
    import Vue from "vue";
    import {
        Component,
        Prop
    }          from "vue-property-decorator";
    
    @Component
    export default class ConfirmationDialog extends Vue
    {
        @Prop({required: true})
        public title!: string;
        
        @Prop({required: true})
        public text!: string;
    }
</script>

<style scoped lang="scss">
    .card-text {
        margin-top: 15px;
    }
</style>
