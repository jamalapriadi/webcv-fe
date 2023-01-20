const resource = '/auth/template'

export default ($axios) =>({
    profile(slug){
        return $axios.get('/user/'+slug)
    },
}) 