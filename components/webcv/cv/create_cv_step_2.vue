<template>
    <div>
        <form action="#" @submit.prevent="simpan">
            <div v-show="showStrukturFile('description')">
                <div class="card">
                    <div class="card-header" style="background:white;border:none">
                        <strong>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                            </svg>
                            {{ $bahasa.showLabel({label:'Profil',negara:form.bahasa}) }}
                        </strong>
                    </div>
                    <div class="card-body">
                        <client-only placeholder="loading...">
                            <ckeditor-nuxt :config="editorConfig" v-model="form.description"/>
                        </client-only>

                        <span v-if="errors">
                            <p class="text-danger" v-if="errors['description']">{{ errors['description'][0] }}</p>
                        </span>
                    </div>
                </div>
            </div>

            <div v-show="showStrukturFile('pengalaman')" class="mt-4">
                <create_cv_step_pengalamanVue></create_cv_step_pengalamanVue>

            </div>

            <div v-show="showStrukturFile('pendidikan')" class="mt-4">
                <create_cv_step_pendidikanVue></create_cv_step_pendidikanVue>
            </div>

            <div v-show="showStrukturFile('minat')" class="mt-4">
                <create_cv_step_minatVue></create_cv_step_minatVue>
            </div>

            <div v-show="showStrukturFile('keahlian')" class="mt-4">
                <create_cv_step_keahlianVue></create_cv_step_keahlianVue>
            </div>

            <div v-show="showStrukturFile('bahasa')" class="mt-4">
                <create_cv_step_bahasaVue></create_cv_step_bahasaVue>
            </div>

            <div v-show="showStrukturFile('kursus')" class="mt-4">
                <create_cv_step_kursusVue></create_cv_step_kursusVue>
            </div>

            <div v-show="showStrukturFile('pencapaian')" class="mt-4">
                <create_cv_step_pencapaianVue></create_cv_step_pencapaianVue>
            </div>

            <div v-show="showStrukturFile('publikasi')" class="mt-4">
                <create_cv_step_publikasiVue></create_cv_step_publikasiVue>
            </div>

            <div v-show="showStrukturFile('project')" class="mt-4">
                <create_cv_step_projectVue></create_cv_step_projectVue>
            </div>

            <div v-show="showStrukturFile('social media')" class="mt-4">
                <create_cv_step_sosmedVue></create_cv_step_sosmedVue>
            </div>

            <div class="card mt-3" v-if="others_struktur_fields.length > 0">
                <div class="card-body">
                    <select name="" id="" class="form-select" v-model="bagian" @change="changeBagian">
                        <option value="" disabled selected>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                            </svg>
                            {{ $bahasa.showLabel({label:'Tambahkan bagian ekstra',negara:form.bahasa}) }}
                        </option>
                        <option v-for="(l,idx) in others_struktur_fields" :key="idx" :value="l.name">
                            {{ $bahasa.showLabelFields({label:l.name,negara:form.bahasa}) }}
                        </option>
                    </select>
                </div>
            </div>

            <div v-if="loading" class="mt-2 text-center">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>

            <div class="mt-2">
                <div v-if="message" :class="messageclass" role="alert">
                    <div class="text-muted" v-html="message"></div>
                </div>
            </div>

            <div class="text-center text-muted mt-3">
                <button type="submit" href="#" class="btn btn-primary btn-lg">
                    {{ $bahasa.showLabel({label:'Langkah Selanjutnya',negara:form.bahasa}) }} &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                </button>
            </div>

            <div class="text-center text-muted mt-4" v-if="current_step > 1">

                <a href="#" @click.prevent="next(current_step-1)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M15 6l-6 6l6 6"></path>
                    </svg> &nbsp;
                    {{ $bahasa.showLabel({label:'Langkah Sebelumnya',negara:form.bahasa}) }}
                </a>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import create_cv_step_pengalamanVue from './create_cv_step_pengalaman.vue'
