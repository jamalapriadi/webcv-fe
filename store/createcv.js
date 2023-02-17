export const state = () => ({
    current_step:1,
    form:{
        nama_depan:'',
        nama_belakang:'',
        profesi:'',
        email:'',
        phone:'',
        alamat:'',
        kode_pos:'',
        kota:'',
        tempat_lahir:'',
        tanggal_lahir:'',
        sim:'',
        jenis_kelamin:'L',
        kebangsaan:'',
        status_pernikahan:'Belum Kawin',
        linkedin:'',
        website:'',
        file:'',
        file_preview:'',
        description:'',
        bahasa:'EN',
        struktur_fields:[
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
        pengalaman:[],
        pendidikan:[],
        minat:[],
        keahlian:[],
        bahasas:[],
        kursus:[],
        pencapaian:[],
        publikasi:[],
        project:[],
        sosmed:[],
        template_id:'',
        informasi_tambahan:'N'
    },
    negara:[],
    sosmed:[],
    template:[],
    location:{}
})

export const mutations = {
    SET_RESET_ULANG(state){
        state.current_step =  1
        state.form = {
            nama_depan:'',
            nama_belakang:'',
            profesi:'',
            email:'',
            phone:'',
            alamat:'',
            kode_pos:'',
            kota:'',
            tempat_lahir:'',
            tanggal_lahir:'',
            sim:'',
            jenis_kelamin:'L',
            kebangsaan:'',
            status_pernikahan:'Belum Kawin',
            linkedin:'',
            website:'',
            file:'',
            file_preview:'',
            description:'',
            bahasa:'EN',
            struktur_fields:[
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
            pengalaman:[],
            pendidikan:[],
            minat:[],
            keahlian:[],
            bahasas:[],
            kursus:[],
            pencapaian:[],
            publikasi:[],
            project:[],
            sosmed:[],
            template_id:'',
            informasi_tambahan:'N'
        }
    },

    SET_INFORMASI_TAMBAHAN(state, data){
        state.form.informasi_tambahan = data
    },

    SET_LOCATION(state, data){
        state.location = data

        if(state.location)
        {
            if(state.location.countryCode)
            {
                if(state.location.countryCode == 'ID')
                {
                    state.form.bahasa = 'ID'
                }else{
                    state.form.bahasa = 'EN'
                }
            }else{
                state.form.bahasa = 'ID'
            }
        }
    },

    SET_PATH_FOTO(state, data){
        state.form.file = data 
        state.form.file_preview = data
    },

    SET_CLEAR_PATH_FOTO(state){
        state.form.file = ''
        state.form.file_preview = ''
    },

    SET_DEFAULT_TEMPLATE(state, data){
        state.form.template_id = data
    },

    SET_ALL_TEMPLATE(state, data){
        state.template = data
    }, 

    SET_SOSMED(state, data){
        state.sosmed = data
    },

    SET_NEGARA(state, data){
        state.negara = data
    },

    SET_CURRENT_STEP(state, data){
        state.current_step = data
    },

    SET_STRUKTUR_FIELDS(state,data)
    {
        for(var a=0;a<state.form.struktur_fields.length;a++)
        {
            if(state.form.struktur_fields[a].name == data.nama)
            {
                if(data.tambahan == true)
                {
                    state.form.struktur_fields[a].show = 'Y'
                }else{
                    state.form.struktur_fields[a].show = 'N'
                }
            }
        }
    },

    ADD_NEW_PENGALAMAN(state, data){
        if(data.type == 'pengalaman')
        {
            state.form.pengalaman.push(data.form)
        }else if(data.type == 'pendidikan')
        {
            state.form.pendidikan.push(data.form)
        }else if(data.type == 'minat')
        {
            state.form.minat.push(data.form)
        }else if(data.type == 'keahlian')
        {
            state.form.keahlian.push(data.form)
        }else if(data.type == 'bahasa')
        {
            state.form.bahasas.push(data.form)
        }else if(data.type == 'kursus')
        {
            state.form.kursus.push(data.form)
        }else if(data.type == 'pencapaian')
        {
            state.form.pencapaian.push(data.form)
        }else if(data.type == 'publikasi')
        {
            state.form.publikasi.push(data.form)
        }else if(data.type == 'project')
        {
            state.form.project.push(data.form)
        }else if(data.type == 'sosmed')
        {
            state.form.sosmed.push(data.form)
        }
        
    },

    SET_EDIT_PENGALAMAN(state, data){
        if(data.type == 'pengalaman')
        {
            for(var a=0; a<state.form.pengalaman.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.pengalaman[a] = data.form
                }
            }
        }else if(data.type == 'pendidikan')
        {
            for(var a=0; a<state.form.pendidikan.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.pendidikan[a] = data.form
                }
            }
        }else if(data.type == 'minat')
        {
            for(var a=0; a<state.form.minat.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.minat[a] = data.form
                }
            }
        }else if(data.type == 'keahlian')
        {
            for(var a=0; a<state.form.keahlian.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.keahlian[a] = data.form
                }
            }
        }else if(data.type == 'bahasa')
        {
            for(var a=0; a<state.form.bahasas.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.bahasas[a] = data.form
                }
            }
        }else if(data.type == 'kursus')
        {
            for(var a=0; a<state.form.kursus.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.kursus[a] = data.form
                }
            }
        }else if(data.type == 'pencapaian')
        {
            for(var a=0; a<state.form.pencapaian.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.pencapaian[a] = data.form
                }
            }
        }else if(data.type == 'publikasi')
        {
            for(var a=0; a<state.form.publikasi.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.publikasi[a] = data.form
                }
            }
        }else if(data.type == 'project')
        {
            for(var a=0; a<state.form.project.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.project[a] = data.form
                }
            }
        }else if(data.type == 'sosmed')
        {
            for(var a=0; a<state.form.sosmed.length; a++)
            {
                if(a == data.idx)
                {
                    state.form.sosmed[a] = data.form
                }
            }
        }
        
    },

    DELETE_PENGALAMAN(state, data)
    {
        if(data.type == 'pengalaman')
        {
            state.form.pengalaman.splice(data.idx, 1)
        }else if(data.type == 'pendidikan')
        {
            state.form.pendidikan.splice(data.idx, 1)
        }else if(data.type == 'minat')
        {
            state.form.minat.splice(data.idx, 1)
        }else if(data.type == 'keahlian')
        {
            state.form.keahlian.splice(data.idx, 1)
        }else if(data.type == 'bahasa')
        {
            state.form.bahasas.splice(data.idx, 1)
        }else if(data.type == 'kursus')
        {
            state.form.kursus.splice(data.idx, 1)
        }else if(data.type == 'pencapaian')
        {
            state.form.pencapaian.splice(data.idx, 1)
        }else if(data.type == 'publikasi')
        {
            state.form.publikasi.splice(data.idx, 1)
        }else if(data.type == 'project')
        {
            state.form.project.splice(data.idx, 1)
        }else if(data.type == 'sosmed')
        {
            state.form.sosmed.splice(data.idx, 1)
        }

    }
}

