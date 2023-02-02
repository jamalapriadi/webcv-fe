<template>
    <div class="page">
        <Aside></Aside>
        <Header />
        <!-- <Navigation /> -->

        <div class="page-wrapper">
            <slot name="pageheader"></slot>

            <nuxt />

            <!-- <div class="page-body">
                <div class="container-xl">
                    <nuxt />
                </div>
            </div> -->

            <Footer />
        </div>

        <!-- <BottomNavigation></BottomNavigation> -->
    </div>
</template>

<script>
import BottomNavigation from '../components/BottomNavigation.vue'
import Aside from '~/components/Aside.vue';
export default {
    head(){
        return {
            bodyAttrs: {
                class: "border-top-wide border-primary d-flex flex-column"
            },
            link: [
                { 
                    rel: 'stylesheet', 
                    type: 'text/css', 
                    crossorigin: 'anonymous',
                    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD' 
                }
            ]
        }
    },
    data() {
        return {};
    },
    components: { BottomNavigation, Aside }
}
</script>

<style>
    .toasting {
        color: #fff !important;
        background-color: green !important;
    }
</style>