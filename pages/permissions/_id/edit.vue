<template>
    <div>
        <div class="page-body">
            <div class="container-xl">
                <message :finish="isFinish" :success="success" :message="message" />
                <nuxt-crud-form-generator :list="forms" :errors="errors" :title="title" :nmodel="nmodel" :btnText="btnText" :backBtn="backBtn" @submit="handleSubmit"/>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    computed:{
        ...mapState('permission',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel
        })
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "edit_permission")
            {
                return true
            }
        }

        return false
    },
    data(){
        return {
            title:"Update Permission",
            btnText: "Update",
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('permission',['update','show']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.show(id)
        },

        handleSubmit(val){
            this.update(val)
        }
    }
}
</script>