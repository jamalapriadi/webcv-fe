export const state = () => ({
    profile: {},
    availables:['description','pengalaman','pendidikan','minat','keahlian'],
    others:['bahasa','kursus','pencapaian','publikasi'],
    semua:['description','pengalaman','pendidikan','minat','keahlian','bahasa','kursus','pencapaian','publikasi'],
    loading:false,
    message:'',
    messageclass:'',
    templates:[],
    step1:{
        title:'Detail Pribadi',
        errors:[],
        btnText:'Selanjutnya',
        backBtn:'/cvbuilder',
        isFinish:false,
        success:false,
        message:'',
        nmodel:{
            nama_depan:'',
            nama_belakang:'',
            tempat_lahir:'',
            tanggal_lahir:''
        },
        forms:[
            {
                label:"Nama Depan",
                model: 'nama_depan',
                name:'nama_depan',
                id:'input-nama-depan',
                type:'text',
                placeholder:'Masukkan Nama Depan',
                required:true
            },
            {
                label:"Nama Belakang",
                model: 'nama_belakang',
                name:'nama_belakang',
                id:'input-nama-belakang',
                type:'text',
                placeholder:'Masukkan Nama Belakang',
                required:true
            },
            {
                label:"Tempat Lahir",
                model: 'tempat_lahir',
                name:'tempat_lahir',
                id:'input-tempat-lahir',
                type:'text',
                placeholder:'Masukkan Tempat Lahir',
                required:true
            },
            {
                label:"Tanggal Lahir",
                model: 'tanggal_lahir',
                name:'tanggal_lahir',
                id:'input-tanggal-lahir',
                type:'date',
                placeholder:'Masukkan Tanggal Lahir',
                required:true
            },
        ]
    }
})

export const mutations = {
    SET_MODEL(state, data){
        state.profile = data
    },

    SET_AVAILABLE(state, data){
        state.availables.push(data)
    },

    SET_OTHERS(state){
        var list =[]
        for(var a=0;a<state.others.length; a++)
        {
            var ada = 'N'
            for(var b=0;b<state.availables.length;b++)
            {
                if(state.others[a] == state.availables[b])
                {
                    ada = 'Y'
                }
            }

            if(ada == 'N')
            {
                list.push(state.others[a])
            }
        }

        state.others = list
    },
    
    SET_TEMPLATE(state,data){
        state.templates = data
    }
}

export const actions = {
    async get_data({commit}){
        const res = await this.$repositories.person.profile()

        commit('SET_MODEL', res.data)
    },

    async get_template({commit}){
        const res = await this.$repositories.cvtemplate.all()

        commit('SET_TEMPLATE', res.data)
    },

    change_bagian({commit}, val)
    {
        commit('SET_AVAILABLE', val)
        commit('SET_OTHERS')
    }
}