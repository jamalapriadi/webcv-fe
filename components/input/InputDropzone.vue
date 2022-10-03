<template>
    <div>
        <!--docs-->
        <div v-if="success">
            <cropper
                :src="state.file"
                :stencil-component="stencil"
                :canvas="false"
                @change="change"
            />

            <div class="text-center mt-2">
                <a href="#" class="btn btn-danger" @click.prevent="batal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="4" y1="7" x2="20" y2="7"></line>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                    Delete
                </a>
            </div>
        </div>

        <div v-if="loadingimage" class="text-center">
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        </div>

        <input style="display:none" accept="image/*" type="file" class="form-control" name="file" id="file" ref="file" v-on:change="handleFileUpload"/>

        <a v-if="success == false" href="#" @click.prevent="$refs.file.click()">
            <div class="dropzone" style="background:#edf2ff;border:none">
                <div class="dz-message">
                    <h3 class="dropzone-msg-title">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-upload" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                            <polyline points="7 9 12 4 17 9"></polyline>
                            <line x1="12" y1="4" x2="12" y2="16"></line>
                        </svg>
                    </h3>
                    <span class="dropzone-msg-desc">Upload File</span>
                </div>
            </div>
        </a>

        <p class="text-muted mt-3">
            Or, choose an image that has already been uploaded to another website. Copy the URL andpaste it here!
        </p>

        <div class="form-group">
            <label for="" class="form-label">Image Url</label>
            <input type="text" @input="inputUrlImage($event)" v-model="state.file" placeholder="Paste your image URL" class="form-control">
        </div>

        <div class="card-footer text-end">
            <div class="d-flex">
                <nuxt-link :to="'/'" class="btn btn-link">Cancel</nuxt-link>
                <a href="#" @click.prevent="save" class="btn btn-primary ms-auto">Save</a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        url:{
            type:String,
            required:true
        },
        stencil:{
            default:'circle-stencil'
        },
    },
    data(){
        return {
            state:{
                source:'upload',
                type:'',
                file: '',
                file_preview:'',
                width: 0,
				height: 0,
				left: 0,
				top: 0
            },
            showPreview:false,
            loadingimage:false,
            success:false,
            timer:null
        }
    },
    methods:{
        change({ coordinates, canvas }) {
            // console.log(coordinates)

			// console.log(coordinates, canvas);
            // this.coordinates = coordinates;
            this.state.width = coordinates.width
            this.state.height = coordinates.height
            this.state.left = coordinates.left
            this.state.top = coordinates.top
		}, 

        inputUrlImage(e){
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.success = true
                this.showPreview = true 
                this.state.source = 'url'
                this.state.file = e.target.value
                this.state.file_preview = e.target.value
                // this.state.type = response.data.data.type
            }, 1000)
        },

        batal(){
            this.state = {
                source:'upload',
                type:'',
                file: '',
                file_preview:'',
                width: 0,
				height: 0,
				left: 0,
				top: 0
            }

            this.showPreview = false,
            this.loadingimage = false,
            this.success = false,

            this.$emit('batal');
        },

        handleFileUpload(e){
            this.success = false
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
                        this.success = true
                        this.showPreview = true 
                        this.state.source = 'upload'
                        this.state.file = response.data.data.path
                        this.state.file_preview = response.data.data.path
                        this.state.type = response.data.data.type
                    }else{
                        this.success = false
                        this.$swal('Errors', response.data.message, 'error')
                    }
                })
        },

        save(){
            this.$axios.post('/auth/crop-image', this.state)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.state.file = resp.data.model.path
                        this.state.file_preview = resp.data.model.path
                        this.state.type = resp.data.model.type   

                        this.$emit('suksesCropImage', this.state.file)
                    }
                })
        }
    }
}
</script>

<style>
    .dropzone{
        background:#edf2ff;
        color:#222;
    }
</style>