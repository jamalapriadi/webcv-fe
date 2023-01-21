export const state =  () => ({
    list:{}
})

export const mutations = {
    SET_LIST(state, data){
        state.list = data
    }
}

export const actions = {
    async get_profile({commit}, slug){
        
        const res = await this.$repositories.webcv.profile(slug)

        commit('SET_LIST', res.data)
    }
}