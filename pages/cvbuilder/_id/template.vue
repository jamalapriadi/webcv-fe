<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl">
                <ul class="steps steps-green steps-counter my-4">
                    <li :class="classStep(0)">Detail Pribadi</li>
                    <li :class="classStep(1)">Pengalaman</li>
                    <li :class="classStep(2)">Template</li>
                </ul>

                <!-- <pre>{{ templates }}</pre> -->

                <div class="card">
                    <div class="card-body">
                        <div class="row" v-if="templates">
                            <div v-for="(l,idx) in templates.data" :key="idx" class="col-4">
                                <img :src="l.preview_image" class="img-fluid" alt="">
                                <div class="form-group text-center">
                                    <input type="checkbox">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default{
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
        await store.dispatch('person/get_template')
    },
    computed:{
        ...mapState('person',{
            loading: state => state.loading,
            profile: state => state.profile,
            message: state => state.message,
            messageclass: state => state.messageclass,
            templates: state =>state.templates
        })
    },
    data(){
        return {
            current_step:2,
        }
    },
    methods:{
        classStep(id){
            var asli = 'step-item'

            if(this.current_step == id)
            {
                asli = 'step-item active'
            }

            return asli
        },
    }
}
</script>