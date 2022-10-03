// const resource = "/guest"

export default ($axios) => ({
    register(payload){
        return $axios.post('/registrasi', payload)
    },

    forgot(payload){
        return $axios.post('/password/forgot', payload)
    },

    activation(token){
        return $axios.post('/verifikasi/'+token);
    },

    recoveryPassword(payload){
        return $axios.post('/password/recovery', payload)
    },

    cekToken(token){
        return $axios.post('/cek-token/'+token);
    }
})