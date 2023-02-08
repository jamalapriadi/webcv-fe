<template>
    <div>
        <form action="#" @submit.prevent="update">
            <div v-if="loading" class="mt-2 text-center">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>

            <div v-if="message" :class="messageclass" role="alert">
                <div class="text-muted" v-html="message"></div>
            </div>
            
            <div class="form-group">
                <label for="" class="form-label">Title</label>
                <input type="text" v-model="state.title" class="form-control" placeholder="Title">
            </div>

            <div class="form-group">
                <label for="" class="form-label">Tagline</label>
                <input type="text" v-model="state.tagline" class="form-control" placeholder="Tagline">
            </div>

            <div class="form-group">
                <label for="" class="form-label">Description</label>
                <textarea name="desc" id="desc" v-model="state.desc" cols="30" rows="5" class="form-control" placeholder="Description"></textarea>
            </div>

            <div class="form-group">
                <label class="form-check">
                    <input class="form-check-input" type="checkbox" @click="changeCheck($event)" :checked="state.ijinkan == 'Y' ?  true : false">
                    <span class="form-check-label">Ijinkan orang men-download CV Saya</span>
                </label>
            </div>

            <div class="form-group">
                <label for="" class="form-label">Logo</label>
                <div v-if="selected_image =='Y'" class="mb-2">
                    <img :src="state.file_url" alt="">
                </div>
                <InputDropzoneDefaultVue v-if="renderUpload" @suksesUploadDropzone="handleSuksesUploadDropzone"></InputDropzoneDefaultVue>
            </div>

            <div class="card-footer text-end">
                <div class="d-flex">
                    <button type="submit" class="btn btn-primary ms-auto">Update</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import InputDropzoneDefaultVue from '~/components/input/InputDropzoneDefault.vue'
export default{
    props:['list'],
    components:{
        InputDropzoneDefaultVue
    },
    data(){
        return {
            state:{
                title:this.list.title,
                tagline:this.list.tagline,
                desc:this.list.description,
                file:'',
                file_url:'',
                type_file:'',
                ijinkan:'Y'
            },
            file:{},
            selected_image:'N',
            renderUpload:false,
            loading:false,
            message:'',
            messageclass:''
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        handleSuksesUploadDropzone(l){
            this.file = l 
            this.selected_image = 'Y'

            this.state.file = l.path
            this.state.file_url = l.path
            this.state.type_file = l.type

            this.renderUpload = false

            this.$nextTick(() => {
                this.renderUpload = true
            });
        },

        getData(){
            this.$axios.get('/auth/webcv/'+this.list.id)
                .then(resp => {
                    
                    this.state = {
                        title: resp.data.data.title,
                        tagline: resp.data.data.tagline,
                        desc: resp.data.data.description,
                        file:'',
                        file_url:'',
                        type_file:'',
                        ijinkan:resp.data.data.ijin_download_cv
                    }

                    if(resp.data.data.logo)
                    {
                        this.selected_image = 'Y'
                        this.state.file_url = resp.data.data.logo
                    }

                    this.renderUpload = false

                    this.$nextTick(() => {
                        this.renderUpload = true
                    });
                })
        },

        changeCheck(e){
            if(e.target.checked == true)
            {
                this.state.ijinkan = 'Y'
            }else{
                this.state.ijinkan = 'N'
            }
        },

        update(){
            this.$axios.patch('/auth/webcv/'+this.list.id, this.state)
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

                        this.getData()
                        this.$emit('suksesUpdateCustomize')
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
        }
    }
}
</script>