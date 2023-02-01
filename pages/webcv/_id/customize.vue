<template>
    <div v-if="profile">
        <div v-if="profile.success == true">
            <div v-if="profile.person">
                <div v-if="profile.person.data">
                    <!-- <p>Refrensi : https://lmpixels.com/demo/leven-html-new/full-width-light/index.html</p> -->

                    <!-- <pre>{{ $auth.user.data }}</pre> -->

                    <div v-if="list">
                        <div v-if="list.data">
                            <div v-if="list.data.sections">
                                <div v-for="(l,idx) in list.data.sections.data" :key="idx">
                                    <div v-if="l.section">
                                        <div v-if="l.section.data">
                                            <div class="editbox" v-bind:style="{
                                                position:'absolute',
                                                zIndex:10+idx,
                                                right:0
                                            }">
                                                <div class="btn-group">
                                                    <a v-if="l.section.data.title == 'testimonial' || l.section.data.title == 'client' || l.section.data.title == 'what_i_do' || l.section.data.title == 'blank_header'" href="#" class="btn btn-warning w-100" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                                            <path d="M16 5l3 3"></path>
                                                        </svg>
                                                    </a>
                                                    <a href="#" class="btn btn-danger w-100" @click.prevent="deleteSection(l.id)">
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
                                            </div>

                                            <div v-if="l.section.data.title == 'about_me_2'">
                                                <About_me_2Vue :person="profile.person.data"></About_me_2Vue>
                                            </div>

                                            <div v-if="l.section.data.title == 'about_me_1'">
                                                <About_me_1Vue :person="profile.person.data"></About_me_1Vue>
                                            </div>

                                            <div v-if="l.section.data.title == 'what_i_do'">
                                                <what_i_doVue :title="l.json_fields.title" :list="l.json_fields.list"></what_i_doVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'experience'">
                                                <experienceVue :title="'Experience'" :person="profile.person.data"></experienceVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'education'">
                                                <experienceVue :title="'Education'" :person="profile.person.data"></experienceVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'certification'">
                                                <certificationVue :person="profile.person.data"></certificationVue>
                                            </div>

                                            <div v-if="l.section.data.title == '2_row_blog'">
                                                <two_row_blogVue :user_id="profile.person.data.user_id"></two_row_blogVue>
                                            </div>

                                            <div v-if="l.section.data.title == '3_row_blog'">
                                                <three_row_blogVue :user_id="profile.person.data.user_id"></three_row_blogVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'testimonial'">
                                                <testimonialVue :title="l.json_fields.title" :list="l.json_fields.list"></testimonialVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'client'">
                                                <clientVue :title="l.json_fields.title" :list="l.json_fields.list"></clientVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'portofolio_two_columns'">
                                                <portofolio_two_colomunsVue :title="'portofolio_two_columns'" :user_id="profile.person.data.user_id" :class_title="'portfolio-grid two-columns shuffle'"></portofolio_two_colomunsVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'portofolio_three_columns'">
                                                <portofolio_two_colomunsVue :title="'portofolio_three_columns'" :user_id="profile.person.data.user_id" :class_title="'portfolio-grid three-columns shuffle'"></portofolio_two_colomunsVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'portofolio_four_columns'">
                                                <portofolio_two_colomunsVue :title="'portofolio_four_columns'" :user_id="profile.person.data.user_id" :class_title="'portfolio-grid four-columns shuffle'"></portofolio_two_colomunsVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'portofolio_five_columns'">
                                                <portofolio_two_colomunsVue :title="'portofolio_five_columns'" :user_id="profile.person.data.user_id" :class_title="'portfolio-grid five-columns shuffle'"></portofolio_two_colomunsVue>
                                            </div>

                                            <div v-if="l.section.data.title == 'blank_header'">
                                                <blank_headerVue :title="l.json_fields.title"></blank_headerVue>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul v-bind:style="{
                        'line-height': '28px',
                        'min-height': '410px',
                        'height':'auto',
                        'max-width': '8%',
                        'min-width': '150px',
                        'padding': '10px',
                        'position': 'fixed',
                        'left': '0%',
                        'top':'15%',
                        'text-align': 'center',
                        'bottom': '59%',
                        'z-index': '1900',
                        'list-style-type': 'none',
                        'background':'white',
                        'box-shadow': '-2px 9px 22px -11px rgba(0,0,0,0.75)',
                        '-webkit-box-shadow': '-2px 9px 22px -11px rgba(0,0,0,0.75)',
                        '-moz-box-shadow': '-2px 9px 22px -11px rgba(0,0,0,0.75)'
                    }" v-if="sections">
                        <li style="background:white;margin-bottom:10px;border-bottom:1px solid lightgray">
                            <a href="#" class="btn btn-link">Pilih Menu</a>
                        </li>
                        <li v-for="(l,idx) in sections.data" :key="idx" style="background:white;margin-bottom:5px">
                            <a class="btn btn-primary btn-block" href="#" @click.prevent="showSectionModal(l)">
                                {{ l.nama }}
                            </a>
                        </li>
                        <li style="background:white;margin-bottom:5px;border-top:1px solid lightgray">
                            <nuxt-link :to="'/webcv'" class="btn btn-link btn-block">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevrons-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M11 7l-5 5l5 5"></path>
                                    <path d="M17 7l-5 5l5 5"></path>
                                </svg>
                                Kembali
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <b-modal
                :ref="'modal-section'"
                :id="'modal-section'"
                size="lg"
                no-close-on-backdrop
                hide-footer
                :modal-class="'modal modal-blur fade'" 
                :dialog-class="'modal-dialog modal-dialog-centered'"
                :title="'Select Section - '+section.nama"
            >

                <h3 class="text-center">Select Template</h3>
                <hr>
                <div v-if="section">
                    <div v-if="section.section">
                        <div v-if="section.section.data">
                            <div class="row">
                                <div v-for="(l,idx) in section.section.data" :key="idx" class="col-6">
                                    <div v-bind:style="[
                                        l.id == section_preview.section_id 
                                        ?
                                            {
                                                border:'2px solid gray'
                                            }
                                        :
                                            {
                                                border:'none'
                                            }
                                    ]">
                                        <div class="card mb-3">
                                            <div class="card-body">
                                                <a href="#" @click.prevent="setSelectSection(l.id, l.title)">
                                                    <img :src="l.preview_image" class="img-fluid">
                                                </a>

                                                <div class="mt-2 text-center" v-html="l.description"></div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div v-if="loading" class="mt-2 text-center">
                                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                            </div>

                            <div v-if="message" :class="messageclass" role="alert">
                                <div class="text-muted" v-html="message"></div>
                            </div>

                            <div v-if="nama" class="text-center mt-3">
                                <div v-if="nama == 'what_i_do' || nama == 'testimonial' || nama == 'client' || nama == 'blank_header'" >
                                    <a href="#" class="btn btn-primary" @click.prevent="addContent">Set Content</a>
                                </div>
                                <div v-else>
                                    <a href="#" class="btn btn-primary" @click.prevent="saveSection">Add to Page</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-modal>

            <b-modal
                :ref="'modal-add-content'"
                :id="'modal-add-content'"
                size="lg"
                no-close-on-backdrop
                hide-footer
                :modal-class="'modal modal-blur fade'" 
                :dialog-class="'modal-dialog modal-dialog-centered'"
                :title="'Add Content to Section - '+section.nama"
            >
                <div v-if="nama == 'what_i_do'">
                    <input_what_i_doVue :section="section_preview" @addFeature="handleAddFeature"></input_what_i_doVue>
                </div>

                <div v-if="nama == 'testimonial'">
                    <input_testimonialVue :section="section_preview" @addFeature="handleAddFeature"></input_testimonialVue>
                </div>

                <div v-if="nama == 'client'">
                    <input_clientVue :section="section_preview" @addFeature="handleAddFeature"></input_clientVue>
                </div>

                <div v-if="nama == 'blank_header'">
                    <input_blank_headerVue :section="section_preview" @addFeature="handleAddFeature"></input_blank_headerVue>
                </div>
            </b-modal>

            <b-modal
                :ref="'modal-edit-section'"
                :id="'modal-edit-section'"
                size="lg"
                no-close-on-backdrop
                hide-footer
                :modal-class="'modal modal-blur fade'" 
                :dialog-class="'modal-dialog modal-dialog-centered'"
                title="Update Section"
            >
                <form v-if="section" @submit.prevent="updateSection">
                    <div v-if="editsection.title == 'testimonial'">
                        <input_testimonialVue 
                            :section="section_preview" 
                            :title="editsection.fields.title"
                            :list="editsection.fields.list"
                            @addFeature="updateSection"></input_testimonialVue>
                    </div>

                    <div v-if="editsection.title == 'client'">
                        <input_clientVue 
                            :section="section_preview" 
                            :title="editsection.fields.title"
                            :list="editsection.fields.list"
                            @addFeature="updateSection"></input_clientVue>
                    </div>

                    <div v-if="editsection.title == 'what_i_do'">
                        <input_what_i_doVue 
                            :section="section_preview" 
                            :title="editsection.fields.title"
                            :list="editsection.fields.list"
                            @addFeature="updateSection"></input_what_i_doVue>
                    </div>

                    <div v-if="editsection.title == 'blank_header'">
                        <input_blank_headerVue 
                            :section="section_preview" 
                            :title="editsection.fields.title"
                            :list="editsection.fields.list"
                            @addFeature="updateSection"></input_blank_headerVue>
                    </div>
                </form>
            </b-modal>


        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import About_me_1Vue from '~/components/webcv/laven/about_me_1.vue';
