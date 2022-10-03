<template>
    <div>
        <h2 class="card-title text-center mb-4">Recovery Password</h2>
        <!-- <p class="text-muted mb-4">Enter your email address and your password will be reset and emailed to you.</p> -->            
        <div v-if="isFinish == 1" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <div v-if="pesan" class="alert alert-danger" role="alert">
            <div class="text-muted" v-html="pesan"></div>
        </div>

        <form-generator :list="form" :nmodel="nmodel" :btnClass="btnClass" :btnText="'Reset Password'" :errors="errors" @submit="handleSubmit" />

        <div class="text-center text-muted mt-3">
            Already have account? 
            <nuxt-link to="/login">Sign in</nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    auth:false,
    layout:'auth',
    computed:{
        ...mapState('registrasi',{
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
        })
    },
    data(){
        return {
            btnClass:'btn btn-primary w-100',
            componentKey: 0,
            kode:'',
            nmodel:{
                password:'',
                password_confirmation:''
            },
            pesan:'',
            form:[
                {
                    label:"Password",
                    model: 'password',
                    name:'password',
                    id:'input-password',
                    type:'password',
                    placeholder:'Password',
                    required:true,
                    kelas:'username-email'
                },
                {
                    label:"Password Confirmation",
                    model: 'password_confirmation',
                    name:'password_confirmation',
                    id:'input-password_confirmation',
                    type:'password',
                    placeholder:'Password Confirmation',
                    required:true,
                    kelas:'username-email'
                }
            ]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('registrasi',['recovery','verifikasi','cekToken']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.cekToken(this.kode)
                .then(() => {
                    if(this.success == true)
                    {

                    }else{
                        this.$swal('Warning', this.message , 'warning');

                        this.$router.replace("/login");
                    }
                })
        },

        handleSubmit(val){
            this.recovery({
                kode: this.kode,
                password: val.password, 
                password_confirmation: val.password_confirmation
            })
                .then(()=>{
                    if(this.success == true){
                        this.$swal('Success', this.message , 'info');

                        this.$router.replace("/login");
                        
                    }else{
                        this.pesan = this.message
                    }
                    
                })
        },

        resetForm(){
            for(var a=0;a<this.form.length; a++){
                this.form[a].model = ""
            }

            this.componentKey += 1;
        }
    }
}
</script>