const resource = '/auth/template'

export default ($axios) =>({
    perPage(data){
        return $axios.get(`${resource}`, {params:data})
    },
    
    all(){
        return $axios.get('/auth/template-all')
    },

    allnoauth(){
        return $axios.get('/template-all')
    },

    save(payload){
        return $axios.post(`${resource}`, payload)
    },
    
    show(id){
        return $axios.get(`${resource}/${id}`)
    },

    update(id, payload){
        return $axios.put(`${resource}/${id}`, payload);
    },

    delete(id){
        return $axios.delete(`${resource}/${id}`)
    },
}) 