<template>
    <div>
        <div v-if="loading" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <div v-if="message" :class="messageclass" role="alert">
            <div class="text-muted" v-html="message"></div>
        </div>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="" class="form-label"><strong>Email</strong></label>
                <input type="text" class="form-control" :value="$auth.user.data.email" readonly>
            </div>

            <div class="form-group">
                <label for="" class="form-label"><strong>Name</strong></label>
                <input type="text" class="form-control" v-model="state.nama">
            </div>

            <div class="form-group mt-2 mb-2" v-show="showPreview">
                <img v-if="state.type == 'image'" :src="state.file_preview" class="img-fluid" />
            </div>

            <div class="form-group">
                <label for="" class="form-label"><strong>Foto</strong></label>
                <input accept="image/*" type="file" class="form-control" name="file" id="file" ref="file" v-on:change="handleFileUpload"/>
            </div>

            <div class="form-action">
                <button :class="btnClass" type="submit">Update Profile</button>
            </div>
        </form>
    </div>
</template>

<script>
import UploadComponentVue from '../UploadComponent.vue'
export default {
    components:{
        UploadComponentVue
    },
    data(){
        return {
            btnClass:'btn btn-primary',
            loading:false,
            message:"",
            messageclass:'',
            errors:{
                nama:'',
                file:''
            },
            state:{
                nama: this.$auth.user.data.name,
                file:'',
                file_preview:'',
                type:''
            },
            showPreview:false
        }
    },
    mounted(){
        this.getProfile()
    },
    methods:{
        getProfile(){
            this.state = {
                nama: this.$auth.user.data.name,
                file:'',
                file_preview:this.$auth.user.data.profile_picture_url,
                type:''
            }

            if(this.$auth.user.data.profile_picture_url != "")
            {
                this.state.type = 'image'
                this.showPreview = true
            }else{
                this.showPreview = false
            }
        },
        resetModel(){
            this.nmodel = {
                nama:'',
                file:'',
                file_preview:'',
                type:''
            }
        },

        handleFileUpload(e){
            this.loadingimage = true
            this.file = e.target.files[0];

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }

            this.files = e.target.files[0];
            let formData = new FormData();
            formData.append('file', this.files);

            this.$axios.post('/auth/uploads', formData, config)
                .then(response => {
                    this.loadingimage = false

                    if(response.data.success == true)
                    {
                        this.showPreview = true 
                        this.state.file = response.data.data.path
                        this.state.file_preview = response.data.data.path
                        this.state.type = response.data.data.type
                    }else{
                        this.$swal('Errors', response.data.message, 'error')
                    }
                })
        },

        handleSubmit(){
            this.loading = true

            this.$axios.post('/auth/update-info', this.state)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.$auth.fetchUser()
                        this.resetModel()
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'
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