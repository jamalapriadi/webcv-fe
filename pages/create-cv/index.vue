<template>
    <div>
        <div class="container">
            <h1>Create CV</h1>
            
            <ul class="steps steps-green steps-counter my-4">
                <li :class="classStep(1)">{{ $bahasa.showLabel({label:'Detail Pribadi',negara:form.bahasa}) }}</li>
                <li :class="classStep(2)">{{ $bahasa.showLabel({label:'Detail Pengalaman',negara:form.bahasa}) }}</li>
                <li :class="classStep(3)">Template</li>
            </ul>

            

            <create_cv_step_1Vue v-if="current_step == 1" 
                :list="form" 
                :struktur_fields="struktur_fields" 
                :negara="negara"
                @change_stuktur_field="handleChangeStrukturField"></create_cv_step_1Vue>

            <create_cv_step_2Vue v-if="current_step == 2" 
                :list="form" 
                :struktur_fields="struktur_fields" 
                :negara="negara"
                @change_stuktur_field="handleChangeStrukturField"
                ></create_cv_step_2Vue>

            <create_cv_step_3Vue v-if="current_step == 3"></create_cv_step_3Vue>
            

            <div class="mb-10"></div>
            <hr>

        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import create_cv_step_1Vue from '~/components/webcv/cv/create_cv_step_1.vue'
import create_cv_step_2Vue from '~/components/webcv/cv/create_cv_step_2.vue'
import create_cv_step_3Vue from '~/components/webcv/cv/create_cv_step_3.vue'

export default{
    auth:false,
    layout:'default',
    components:{
        create_cv_step_1Vue,
        create_cv_step_2Vue,
        create_cv_step_3Vue
    },
    async fetch({store, params}){
        await store.dispatch('createcv/get_negara')
        await store.dispatch('createcv/get_sosmed')
        await store.dispatch('createcv/get_template')
    },
    computed:{
        ...mapState('createcv',{
            current_step: state=> state.current_step,
            form: state => state.form,
            struktur_fields: state => state.struktur_fields,
            negara: state => state.negara,
            template: state => state.template
        })
    },
    methods:{
        ...mapActions('createcv',['change_current_state','change_struktur_field']),

        classStep(id){
            var asli = 'step-item'

            if(this.current_step == id)
            {
                asli = 'step-item active'
            }

            return asli
        },

        next(val)
        {
            this.change_current_state(val)
        },

        previous(val){
            this.change_current_state(val)
        },

        handleChangeStrukturField(data){
            this.change_struktur_field(data)
        }
    }
}
</script>