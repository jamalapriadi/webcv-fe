<template>
    <div>
        <h2 class="h3 text-center mb-3">
            Login to your account
        </h2>

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
</template>

<script>

export default {
    auth:false,
    layout:'auth',
    head:{
        bodyAttrs:{
            class:'d-flex flex-column bg-white'
        }
    },
    data(){
        return {
            isFinish:0,
            success:false,
            errors:{},
            state:[],
            loading: false,
            messageclass: "",
            message: "",
            form:[
                {
                    label:"Email",
                    model: 'username',
                    name:'username',
                    id:'input-username',
                    type:'text',
                    placeholder:'Email',
                    required:true,
                    kelas:'username-email'
                },
                {
                    label:"Password",
                    model: 'password',
                    name:'password',
                    id:'input-password',
                    type:'password',
                    placeholder:'Password',
                    required:true,
                    show_forgot:'Y',
                    kelas:'username-email',
                }
            ]
        }
    },
    methods:{
        
        onReset(){

        },
        handleInput(l,val){
            this.state[l] = val
        },

        loginWithGoogle(){
            window.location.href = `${process.env.LARAVEL_ENDPOINT}/redirect/google?source=login`;
        },

        async handleSubmit(val){
            this.loading = true
            this.isFinish = 1
            this.$nuxt.$loading.start()

            try {
                await this.$auth.loginWith('laravelJWT', {
                    data: {
                        username: val.username,
                        password: val.password,
                        level: 'Customer',
                        source: 'login'
                    }
                }).then(response => {
                    this.loading = false
                    this.isFinish = 2

                    if(response.data.success == true)
                    {
                        this.message = response.data.message
                        this.success = true
                        this.$router.replace("/dashboard");
                    }else{
                        this.success = false
                        this.messageclass = "alert alert-danger";
                        this.message = response.data.message
                    }
                })
            } catch (e) {
                if(e.response.status == 401)
                {
                    this.isFinish = 2
                    this.loading = false;
                    this.success = false
                    this.message = e.response.data.message;
                    this.errors = e.response.data.errors;
                }

                if(e.response.status == 422)
                {
                    this.isFinish = 2
                    this.loading = false;
                    this.success = false
                    this.message = e.response.data.message;
                    this.errors = e.response.data.errors;
                }
            }
        }
    }
}
</script>