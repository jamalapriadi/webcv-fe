<template>
    <div>
        <h2 class="h3 text-center mb-3">Forgot password</h2>
        <p class="text-muted mb-4">Enter your email address and your password will be reset and emailed to you.</p>
        
        <message :finish="isFinish" :success="success" :message="message" />

        <form-generator :list="form" :nmodel="nmodel" :btnClass="btnClass" :btnText="'Send me new password'" :errors="errors" @submit="handleSubmit" />
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
        ...mapState('forgot',{
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            errors: state=> state.errors,
            form: state => state.form,
            nmodel: state => state.nmodel
        })
    },
    methods:{
        ...mapActions('forgot',['sendemail']),

        handleSubmit(val){
            this.sendemail(val)
                .then(() => {
                    if(this.success == true){
                        this.$swal('Success', this.message , 'info');
                        this.$router.replace("/login");
                    }
                })
        },
    }
}
</script>