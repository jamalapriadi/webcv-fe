<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl">
                <ul class="steps steps-green steps-counter my-4">
                    <li :class="classStep(0)">Detail Pribadi</li>
                    <li :class="classStep(1)">Pengalaman</li>
                    <li :class="classStep(2)">Template</li>
                </ul>

                <!-- <influxVue v-if="profile.person" :person="profile.person.data"></influxVue> -->

                <form @submit.prevent="save">

                    <div v-if="loading" class="mt-2 text-center">
                        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                    </div>

                    <div v-if="message" :class="messageclass" role="alert">
                        <div class="text-muted" v-html="message"></div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="row" v-if="templates">
                                <div v-for="(l,idx) in templates.data" :key="idx" class="col-4">
                                    <!-- <div v-if="l.nama_template == 'Crisp'">
                                        <crispVue v-if="profile.person" :person="profile.person.data"></crispVue>
                                    </div> -->
                                    <img :src="l.preview_image" class="img-fluid" alt="">
                                    <label class="form-check mt-2">
                                        <input class="form-check-input" :checked="form.template_id == l.id" type="radio" name="radios" v-on:change="changeRadio($event, l.id)">
                                        <span class="form-check-label">{{ l.nama_template }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center text-muted mt-4" v-if="profile.person">
                        <button type="submit" class="btn btn-primary btn-lg">
                            Save & Download &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="text-center text-muted mt-3" v-if="profile.person">
                        <nuxt-link :to="'/cvbuilder/'+profile.person.data.id+'/riwayat'" class="text-link text-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M15 6l-6 6l6 6"></path>
                            </svg> &nbsp;
                            {{ $bahasa.showLabel({label:'Langkah Sebelumnya',negara:profile.person.data.cv_bahasa}) }}
                        </nuxt-link>
                    </div>
                </form>

                
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import oxfordVue from '~/components/webcv/cvtemplate/oxford.vue'
import crispVue from "~/components/webcv/cvtemplate/crisp.vue"
import nanicaVue from '~/components/webcv/cvtemplate/nanica.vue'
import influxVue from '~/components/webcv/cvtemplate/influx.vue'

export default{
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
        await store.dispatch('person/get_template')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "edit_cvbuilder")
            {
                return true
            }
        }

        return false
    },
    components:{
        oxfordVue,
        crispVue,
        nanicaVue,
        influxVue
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
            form:{
                kode:'',
                template_id:''
            }
        }
    },
    mounted(){
        this.setData()
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

        setData(){
            if(this.profile)
            {
                if(this.profile.person)
                {
                    if(this.profile.person.data)
                    {
                        this.form = {
                            kode: this.profile.person.data.id,
                            template_id:this.profile.person.data.cv_template_id,
                        }
                    }
                }
            }
        },

        changeRadio(e, id){
            this.form.template_id = id
        },

        save(){
            if(this.form.kode == "")
            {
                this.$swal('Info', 'Kode harus diisi' , 'warning');
                return false
            }

            if(this.form.template_id == "")
            {
                this.$swal('Info', 'Silahkan pilih template terlebih dahulu' , 'warning');
                return false
            }

            this.loading = true 

            this.$axios.patch('/auth/cv/person/'+this.form.kode, this.form)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.$toast.success(resp.data.message,{ 
                            className: ['toasting'], 
                            position: "top-right", 
                            duration : 2000
                        })

                        this.$router.replace("/cvbuilder/"+this.form.kode+'/preview');
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'

                        this.$toast.error(resp.data.message,{ 
                            position: "top-right", 
                            duration : 2000
                        })
                    }
                }).catch(error => {
                    if (error.response.status == 422) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        this.$swal('422', this.message, 'Danger')
                    }

                    if (error.response.status == 500) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        this.$swal('500', this.message, 'Danger')
                    }
                })
        }
    }
}
</script>