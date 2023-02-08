<template>
    <div>
        <form action="#" @submit.prevent="simpan">
            <div class="card">
                <div class="card-body">
                    <div class="row" v-if="template">
                        <div v-for="(l,idx) in template.data" :key="idx" class="col-4">
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

export default{
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
        ...mapActions('createcv',['change_current_state','change_struktur_field','add_pengalaman','edit_pengalaman','delete_pengalaman','change_default_template']),

        setOthersField(){
            this.others_struktur_fields = []
            if(this.struktur_fields)
            {
                for(var a=0;a<this.struktur_fields.length;a++)
                {
                    if(this.struktur_fields[a].show == 'N')
                    {
                        this.others_struktur_fields.push(this.struktur_fields[a])
                    }
                }
            }
        },

        showStrukturFile(nama){
            if(this.struktur_fields)
            {
                for(var a=0;a<this.struktur_fields.length;a++)
                {
                    if(this.struktur_fields[a].name == nama)
                    {
                        if(this.struktur_fields[a].show == 'Y')
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