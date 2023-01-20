export const state = () => ({
    success:false,
    isFinish:0,
    message:"",
    errors:{},
    kode:'',
    form:[
        {
            label:"Password",
            model: 'password',
            name:'password',
            id:'input-password',
            type:'password',
            placeholder:'Password',
            required:true,
            kelas:'username-email'
        },
        {
            label:"Password Confirmation",
            model: 'password_confirmation',
            name:'password_confirmation',
            id:'input-password_confirmation',
            type:'password',
            placeholder:'Password Confirmation',
            required:true,
            kelas:'username-email'
        }
    ],
    nmodel:{
        password:'',
        password_confirmation:''
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
    REMOVE_ALERT(state){
        state.message = ""
        state.success = false
        state.isFinish = 0
        this.errors={}
    },
    
    SET_RESET(state){
        state.nmodel = {
            kode:'',
            password:'',
            password_confirmation:''
        }
    },

    SET_KODE(state,data){
        state.kode = data
    }
    
}

export const actions = {
    async recovery({commit, state}, val){
        commit('SET_FINISH',1)
        
        try {
            const res = await this.$repositories.guest.recoveryPassword(val)

            commit('SET_FINISH',2)

            if(res.status == 200){
                if(res.data.success == true){
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})
                    commit('SET_RESET')

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
    },

    async cekToken({commit}, val){
        commit('SET_FINISH',1)

        try {
            const res = await this.$repositories.guest.cekToken(val.id)
            commit('SET_KODE',val.id)

            commit('SET_FINISH',2)

            if(res.status == 200){
                if(res.data.success == true){
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})
                    commit('SET_RESET')

                    commit('REMOVE_ALERT');
                }else{
                    commit('SET_SUCCESS', false);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})

                    alert(res.data.message)
                    this.$router.replace("/login");
                }
                
            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
                commit('SET_ERROR', {})
            }
          
        } catch (e) {
            console.log(e)
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)
            
            return;
        }
    },
}