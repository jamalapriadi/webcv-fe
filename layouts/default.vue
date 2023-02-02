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
                    <li class="nav-item" v-if="this.$auth.loggedIn == false">
                        <nuxt-link :to="'/'" class="nav-link">Home</nuxt-link>
                    </li>
                    <li class="nav-item" v-if="this.$auth.loggedIn == false">
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

        <nuxt />
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
}
</script>