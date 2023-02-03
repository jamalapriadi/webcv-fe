export const state = () => ({
    profile: {},
    availables:['description','pengalaman','keahlian','pendidikan','minat','social media'],
    others:['project','bahasa','kursus','pencapaian','publikasi'],
    semua:['description','pengalaman','pendidikan','minat','social media','keahlian','project','bahasa','kursus','pencapaian','publikasi'],
    loading:false,
    message:'',
    messageclass:'',
    templates:[],
    sosmeds:[],
    negara:[],
    struktur_fields:[
        {
            name:'informasi_tambahan',
            show:'N'
        },
        {
            name:'description',
            show:'Y'
        },
        {
            name:'pengalaman',
            show:'Y'
        },
        {
            name:'keahlian',
            show:'Y'
        },
        {
            name:'pendidikan',
            show:'Y'
        },
        {
            name:'minat',
            show:'Y'
        },
        {
            name:'social media',
            show:'Y'
        },
        {
            name:'project',
            show:'N'
        },
        {
            name:'bahasa',
            show:'N'
        },
        {
            name:'kursus',
            show:'N'
        },
        {
            name:'pencapaian',
            show:'N'
        },
        {
            name:'publikasi',
            show:'N'
        }
    ],
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
    SET_NEGARA(state, data){
        state.negara = data
    },

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
    },

    SET_SOSMED(state, data){
        state.sosmeds = data
    },

    SET_STRUKTUR_FIELDS(state,data)
    {
        for(var a=0;a<state.struktur_fields.length;a++)
        {
            if(state.struktur_fields[a].name == data.nama)
            {
                if(data.tambahan == true)
                {
                    state.struktur_fields[a].show = 'Y'
                }else{
                    state.struktur_fields[a].show = 'N'
                }
            }
        }
    },

    UPDATE_STRUKTUR_FIELDS(state, data){
        state.struktur_fields = data
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

    async get_social_media({commit}){
        const res = await this.$repositories.sosmed.all()

        commit('SET_SOSMED', res.data)
    },

    async get_negara({commit}){
        const res = await this.$repositories.negara.all()

        commit('SET_NEGARA', res.data)
    },

    change_bagian({commit}, val)
    {
        commit('SET_AVAILABLE', val)
        commit('SET_OTHERS')
    },

    change_struktur_field({commit}, params)
    {
        commit('SET_STRUKTUR_FIELDS',params)
    },

    update_current_stuktur_fields({commit}, data)
    {
        commit('UPDATE_STRUKTUR_FIELDS', data)
    }
}