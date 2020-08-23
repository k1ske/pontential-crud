<template>
    <v-window>
        <ConfirmationDialog v-if="deleteDeveloper"
                            @cancel="deleteDeveloper = null"
                            @confirm="doDelete"
                            :text="deleteDeveloperText"/>
        <NotificationDialog v-if="notificationText" title="Feito!"
                            @confirm="notificationText = null"
                            :text="notificationText"/>
        <v-window-item>
            <v-row>
                <v-col>
                    <v-form>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="query"
                                              label="Filtrar por nome"/>
                            </v-col>
                            <v-col sm="2">
                                <v-text-field v-model="pagination.perPage"
                                              type="number"
                                              label="Itens/Página"/>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-col class="text-right">
                    <v-btn color="primary" @click="$emit('openModal');">
                        Novo developer
                    </v-btn>
                </v-col>
            </v-row>
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">id</th>
                        <th class="text-left main-col">Nome</th>
                        <th class="text-left">Hobby</th>
                        <th class="text-left">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="developer in developers" @click.prevent.stop="$emit('openModal', developer.id)"
                        :key="developer.id">
                        <td>{{ developer.id }}</td>
                        <td>{{ developer.nome }}</td>
                        <td>{{ developer.hobby }}</td>
                        <td>
                            <v-icon class="i-delete" @click.prevent.stop="deleteDeveloper = developer">mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-row>
                <v-col class="text-right">
                    <v-pagination
                            v-model="pagination.page"
                            :length="pagination.maxPages"
                            next-icon="mdi-chevron-right"
                            prev-icon="mdi-chevron-left"
                            :page="pagination.page"
                            :total-visible="7"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-window-item>
    </v-window>
</template>

<script lang="ts">
    import Vue                from 'vue';
    import {
        Component,
        Watch
    }                         from 'vue-property-decorator';
    import {AxiosResponse}    from 'axios';
    import Developer          from '@/models/Developer';
    import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
    import NotificationDialog from '@/components/NotificationDialog.vue';
    
    @Component({
        components: {NotificationDialog, ConfirmationDialog}
    })
    export default class DevelopersList extends Vue
    {
        public query = '';
        public querying = false;
        public pagination = {
            page    : 1,
            perPage : 20,
            maxPages: 0
        };
        public developers: Developer[] = [];
        public deleteDeveloper: Developer | null = null;
        public notificationText: string | null = null;
        private queryTask = 0;
        
        private beforeMount() {
            this.getDevelopers();
            
            this.$on('resetList', this.resetList);
        }
        
        @Watch('query')
        private setQueryTask() {
            clearTimeout(this.queryTask);
            
            this.queryTask = setTimeout(() => {
                this.pagination.page = 1;
                this.getDevelopers();
            }, 800);
        }
        
        @Watch('pagination.page')
        private pageChange() {
            this.getDevelopers();
        }
        
        @Watch('pagination.perPage')
        private maxPageChange() {
            this.getDevelopers();
        }
        
        get deleteDeveloperText(): string {
            return `Deseja deletar o developer <b>${this.deleteDeveloper?.nome}</b>?`;
        }
        
        public resetList() {
            this.query = '';
            this.pagination.page = 1;
            
            this.getDevelopers();
        }
        
        private async getDevelopers() {
            if (this.querying) {
                return;
            }
            
            this.querying = true;
            
            try {
                const response: AxiosResponse = await this.api.get('/developers', {
                    params: {
                        ...this.pagination,
                        query: this.query
                    }
                });
                
                this.developers = response.data?.data || response.data;
                this.pagination.maxPages = response.data?.maxPages || 1;
            } finally {
                this.querying = false;
            }
        }
        
        public async doDelete() {
            if (!this.deleteDeveloper) {
                return;
            }
            
            const developerId: string = this.deleteDeveloper.id;
            this.deleteDeveloper = null;
            
            const response: AxiosResponse = await this.api.delete(`/developers/${developerId}`);
            
            if (response.status === 204) {
                this.notificationText = "Developer deletado com sucesso.";
            }
            
            return this.getDevelopers();
        }
    }
</script>

<style scoped lang="scss">
    .main-col {
        max-width: 100%;
        width: 100%;
    }
    
    tbody {
        tr {
            white-space: nowrap;
            cursor: pointer;
        }
    }
    
    .i-delete:hover {
        cursor: pointer;
        color: #000;
    }
</style>