import About_me_2Vue from '~/components/webcv/laven/about_me_2.vue';
import input_what_i_doVue from '~/components/webcv/laven/input_what_i_do.vue';
import what_i_doVue from '~/components/webcv/laven/what_i_do.vue';
import experienceVue from '~/components/webcv/laven/experience.vue';
import certificationVue from "~/components/webcv/laven/certification.vue"
import two_row_blogVue from "~/components/webcv/laven/two_row_blog.vue"
import three_row_blogVue from '~/components/webcv/laven/three_row_blog.vue';
import input_testimonialVue from "~/components/webcv/laven/input_testimonial.vue"
import testimonialVue from "~/components/webcv/laven/testimonial.vue"
import input_clientVue from "~/components/webcv/laven/input_client.vue"
import clientVue from "~/components/webcv/laven/client.vue"
import portofolio_two_colomunsVue from "~/components/webcv/laven/portofolio_two_columns.vue"
import input_blank_headerVue from '~/components/webcv/laven/input_blank_header.vue';
import blank_headerVue from "~/components/webcv/laven/blank_header.vue"

export default{
    layout:'laven',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
    },
    components:{
        centered_hero,
        About_me_1Vue,
        About_me_2Vue,
        input_what_i_doVue,
        what_i_doVue,
        experienceVue,
        certificationVue,
        two_row_blogVue,
        three_row_blogVue,
        input_testimonialVue,
        testimonialVue,
        input_clientVue,
        clientVue,
        portofolio_two_colomunsVue,
        input_blank_headerVue,
        blank_headerVue
    },
    computed:{
        ...mapState('person',{
            step1: state=> state.step1,
            profile: state => state.profile,
        })
    },
    data(){
        return {
            kode:'',
            list: {},
            loading:false,
            message:'',
            messageclass:'',
            sections:[],
            section:{},
            section_preview:{
                webcv_id:'',
                menu_id:'',
                section_id:'',
                json_fields:[],
            },
            nama:'',
            editsection:{
                kode:'',
                title:'',
                fields:[]
            }
        }
    },
    mounted(){
        this.getData()
        this.getSection()
    },
    methods:{
        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.$axios.get('/auth/webcv-menu/'+id)
                .then(resp => {
                    this.list = resp.data

                    if(this.list)
                    {
                        if(this.list.data)
                        {
                            this.section_preview = {
                                webcv_id:this.list.data.webcv_id,
                                menu_id: this.list.data.id,
                                section_id:'',
                                json_fields: [],
                            }
                        }
                    }

                    
                })
        },

        getSection(){
            this.$axios.get('/auth/section-category-list')
                .then(resp => {
                    this.sections = resp.data
                })
        },

        batal(){
            this.section = {}

            this.reset()
            this.$bvModal.hide("modal-section");
        },

        showSectionModal(l){
            this.section = l
            this.loading = false

            this.section_preview.section_id = l.id
            this.section_preview.json_fields =  []
            this.nama = ""

            this.$bvModal.show("modal-section");
        },

        getClassSelectedSection(l){
            var asli = ''

            if(asli == l)
            {
                asli = ''
            }

            return asli
        },

        setSelectSection(l, nama){
            this.section_preview.section_id = l
            this.nama = nama
        },

        reset(){
            this.section_preview = {
                webcv_id:this.list.data.webcv_id,
                menu_id: this.list.data.id,
                section_id:'',
                json_fields:[],
            }
            this.show_preview = false
        },

        saveSection(){
            this.loading = true

            this.$axios.post('/auth/save-menu-section', this.section_preview)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.$swal('Success', resp.data.message , 'info');
                        this.getData()
                        this.batal()
                    }else{
                        this.$swal('Warning', resp.data.message , 'warning');
                    }
                })
        },

        editSection(kode,title, fields){
            this.show_preview_edit = false
            this.editsection = {
                kode:kode,
                title:title,
                fields:fields
            }

            this.$bvModal.show("modal-edit-section");
        },

        batalUpdate(){
            this.show_preview_edit = false
            this.editsection = {
                kode:'',
                title:'',
                fields:[]
            }

            this.$bvModal.hide("modal-edit-section");
        },

        handleUpdateSection(data){
            this.editsection.fields = data
            this.show_preview_edit = true
        },

        updateSection(data){
            this.editsection.fields = data
            this.loading = true

            this.$axios.post('/auth/update-menu-section/'+this.editsection.kode, this.editsection)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.$swal('Success', resp.data.message , 'info');
                        this.getData()
                        this.batalUpdate()
                    }else{
                        this.$swal('Warning', resp.data.message , 'warning');
                    }
                })
        },

        deleteSection(id){
            this.$swal({
                title: 'Delete Section?',
                text: 'Apakah anda yakin ingin menghapus data ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.delete('/auth/delete-menu-section/'+id)
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Delete Section berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Delete Section gagal' , 'error');
                            }

                            this.getData()
                        })
                } else {
                    this.$swal('Cancelled', 'Aksi dibatalkan', 'info')
                }
            })
        },

        addContent(){
            this.$bvModal.hide('modal-section');
            this.$bvModal.show("modal-add-content");
        },

        handleAddFeature(data){
            this.section_preview.json_fields = data
            this.saveSection()
            this.$bvModal.hide("modal-add-content");
        }
    }
}
</script>
