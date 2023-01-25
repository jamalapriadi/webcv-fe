<template>
    <div>
        <form @submit.prevent="simpan">
            <div class="form-group">
                <label for="" class="control-label">Title</label>
                <input type="text" v-model="state.title" class="form-control">
            </div>

            <div class="form-group">
                <label for="" class="control-label">Description</label>
                <textarea name="description" id="description" v-model="state.description" class="form-control"></textarea>
            </div>

            <div v-if="showPreview">
                <img :src="state.img" class="img-fluid">
            </div>

            <div class="form-group">
                <label for="" class="form-label">Image</label>
                <input accept="image/*" type="file" class="form-control" name="file" id="file" ref="file" v-on:change="handleFileUpload"/>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Show Preview</button>
            </div>
        </form>
    </div>
</template>

<script>
import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import UploadComponent from '~/components/UploadComponent.vue'
export default{
    props:['kode','title','description','img'],
    components:{
        centered_hero,
        UploadComponent
    },
    data(){
        return {
            state:{
                title:this.title,
                description:this.description,
                img:this.img
            },
            showPreview:this.img == '' ? false:true,
            loadingimage:false
        }
    },
    methods:{
        simpan(){
            this.$emit('simpan', this.state)
            this.resetData()
        },

        resetData(){
            this.state = {
                title:'',
                description:'',
                img:''
            }
        },

        handleSuksesUpload(data){
            this.state.img = data.file
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
                        this.state.img = response.data.data.path
                    }else{
                        this.$swal('Errors', response.data.message, 'error')
                    }
                })
        },
    }
}
</script>