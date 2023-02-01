<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl">
                <ul class="steps steps-green steps-counter my-4">
                    <li :class="classStep(0)">Detail Pribadi</li>
                    <li :class="classStep(1)">Pengalaman</li>
                    <li :class="classStep(2)">Template</li>
                </ul>

                <form action="#" @submit.prevent="simpan">
                    <div class="card" v-if="current_step == 0">
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
                                        <label for="" class="control-label">Nama Depan</label>
                                        <input type="text" :class="getClassInput('nama_depan')" placeholder="Nama Depan" v-model="form.nama_depan">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['nama_depan']">{{ errors['nama_depan'][0] }}</p>
                                        </span>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="control-label">Nama Belakang</label>
                                        <input type="text" :class="getClassInput('nama_belakang')" placeholder="Nama Belakang" v-model="form.nama_belakang">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['nama_belakang']">{{ errors['nama_belakang'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label">Profesi</label>
                                <input type="text" name="profesi" :class="getClassInput('profesi')" placeholder="profesi" v-model="form.profesi">

                                <span v-if="errors">
                                    <p class="text-danger" v-if="errors['profesi']">{{ errors['profesi'][0] }}</p>
                                </span>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">Alamat Email</label>
                                        <input type="text" :class="getClassInput('email')" placeholder="Alamat E-Mail" v-model="form.email" readonly>

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['email']">{{ errors['email'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">Nomor Telepon</label>
                                        <input type="text" :class="getClassInput('phone')" placeholder="Nomor Telepon" v-model="form.phone">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['phone']">{{ errors['phone'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label">Alamat</label>
                                <textarea name="alamat" :class="getClassInput('alamat')" placeholder="Alamat" v-model="form.alamat"></textarea>

                                <span v-if="errors">
                                    <p class="text-danger" v-if="errors['alamat']">{{ errors['alamat'][0] }}</p>
                                </span>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">Kode Pos</label>
                                        <input type="text" :class="getClassInput('kode_pos')" placeholder="Kode Pos" v-model="form.kode_pos">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['kode_pos']">{{ errors['kode_pos'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="" class="control-label">Kota</label>
                                        <input type="text" :class="getClassInput('kota')" placeholder="Kota" v-model="form.kota">

                                        <span v-if="errors">
                                            <p class="text-danger" v-if="errors['kota']">{{ errors['kota'][0] }}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div v-if="tambahan">
                                
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">Tempat Lahir</label>
                                            <input type="text" placeholder="Tempat Lahir" class="form-control" v-model="form.tempat_lahir">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">Tanggal Lahir</label>
                                            <input type="date" placeholder="Tanggal Lahir" class="form-control" v-model="form.tanggal_lahir">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">SIM</label>
                                            <input type="text" placeholder="SIM" class="form-control" v-model="form.sim">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">Jenis Kelamin</label>
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
                                            <label for="" class="control-label">Kebangsaan</label>
                                            <input type="text" placeholder="Kebangsaan" v-model="form.kebangsaan" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">Status Pernikahan</label>
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
                                            <label for="" class="control-label">Linkedin</label>
                                            <input type="text" placeholder="Linkedin" v-model="form.linkedin" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="" class="control-label">Website</label>
                                            <input type="text" placeholder="Website" v-model="form.website" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="#" @click.prevent="addTambahan" class="mt-2 btn btn-block btn-secondary">
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
                                Informasi Tambahan
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
                            Langkah Selanjutnya &nbsp;
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
        InputDropzoneDefault
    },
    async fetch({store, params}){
        await store.dispatch('person/get_data')
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
    computed:{
        ...mapState('person',{
            step1: state=> state.step1,
            profile: state => state.profile,
        })
    },
    data(){
        return {
            current_step:0,
            tambahan:false,
            form:{
                kode:'',
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
                file_preview:''
            },
            show_preview:false,
            errors:[],
            loading:false,
            message:'',
            messageclass:''
        }
    },
    mounted(){
        this.setData()
    },
    methods:{
        ...mapActions('person',['save','get_data']),

        setData(){
            if(this.profile)
            {
                if(this.profile.person)
                {
                    if(this.profile.person.data)
                    {
                        this.form = {
                            kode: this.profile.person.data.id,
                            nama_depan:this.profile.person.data.nama_depan,
                            nama_belakang:this.profile.person.data.nama_belakang,
                            profesi:this.profile.person.data.profesi,
                            email:this.profile.person.data.email,
                            phone:this.profile.person.data.telp,
                            alamat:this.profile.person.data.alamat,
                            kode_pos:this.profile.person.data.kode_pos,
                            kota:this.profile.person.data.kota,
                            tempat_lahir:this.profile.person.data.tempat_lahir,
                            tanggal_lahir:this.profile.person.data.tanggal_lahir,
                            sim:this.profile.person.data.sim,
                            jenis_kelamin:this.profile.person.data.jk,
                            kebangsaan:this.profile.person.data.kebangsaan,
                            status_pernikahan:this.profile.person.data.status_pernikahan,
                            linkedin:this.profile.person.data.linkedin,
                            website:this.profile.person.data.website,
                            file:'',
                            file_preview:''
                        }

                        if(this.profile.person.data.foto)
                        {
                            this.show_preview = true
                            this.form.file_preview = this.profile.person.data.foto
                        }
                    }
                }
            }
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

            this.$axios.patch('/auth/cv/person/'+this.form.kode, this.form)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.$router.replace("/cvbuilder/"+this.form.kode+"/riwayat");
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