<template>
    <div>
        <div class="page-body">
            <div class="container-xl">
                <message :finish="isFinish" :success="success" :message="message" />

                <nuxt-card-datatable 
                    :title="title" 
                    :fields="fields" 
                    :addLink="addLink" 
                    :btnAction="btnAction" 
                    :meta="meta" 
                    :lists="lists"
                    :hasilcari="hsearch"
                    :editUrl="edit_data_form"
                    @search="handleSearch"
                    @edit="handleEdit"
                    @delete="handleDelete"
                    @changePerPage="handlechangePerPage"
                    @pagination="handlePagination"
                    @changeStatusUser="handleChangeStatusUser">

                    <div slot="filtertable">
                        <div class=" mt-2 mb-2">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-auto">
                                            <div class="form-group">
                                                <label for="" class="form-label">Nama</label>
                                                <input v-model="cari.key" type="text" class="form-control">
                                            </div>
                                        </div>

                                        <div class="col-auto" v-if="roles && roles.data">
                                            <div class="form-group">
                                                <label for="" class="form-label">Role</label>
                                                <select v-model="cari.role" name="role" id="role" class="form-control">
                                                    <option value="" disabled selected>--Select Role--</option>
                                                    <option v-for="(l,idx) in roles.data" :key="idx" :value="l.id">{{l.nama}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <div class="form-group">
                                                <label for="" class="form-label">Active</label>
                                                <select v-model="cari.active" name="status" id="status" class="form-select">
                                                    <option value="A">Semua</option>
                                                    <option value="Y">Active</option>
                                                    <option value="N">Non Active</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-3">
                                            <div class="form-group" style="margin-top:25px">
                                                <a href="#" class="btn btn-info" title="Filter" @click.prevent="filterData">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <circle cx="10" cy="10" r="7"></circle>
                                                        <line x1="21" y1="21" x2="15" y2="15"></line>
                                                    </svg>
                                                    Filter
                                                </a>
                                                <a href="#" class="btn btn-warning" title="Reset" @click.prevent="resetData">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-zoom-reset" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M21 21l-6 -6"></path>
                                                        <path d="M3.268 12.043a7.017 7.017 0 0 0 6.634 4.957a7.012 7.012 0 0 0 7.043 -6.131a7 7 0 0 0 -5.314 -7.672a7.021 7.021 0 0 0 -8.241 4.403"></path>
                                                        <path d="M3 4v4h4"></path>
                                                    </svg>
                                                    Reset
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </nuxt-card-datatable>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import nuxtCardDatatable from '~/components/nuxt-card-datatable.vue'

export default {
    components: { nuxtCardDatatable },
    layout:'main',
    async fetch({store}){
        await store.dispatch('user/get_data')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "list_user")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('user',{
            fields: state=> state.fields,
            per_page: state=> state.per_page,
            lists: state => state.lists,
            meta: state => state.meta,
            isFinish: state => state.isFinish,
            addLink: state => state.addLink,
            btnAction: state => state.btnAction,
            success: state => state.success,
            message: state => state.message,
            hsearch: state => state.search,
            edit_data_form: state => state.edit_data_form
        })
    },
    data(){
        return{
            title:'Users',
            roles:[],
            cari:{
                key:'',
                role:'',
                active:'A',
            }
        }
    },
    mounted(){
        this.getRoles()
    },
    methods:{
        ...mapActions('user',['get_data','change_page','change_per_page','change_search_key','goToEdit','openDeleteModal','searchData']),

        getRoles(){
            this.$axios.get('/api/auth/all-role')
                .then(resp => {
                    this.roles = resp.data
                })
        },

        handleEdit(val){
            // this.goToEdit(val)
            this.$router.push({ path: this.edit_data_form+'/'+val.item.id+"/edit" })
        },

        handleDelete(val){
            this.$swal({
                title: 'Warning?',
                text: 'Apakah anda yakin ingin menghapus data ini? Setelah menghapus, Anda tidak dapat mengembalikan lagi.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ya, Hapus',
                confirmButtonColor: '#EC5941',
                showCloseButton: true,
                reverseButtons:true,
                showLoaderOnConfirm: true,
                customClass: {
                    actions:'text-right',
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-white'
                },
                buttonsStyling: false
            })
            .then((result) => {
                if(result.value) {
                    this.openDeleteModal(val)
                    
                } else {
                    this.$swal('Cancelled', 'Data anda masih tersimpan', 'info')
                }
            })
        },

        handleSearch(val){
            this.change_search_key(val)
        },

        handlePagination(val){
            this.change_page(val)
        },

        handlechangePerPage(val){
            this.change_per_page(val)
        },

        handleChangeStatusUser(){
            this.get_data()
        },

        filterData(){
            this.searchData(this.cari)
        },

        resetData(){
            this.cari = {
                key:'',
                role:'',
                active:'A',
            }

            this.filterData()
        }
    }
}
</script>