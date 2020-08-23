<template>
    <section>
        <v-overlay>
            <v-dialog :value="true"
                    width="60%">
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        {{ developer.id ? 'Editar' : 'Novo' }} developer
                    </v-card-title>
                    
                    <v-card-text>
                        <v-form v-if="developer"
                                v-model="valid"
                                lazy-validation>
                            <v-text-field v-model="developer.nome"
                                          :rules="[ruleRequired]"
                                          :error-messages="errors.nome"
                                          label="Name"
                                          required/>
                            
                            <v-text-field v-model="developer.hobby"
                                          :rules="[ruleRequired]"
                                          :error-messages="errors.hobby"
                                          label="Hobby"
                                          required/>
                            
                            <v-menu v-model="datepickerDialog"
                                    :close-on-content-click="false"
                                    max-width="290">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            :value="dateFormated"
                                            :error-messages="errors.datanascimento"
                                            clearable
                                            label="Data de nascimento"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            @click:clear="developer.datanascimento = null"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="developer.datanascimento"
                                        @change="datepickerDialog = false"
                                        :max="new Date().toISOString().replace(/T.*/, '')"
                                        type="date"
                                ></v-date-picker>
                            </v-menu>
                            
                            <v-text-field v-model="developer.idade"
                                          :rules="[ruleRequired]"
                                          :error-messages="errors.idade"
                                          label="Idade"
                                          readonly
                                          required/>
                            <v-row>
                                <v-col>
                                    <v-btn color="secondary"
                                           @click="close(false)">
                                        Cancelar
                                    </v-btn>
                                </v-col>
                                <v-col class="text-right">
                                    <v-btn color="primary"
                                           @click="salvar">
                                        {{ developer.id ? 'Atualizar' : 'Criar' }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-overlay>
    </section>
</template>

<script lang="ts">
    import Vue             from 'vue';
    import {
        Component,
        Prop,
        Watch
    }                      from 'vue-property-decorator';
    import {AxiosResponse} from 'axios';
    import Developer       from '@/models/Developer';
    import {InputErrors}   from '@/interfaces/InputErrors';
    
    @Component
    export default class Developers extends Vue
    {
        @Prop({
            default: null
        })
        private developerId!: string|null;
        
        public valid = false;
        public developer: Developer = {
            id            : '',
            nome          : '',
            hobby         : '',
            datanascimento: '',
            idade         : 0
        };
        public errors: {
            [key: string]: string[] | undefined;
        } = {
            nome          : undefined,
            hobby         : undefined,
            datanascimento: undefined,
            idade         : undefined
        };
        public datepickerDialog = false;
        
        private beforeMount() {
            this.getDeveloper();
        }
    
        @Watch('developer.datanascimento', {
            immediate: true
        })
        private calculateAge() {
            if (!this.developer?.datanascimento) {
                return;
            }
        
            const diff = ((new Date().getTime()) - this.getDate(this.developer?.datanascimento).getTime()) / 1000;
        
            this.developer.idade = Math.trunc(diff / (365 * 60 * 60 * 24));
        }
    
        get dateFormated() {
            if (!this.developer?.datanascimento) {
                return '';
            }
        
            const bornDate = this.getDate(this.developer?.datanascimento);
        
            return bornDate.toLocaleDateString();
        }
        
        public ruleRequired(value: string | null) {
            return !!value || 'Campo obrigatório';
        }
        
        private getDate(date: string) {
            const bornDateLocal = new Date(Date.parse(date));
            return new Date(bornDateLocal.getTime() + bornDateLocal.getTimezoneOffset() * 100000);
        }
        
        public async salvar() {
            try {
                if (this.developer.id) {
                    await this.api.put(`/developers/${this.developer.id}`, this.developer);
                } else {
                    delete this.developer.id;
                    await this.api.post('/developers', this.developer);
                }
                
                this.close(true);
            } catch (e) {
                this.setInputErrors(e.response.data.exceptionData);
            }
        }
    
        public close(update: boolean) {
            this.$emit('close', update);
        }
        
        private setInputErrors(fields: InputErrors) {
            for (const field of Object.keys(this.errors)) {
                this.errors[field] = undefined;
            }
            
            for (const field of Object.keys(fields.validationErrors)) {
                this.errors[field] = fields.validationErrors[field];
            }
        }
        
        private async getDeveloper() {
            const developerId: string | null = this.developerId;
            if (!developerId) {
                return;
            }
            
            const response: AxiosResponse = await this.api.get(`/developers/${developerId}`);
            
            this.developer = response.data;
        }
    }
</script>

<style scoped lang="scss">
    .main-col {
        max-width: 100%;
        width: 100%;
    }
    
    th, tr {
        white-space: nowrap;
    }
</style>
