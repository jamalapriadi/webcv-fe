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
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "create_new_social_media")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('sosmed',{
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
            title:"Create New Social Media",
            btnText: "Save",
        }
    },
    methods:{
        ...mapActions('sosmed',['save']),

        handleSubmit(val){
            this.save(val)
        }
    }
}
</script>