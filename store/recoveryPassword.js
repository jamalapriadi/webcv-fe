export const state = () => ({
    success:false,
    isFinish:0,
    message:"",
    errors:{},
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
    }
    
}

export const actions = {
    async recovery({commit}, val){
        commit('SET_FINISH',1)
        
        try {
            const res = await this.$repositories.guest.recoveryPassword(val)

            commit('SET_FINISH',2)

            if(res.status == 200){
                if(res.data.success == true){
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})

                    this.$router.replace("/login");
                }else{
                    commit('SET_SUCCESS', false);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})
                }
            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})
            }
          
        } catch (e) {
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)
            
            return;
        }
    }
}