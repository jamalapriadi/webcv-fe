<template>
    <div>
        <div class="card mt-2" v-if="person">
            <div class="card-header" style="background:white;border:none">
                <strong>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-school" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
                        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
                    </svg>
                    {{ $bahasa.showLabel({label:'Pendidikan',negara:person.cv_bahasa}) }}
                </strong>
            </div>
            <div class="card-body" v-if="person.pendidikan">
                <div class="divide-y" v-if="person.pendidikan.data.length > 0">
                    <div v-for="(l,idx) in person.pendidikan.data" :key="idx">
                        <div class="row mb-3">
                            <div class="col">
                                <div class="text-truncate">
                                    <strong>{{ l.gelar }}</strong>
                                </div>
                                <div class="text-muted">{{ l.periode }} ( {{ l.lama }} )</div>
                            </div>
                            <div class="col-1 align-self-center">
                                <a href="#" @click.prevent="edit(l)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                        <path d="M13.5 6.5l4 4"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="col-1 align-self-center">
                                <a href="#" @click.prevent="hapus(l)">
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

                <hr class="mt-4" v-if="person.pendidikan.data.length > 0">

                <div v-if="tambahan" class="mt-3">
                    <form action="#" class="mb-5" @submit.prevent="simpan">
                        <div v-if="loading" class="mt-2 text-center">
                            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                        </div>

                        <div v-if="message" :class="messageclass" role="alert">
                            <div class="text-muted" v-html="message"></div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Gelar',negara:person.cv_bahasa}) }}</label>
                                    <input type="text" :class="getClassInput('gelar')" :placeholder="$bahasa.showLabel({label:'misal. S.Kom',negara:person.cv_bahasa})" v-model="state.gelar">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['gelar']">{{ errors['gelar'][0] }}</p>
                                    </span>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="form-group">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Kota',negara:person.cv_bahasa}) }}</label>
                                    <input type="text" :class="getClassInput('kota')" :placeholder="$bahasa.showLabel({label:'misal. Jakarta',negara:person.cv_bahasa})" v-model="state.kota">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['kota']">{{ errors['kota'][0] }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Sekolah',negara:person.cv_bahasa}) }}</label>
                                    <input type="text" :class="getClassInput('sekolah')" :placeholder="$bahasa.showLabel({label:'misal. Universitas Indonesia',negara:person.cv_bahasa})" v-model="state.sekolah">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['sekolah']">{{ errors['sekolah'][0] }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Tanggal Mulai',negara:person.cv_bahasa}) }}</label>
                                    <input type="date" :class="getClassInput('tanggal_mulai')" v-model="state.tanggal_mulai">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['tanggal_mulai']">{{ errors['tanggal_mulai'][0] }}</p>
                                    </span>
                                </div>

                                <div class="form-group">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Sampai Sekarang?',negara:person.cv_bahasa}) }}</label>

                                    <toggle-button v-if="state.present == 'N'"
                                        :value="false"
                                        :sync="false"
                                        name="phone"
                                        :labels="{checked: 'Ya', unchecked: 'No'}"
                                        :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                        @change="changeSwitch($event)"/>

                                    <toggle-button v-if="state.present == 'Y'"
                                        :value="true"
                                        :sync="true"
                                        name="phone"
                                        :labels="{checked: 'Ya', unchecked: 'No'}"
                                        :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                        @change="changeSwitch($event)"/>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="form-group" v-if="state.present == 'N'">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Tanggal Selesai',negara:person.cv_bahasa}) }}</label>
                                    <input type="date" :class="getClassInput('tanggal_selesai')" v-model="state.tanggal_selesai">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['tanggal_selesai']">{{ errors['tanggal_selesai'][0] }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Deskripsi',negara:person.cv_bahasa}) }}</label>
                                    <client-only placeholder="loading...">
                                        <ckeditor-nuxt :config="editorConfig" v-model="state.deskripsi" />
                                    </client-only>

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['deskripsi']">{{ errors['deskripsi'][0] }}</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="text-end">
                            <div class="d-flex">
                                <a href="#" class="btn btn-link" @click.prevent="reset">Cancel</a>
                                <button type="submit" class="btn btn-outline-primary ms-auto">{{ $bahasa.showLabel({label:'Simpan',negara:person.cv_bahasa}) }}</button>
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
                    {{ $bahasa.showLabel({label:'Tambah pendidikan lain',negara:person.cv_bahasa}) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['person'],
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    data(){
        return {
            tambahan:false,
            state:{
                kode:'',
                person_id:this.person.id,
                gelar:'',
                kota:'',
                sekolah:'',
                tanggal_mulai:'',
                tanggal_selesai:'',
                deskripsi:'',
                present:'N'
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
        addTambahan(){
            this.tambahan = !this.tambahan
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
            this.state ={
                kode:'',
                person_id:this.person.id,
                gelar:'',
                kota:'',
                sekolah:'',
                tanggal_mulai:'',
                tanggal_selesai:'',
                deskripsi:'',
                present:'N'
            }

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
            this.loading = true
            this.$axios.post('/auth/cv/pendidikan', this.state)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.reset()

                        this.$emit('sukses')
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'
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

        edit(l){
            this.state ={
                kode:l.id,
                person_id:this.person.id,
                gelar:l.gelar,
                kota:l.kota,
                sekolah:l.sekolah,
                tanggal_mulai:l.tanggal_mulai,
                tanggal_selesai:l.tanggal_selesai,
                deskripsi:l.description,
                present:l.present
            }

            this.tambahan = true
        },

        hapus(l){
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
                    this.$axios.delete(l.links.detail)
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Info', 'Delete data  berhasil' , 'success');
                            }else{
                                this.$swal('Info', 'delete data  gagal' , 'error');
                            }

                            this.$emit('changeStatusMember')
                        })
                } else {
                    this.$swal('Cancelled', 'Data tidak di hapus', 'info')

                    this.$emit('changeStatusMember')
                }
            })
        },
    }
}
</script>