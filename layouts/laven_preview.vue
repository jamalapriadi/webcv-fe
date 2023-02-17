<template>
    <div class="page">
        <!-- <div class="lm-animated-bg"></div> -->
    
        <!-- Loading animation -->
        <!-- <div class="preloader">
            <div class="preloader-animation">
                <div class="preloader-spinner">
                </div>
            </div>
        </div> -->
        <!-- /Loading animation -->

        <!-- <pre>{{ $auth.user.data.webcv.data }}</pre> -->

        <!-- Scroll To Top Button -->
        <div class="lmpixels-scroll-to-top"><i class="lnr lnr-chevron-up"></i></div>

        <div class="page-scroll">
            <div id="page_container" class="page-container bg-move-effect" data-animation="transition-flip-in-right">

                <nuxt />

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default{
    auth:false,
    head() {
        return {
            bodyAttrs: {
                class: "page"
            },
            link: [
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/normalize.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/bootstrap.min.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/owl.carousel.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/magnific-popup.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/main.css"
                }
            ],
            script: [
                {
                    src: "/js/modernizr.custom.js",
                    body: false
                },
                {
                    src: "/js/jquery-3.5.1.min.js",
                    body: false
                },
                {
                    src: "https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.js",
                    body: false
                },
                {
                    src: "/js/bootstrap.min.js",
                    body: false
                },
                {
                    src: "/js/jquery.shuffle.min.js",
                    body: false
                },
                {
                    src: "/js/masonry.pkgd.min.js",
                    body: false
                },
                {
                    src: "/js/owl.carousel.min.js",
                    body: false
                },
                {
                    src: "/js/jquery.magnific-popup.min.js",
                    body: false
                },
                // {
                //     src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrDf32aQTCVENBhFJbMBKOUTiUAABtC2o',
                //     body: false
                // },
                // {
                //     src: "/js/jquery.googlemap.js",
                //     body: false
                // },
                {
                    src: "/js/validator.js",
                    body: false
                },
                {
                    src: "/js/main.js",
                    body: false
                },
            ],
        };
    },
    
}
</script>