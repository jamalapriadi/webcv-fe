<template>
    <div>
        <div class="card mt-2" v-if="person">
            <div class="card-header" style="background:white;border:none">
                <strong>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mouse-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 3m0 4a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-4a4 4 0 0 1 -4 -4z"></path>
                        <path d="M12 3v7"></path>
                        <path d="M6 10h12"></path>
                    </svg>
                    {{ $bahasa.showLabel({label:'Keahlian',negara:person.cv_bahasa}) }}
                </strong>
            </div>
            <div class="card-body" v-if="person.keahlian">
                <div class="divide-y" v-if="person.keahlian.data.length > 0">
                    <div v-for="(l,idx) in person.keahlian.data" :key="idx">
                        <div class="row mb-3">
                            <div class="col">
                                <div class="text-truncate">
                                    <strong>{{ l.keahlian }}</strong>
                                    <div class="text-muted">Level : {{ $bahasa.showLabel({label:l.nama_level,negara:person.cv_bahasa}) }}</div>
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

                <hr class="mt-4" v-if="person.keahlian.data.length > 0">

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
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Label Keahlian',negara:person.cv_bahasa}) }} </label>
                                    <input type="text" :class="getClassInput('keahlian')" :placeholder="$bahasa.showLabel({label:'misal. Microsoft Word',negara:person.cv_bahasa})" v-model="state.keahlian">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['keahlian']">{{ errors['keahlian'][0] }}</p>
                                    </span>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="form-group">
                                    <label for="" class="control-label">Level</label>

                                    <select name="level" id="level" class="form-select" v-model="state.level">
                                        <option value="">--Select Level--</option>
                                        <option v-for="(l,idx) in levels" :key="idx" :value="l.id">{{ $bahasa.showLabel({label:l.text,negara:person.cv_bahasa}) }}</option>
                                    </select>

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['level']">{{ errors['level'][0] }}</p>
                                    </span>
                                </div>
                            </div>
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
                    {{ $bahasa.showLabel({label:'Tambah Skill lain',negara:person.cv_bahasa}) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['person'],
    data(){
        return {
            tambahan:false,
            state:{
                kode:'',
                person_id:this.person.id,
                keahlian:'',
                level:''
            },
            errors:[],
            loading:false,
            message:'',
            messageclass:'',
            levels:[
                {
                    id:'5',
                    text:'Ahli'
                },
                {
                    id:'4',
                    text:'Berpengalaman'
                },
                {
                    id:'3',
                    text:'Terampil'
                },
                {
                    id:'2',
                    text:'Menengah'
                },
                {
                    id:'1',
                    text:'Pemula'
                },
            ],
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
                keahlian:'',
                level:''
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
            this.$axios.post('/auth/cv/keahlian', this.state)
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
                keahlian:l.keahlian,
                level: l.level
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