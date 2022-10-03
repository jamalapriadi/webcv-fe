<template>
    <div>
        <form>
            <div v-if="loadingimage" class="text-center">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>
            
            <div class="form-group">
                <label for="" class="form-label">
                    <strong>{{text}}</strong>
                </label>
                
                <input v-if="type == 'image'" accept="image/*" type="file" class="form-control" name="file" id="file" ref="file" v-on:change="handleFileUpload"/>
                <input v-if="type == 'video'" accept="video/*" type="file" class="form-control" name="video" id="video" ref="video" v-on:change="handleFileUpload"/>
                <input v-if="type == 'application'" accept="application/pdf,application/vnd.ms-excel" type="file" class="form-control" name="pdf" id="pdf" ref="pdf" v-on:change="handleFileUpload"/>
            </div>

            <div class="form-group mt-2 mb-2" v-show="showPreview">
                <img v-if="state.type == 'image'" :src="state.file_preview" class="img-fluid" />

                <b-embed  v-if="state.type == 'video'"
                    type="iframe"
                    aspect="16by9"
                    :src="state.file_preview"
                    allowfullscreen
                ></b-embed>

                <a v-if="state.type == 'application'" :href="state.file_preview" class="btn btn-secondary" target="_blank">
                    Download Here
                </a>
            </div>

        </form>
    </div>
</template>

<script>
export default {
    props:['text', 'type'],
    data(){
        return {
            state:{
                type:'',
                file:'',
                file_preview:''
            },
            showPreview:false,
            loadingimage:false
        }
    },
    methods:{

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

                        this.$emit('suksesUpload',this.state)
                    }else{
                        this.$swal('Errors', response.data.message, 'error')
                    }
                })
        },
    }
}
</script>