<template>
    <div>
        <form action="#" @submit.prevent="update">
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
                type_file:''
            },
            file:{},
            selected_image:'N',
            renderUpload:false
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
                        type_file:''
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

        update(){
            this.$axios.patch('/auth/webcv/'+this.list.id, this.state)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.getData()
                        this.$emit('suksesUpdateCustomize')
                    }
                })
        }
    }
}
</script>