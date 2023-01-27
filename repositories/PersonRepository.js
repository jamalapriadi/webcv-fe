const resource = '/auth/cv/person'

export default ($axios) =>({
    profile(){
        return $axios.get('/auth/cv/person')
    },

    save(data){
        return $axios.post('/auth/cv/person', data);
    }
}) 