import create_cv_step_pendidikanVue from './create_cv_step_pendidikan.vue'
import create_cv_step_minatVue from './create_cv_step_minat.vue'
import create_cv_step_keahlianVue from './create_cv_step_keahlian.vue'
import create_cv_step_bahasaVue from './create_cv_step_bahasa.vue'
import create_cv_step_kursusVue from './create_cv_step_kursus.vue'
import create_cv_step_pencapaianVue from './create_cv_step_pencapaian.vue'
import create_cv_step_publikasiVue from './create_cv_step_publikasi.vue'
import create_cv_step_projectVue from './create_cv_step_project.vue'
import create_cv_step_sosmedVue from './create_cv_step_sosmed.vue'

export default{
    components:{
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
        create_cv_step_pengalamanVue,
        create_cv_step_pendidikanVue,
        create_cv_step_minatVue,
        create_cv_step_keahlianVue,
        create_cv_step_bahasaVue,
        create_cv_step_kursusVue,
        create_cv_step_pencapaianVue,
        create_cv_step_publikasiVue,
        create_cv_step_projectVue,
        create_cv_step_sosmedVue
    },
    computed:{
        ...mapState('createcv',{
            current_step: state=> state.current_step,
            form: state => state.form,
            struktur_fields: state => state.struktur_fields,
            negara: state => state.negara
        })
    },
    mounted(){
        this.setOthersField()
    },
    data(){
        return {
            show_preview:false,
            tambahan:false,
            bagian:'',
            loading:false,
            message:'',
            messageclass:'',
            editorConfig: {
                simpleUpload: {
                    uploadUrl: process.env.LARAVEL_ENDPOINT+'/api/uploads',
                    headers: {
                        // 'Authorization': 'optional_token'
                        'accept': 'application/json'
                    }
                },
                removePlugins: [
                    'Title',
                    'Code',
                    'Superscript',
                    'Subscript',
                    'PageBreak',
                    'MathType',
                    'LinkImage',
                    'CodeBlock',
                    'CloudServices',
                    'FontColor',
                    'FontBackgroundColor',
                    'FontFamily',
                    'FontSize',
                    'Link',
                    'LinkImage',
                    'Image',
                    'ImageCaption',
                    'ImageInsert',
                    'ImageResize',
                    'ImageStyle',
                    'ImageToolbar',
                    'ImageUpload',
                    'Heading',
                    'Strikethrough',
                    'BlockQuote',
                    'IndentBlock',
                    'Indent',
                    'TodoList',
                    'Table',
                    'TableCellProperties',
                    'TableProperties',
                    'TableToolbar',
                    'HorizontalLine',
                    'Highlight',
                ],
            },
            others_struktur_fields:[],
            errors:[],
        }
    },
    methods:{
        ...mapActions('createcv',['change_current_state','change_struktur_field','add_pengalaman','edit_pengalaman','delete_pengalaman']),

        setOthersField(){
            this.others_struktur_fields = []
            if(this.struktur_fields)
            {
                for(var a=0;a<this.struktur_fields.length;a++)
                {
                    if(this.struktur_fields[a].show == 'N')
                    {
                        this.others_struktur_fields.push(this.struktur_fields[a])
                    }
                }
            }
        },

        showStrukturFile(nama){
            if(this.struktur_fields)
            {
                for(var a=0;a<this.struktur_fields.length;a++)
                {
                    if(this.struktur_fields[a].name == nama)
                    {
                        if(this.struktur_fields[a].show == 'Y')
                        {
                            return true
                        }else{
                            return false
                        }
                        
                    }
                }
            }

            return false
        },

        handleAddPengalaman(data){
            this.$emit('addpengalaman', data)
        },

        changeBagian(){
            var params = {
                tambahan: true,
                nama:this.bagian
            }

            this.change_struktur_field(params)
            this.setOthersField()
            this.bagian = ''
            
        },

        next(val)
        {
            this.change_current_state(val)
        },

        simpan(){
            this.loading = true 

            this.$axios.post('/validate-step-2', this.form)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.change_current_state(3)
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'

                        this.$toast.error(resp.data.message,{ 
                            position: "top-right", 
                            duration : 2000
                        })
                    }
                }).catch(error => {
                    if (error.response.status == 422) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        this.$swal('422', this.message, 'Danger')
                    }

                    if (error.response.status == 500) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        this.$swal('500', this.message, 'Danger')
                    }
                })
        }
    }
}
</script>