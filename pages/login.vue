<template>
    <div class="px-4 border-bottom">
        <div class="container container-tight py-4">
            <div class="block-title text-center">
                <h2>Login to your account</h2>
            </div>

            <message :finish="isFinish" :success="success" :message="message" />
            
            <form-generator :list="form" :btnText="'Sign in'" :btnClass="'btn btn-primary w-100'" @submit="handleSubmit" :errors="errors" />

            <div class="hr-text">or</div>

            <a href="#" class="btn btn-google w-100" @click.prevent="loginWithGoogle">
                <!-- Download SVG icon from http://tabler-icons.io/i/brand-github -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><desc>Download more icon variants from https://tabler-icons.io/i/brand-google</desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path></svg>
                Login with Google
            </a>

            <div class="text-center text-muted mt-3">
                Don't have account yet? 
                <nuxt-link to="/register">Sign up</nuxt-link>
            </div>
        </div>

    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    auth:false,
    layout:'default',
    head:{
        bodyAttrs:{
            class:'d-flex flex-column bg-white'
        }
    },
    computed:{
        ...mapState('registrasi',{
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            errors: state=> state.errors,
            tunggu: state => state.tunggu,
            form: state => state.form
        })
    },
    data(){
        return {
            
        }
    },
    methods:{
        ...mapActions('registrasi',['register','login']),
        
        onReset(){

        },
        handleInput(l,val){
            this.state[l] = val
        },

        loginWithGoogle(){
            window.location.href = `${process.env.LARAVEL_ENDPOINT}/redirect/google?source=login`;
        },

        async handleSubmit(val){
            this.$nuxt.$loading.start()

            this.login(val)
        }
    }
}
</script>