<template>
    <div>
        <form @submit.prevent="simpan">
            <div class="card">
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
                                <InputDropzoneDefault :key="formKey" @suksesUploadDropzone="handleUploadFoto" @batal="handleBatalUploadFile"></InputDropzoneDefault>
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

                    <div v-show="form.informasi_tambahan == 'Y'">
                        
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
                                    <select v-if="form.bahasa == 'ID'" name="status_pernikahan" id="status_pernikahan" class="form-select" v-model="form.status_pernikahan">
                                        <option value="Belum Kawin">Belum Kawin</option>
                                        <option value="Kawin">Kawin</option>
                                        <option value="Cerai Hidup">Cerai Hidup</option>
                                        <option value="Cerai Mati">Cerai Mati</option>
                                    </select>

                                    <input v-else type="text" class="form-control" v-model="form.status_pernikahan" :placeholder="$bahasa.showLabel({label:'Status Pernikahan',negara:form.bahasa})">
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
                        <svg v-show="form.informasi_tambahan == 'N'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 12h6"></path>
                            <path d="M12 9v6"></path>
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                        </svg>
                        <svg v-show="form.informasi_tambahan == 'Y'" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 12h6"></path>
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                        </svg>
                        {{ $bahasa.showLabel({label:'Informasi Tambahan',negara:form.bahasa}) }}
                    </a>
                </div>
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
</template>

<script>
import { mapState, mapActions } from 'vuex'

import InputDropzoneDefault from '~/components/input/InputDropzoneDefaultNoAuth.vue'
export default{
    components:{
        InputDropzoneDefault,
    },
    computed:{
        ...mapState('createcv',{
            current_step: state=> state.current_step,
            form: state => state.form,
            negara: state => state.negara
        })
    },
    data(){
        return {
            show_preview:false,
            tambahan:false,
            errors:[],
            loading:false,
            message:'',
            messageclass:'',
            formKey:0
        }
    },
    methods:{
        ...mapActions('createcv',['change_current_state','change_struktur_field','add_pengalaman','edit_pengalaman','delete_pengalaman','change_path_foto','clear_path_foto','change_informasi_tambahan']),
        
        showStrukturFile(nama){
            if(this.form.struktur_fields)
            {
                for(var a=0;a<this.form.struktur_fields.length;a++)
                {
                    if(this.form.struktur_fields[a].name == nama)
                    {
                        if(this.form.struktur_fields[a].show == 'Y')
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

        handleUploadFoto(data){
            this.show_preview = true 

            this.change_path_foto(data.path)
        },

        hapusFoto(){
            this.show_preview = false 

            this.clear_path_foto()
        },

        addTambahan(){
            this.tambahan = !this.tambahan

            if(this.tambahan)
            {
                this.change_informasi_tambahan('Y')
            }else{
                this.change_informasi_tambahan('N')
            }
        },
        
        simpan(){
            this.loading = true 

            this.$axios.post('/validate-step-1', this.form)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.change_current_state(2)
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

        handleBatalUploadFile(){
            this.formKey++;
        }
    }
}
</script>