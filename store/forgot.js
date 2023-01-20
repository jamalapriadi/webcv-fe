export const state = () => ({
    success:false,
    isFinish:0,
    message:"",
    errors:{},
    form:[
        {
            label:"Username / Email",
            model: 'username',
            name:'username',
            id:'input-username',
            type:'text',
            placeholder:'Username / Email',
            required:true,
            kelas:'username-email'
        }
    ],
    nmodel:{
        username:''
    },
})

export const mutations = {
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
    SET_RESET(state){
        state.nmodel = {
            username:''
        }
    }
    
}

export const actions = {
    async sendemail({commit}, val){
        commit('SET_FINISH',1)

        try {
            const res = await this.$repositories.guest.forgot(val)

            commit('SET_FINISH',2)

            if(res.status == 200){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})
                commit('SET_RESET')
            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})
            }
          
        } catch (e) {
            console.log(e.response.data.errors)
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)
            
            return;
        }
    }
}