export const actions = {
    change_current_state({commit}, val)
    {
        commit('SET_CURRENT_STEP', val)
    },

    async get_negara({commit}){
        const res = await this.$repositories.negara.allnoauth()

        commit('SET_NEGARA', res.data)
    },

    async get_sosmed({commit}){
        const res = await this.$repositories.sosmed.allnoauth()

        commit('SET_SOSMED', res.data)
    },

    async get_template({commit}){
        const res = await this.$repositories.template.allnoauth()

        commit('SET_ALL_TEMPLATE', res.data)
    },

    async get_location({commit}){
        const res = await this.$repositories.template.location()

        commit('SET_LOCATION', res.data)
    },

    change_struktur_field({commit}, params)
    {
        commit('SET_STRUKTUR_FIELDS',params)
    },

    add_pengalaman({commit}, data)
    {
        commit('ADD_NEW_PENGALAMAN', data)
    },

    edit_pengalaman({commit}, data){
        commit('SET_EDIT_PENGALAMAN',data)
    },

    delete_pengalaman({commit}, data)
    {
        commit('DELETE_PENGALAMAN',data)
    },

    change_default_template({commit}, val)
    {
        commit('SET_DEFAULT_TEMPLATE', val)
    },

    change_path_foto({commit}, val){
        commit('SET_PATH_FOTO', val)
    },

    clear_path_foto({commit}){
        commit('SET_CLEAR_PATH_FOTO')
    },

    change_informasi_tambahan({commit},val){
        commit('SET_INFORMASI_TAMBAHAN',val)
    },

    reset_ulang({commit}){
        commit('SET_RESET_ULANG')
    }
}