<template>
    <div class="container alert">
        <message :finish="isFinish" :success="success" :message="message" />
        
        <p v-if="isFinish > 1">Please wait while we're logging you in...</p>
    </div>
</template>

<script>
export default {
    layout:'default',
    data(){
        return {
            token: this.$route.query.token ? this.$route.query.token : null,
            isFinish:0,
            success:false,
            errors:{},
            state:[],
            loading: false,
            messageclass: "",
            message: "",
        }
    },
    mounted() {
        this.cekResponseOauth()
        this.getProfileGoogle();
    },
    methods:{
        cekResponseOauth(){
            let error = this.$route.query.error ? this.$route.query.error : null

            if(error)
            {
                this.isFinish = 2
                this.success = false
                this.messageclass = "alert alert-danger";
                this.message = error
            }
        },

        async getProfileGoogle(){
            if(this.token){
                this.loading = true
                this.isFinish = 1

                try {
                    await this.$auth.loginWith('laravelJWT', {
                        data: {
                            username: this.token,
                            password: 'fromgoogle',
                            level: 'Student',
                            source: 'social'
                        }
                    }).then(response => {
                        this.loading = false
                        this.isFinish = 2

                        if(response.data.success == true)
                        {
                            this.message = response.data.message
                            this.success = true
                            this.$router.replace("/home");
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
}
</script>