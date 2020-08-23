<template>
    <section>
        <DeveloperForm v-if="developerModal" @close="closeModal" :developer-id="developerEditId"/>
        
        <DevelopersList ref="developersList" @openModal="openModal"/>
    </section>
</template>

<script lang="ts">
    import Vue            from 'vue';
    import {Component}    from 'vue-property-decorator';
    import DevelopersList from '@/components/Developer/DevelopersList.vue';
    import DeveloperForm  from '@/components/Developer/DeveloperForm.vue';
    
    @Component({
        components: {
            DeveloperForm,
            DevelopersList
        }
    })
    export default class Developers extends Vue
    {
        public developerModal = false;
        public developerEditId: string | null = null;
        
        public openModal(id: string | null = null) {
            this.developerModal = true;
            this.developerEditId = id;
        }
        
        public closeModal(reset: boolean) {
            this.developerModal = false;
            
            if (reset) {
                (this.$refs.developersList as DevelopersList).$emit('resetList');
            }
        }
    }
</script>
