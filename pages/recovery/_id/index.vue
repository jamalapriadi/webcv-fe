<template>
    <div class="px-4 border-bottom">
        <div class="container container-tight py-4">
            <h2 class="card-title text-center mb-4">Recovery Password</h2>
            <!-- <p class="text-muted mb-4">Enter your email address and your password will be reset and emailed to you.</p> -->            
            <message :finish="isFinish" :success="success" :message="message" />

            <form-generator :list="form" :nmodel="nmodel" :btnClass="btnClass" :btnText="'Reset Password'" :errors="errors" @submit="handleSubmit" />

            <div class="text-center text-muted mt-3">
                Already have account? 
                <nuxt-link to="/login">Sign in</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Message from '~/components/Message.vue'

export default {
    auth:false,
    layout:'default',
    components: { Message },
    async fetch({store, params}){
        await store.dispatch('recoveryPassword/cekToken',{
            id: params.id
        })
    },
    computed:{
        ...mapState('recoveryPassword',{
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            form: state => state.form,
            nmodel: state => state.nmodel,
            kode: state => state.kode
        })
    },
    data(){
        return {
            btnClass:'btn btn-primary w-100',
        }
    },
    methods:{
        ...mapActions('recoveryPassword',['recovery','cekToken']),

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
                    }
                    
                })
        }
    }
}
</script>