<template>
    <div>
        <div class="page-body">
            <div class="container-xl">
                <message :finish="isFinish" :success="success" :message="message" />
                <nuxt-crud-form-generator 
                    :list="forms" 
                    :errors="errors" 
                    :title="title" 
                    :nmodel="nmodel" 
                    :btnText="btnText" 
                    :backBtn="backBtn" 
                    @submit="handleSubmit"
                    @changeSwitch="handleSwitch"
                    @getResultPathImage="handlegetResultPathImage" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('template/show',params.id)
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "edit_template")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('template',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel,
            membertype: state => state.membertype
        })
    },
    data(){
        return {
            title:"Edit Template",
            btnText: "Update",
        }
    },
    methods:{
        ...mapActions('template',['save','show','change_handle_switch','change_path_image']),

        handleSubmit(val){
            this.save(val)
        },

        handleSwitch(e, m){
            this.change_handle_switch(e,m)
        },

        handlegetResultPathImage(md, fl)
        {
            var params ={
                model: md,
                file: fl
            }
            this.change_path_image(params)
        }
    }
}
</script>