<template>
    <div>
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
                    <span class="dropzone-msg-desc">Upload Image</span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        props:{},
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
    
                this.$axios.post('/uploads', formData, config)
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

                            this.$emit('suksesUploadDropzone', response.data.data)
                        }else{
                            this.success = false
                            this.$swal('Errors', response.data.message, 'error')
                        }
                    }).catch(error => {
                        if (error.response.status == 422) {
                            this.success = false
                            this.showPreview = false
                            this.loadingimage=false

                            this.batal()

                            this.errors = error.response.data.errors;
                            this.messageclass='alert alert-danger';
                            this.message = error.response.data.message

                            this.$swal('422', this.message, 'Danger')
                        }

                        if (error.response.status == 401) {
                            this.loadingimage=false
                            this.success = false
                            this.showPreview = false

                            this.batal()

                            this.errors = error.response.data.errors;
                            this.messageclass='alert alert-danger';
                            this.message = error.response.data.message

                            this.$swal('422', this.message, 'Danger')
                        }

                        if (error.response.status == 500) {
                            this.loadingimage=false
                            this.success = false
                            this.showPreview = false

                            this.batal()

                            this.errors = error.response.data.errors;
                            this.messageclass='alert alert-danger';
                            this.message = error.response.data.message

                            this.$swal('500', this.message, 'Danger')
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