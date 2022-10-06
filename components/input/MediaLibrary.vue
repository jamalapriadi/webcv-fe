<template>
    <div>
        <ul class="nav nav-tabs" data-bs-toggle="tabs" role="tablist">
            <li class="nav-item" role="presentation" @click.prevent="selectTab(1)">
                <a href="#tabs-home-7" :class="getClassLink(1)" data-bs-toggle="tab" aria-selected="true" role="tab">Upload Files</a>
            </li>
            <li class="nav-item" role="presentation" @click.prevent="selectTab(2)">
                <a href="#tabs-profile-7" :class="getClassLink(2)" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1">Media Library</a>
            </li>
        </ul>
        <div class="tab-content">
            <div :class="getClassTab(1)" id="tabs-home-7" role="tabpanel">
                <div class="mt-2">
                    <InputDropzoneDefaultVue @suksesUploadDropzone="handleSuksesUploadDropzone"></InputDropzoneDefaultVue>
                </div>
            </div>
            <div :class="getClassTab(2)" id="tabs-profile-7" role="tabpanel">
                <div class="mt-2">
                    <div class="row">
                        <div class="col-8" style="background:#ffffff">
                            <div class="card" style="height: 38rem;border:none;">
                                <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                                    <div class="divide-y">
                                        <div class="row">
                                            <div v-for="(l,idx) in files" :key="idx" class="col-6 col-sm-4">
                                                <label class="form-imagecheck mb-2" v-if="l.id == file.id">
                                                    <input name="form-imagecheck" type="checkbox" value="1" class="form-imagecheck-input" checked>
                                                    <span class="form-imagecheck-figure">
                                                        <img :src="l.path" alt="" class="form-imagecheck-image">
                                                    </span>
                                                </label>

                                                <div class="mb-2" v-else>
                                                    <img :src="l.path" alt="" class="form-imagecheck-image" @click.prevent="selectImage(l)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="card" style="background:#f6f7f7;border:none">
                                <div v-if="selected_image == 'Y'">
                                    <h3>ATTACHMENT DETAILS</h3>
                                    <img :src="file.path" alt="" class="img-fluid">
                                    <span class="text-muted text-bold">
                                        {{file.nama_file}}
                                    </span>
                                    <span class="text-muted text-bold">
                                        {{file.updated_at}}
                                    </span>
                                    <br>
                                    <!-- <a href="#" class="text-primary">
                                        Edit
                                    </a>
                                    <br> -->
                                    <a href="#" class="text-danger" @click.prevent="hapusFile(file)">
                                        Delete permanently
                                    </a>

                                    <hr>
                                    <div class="form-group row">
                                        <label class="form-label mt-2 col-3">Alt Text:</label>
                                        <div class="col-9">
                                            <input type="text" v-model="state.alt_text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="form-label mt-2 col-3">Title:</label>
                                        <div class="col-9">
                                            <input type="text" v-model="state.title" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="form-label mt-2 col-3">Caption:</label>
                                        <div class="col-9">
                                            <textarea v-model="state.caption" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="form-label mt-2 col-3">Description:</label>
                                        <div class="col-9">
                                            <textarea v-model="state.description" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="form-label mt-2 col-3">File URL:</label>
                                        <div class="col-9">
                                            <input type="text" v-model="state.file_url" class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                                <!-- <pre>{{state}}</pre> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-4" v-if="selected_image == 'Y'">
            <div class="card-footer">
                <div class="text-end">
                    <a href="#" class="btn btn-primary" @click.prevent="setFeaturedPost">Set Featured Image</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputDropzoneDefaultVue from './InputDropzoneDefault.vue'
export default {
    components:{
        InputDropzoneDefaultVue
    },
    data(){
        return {
            files:[],
            file:{},
            selected_image:'N',
            selected_tab: 2,
            state:{
                file_url:'',
                alt_text:'',
                caption:'',
                description:'',
                title:'',
                type_file:''
            }
        }
    },
    mounted(){
        this.getFiles()
        this.selectTab(2)
    },
    methods:{
        getClassTab(l){
            var asli = 'tab-pane'

            if(l == this.selected_tab)
            {
                asli = 'tab-pane active show'
            }

            return asli
        },
        getClassLink(l){
            var asli = 'nav-link'

            if(l == this.selected_tab)
            {
                asli = 'nav-link active'
            }

            return asli
        },
        selectTab(l){
            this.selected_tab = l
        },
        getFiles(){
            this.$axios.get('/auth/uploads')
                .then(resp => {
                    this.files = resp.data
                })
        },

        selectImage(l){
            this.file = l
            this.selected_image = 'Y'

            this.state.file_url = l.path
            this.state.type_file = l.type
        },

        handleSuksesUploadDropzone(l){
            this.getFiles()

            this.selectTab(2)
            this.file = l 
            this.selected_image = 'Y'

            this.state.file_url = l.path
            this.state.type_file = l.type
        },

        hapusFile(l){
            var params = {
                path: l.path
            }
            this.$axios.delete('/auth/uploads', {params})
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.getFiles()
                        this.selectTab(2)
                        this.file = {}
                        this.selected_image = 'N'
                    }
                })
        },

        setFeaturedPost(){
            this.$emit('setFeaturedImage', this.state)
        }
    }
}
</script>