export const state = () => ({
    success:false,
    isFinish:0,
    message:"",
    tunggu:"N",
    errors:{}
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
    SET_TUNGGU(state, data){
        state.tunggu = data
    },

    REMOVE_ALERT(state){
        state.message = ""
        state.success = false
        state.isFinish = 0
        this.errors={}
    },
    
}

export const actions = {
    async register({commit}, payload){
        commit('SET_FINISH',1)
        commit('SET_TUNGGU','Y')

        try {
            const res = await this.$repositories.guest.register(payload)

            commit('SET_FINISH',2)

            if(res.status == 201){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', 'Registrasi sukses, silakan cek email untuk aktivasi akun')

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)

                commit('SET_ERROR', {})
            }else{
                commit('SET_TUNGGU','N')
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})
            }
          
        } catch (e) {
            commit('SET_TUNGGU','N')
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)
            
            return;
        }
    },

    async verifikasi({commit}, val){
        commit('SET_FINISH',1)

        try {
            const res = await this.$repositories.guest.activation(val)

            commit('SET_FINISH',2)

            if(res.status == 200){
                if(res.data.success == true){
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)
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
    },

    async cekToken({commit}, val){
        commit('SET_FINISH',1)

        try {
            const res = await this.$repositories.guest.cekToken(val)

            commit('SET_FINISH',2)

            if(res.status == 200){
                if(res.data.success == true){
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)
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
    },

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