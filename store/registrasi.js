export const state = () => ({
    success:false,
    isFinish:0,
    message:"",
    tunggu:"N",
    errors:{},
    form:[
        {
            label:"Email",
            model: 'username',
            name:'username',
            id:'input-username',
            type:'text',
            placeholder:'Email',
            required:true,
            kelas:'username-email'
        },
        {
            label:"Password",
            model: 'password',
            name:'password',
            id:'input-password',
            type:'password',
            placeholder:'Password',
            required:true,
            show_forgot:'Y',
            kelas:'username-email',
        }
    ],
    formregister:[
        {
            type:"text",
            name:"nama",
            model:"nama",
            label:"Name",
            placeholder:"Please Input Name",
            required:true,
            value:''
        },
        {
            type:"email",
            name:"email",
            model:"email",
            label:"Email",
            placeholder:"Please Input Email",
            required:true,
            value:''
        },
        {
            type:"password",
            name:"password",
            model:"password",
            label:"Password",
            placeholder:"Please Input Password",
            required:true,
            show_forgot:'N',
            value:''
        },
        {
            type:"password",
            name:"password_confirmation",
            model:"password_confirmation",
            label:"Password Confirmation",
            placeholder:"Please Input Password Confirmation",
            required:true,
            show_forgot:'N',
            value:''
        },
    ],
    nmodel:{
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        password_confirmation:''
    }
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

    SET_RESET_NMODEL(state){
        state.nmodel = {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            password_confirmation:''
        }
    }
    
}

export const actions = {
    async login({commit}, val){
        commit('SET_FINISH',1)
        commit('SET_TUNGGU','Y')

        try{
            const res = await this.$auth.loginWith('laravelJWT', {
                data: {
                    username: val.username,
                    password: val.password,
                    level: 'Customer',
                    source: 'login'
                }
            })

            commit('SET_FINISH',2)

            if(res.data.success == true)
            {
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', res.data.message)
                this.$router.replace("/dashboard");

                setTimeout(() => {
                    commit('REMOVE_ALERT');
                }, 3000)
            }else{
                commit('SET_SUCCESS', false);
                commit('SET_MESSAGE', res.data.message)
            }
        }catch (e) {
            commit('SET_TUNGGU','N')
            commit('SET_FINISH',2)
            commit('SET_SUCCESS', false);
            commit('SET_MESSAGE',e.response.data.message)
            commit('SET_ERROR', e.response.data.errors)
            
            return;
        }
    },

    async register({commit}, payload){
        commit('SET_FINISH',1)
        commit('SET_TUNGGU','Y')

        try {
            const res = await this.$repositories.guest.register(payload)

            commit('SET_FINISH',2)

            if(res.status == 201){
                commit('SET_SUCCESS', true);
                commit('SET_MESSAGE', 'Registrasi sukses, silakan cek email untuk aktivasi akun')
                commit('SET_RESET_NMODEL')

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
            const res = await this.$repositories.guest.activation(val.id)

            commit('SET_FINISH',2)

            if(res.status == 200){
                if(res.data.success == true){
                    commit('SET_SUCCESS', true);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})

                    alert(res.data.message)

                    this.$router.replace("/login");

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)
                }else{
                    commit('SET_SUCCESS', false);
                    commit('SET_MESSAGE', res.data.message)
                    commit('SET_ERROR', {})

                    alert(res.data.message)

                    setTimeout(() => {
                        commit('REMOVE_ALERT');
                    }, 3000)

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