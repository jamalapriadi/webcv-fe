export const state = () => ({
    judul: 'Section',
    fields:[
        {key:'No', label:'No.', sortable:false, thStyle:{width:'5%'}},
        {key:'preview_image', label:'', sortable:false},
        {key:'title', label:'Title', sortable:false},
        {key:'description', label:'Description', sortable:false, thStyle:{width:'25%'}},
        {key:'publish', label:'Publish', sortable:false},
        {key: 'actions',label:'', sortable: false, thStyle:{width:'15%'}}, 
    ],
    addLink: '/section/create',
    btnAction:true,
    edit_data_form: '/section',
    backBtn:'/section',
    lists:[],
    list:{},
    meta:{
        total: null,
        current_page: null,
        per_page: null,
        from: null,
        to: null
    },
    current_page:1,
    per_page:10,
    search:'',
    sortBy:'created_at',
    sortByDesc:false,
    success:false,
    isFinish:0,
    message:"",
    errors:{},
    forms:[
        {
            label:"Title",
            model: 'title',
            name:'title',
            id:'input-title',
            type:'text',
            placeholder:'Masukkan Title',
            required:true
        },
        {
            label:"Preview Image",
            model: 'preview',
            name:'preview',
            id:'input-preview',
            type:'file',
            variant:'image',
            placeholder:'Masukkan Preview Image',
            required:true
        },
        {
            label:"Description",
            model: 'description',
            name:'description',
            id:'input-description',
            type:'textarea',
            placeholder:'Masukkan Description',
            required:true
        },
        {
            label:"Publish?",
            model: 'publish',
            name:'publish',
            id:'input-publish',
            type:'switch',
            placeholder:'Masukkan Publish',
            required:true
        },
    ],
    nmodel:{
        kode:'',
        title:'',
        preview:'',
        description:'',
        publish:'N',
        fields:[]
    },
    alertMessage:"",
    types:[
        {
            id:'text',
            text:'Text'
        },
        {
            id:'textarea',
            text:'Textarea'
        },
        {
            id:'image',
            text:'Image'
        },
        {
            id:'link',
            text:'Link'
        }
    ],
})

export const mutations = {
    SET_ADD_FIELDS(state, payload){
        state.nmodel.fields = payload
    },

    SET_PATH_IMAGE(state, payload)
    {
        state.nmodel[payload.model] = payload.file
    },

    SET_HANDLE_SWITCH(state, e,m)
    {
        if(e == true)
        {
            state.nmodel.publish = 'Y'
        }else{
            state.nmodel.publish = 'N'
        }
        
    },

    CHANGE_IMAGE(state, file){
        state.nmodel.image = file
        state.nmodel.image_url = file
    },

    SET_MODEL(state, data){
        state.nmodel = {
            kode:data.id,
            title:data.title,
            preview:data.preview_image,
            description:data.description,
            publish:data.publish,
            fields: data.json_fields
        }
    },

    SET_RESET_MODEL(state){
        state.nmodel={
            kode:'',
            title:'',
            preview:'',
            description:'',
            publish:'N',
            types:[]
        }
    },

    SET_SEARCH(state, q){
        state.search = q
    },

    SET_CURRENT_PAGE(state, page){
        state.current_page = page
    },

    SET_PER_PAGE(state, page){
        state.per_page = page
    },

    SET_META_PAGE(state, page){
        state.meta = {
            total: page.total,
            current_page: page.current_page,
            per_page: page.per_page,
            from: null,
            to: null
        }
    },

    SET_LOAD_DATA(state, lists){
        state.lists = []
        state.lists = lists
    },

    SET_LIST_DATA(state, list){
        state.list = list
    },

    SET_SHOW_DATA(state, list){
        state.list = list
    },

    SET_MESSAGE(state, msg){
        state.message = msg
    },

    SET_SUCCESS(state, sucess){
        state.success = sucess
    },

    SET_ERROR(state, ero){
        state.errors = ero
    },

    SET_FINISH(state, isFinish){
        state.isFinish = isFinish
    },

    REMOVE_ALERT(state){
        state.message = ""
        state.success = false
        state.isFinish = 0
        state.alertMessage = ""
        this.errors={}
    },
}

