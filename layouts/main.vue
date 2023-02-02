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
            link:[
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/bootstrap.min.css"
                },
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
    html{
        background:white;
        margin: 0;
        padding: 0;
        border: 0;
    }
    body{
        background:white
    }
    .toasting {
        color: #fff !important;
        background-color: green !important;
    }
</style>