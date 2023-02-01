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
                                <h2 class="accordion-header" id="heading-2">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false">
                                        Categories
                                    </button>
                                </h2>
                                <div id="collapse-2" class="accordion-collapse collapse" data-bs-parent="#accordion-example">
                                    <div class="accordion-body pt-0">
                                        <label class="form-check" v-for="(l,idx) in categories" :key="idx">
                                            <input class="form-check-input" type="checkbox" @input="selectCategory($event,l.id)">
                                            <span class="form-check-label">{{l.name}}</span>
                                        </label>

                                        <a href="#" class="mt-2 text-primary"
                                            :class="visible ? 'mt-2 text-primary' : 'mt-2 text-primary collapsed'"
                                            :aria-expanded="visible ? 'true' : 'false'"
                                            aria-controls="collapse-4"
                                            @click="visible = !visible">
                                            Add new Category
                                        </a>

                                        <b-collapse id="collapse-1" v-model="visible" class="mt-2">
                                            <div class="card-body">
                                                <create_new_categoryVue @suksesCreateCategory="handlesuksesCreateCategory"></create_new_categoryVue>
                                            </div>
                                        </b-collapse>

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
        await store.dispatch('post/showCategory')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "create_new_post")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('post',{
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            categories: state => state.categories,
            errors: state => state.errors
        })
    },
    data(){
        return{
            title:'Create new Posts',
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
                post_type:'artikel'
            },
        }
    },
    methods:{
        ...mapActions('post',['save','showCategory']),

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

        selectCategory(event,l){
            if(event.target.checked == true)
            {
                this.form.category.push(l)
            }else{
                var asli = []
                for(var a=0; a<this.form.category.length;a++)
                {
                    if(this.form.category[a] != l)
                    {
                        asli.push(this.form.category[a])
                    }
                }

                this.form.category = asli
            }
            
        },

        handlesuksesCreateCategory(){
            this.showCategory()
            this.visible = !this.visible
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