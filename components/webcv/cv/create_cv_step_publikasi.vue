<template>
    <div>
        <div class="card mt-2" v-if="form">
            <div class="card-header" style="background:white;border:none">
                <strong>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-text" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                        <path d="M9 9l1 0"></path>
                        <path d="M9 13l6 0"></path>
                        <path d="M9 17l6 0"></path>
                    </svg>
                    {{ $bahasa.showLabel({label:'Publikasi',negara:form.bahasa}) }}
                </strong>
            </div>
            <div class="card-body" v-if="form.publikasi">
                <div class="divide-y" v-if="form.publikasi.length > 0">
                    <div v-for="(l,idx) in form.publikasi" :key="idx">
                        <div class="row mb-3">
                            <div class="col">
                                <div class="text-truncate" v-html="l.publikasi">
                                    <!-- <strong>{{ l.publikasi }}</strong> -->
                                </div>
                                <!-- <div class="text-muted">{{ l.periode }} ( {{ l.lama }} )</div> -->
                            </div>
                            <div class="col-1 align-self-center">
                                <a href="#" @click.prevent="edit(idx,l)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                        <path d="M13.5 6.5l4 4"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="col-1 align-self-center">
                                <a href="#" @click.prevent="hapus(idx)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M18 6l-12 12"></path>
                                        <path d="M6 6l12 12"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="mt-4" v-if="form.publikasi.length > 0">

                <div v-if="tambahan" class="mt-3">
                    <form action="#" class="mb-5" @submit.prevent="simpan">
                        <div v-if="loading" class="mt-2 text-center">
                            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                        </div>

                        <div v-if="message" :class="messageclass" role="alert">
                            <div class="text-muted" v-html="message"></div>
                        </div>

                        <div class="form-group">
                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Deskripsi',negara:form.bahasa}) }}</label>
                            <client-only placeholder="loading...">
                                <ckeditor-nuxt :config="editorConfig" v-model="state.publikasi" />
                            </client-only>

                            <span v-if="errors">
                                <p class="text-danger" v-if="errors['publikasi']">{{ errors['publikasi'][0] }}</p>
                            </span>
                        </div>

                        <div class="text-end">
                            <div class="d-flex">
                                <a href="#" class="btn btn-link" @click.prevent="reset">Cancel</a>
                                <button type="submit" class="btn btn-outline-primary ms-auto">{{ $bahasa.showLabel({label:'Simpan',negara:form.bahasa}) }}</button>
                            </div>
                        </div>

                    </form>
                </div>

                <a href="#" class="btn btn-outline-secondary btn-block mt-3" @click.prevent="addTambahan">
                    <svg v-if="tambahan == false" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                    </svg>
                    <svg v-if="tambahan == true" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                    </svg>
                    {{ $bahasa.showLabel({label:'Tambah publikasi lain',negara:form.bahasa}) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default{
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    computed:{
        ...mapState('createcv',{
            current_step: state=> state.current_step,
            form: state => state.form,
            struktur_fields: state => state.struktur_fields,
            negara: state => state.negara
        })
    },
    data(){
        return {
            tambahan:false,
            type:'add',
            kode:'',
            state:{
                publikasi:'',
            },
            errors:[],
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
        }
    },
    methods:{
        ...mapActions('createcv',['change_current_state','change_struktur_field','add_pengalaman','edit_pengalaman','delete_pengalaman']),

        addTambahan(){
            this.tambahan = !this.tambahan

            this.type = 'add'
        },

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

        reset(){
            this.kode = ''

            this.state ={
                publikasi:'',
            }

            this.type = 'add'

            this.message = ''
            this.messageclass =''

            this.addTambahan()
        },

        changeSwitch(e){
            if(e.value == true)
            {
                this.state.present = 'Y'
            }else{
                this.state.present = 'N'
            }
        },

        simpan(){
            if(this.type == 'add')
            {
                var params = {
                    type:'publikasi',
                    form: this.state
                }

                this.add_pengalaman(params)
            }

            if(this.type == 'edit')
            {
                var params = {
                    idx : this.kode,
                    form: this.state,
                    type: 'publikasi'
                }

                this.edit_pengalaman(params)
            }
            

            this.reset()
        },

        edit(idx,l){
            this.state ={
                publikasi: l.publikasi,
            }

            this.tambahan = true
            this.type = 'edit'
            this.kode = idx
        },

        hapus(idx){
            this.$swal({
                title: 'delete data?',
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
                    var params = {
                        idx: idx,
                        type:'publikasi'
                    }

                    this.delete_pengalaman(params)
                } else {
                    this.$swal('Cancelled', 'Data tidak di hapus', 'info')

                    this.$emit('changeStatusMember')
                }
            })
        },
    }
}
</script>