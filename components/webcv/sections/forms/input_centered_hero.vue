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

            <UploadComponent :text="'Image'" :type="'image'" @suksesUpload="handleSuksesUpload"></UploadComponent>

            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Add Preview</button>
            </div>
        </form>
    </div>
</template>

<script>
import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import UploadComponent from '~/components/UploadComponent.vue'
export default{
    components:{
        centered_hero,
        UploadComponent
    },
    data(){
        return {
            state:{
                title:'',
                description:'',
                img:''
            }
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
        }
    }
}
</script>