export const actions = {
    async get_data({commit, state}){
        commit('SET_FINISH',1)
        commit('SET_RESET_MODEL')

        var params={
            per_page: state.per_page,
            page: state.current_page,
            q: state.search,
            sortby: state.sortBy,
            sortbydesc: state.sortByDesc ? 'DESC':'ASC'
        }
        const res = await this.$repositories.section.perPage(params)

        commit('SET_FINISH',2)

        if(res.status == 200 && res.data){
            commit('SET_LOAD_DATA', res.data)
            if(res.data.meta != null)
            {
                commit('SET_META_PAGE', res.data.meta.pagination)
            }
            
        }else{
            //handle error here
        }
    },

    /** fungsi untuk next page databale */
    async change_page({commit, dispatch}, val){
        commit('SET_CURRENT_PAGE',val)

        dispatch('get_data')
    },

    /** fungsi untuk change per_page */
    async change_per_page({commit, dispatch}, val){
        commit('SET_PER_PAGE', val.target.value)

        dispatch('get_data')
    },

    /** ketika search di ketik */
    async change_search_key({commit, dispatch}, val){
        commit('SET_SEARCH', val)
        dispatch('get_data')
    },

    /** menuju halaman edit **/
    goToEdit({state}, val){
        this.$router.push({ path: state.edit_data_form+'/'+val.item.id+"/edit" })
    },

    /** proses simpan data **/
    async save({commit, state}, payload){
        commit('SET_FINISH',1)

        try{
            const res = await this.$repositories.section.save(state.nmodel)
        
            commit('SET_FINISH',2)

            if(res.status == 201){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', 'Data Berhasil disimpan')
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)

                this.$router.replace(state.backBtn)

            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)
            }
        }catch(e){
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false)

            if(e.response.data){
                commit('SET_MESSAGE',e.response.data.message)
                commit('SET_ERROR', e.response.data.errors)
            }

            setTimeout(() => {
                commit('REMOVE_ALERT');
            }, 3000)
            
            return;
        }
    },

    /** menampilkan single data **/
    async show({commit,state}, id){
        commit('SET_FINISH',1)

        const res = await this.$repositories.section.show(id)
        
        commit('SET_MODEL',res.data.data)
        commit('SET_FINISH',2)
    },

    /** update data **/
    async update({commit, state}, payload){
        commit('SET_FINISH',1)

        try{
            const res = await this.$repositories.section.update(state.nmodel.kode, state.nmodel)
        
            commit('SET_FINISH',2)

            if(res.status == 201){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', 'Data Berhasil diupdate')
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)

                this.$router.replace(state.backBtn)

            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)
            }
        }catch(e){
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)

            setTimeout(() => {
                commit('REMOVE_ALERT');
            }, 3000)
            
            return;
        }
    },

    /** menampilkan popup hapus dan hapus data **/
    openDeleteModal({dispatch, commit}, val){
        this.$axios.delete(val.item.links.detail)
            .then(response => {
                if(response.data.success==true){

                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', 'Data Berhasil dihapus')
                    commit('SET_ERROR', {})

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)

                    dispatch('get_data')
                }else{
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', 'Data Gagal dihapus')
                    commit('SET_ERROR', {})

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)
                }
            })
    },

    changeImage({commit, state}, file){
        commit('CHANGE_IMAGE', file)
    },

    change_handle_switch({commit, state}, e,m)
    {
        commit('SET_HANDLE_SWITCH', e,m)
    },

    change_path_image({commit, state},payload){
        commit('SET_PATH_IMAGE', payload)
    },

    addFields({commit}, payload){
        commit('SET_ADD_FIELDS', payload)
    }
}