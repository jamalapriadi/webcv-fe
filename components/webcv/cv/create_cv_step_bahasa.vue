<template>
    <div>
        <div class="card mt-2" v-if="form">
            <div class="card-header" style="background:white;border:none">
                <strong>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-world" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M3.6 9l16.8 0"></path>
                        <path d="M3.6 15l16.8 0"></path>
                        <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                        <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                    </svg>
                    {{ $bahasa.showLabel({label:'Bahasa',negara:form.bahasa}) }}
                </strong>
            </div>
            <div class="card-body" v-if="form.bahasas">
                <div class="divide-y" v-if="form.bahasas.length > 0">
                    <div v-for="(l,idx) in form.bahasas" :key="idx">
                        <div class="row mb-3">
                            <div class="col">
                                <div class="text-truncate">
                                    <strong>{{ l.bahasa }}</strong>
                                    <div class="text-muted">Level : {{ getNamaKeahlian(l.level) }}</div>
                                </div>
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
                                <a href="#" @click.prevent="hapus(idx,l)">
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

                <hr class="mt-4" v-if="form.bahasas.length > 0">

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
                                    <label for="" class="control-label">{{ $bahasa.showLabel({label:'Label Bahasa',negara:form.bahasa}) }} </label>
                                    <input type="text" :class="getClassInput('bahasa')" :placeholder="$bahasa.showLabel({label:'misal. Bahasa Inggris',negara:form.bahasa})" v-model="state.bahasa">

                                    <span v-if="errors">
                                        <p class="text-danger" v-if="errors['bahasa']">{{ errors['bahasa'][0] }}</p>
                                    </span>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="form-group">
                                    <label for="" class="control-label">Level</label>

                                    <select name="level" id="level" class="form-select" v-model="state.level">
                                        <option value="0">{{ $bahasa.showLabel({label:'Pilih',negara:form.bahasa}) }}</option>
                                        <option value="100">{{ $bahasa.showLabel({label:'Penutur asli',negara:form.bahasa}) }}</option>
                                        <option value="75">{{ $bahasa.showLabel({label:'Sangat cakap berbicara dan menulis',negara:form.bahasa}) }}</option>
                                        <option value="50">{{ $bahasa.showLabel({label:'Pemahaman bahasa yang sangat baik',negara:form.bahasa}) }}</option>
                                        <option value="25">{{ $bahasa.showLabel({label:'Pemahaman bahasa yang baik dalam pekerjaan',negara:form.bahasa}) }}</option>
                                        <option value="20">{{ $bahasa.showLabel({label:'Pemahaman bahasa standar dalam pekerjaan',negara:form.bahasa}) }}</option>
                                        <option value="120">A1</option>
                                        <option value="130">A2</option>
                                        <option value="140">B1</option>
                                        <option value="160">B2</option>
                                        <option value="180">C1</option>
                                        <option value="200">C2</option>
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
                    {{ $bahasa.showLabel({label:'Tambah Bahasa lain',negara:form.bahasa}) }}
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
                bahasa:'',
                level:'0'
            },
            errors:[],
            loading:false,
            message:'',
            messageclass:'',
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
                bahasa:'',
                level:'0'
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
                    type:'bahasa',
                    form: this.state
                }

                this.add_pengalaman(params)
            }

            if(this.type == 'edit')
            {
                var params = {
                    idx : this.kode,
                    form: this.state,
                    type: 'bahasa'
                }

                this.edit_pengalaman(params)
            }
            

            this.reset()
        },

        edit(idx,l){
            this.state ={
                bahasa:l.bahasa,
                level:l.level
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
                        type:'bahasa'
                    }

                    this.delete_pengalaman(params)
                } else {
                    this.$swal('Cancelled', 'Data tidak di hapus', 'info')

                    this.$emit('changeStatusMember')
                }
            })
        },

        getNamaKeahlian(nama)
        {
            if(nama == 200)
            {
                return "C2"
            }else if(nama == 180)
            {
                return "C1"
            }else if(nama == 160)
            {
                return "B2"
            }else if(nama == 140)
            {
                return "B1"
            }else if(nama == 130)
            {
                return "A2"
            }else if(nama == 120){
                return "A1"
            }else if(nama == 100)
            {
                return "Penutur asli"
            }else if(nama == 75)
            {
                return "Sangat cakap berbicara dan menulis"
            }else if(nama == 50)
            {
                return "Pemahaman bahasa yang sangat baik"
            }else if(nama == 25)
            {
                return "Pemahaman bahasa yang baik dalam pekerjaan"
            }else if(nama == 20)
            {
                return "Pemahaman bahasa standar dalam pekerjaan"
            }
        }
    }
}
</script>