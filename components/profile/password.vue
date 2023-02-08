<template>
    <div>
        <div v-if="loading" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <div v-if="message" :class="messageclass" role="alert">
            <div class="text-muted" v-html="message"></div>
        </div>

        <form-generator :nmodel="nmodel" :list="form" :btnClass="btnClass" :btnText="'Reset Password'" :errors="errors" @submit="handleSubmit" />
    </div>
</template>

<script>
export default {
    data(){
        return {
            btnClass:'btn btn-primary',
            loading:false,
            message:"",
            messageclass:'',
            errors:{
                old_password:'',
                password:'',
                password_confirmation:''
            },
            nmodel:{
                old_password:'',
                password:'',
                password_confirmation:''
            },
            form:[
                {
                    type:"password",
                    name:"old_password",
                    model:"old_password",
                    label:"Current Password",
                    placeholder:"Please Input Current Password",
                    required:true,
                    show_forgot:'N',
                    value:''
                },
                {
                    type:"password",
                    name:"password",
                    model:"password",
                    label:"New Password",
                    placeholder:"Please Input New Password",
                    required:true,
                    show_forgot:'N',
                    value:''
                },
                {
                    type:"password",
                    name:"password_confirmation",
                    model:"password_confirmation",
                    label:"Password Confirmation",
                    placeholder:"Please Input Password Confirmation",
                    required:true,
                    show_forgot:'N',
                    value:''
                },
            ]
        }
    },
    methods:{
        resetModel(){
            this.nmodel = {
                old_password:'',
                password:'',
                password_confirmation:''
            }
        },

        handleSubmit(val){
            this.loading = true
            this.nmodel = val

            this.$axios.post('/auth/update-password', this.nmodel)
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

                        this.resetModel()
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'

                        this.$toast.error(resp.data.message,{ 
                            position: "top-right", 
                            duration : 2000
                        })
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
                
        },
    }
}
</script>