<template>
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
                @changeStatusMember="get_data" />
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
        await store.dispatch('cvtemplate/get_data')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "list_cv_template")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('cvtemplate',{
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
            title:'Cv Template',
        }
    },
    methods:{
        ...mapActions('cvtemplate',['get_data','change_page','change_per_page','change_search_key','goToEdit','openDeleteModal']),

        handleEdit(val){
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
    }
}
</script>