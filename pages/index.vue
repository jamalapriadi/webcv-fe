<template>
    <div v-if="location">
        <div class="px-4 pt-5 text-center border-bottom">
            <h3 class="display-5 fw-bold">
                {{ $bahasa.showLabelFields({label:'CV dan Web Builder',negara:location.countryCode ? location.countryCode : 'ID'}) }} <br>
                {{ $bahasa.showLabelFields({label:'Buat CV dan Web Profesional anda dengan cepat',negara:location.countryCode ? location.countryCode : 'ID'}) }}
            </h3>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">
                    {{ $bahasa.showLabelFields({label:'Membuat CV dan Web bisa sangat melelahkan, terutama jika Anda harus melakukan semuanya sendiri. Kami membantu anda membuat CV dan Web profesional untuk anda. mari ungguli pesaing anda dan dapatkan pekerjan impian itu.',negara:location.countryCode ? location.countryCode : 'ID'}) }}
                </p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <nuxt-link v-if="this.$auth.loggedIn == false" :to="'/create-cv'" class="btn btn-primary btn-lg px-4 me-sm-3">
                        {{ $bahasa.showLabelFields({label:'Buat CV Sekarang',negara:location.countryCode ? location.countryCode : 'ID'}) }}
                    </nuxt-link>

                    <nuxt-link v-if="this.$auth.loggedIn == true" :to="'/dashboard'" class="btn btn-primary btn-lg px-4 me-sm-3">
                        Dashboard
                    </nuxt-link>
                    <!-- <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button> -->
                </div>
            </div>
            <div class="overflow-hidden" style="max-height: 30vh;">
                <div class="container px-5">
                    <img src="~/static/img/leven_preview_3.jpg" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default{
    auth:false,
    layout:'default',
    async fetch({store, params}){
        await store.dispatch('createcv/get_location')
    },
    computed:{
        ...mapState('createcv',{
            location: state=> state.location,
        })
    }
}
</script>