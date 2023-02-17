<template>
    <div>
        <form action="#" @submit.prevent="simpan">
            <div class="card">
                <div class="card-body">
                    <div class="row" v-if="template">
                        <div v-for="(l,idx) in template.data" :key="idx" class="col-4">
                            <div v-if="l.nama_template == 'Crisp'">
                                <crisp_smallVue v-if="form" :person="form"></crisp_smallVue>
                            </div>
                            <div v-else-if="l.nama_template == 'Influx'">
                                <influxVue v-if="form" :person="form"></influxVue>
                            </div>
                            <div v-else-if="l.nama_template == 'Nanica'">
                                <nanicaVue v-if="form" :person="form"></nanicaVue>
                            </div>
                            <div v-else>
                                <img :src="l.preview_image" class="img-fluid" alt="">
                            </div>
                            <label class="form-check mt-2">
                                <input class="form-check-input" :checked="form.template_id == l.id" type="radio" name="radios" v-on:change="changeRadio($event, l.id)">
                                <span class="form-check-label">{{ l.nama_template }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="mt-2 text-center">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>

            <div class="mt-2">
                <div v-if="message" :class="messageclass" role="alert">
                    <div class="text-muted" v-html="message"></div>
                </div>
            </div>

            <div class="text-center text-muted mt-3">
                <button type="submit" href="#" class="btn btn-primary btn-lg">
                    Save & Download &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                </button>
            </div>

            <div class="text-center text-muted mt-4" v-if="current_step > 1">

                <a href="#" @click.prevent="next(current_step-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M15 6l-6 6l6 6"></path>
                    </svg> &nbsp;
                    {{ $bahasa.showLabel({label:'Langkah Sebelumnya',negara:form.bahasa}) }}
                </a>
            </div>

        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import crispVue from "~/components/webcv/cvtemplate/crisp.vue"
import nanicaVue from '~/components/webcv/cvtemplate/nanica_small_temp.vue'
import influxVue from '~/components/webcv/cvtemplate/influx_small_temp.vue'

import crisp_smallVue from '~/components/webcv/cvtemplate/crisp_small_temp.vue'

export default{
    components:{
        crispVue,
        nanicaVue,
        influxVue,
        crisp_smallVue
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
    data(){
        return {
            loading:false,
            message:'',
            messageclass:'',
            errors:[],
        }
    },
    mounted(){
        this.setOthersField()
    },
    methods:{
        ...mapActions('createcv',['change_current_state','change_struktur_field','add_pengalaman','edit_pengalaman','delete_pengalaman','change_default_template','reset_ulang']),

        setOthersField(){
            this.others_struktur_fields = []
            if(this.form.struktur_fields)
            {
                for(var a=0;a<this.form.struktur_fields.length;a++)
                {
                    if(this.form.struktur_fields[a].show == 'N')
                    {
                        this.others_struktur_fields.push(this.form.struktur_fields[a])
                    }
                }
            }
        },

        showStrukturFile(nama){
            if(this.form.struktur_fields)
            {
                for(var a=0;a<this.form.struktur_fields.length;a++)
                {
                    if(this.form.struktur_fields[a].name == nama)
                    {
                        if(this.form.struktur_fields[a].show == 'Y')
                        {
                            return true
                        }else{
                            return false
                        }
                        
                    }
                }
            }

            return false
        },

        changeRadio(e, id){
            this.change_default_template(id)
        },

        next(val)
        {
            this.change_current_state(val)
        },

        simpan(){
            this.loading = true 

            this.$axios.post('/validate-step-3', this.form)
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

                        this.reset_ulang()

                        this.$router.replace("/create-cv/"+resp.data.profile_id+'/preview');
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'

                        this.$toast.error(resp.data.message,{ 
                            position: "top-right", 
                            duration : 2000
                        })

                        this.$swal('422', resp.data.message, 'Danger')
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