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
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions('template',['save','show','change_handle_switch','change_path_image']),

        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.show(id)
        },

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