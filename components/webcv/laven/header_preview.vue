<template>
    <!-- Header -->
    <header id="site_header" class="header" v-if="profile">
        <div class="header-content clearfix">
                
            <!-- Text Logo -->
            <div class="text-logo">
                <nuxt-link :to="backToHome()" v-if="profile.title">
                    <div class="logo-symbol" v-if="profile.title">
                        {{ profile.title.charAt(0) }}
                    </div>
                    <div class="logo-text">{{ profile.title }}</div>
                </nuxt-link>
            </div>
            <!-- /Text Logo -->

            <!-- Navigation -->
            <div class="site-nav mobile-menu-hide" v-if="profile.menu">
                <ul class="leven-classic-menu site-main-menu" v-if="profile.menu.data">
                    <li v-for="(l,idx) in profile.menu.data" :key="idx" :class="getClassMenu(l.slug)">
                        <nuxt-link :to="'/u/'+profile.slug+'/page/'+l.slug">{{ l.menu }}</nuxt-link>
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
</template>

<script>
export default{
    props:['profile','current_menu'],
    methods:{
        getClassMenu(id){
            var asli = 'menu-item'

            if(id == this.current_menu)
            {
                asli = 'menu-item current-menu-item'
            }

            return asli
        },

        backToHome(){
            var current_page = '/' 

            if(this.$auth.user.data)
            {
                if(this.$auth.user.data.webcv)
                {
                    if(this.$auth.user.data.webcv.data)
                    {
                        current_page = "/u/"+this.$auth.user.data.webcv.data.slug
                    }
                }
            }

            return current_page
        },
    }
}
</script>