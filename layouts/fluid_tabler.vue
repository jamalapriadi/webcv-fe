<template>
    <div class="page">
        <div class="page">
            <Header />

            <NavigationVue />

            <div class="page-wrapper">
                <!-- Page header -->
                <div class="page-header d-print-none">
                    <div class="container-xl">
                        <nuxt />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BottomNavigation from '../components/BottomNavigation.vue'
import Aside from '~/components/Aside.vue';
import NavigationVue from "~/components/Navigation.vue"

export default {
    head: {
        bodyAttrs: {
            class: "layout-fluid bg-white"
        }
    },
    data() {
        return {};
    },
    components: { BottomNavigation, Aside, NavigationVue }
}
</script>

<style>
    .toasting {
        color: #fff !important;
        background-color: green !important;
    }
</style>