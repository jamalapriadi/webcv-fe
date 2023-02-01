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
                @getResultPathImage="handlegetResultPathImage">
                    <div slot="custom">
                        <hr>
                        <h3 class="card-title">Add Fields</h3>
                        <fieldset class="form-fieldset">
                            <div class="row">
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="" class="form-label">Name</label>
                                        <input type="text" v-model="form.name" class="form-control">
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="form-group">
                                        <label for="" class="form-label">Type Data</label>
                                        <select name="type" id="type" class="form-select" v-model="form.type">
                                            <option v-for="(l,idx) in types" :key="idx" :value="l.id">{{l.text}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="form-group">
                                        <a class="btn btn-primary" href="#" style="margin-top:25px" @click.prevent="addFormFields">
                                            Add Fields
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <table class="table" v-if="list_fields.length > 0">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Field Name</th>
                                    <th>Type Data</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(l,idx) in list_fields" :key="idx">
                                    <td>{{(idx+1)}}</td>
                                    <td>{{l.name}}</td>
                                    <td>{{l.type}}</td>
                                    <td>
                                        <a href="#" class="btn btn-danger btn-icon w-100" @click.prevent="deleteList(idx)">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <line x1="4" y1="7" x2="20" y2="7"></line>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </nuxt-crud-form-generator>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('section/get_section_category')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "create_new_section")
            {
                return true
            }
        }

        return false
    },
    computed:{
        ...mapState('section',{
            backBtn: state=> state.backBtn,
            forms: state=> state.forms,
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
            nmodel: state => state.nmodel,
            membertype: state => state.membertype,
            types: state => state.types
        })
    },
    data(){
        return {
            title:"Create New Section",
            btnText: "Save",
            form:{
                name:'',
                type:''
            },
            list_fields:[]
        }
    },
    methods:{
        ...mapActions('section',['save','change_handle_switch','change_path_image','addFields']),

        handleSubmit(val){
            // console.log(val)
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
        },

        addFormFields(){
            this.list_fields.push(
                {
                    name: this.form.name,
                    type: this.form.type
                }
            )

            this.addFields(this.list_fields)

            this.resetFormFields()
        },

        deleteList(idx){
            this.list_fields.splice(idx,1)

            this.addFields(this.list_fields)
        },

        resetFormFields(){
            this.form ={
                name:'',
                type:''
            }
        }
    }
}
</script>