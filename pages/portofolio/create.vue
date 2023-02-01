<template>
    <div class="">
        <div class="card" style="border-top:none;border-left:none;border-right:none;border-radius: 0;">
            <div class="card-body">
                <div class="row">
                    <div class="col-8">
                        <!-- <a href="#" class="btn btn-primary btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </a> -->
                        <div class="row">
                            <div class="col-auto">
                                <nuxt-link :to="'/posts'" class="btn-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <line x1="5" y1="12" x2="11" y2="18"></line>
                                        <line x1="5" y1="12" x2="11" y2="6"></line>
                                    </svg>
                                </nuxt-link>
                            </div>

                            <div class="col-auto">
                                <h3 class="">{{title}}</h3>
                            </div>

                        </div>
                        
                    </div>

                    <div class="col-4 text-end">
                        <a href="#" class="btn btn-link" @click.prevent="simpan('draft')">Save Draft</a>
                        <a href="#" class="btn btn-primary" @click.prevent="simpan('publish')">Publish</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-xl" style="background:#ffffff">
            <form action="#">
                <div class="row">
                    <div class="col-8">
                        <div class="card" style="border:none;">
                            <div class="card-body">
                                <div class="form-group">
                                    <input type="text" placeholder="Title" v-model="form.title" :class="getClassInput('title')">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['title']">{{ errors['title'][0] }}</p>
                                    </span>
                                </div>

                                <div class="form-group">
                                    <EditorVue @inputDesc="handleInputDesc"></EditorVue>

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['desc']">{{ errors['desc'][0] }}</p>
                                    </span>
                                </div>

                                <div class="row g-2">
                                    <input style="display:none" accept="image/*" type="file" class="form-control" name="file" id="file" ref="files" v-on:change="handleFileUploadGallery"/>

                                    <div class="col-auto">
                                        <a class="card card-link card-link-pop" @click.prevent="$refs.files.click()">
                                            <div class="card-body">
                                                <div class="text-center">
                                                    <div class="mb-3 mt-3">
                                                        <a href="#" class="text-reset text-link">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                <circle cx="12" cy="12" r="9"></circle>
                                                                <line x1="9" y1="12" x2="15" y2="12"></line>
                                                                <line x1="12" y1="9" x2="12" y2="15"></line>
                                                            </svg>
                                                            <p class="mt-2">Add Image</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="col-3" v-for="(l,idx) in form.files" :key="idx">
                                        <div class="card">
                                            <div class="ribbon ribbon-top bg-light">
                                                <a href="#" @click.prevent="deleteFiles(idx,l)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                            <div class="card-body">
                                                <img :src="l" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-4 bg-white" style="border-top:none;border-left:1px solid lightgray;padding:0">
                        <div class="accordion" id="accordion-example">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading-1">
                                    <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true">
                                        Status
                                    </button>
                                </h2>
                                <div id="collapse-1" class="accordion-collapse collapse show" data-bs-parent="#accordion-example">
                                    <div class="accordion-body pt-0">
                                        <div class="form-group row">
                                            <label for="" class="form-label col-6">Visibility</label>
                                            <div class="col-6">
                                                <select name="visibility" id="visibility" class="form-select" v-model="form.visibility">
                                                    <option value="public">Public</option>
                                                    <option value="private">Private</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading-3">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false">
                                        Featured Image
                                    </button>
                                </h2>
                                <div id="collapse-3" class="accordion-collapse collapse" data-bs-parent="#accordion-example">
                                    <div class="accordion-body pt-0">
                                        <a href="#" v-if="set_featured_image == 'N'" class="text-link" @click.prevent="showUploadFile">
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
                                                    <span class="dropzone-msg-desc">Set Featured Image</span>
                                                </div>
                                            </div>
                                        </a>

                                        <div v-if="set_featured_image == 'Y'">
                                            <img :src="form.featuredImage.file_url" alt="">

                                            <a href="#" class="btn btn-outline-primary mt-2 mb-2" @click.prevent="showUploadFile">
                                                Replace Image
                                            </a>
                                            <br>
                                            <a href="#" class="mt-2 text-danger" @click.prevent="removeImage">
                                                Remove featured image
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading-4">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-4" aria-expanded="false">
                                        Discussion
                                    </button>
                                </h2>
                                <div id="collapse-4" class="accordion-collapse collapse" data-bs-parent="#accordion-example">
                                    <div class="accordion-body pt-0">
                                        <label class="form-check">
                                            <input class="form-check-input" type="checkbox" @input="selectAllowComment($event)">
                                            <span class="form-check-label">Allow comments</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <b-modal
            :ref="'featured-image'"
            :id="'modal-featured-image'"
            size="xl"
            no-close-on-backdrop
            hide-footer
            :modal-class="'modal modal-blur fade'" 
            :dialog-class="'modal-dialog modal-dialog-centered'"
            title="Featured Image"
        >
            <MediaLibraryVue @setFeaturedImage="handleSetFeaturedImage"></MediaLibraryVue>
        </b-modal>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EditorVue from '~/components/Editor.vue'
import MediaLibraryVue from '~/components/input/MediaLibrary.vue'
import create_new_categoryVue from '~/components/webcv/create_new_category.vue'

export default {
    layout:'main',
    components:{
        EditorVue,
        MediaLibraryVue,
        create_new_categoryVue
    },
    async fetch({store}){
        await store.dispatch('portofolio/showCategory')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "create_new_portofolio")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('portofolio',{
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            categories: state => state.categories,
            errors: state => state.errors
        })
    },
    data(){
        return{
            title:'Create new Portofolio',
            set_featured_image:'N',
            visible: false,
            form:{
                visibility:'public',
                publish:'publish',
                title:'',
                desc:'',
                featuredImage:{},
                category:[],
                allow_comment:'open',
                post_type:'portofolio',
                files:[]
            },
            showPreview:false,
            loadingimage:false,
            file:''
        }
    },
    methods:{
        ...mapActions('portofolio',['save','showCategory']),

        getClassInput(l)
        {
            var asli = 'form-control'

            if(this.errors)
            {
                if(this.errors[l])
                {
                    asli = 'form-control is-invalid'
                }
            }

            return asli
        },  

        showUploadFile(){
            this.$bvModal.show("modal-featured-image");
        },

        handleSetFeaturedImage(l){
            this.set_featured_image = 'Y'
            this.form.featuredImage = l
            this.$bvModal.hide("modal-featured-image");
        },

        removeImage(){
            this.set_featured_image = 'N'
            this.form.featuredImage = {}
        },

        selectAllowComment(event)
        {
            if(event.target.checked == true)
            {
                this.form.allow_comment = 'open'
            }else{
                this.form.allow_comment = 'close'
            }
        },

        handleInputDesc(e){
            this.form.desc = e
        },

        simpan(publish){
            this.form.publish = publish 

            this.save(this.form)
        },

        handleFileUploadGallery(e){
            this.showPreview = false
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
                        this.form.files.push(response.data.data.path)
                    }else{
                        this.$swal('Errors', response.data.message, 'error')
                    }
                })   
        },

        deleteFiles(idx,l){
            this.$axios.delete('/auth/uploads?path='+l)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.form.files.splice(idx, 1)
                    }
                })
        }
    }
}
</script>

<style>
    .accordion-item{
        border-left:none;
        border-radius: 0;
        border-right: none;
    }
    .accordion-item:last-of-type {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
</style>