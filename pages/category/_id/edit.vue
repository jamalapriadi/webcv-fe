<template>
    <div class="page-body">
        <div class="container-xl">
            <message :finish="isFinish" :success="success" :message="message" />
            <nuxt-crud-form-generator :list="forms" :errors="errors" :title="title" :nmodel="nmodel" :btnText="btnText" :backBtn="backBtn" @submit="handleSubmit"/>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('category/show',params.id)
    },
    computed:{
        ...mapState('category',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel
        })
    },
    data(){
        return {
            title:"Update Category",
            btnText: "Update",
        }
    },
    methods:{
        ...mapActions('category',['update','show']),

        handleSubmit(val){
            this.update(val)
        }
    }
}
</script>