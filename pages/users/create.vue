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
                    @changeImage="handleChangeImage"
                    @handleInputPassword="changeHandleInputPassword" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    async fetch({store}){
        await store.dispatch('user/allroles')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "create_new_user")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('user',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel,
            roles: state => state.roles,
            merchants: state => state.merchants
        })
    },
    data(){
        return {
            title:"Create New User",
            btnText: "Save",
        }
    },
    methods:{
        ...mapActions('user',['save','changeImage','changeHandlePassword']),

        handleSubmit(val){
            this.save(val)
        },

        handleChangeImage(e){
            this.changeImage(e)
        },

        changeHandleInputPassword(e){
            this.changeHandlePassword(e)
        }
    }
}
</script>