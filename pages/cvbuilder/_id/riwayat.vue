<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl" v-if="profile.person">
                <ul class="steps steps-green steps-counter my-4" v-if="profile.person.data">
                    <li :class="classStep(0)">{{ $bahasa.showLabel({label:'Detail Pribadi',negara:profile.person.data.cv_bahasa}) }}</li>
                    <li :class="classStep(1)">{{ $bahasa.showLabel({label:'Detail Pengalaman',negara:profile.person.data.cv_bahasa}) }}</li>
                    <li :class="classStep(2)">Template</li>
                </ul>

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
                                    {{ $bahasa.showLabel({label:'Profil',negara:profile.person.data.cv_bahasa}) }}
                                </strong>
                            </div>
                            <div class="card-body">
                                <client-only placeholder="loading...">
                                    <ckeditor-nuxt :config="editorConfig" v-model="form.description"/>
                                </client-only>
                            </div>
                        </div>
                    </div>

                    <div v-show="showStrukturFile('pengalaman')" class="mt-4">
                        <card_pengalaman_kerjaVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_pengalaman_kerjaVue>
                    </div>

                    <div v-show="showStrukturFile('pendidikan')" class="mt-4">
                        <card_pendidikanVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_pendidikanVue>
                    </div>

                    <div v-show="showStrukturFile('minat')" class="mt-4">
                        <card_minatVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_minatVue>
                    </div>

                    <div v-show="showStrukturFile('keahlian')" class="mt-4">
                        <card_keahlianVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_keahlianVue>
                    </div>

                    <div v-show="showStrukturFile('bahasa')" class="mt-4">
                        <card_bahasaVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_bahasaVue>
                    </div>

                    <div v-show="showStrukturFile('kursus')" class="mt-4">
                        <card_kursusVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_kursusVue>
                    </div>

                    <div v-show="showStrukturFile('pencapaian')" class="mt-4">
                        <card_pencapaianVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_pencapaianVue>
                    </div>

                    <div v-show="showStrukturFile('publikasi')" class="mt-4">
                        <card_publikasiVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_publikasiVue>
                    </div>

                    <div v-show="showStrukturFile('project')" class="mt-4">
                        <card_projectVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_projectVue>
                    </div>

                    <div v-show="showStrukturFile('social media')" class="mt-4">
                        <card_sosmedVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data" :sosmed="sosmeds"></card_sosmedVue>
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
                                    {{ $bahasa.showLabel({label:'Tambahkan bagian ekstra',negara:profile.person.data.cv_bahasa}) }}
                                </option>
                                <option v-for="(l,idx) in others_struktur_fields" :key="idx" :value="l.name">
                                    {{ $bahasa.showLabelFields({label:l.name,negara:profile.person.data.cv_bahasa}) }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div v-if="loading" class="mt-2 text-center">
                        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                    </div>

                    <div v-if="message" :class="messageclass" role="alert">
                        <div class="text-muted" v-html="message"></div>
                    </div>

                    <div class="text-center text-muted mt-4" v-if="profile.person">
                        <button type="submit" class="btn btn-primary btn-lg">
                            {{ $bahasa.showLabel({label:'Langkah Selanjutnya',negara:profile.person.data.cv_bahasa}) }} &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="text-center text-muted mt-3" v-if="profile.person">
                        <nuxt-link :to="'/cvbuilder/'+profile.person.data.id+'/detail'" class="text-link text-muted">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M15 6l-6 6l6 6"></path>
                            </svg> &nbsp;
                            {{ $bahasa.showLabel({label:'Langkah Sebelumnya',negara:profile.person.data.cv_bahasa}) }}
                        </nuxt-link>
                    </div>
                </form>


            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import card_descriptionVue from '~/components/webcv/cv/card_description.vue'
import card_pengalaman_kerjaVue from '~/components/webcv/cv/card_pengalaman_kerja.vue'
import card_pendidikanVue from '~/components/webcv/cv/card_pendidikan.vue'
import card_minatVue from "~/components/webcv/cv/card_minat.vue"
import card_keahlianVue from '~/components/webcv/cv/card_keahlian.vue'
import card_bahasaVue from "~/components/webcv/cv/card_bahasa.vue"
import card_kursusVue from "~/components/webcv/cv/card_kursus.vue"
import card_pencapaianVue from "~/components/webcv/cv/card_pencapaian.vue"
import card_publikasiVue from '~/components/webcv/cv/card_publikasi.vue'
import card_projectVue from '~/components/webcv/cv/card_project.vue'
import card_sosmedVue from '~/components/webcv/cv/card_sosmed.vue'

export default{
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
        await store.dispatch('person/get_social_media')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "edit_cvbuilder")
            {
                return true
            }
        }

        return false
    },
    components:{
        card_descriptionVue,
        card_pengalaman_kerjaVue,
        card_pendidikanVue,
        card_minatVue,
        card_keahlianVue,
        card_bahasaVue,
        card_kursusVue,
        card_pencapaianVue,
        card_publikasiVue,
        card_projectVue,
        card_sosmedVue,
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    computed:{
        ...mapState('person',{
            profile: state => state.profile,
            availables: state => state.availables,
            others: state => state.others,
            semua: state => state.semua,
            sosmeds: state => state.sosmeds,
            struktur_fields: state => state.struktur_fields
        })
    },
    data(){
        return {
            current_step:1,
            bagian:'',
            loading:false,
            message:'',
            messageclass:'',
            form:{
                kode:'',
                description:'',
                struktur_fields:[]
            },
            others_struktur_fields:[],
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
        }
    },
    mounted(){
        this.setData()
        this.setOthersField()
    },
    methods:{
        ...mapActions('person',['get_data','change_bagian','change_struktur_field','update_current_stuktur_fields']),

        setData(){
            if(this.profile)
            {
                if(this.profile.person)
                {
                    if(this.profile.person.data)
                    {
                        this.form = {
                            kode: this.profile.person.data.id,
                            description: this.profile.person.data.description,
                            struktur_fields:[]
                        }

                        this.update_current_stuktur_fields(this.profile.person.data.struktur_fields)
   
                    }
                }
            }
        },

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

        classStep(id){
            var asli = 'step-item'

            if(this.current_step == id)
            {
                asli = 'step-item active'
            }

            return asli
        },

        changeBagian(){
            var params = {
                tambahan: true,
                nama:this.bagian
            }

            this.change_struktur_field(params)
            this.updateStrukturField()
            this.setOthersField()
            this.change_bagian(this.bagian)
            this.bagian = ''
            
        },

        updateStrukturField(){
            this.form.struktur_fields = this.struktur_fields
            this.$axios.patch('/auth/cv/person/'+this.form.kode, this.form)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        
                    }
                })
        },

        simpan(){
            this.loading = true 
            this.form.struktur_fields = this.struktur_fields

            this.$axios.patch('/auth/cv/person/'+this.form.kode, this.form)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.$toast.success(resp.data.message,{ 
                            className: ['toasting'], 
                            position: "top-right", 
                            duration : 2000
                        })

                        this.$router.replace("/cvbuilder/"+this.form.kode+"/template");
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
        },
    }
}
</script>