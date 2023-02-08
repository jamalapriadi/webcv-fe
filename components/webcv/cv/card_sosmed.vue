<template>
    <div>
        <div class="card mt-2" v-if="person">
            <div class="card-header" style="background:white;border:none">
                <strong>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path>
                        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path>
                    </svg>
                    Link / Social Media
                </strong>
            </div>
            <div class="card-body" v-if="person.sosmed">
                <div class="divide-y" v-if="person.sosmed.data.length > 0">
                    <div v-for="(l,idx) in person.sosmed.data" :key="idx">
                        <div class="row mb-3">
                            <div class="col">
                                <div class="text-truncate" v-if="l.sosmed">
                                    <strong v-if="l.sosmed.data">
                                        <span v-html="l.sosmed.data.icon"></span>
                                        {{ l.sosmed.data.nama }}
                                    </strong>
                                    <div class="text-muted">
                                        <a :href="l.link_social_media" target="_blank">{{ l.link_social_media }}</a>
                                    </div>
                                </div>
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

                <hr class="mt-4" v-if="person.sosmed.data.length > 0">

                <div v-if="tambahan" class="mt-3">
                    <form action="#" class="mb-5" @submit.prevent="simpan">
                        <div v-if="loading" class="mt-2 text-center">
                            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                        </div>

                        <div v-if="message" :class="messageclass" role="alert">
                            <div class="text-muted" v-html="message"></div>
                        </div>

                        <div class="form-group" v-if="sosmed">
                            <label for="" class="control-label">Social Media</label>
                            <select class="form-select" v-model="state.sosmed">
                                <option value="" disabled selected>Pilih</option>
                                <option v-for="(l,idx) in sosmed.data" :key="idx" :value="l.id">{{ l.nama }}</option>
                            </select>

                            <span v-if="errors">
                                <p class="text-danger" v-if="errors['sosmed']">{{ errors['sosmed'][0] }}</p>
                            </span>
                        </div>

                        <div class="form-group">
                            <label for="" class="control-label">Link</label>
                            <input type="text" :class="getClassInput('link')" v-model="state.link" placeholder="Link Website / Social Media">

                            <span v-if="errors">
                                <p class="text-danger" v-if="errors['link']">{{ errors['link'][0] }}</p>
                            </span>
                        </div>

                        

                        <div class="text-end">
                            <div class="d-flex">
                                <a href="#" class="btn btn-link" @click.prevent="reset">Cancel</a>
                                <button type="submit" class="btn btn-outline-primary ms-auto">{{ $bahasa.showLabel({label:'Simpan',negara:person.cv_bahasa}) }} </button>
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
                    {{ $bahasa.showLabel({label:'Tambah Link / Social Media lain',negara:person.cv_bahasa}) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['person','sosmed'],
    data(){
        return {
            tambahan:false,
            state:{
                kode:'',
                person_id:this.person.id,
                sosmed:'',
                link:''
            },
            errors:[],
            loading:false,
            message:'',
            messageclass:'',
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
                sosmed:'',
                link:''
            }

            this.message = ''
            this.messageclass =''
            this.addTambahan()
        },

        simpan(){
            this.loading = true
            this.$axios.post('/auth/cv/person-sosmed', this.state)
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

                        this.reset()

                        this.$emit('sukses')
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

        edit(l){
            this.state ={
                kode:l.id,
                person_id:this.person.id,
                sosmed:l.social_media_id,
                link: l.link_social_media
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