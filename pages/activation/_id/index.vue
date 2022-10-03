<template>
    <div>
        <div class="card card-md">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Verifikasi Account</h2>
                
                <message :finish="isFinish" :success="success" :message="message" />

            </div>
        </div>

        <div class="text-center text-muted mt-3">
            Already have account? 
            <nuxt-link to="/login">Sign in</nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    layout:'default',
    auth:false,
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
            
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('registrasi',['verifikasi']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.verifikasi(id)
                .then(()=>{
                    if(this.success == true){

                        this.$swal('Success', 'Verifikasi account berhasil' , 'info');

                        this.$router.replace("/login");
                    }
                    
                })
        }
    }
}
</script>