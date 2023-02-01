<template>
    <div class="page" v-if="profile">
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

        <div class="page-scroll" v-if="profile.success">
            <div id="page_container" class="page-container bg-move-effect" data-animation="transition-flip-in-right">

                <!-- Header -->
                <header id="site_header" class="header" v-if="profile.person">
                    <div class="header-content clearfix" v-if="profile.person.data">
                            
                        <!-- Text Logo -->
                        <div class="text-logo">
                            <a href="#">
                                <div class="logo-symbol">
                                    {{ $auth.user.data.webcv.data.title.charAt(0) }}
                                </div>
                                <div class="logo-text">{{ $auth.user.data.webcv.data.title }}</div>
                            </a>
                        </div>
                        <!-- /Text Logo -->

                        <!-- Navigation -->
                        <div class="site-nav mobile-menu-hide" v-if="menus">
                            <ul class="leven-classic-menu site-main-menu" v-if="menus.data">
                                <!-- <li class="menu-item menu-item-has-children current-menu-item">
                                    <a href="index.html">About Me</a>
                                    <ul class="sub-menu">
                                        <li class="menu-item current-menu-item">
                                            <a href="index.html">About Me 1</a>
                                        </li>
                                        <li class="menu-item">
                                            <a href="index-2.html">About Me 2</a>
                                        </li>
                                    </ul>
                                </li> -->

                                <li v-for="(l,idx) in menus.data" :key="idx" :class="getClassMenu(l.id)">
                                    <nuxt-link :to="'/webcv/'+l.id+'/customize'">{{ l.menu }}</nuxt-link>
                                </li>
                            </ul>
                        </div>

                        <!-- Mobile Menu Toggle -->
                        <a class="menu-toggle mobile-visible">
                            <i class="fa fa-bars"></i>
                        </a>
                        <!-- Mobile Menu Toggle -->
                    </div>
                </header>
                <!-- /Header -->

                <div id="main" class="site-main">
                    <div id="main-content" class="single-page-content">

                        <div id="primary" class="content-area">    
                            <div id="content" class="page-content site-content single-post" role="main">

                                <nuxt />


                            </div>
                        </div>

                    </div>
                </div>

                 <!-- Footer -->
                <footer class="site-footer clearfix">
                    <div class="footer-social">
                        <ul class="footer-social-links">
                            <li>
                                <a href="https://www.linkedin.com/in/jamal-apriadi" target="_blank">Linkedin</a>
                            </li>

                            <li>
                                <a href="https://www.facebook.com/gha16" target="_blank">Facebook</a>
                            </li>

                            <li>
                                <a href="https://www.instagram.com/jamalapriadi/" target="_blank">Instagram</a>
                            </li>
                        </ul>
                    </div>
                        
                    <div class="footer-copyrights">
                        <p>© 2023 All rights reserved. Jamal Apriadi.</p>
                    </div>
                </footer>
                <!-- /Footer -->

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default{
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
                    body: true
                },
                {
                    src: "/js/jquery-3.5.1.min.js",
                    body: true
                },
                {
                    src: "/js/imagesloaded.pkgd.min.js",
                    body: true
                },
                {
                    src: "/js/bootstrap.min.js",
                    body: true
                },
                {
                    src: "/js/jquery.shuffle.min.js",
                    body: true
                },
                {
                    src: "/js/masonry.pkgd.min.js",
                    body: true
                },
                {
                    src: "/js/owl.carousel.min.js",
                    body: true
                },
                {
                    src: "/js/jquery.magnific-popup.min.js",
                    body: true
                },
                // {
                //     src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrDf32aQTCVENBhFJbMBKOUTiUAABtC2o',
                //     body: true
                // },
                // {
                //     src: "/js/jquery.googlemap.js",
                //     body: true
                // },
                {
                    src: "/js/validator.js",
                    body: true
                },
                {
                    src: "/js/main.js",
                    body: true
                },
            ],
        };
    },
    async fetch({store, params}){
        await store.dispatch('person/get_data')
    },
    computed:{
        ...mapState('person',{
            profile: state => state.profile,
        })
    },
    data(){
        return {
            menus:[],
            current_menu:''
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            if(this.$auth.loggedIn)
            {
                let app=this;
                this.current_menu= app.$route.params.id;

                this.menus = []
                var params = {
                    webcv: this.$auth.user.data.webcv.data.id
                }
                this.$axios.get('/auth/webcv-menu', params)
                    .then(resp => {
                        this.menus = resp.data
                    })
            }else{
                alert('tidak login')
            }
        },

        getClassMenu(id){
            var asli = 'menu-item'

            if(id == this.$route.params.id)
            {
                asli = 'menu-item current-menu-item'
            }

            return asli
        }
    }
}
</script>