<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == false">
            <div class="container-xl">
                <ul class="steps steps-green steps-counter my-4">
                    <li :class="classStep(0)">{{ $bahasa.showLabel({label:'Detail Pribadi',negara:form.bahasa}) }}</li>
                    <li :class="classStep(1)">{{ $bahasa.showLabel({label:'Detail Pengalaman',negara:form.bahasa}) }}</li>
                    <li :class="classStep(2)">Template</li>
                </ul>

                <form action="#" @submit.prevent="simpan">
                    <div class="card" v-if="current_step == 0">
                        <div class="card-header">
                            {{ $bahasa.showLabel({label:'Detail Pribadi',negara:form.bahasa}) }}

                            <div class="card-actions" v-if="negara">
                                <select name="bahasa" id="bahasa" v-model="form.bahasa" class="form-select">
                                    <option v-for="(l,idx) in negara.data" :key="idx" :value="l.kode_negara">{{ l.nama_negara }}</option> 
                                </select>
                            </div>
                        </div>
                        <div class="card-body">
                            
                            <div class="row">
                                <div class="col-4">
                                    <div v-if="show_preview == false">
                                        <InputDropzoneDefault @suksesUploadDropzone="handleUploadFoto"></InputDropzoneDefault>
                                    </div>

                                    <div v-if="show_preview == true">
                                        <img class="img-fluid" :src="form.file_preview">
                                        <div class="text-center">
                                            <a href="#" class="btn btn-sm btn-danger" @click.prevent="hapusFoto">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M4 7l16 0"></path>
                                                    <path d="M10 11l0 6"></path>
                                                    <path d="M14 11l0 6"></path>
                                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="form-group">
                                        <label for="" class="control-label">
                                            {{ $bahasa.showLabel({label:'Nama Depan',negara:form.bahasa}) }}
                                        </label>
                                        <input type="text" :class="getClassInput('nama_depan')" :placeholder="$bahasa.showLabel({label:'Nama Depan',negara:form.bahasa})" v-model="form.nama_depan">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['nama_depan']">{{ errors['nama_depan'][0] }}</p>
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="control-label">
                                            {{ $bahasa.showLabel({label:'Nama Belakang',negara:form.bahasa}) }}
                                        </label>
                                        <input type="text" :class="getClassInput('nama_belakang')" :placeholder="$bahasa.showLabel({label:'Nama Belakang',negara:form.bahasa})" v-model="form.nama_belakang">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['nama_belakang']">{{ errors['nama_belakang'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mt-2">
                                <label class="control-label">{{ $bahasa.showLabel({label:'Profesi',negara:form.bahasa}) }}</label>
                                <input type="text" name="profesi" :class="getClassInput('profesi')" :placeholder="$bahasa.showLabel({label:'Profesi',negara:form.bahasa})" v-model="form.profesi">

                                <span v-if="errors">
                                    <p class="text-danger" v-if="errors['profesi']">{{ errors['profesi'][0] }}</p>
                                </span>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">{{ $bahasa.showLabel({label:'Alamat Email',negara:form.bahasa}) }} </label>
                                        <input type="text" :class="getClassInput('email')" :placeholder="$bahasa.showLabel({label:'Alamat Email',negara:form.bahasa})" v-model="form.email">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['email']">{{ errors['email'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">{{ $bahasa.showLabel({label:'Nomor Telepon',negara:form.bahasa}) }} </label>
                                        <input type="text" :class="getClassInput('phone')" :placeholder="$bahasa.showLabel({label:'Nomor Telepon',negara:form.bahasa})" v-model="form.phone">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['phone']">{{ errors['phone'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label">{{ $bahasa.showLabel({label:'Alamat',negara:form.bahasa}) }} </label>
                                <textarea name="alamat" :class="getClassInput('alamat')" :placeholder="$bahasa.showLabel({label:'Alamat',negara:form.bahasa})" v-model="form.alamat"></textarea>

                                <span v-if="errors">
                                    <p class="text-danger" v-if="errors['alamat']">{{ errors['alamat'][0] }}</p>
                                </span>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">{{ $bahasa.showLabel({label:'Kode Pos',negara:form.bahasa}) }} </label>
                                        <input type="text" :class="getClassInput('kode_pos')" :placeholder="$bahasa.showLabel({label:'Kode Pos',negara:form.bahasa})" v-model="form.kode_pos">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['kode_pos']">{{ errors['kode_pos'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">{{ $bahasa.showLabel({label:'Kota',negara:form.bahasa}) }} </label>
                                        <input type="text" :class="getClassInput('kota')" :placeholder="$bahasa.showLabel({label:'Kota',negara:form.bahasa})" v-model="form.kota">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['kota']">{{ errors['kota'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div v-show="showStrukturFile('informasi_tambahan')">
                                
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Tempat Lahir',negara:form.bahasa}) }} </label>
                                            <input type="text" :placeholder="$bahasa.showLabel({label:'Tempat Lahir',negara:form.bahasa})" class="form-control" v-model="form.tempat_lahir">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Tanggal Lahir',negara:form.bahasa}) }} </label>
                                            <input type="date" :placeholder="$bahasa.showLabel({label:'Tanggal Lahir',negara:form.bahasa})" class="form-control" v-model="form.tanggal_lahir">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'SIM',negara:form.bahasa}) }} </label>
                                            <input type="text" :placeholder="$bahasa.showLabel({label:'SIM',negara:form.bahasa})" class="form-control" v-model="form.sim">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Jenis Kelamin',negara:form.bahasa}) }} </label>
                                            <select name="jk" id="jk" v-model="form.jenis_kelamin" class="form-select">
                                                <option value="L">Laki-laki</option>
                                                <option value="P">Perempuan</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Kebangsaan',negara:form.bahasa}) }}</label>
                                            <input type="text" :placeholder="$bahasa.showLabel({label:'Kebangsaan',negara:form.bahasa})" v-model="form.kebangsaan" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Status Pernikahan',negara:form.bahasa}) }} </label>
                                            <select name="status_pernikahan" id="status_pernikahan" class="form-select" v-model="form.status_pernikahan">
                                                <option value="Belum Kawin">Belum Kawin</option>
                                                <option value="Kawin">Kawin</option>
                                                <option value="Cerai Hidup">Cerai Hidup</option>
                                                <option value="Cerai Mati">Cerai Mati</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Linkedin',negara:form.bahasa}) }}</label>
                                            <input type="text" :placeholder="$bahasa.showLabel({label:'Linkedin',negara:form.bahasa})" v-model="form.linkedin" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">{{ $bahasa.showLabel({label:'Website',negara:form.bahasa}) }} </label>
                                            <input type="text" :placeholder="$bahasa.showLabel({label:'Website',negara:form.bahasa})" v-model="form.website" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="#" @click.prevent="addTambahan" class="mt-2 btn btn-block btn-secondary">
                                <svg v-if="showStrukturFile('informasi_tambahan') == false" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 12h6"></path>
                                    <path d="M12 9v6"></path>
                                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                                </svg>
                                <svg v-if="showStrukturFile('informasi_tambahan') == true" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 12h6"></path>
                                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                                </svg>
                                {{ $bahasa.showLabel({label:'Informasi Tambahan',negara:form.bahasa}) }}
                            </a>
                        </div>
                    </div>

                    <div v-if="loading" class="mt-2 text-center">
                        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                    </div>

                    <div v-if="message" :class="messageclass" role="alert">
                        <div class="text-muted" v-html="message"></div>
                    </div>

                    <div class="text-center text-muted mt-3">
                        <button type="submit" class="btn btn-primary btn-lg">
                            {{ $bahasa.showLabel({label:'Langkah Selanjutnya',negara:form.bahasa}) }} &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import InputDropzoneDefault from '~/components/input/InputDropzoneDefault.vue'

