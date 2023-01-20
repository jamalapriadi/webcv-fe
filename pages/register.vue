<template>
    <div>
        <h2 class="h3 text-center mb-3">Create new account</h2>
                
        <message :finish="isFinish" :success="success" :message="message" />

        <form-generator :nmodel="nmodel" :list="formregister" :btnClass="btnClass" :btnText="'Daftar'" :errors="errors" @submit="handleSubmit" />

        <div class="hr-text">or</div>

        <a href="#" class="btn btn-google w-100">
            <!-- Download SVG icon from http://tabler-icons.io/i/brand-github -->
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><desc>Download more icon variants from https://tabler-icons.io/i/brand-google</desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path></svg>
            Sign up with Google
        </a>

        <div class="text-center text-muted mt-3">
            Already have account? 
            <nuxt-link to="/login">Sign in</nuxt-link>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Message from '~/components/Message.vue'

export default {
    auth:false,
    layout:'auth',
    components: { Message },
    data(){
        return {
            btnClass:'btn btn-primary w-100',
            
        }
    },
    computed:{
        ...mapState('registrasi',{
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            errors: state=> state.errors,
            tunggu: state => state.tunggu,
            formregister: state => state.formregister,
            nmodel: state => state.nmodel,
        })
    },
    methods:{
        ...mapActions('registrasi',['register']),

        loginWithGoogle(){
            window.location.href = `${process.env.LARAVEL_ENDPOINT}/redirect/google?source=login`;
        },

        handleSubmit(val){
            this.register(val)
                .then(() => {
                    if(this.success == true){
                        this.$swal('Success', this.message , 'info');
                        this.$router.replace("/login");
                    }
                })
        }
    }
}
</script>