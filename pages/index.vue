<template>
    <div class="bg-white">

        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <nuxt-link :to="'/'" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none" style="
                background:#1d273b;
                color:white;
                padding:10px">
                    <strong>CVAku</strong>
                </nuxt-link>

                <ul class="nav nav-pills">
                    <li class="nav-item active" v-if="this.$auth.loggedIn == false">
                        <nuxt-link :to="'/login'" class="nav-link">Login</nuxt-link>
                    </li>
                    <li class="nav-item" v-if="this.$auth.loggedIn == false">
                        <nuxt-link :to="'/register'" class="nav-link">Register</nuxt-link>
                    </li>

                    <li class="nav-item active" v-if="this.$auth.loggedIn == true">
                        <nuxt-link :to="'/dashboard'" class="nav-link">Dashboard</nuxt-link>
                    </li>
                </ul>
            </header>
        </div>

        <div class="px-4 pt-5 text-center border-bottom">
            <h3 class="display-5 fw-bold">
                CV and Web Builder <br>
                Buat CV dan Web Profesional anda dengan cepat
            </h3>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4">
                    Membuat CV dan Web bisa sangat melelahkan,
                    terutama jika Anda harus melakukan semuanya sendiri.
                    Kami membantu anda membuat CV dan Web profesional untuk anda.
                    mari ungguli pesaing anda dan dapatkan pekerjan impian itu.
                </p>
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <nuxt-link v-if="this.$auth.loggedIn == false" :to="'/login'" class="btn btn-primary btn-lg px-4 me-sm-3">
                        Buat CV Sekarang
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
export default{
    auth:false,
    layout:'default'
}
</script>