export default {
    layout:'main',
    components:{
        InputDropzoneDefault,
    },
    async fetch({store, params}){
        await store.dispatch('person/get_data')
        await store.dispatch('person/get_negara')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "create_cvbuilder")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('person',{
            step1: state=> state.step1,
            profile: state => state.profile,
            struktur_fields: state => state.struktur_fields,
            negara: state => state.negara
        })
    },
    data(){
        return {
            current_step:0,
            tambahan:false,
            form:{
                nama_depan:'',
                nama_belakang:'',
                profesi:'',
                email:'',
                phone:'',
                alamat:'',
                kode_pos:'',
                kota:'',
                tempat_lahir:'',
                tanggal_lahir:'',
                sim:'',
                jenis_kelamin:'L',
                kebangsaan:'',
                status_pernikahan:'Belum Kawin',
                linkedin:'',
                website:'',
                file:'',
                file_preview:'',
                bahasa:'ID',
                struktur_fields:[]
            },
            show_preview:false,
            errors:[],
            loading:false,
            message:'',
            messageclass:''
        }
    },
    methods:{
        ...mapActions('person',['save','change_struktur_field']),

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

        handleSubmit(val){
            this.save(val)
        },

        addTambahan(){
            this.tambahan = !this.tambahan

            var params = {
                tambahan: this.tambahan,
                nama:'informasi_tambahan'
            }

            this.change_struktur_field(params)
        },

        classStep(id){
            var asli = 'step-item'

            if(this.current_step == id)
            {
                asli = 'step-item active'
            }

            return asli
        },

        selanjutnya(){
            this.current_step++
        },

        handleUploadFoto(data){
            this.show_preview = true 
            this.form.foto = data.path     
            this.form.file_preview = data.path
        },

        hapusFoto(){
            this.show_preview = false 
            this.form.foto = ''
            this.form.file_preview = ''
        },

        simpan(){
            this.loading = true 
            this.form.struktur_fields = this.struktur_fields

            this.$axios.post('/auth/cv/person', this.form)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.$router.replace("/cvbuilder/"+resp.data.person_id+"/riwayat");
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
    }
}
</script>