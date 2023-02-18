<template>
    <div v-if="list">
        <div v-if="list.success == true">
            <div v-if="list.profile">
                <div v-if="list.profile.data">

                    <header_preview v-if="list.profile.data" :profile="list.profile.data" :current_menu="current_menu"></header_preview>

                    <div id="main" class="site-main">
                        <div id="main-content" class="single-page-content">

                            <div id="primary" class="content-area" v-if="list.post">    
                                <div id="content" class="page-content site-content single-post" role="main">

                                    <article class="post" v-if="list.post.data">

                                        <header class="entry-header">
                                            <div class="entry-meta entry-meta-top" v-if="list.post.category && list.post.category.data">
                                                <span v-for="(l,idx) in list.post.category.data" :key="idx">
                                                    <a href="#" rel="category tag">{{ l.name }}</a>
                                                </span>      
                                            </div><!-- .entry-meta -->

                                            <h2 class="entry-title">{{ list.post.data.title }}</h2>
                                        </header><!-- .entry-header -->

                                        <div class="post-thumbnail">
                                            <img :src="list.post.data.featured_image" alt="" style="width:100%" />
                                        </div>

                                        <div class="post-content">
                                            <div class="entry-content">

                                                <div class="row">
                                                    <div class=" col-xs-12 col-sm-12 ">

                                                        <p v-html="list.post.data.description"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="entry-meta entry-meta-bottom">
                                            <div class="date-author">
                                                
                                                <span class="entry-date">
                                                    <a href="#" rel="bookmark">
                                                        <i class="far fa-clock"></i>
                                                        <time class="entry-date">{{ list.post.data.published_at }}</time>
                                                    </a>
                                                </span>
                                            </div>
                        
                                            <!-- Share Buttons -->
                                            <div class="entry-share btn-group share-buttons">
                                                
                                            </div>
                                            <!-- /Share Buttons -->
                                        </div>

                                        <div class="post-tags" v-if="list.post.data.category">
                                            <span class="tags">
                                                <a v-for="(l,idx) in list.post.data.category.data" :key="idx" href="#" rel="tag">{{ l.name }}</a>
                                            </span>
                                        </div>



                                    </article>

                                </div>
                            </div>
                        </div>
                    </div>

                    <footer_previewVue v-if="list.profile.data" :profile="list.profile.data" :current_menu="current_menu"></footer_previewVue>


                </div>
            </div>
        </div>

        <div v-if="list.success == false">
            <div class="page page-center">
                <div class="container-tight py-4">
                    <div class="empty">
                        <div class="empty-header">404</div>
                        <p class="empty-title">Oops… You just found an error page</p>
                        <p class="empty-subtitle text-muted">
                            We are sorry but the page you are looking for was not found
                        </p>
                        <div class="empty-action">
                            <nuxt-link :to="'/'" class="btn btn-primary">
                                <!-- Download SVG icon from http://tabler-icons.io/i/arrow-left -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                Take me home
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import header_preview from "~/components/webcv/laven/header_preview.vue"
import footer_previewVue from "~/components/webcv/laven/footer_preview.vue"

import About_me_1Vue from '~/components/webcv/laven/about_me_1.vue';
import About_me_2Vue from '~/components/webcv/laven/about_me_2.vue';
import what_i_doVue from '~/components/webcv/laven/what_i_do.vue';
import experienceVue from '~/components/webcv/laven/experience.vue';
import certificationVue from "~/components/webcv/laven/certification.vue"
import two_row_blogVue from "~/components/webcv/laven/two_row_blog_live.vue"
import three_row_blogVue from '~/components/webcv/laven/three_row_blog.vue';
import testimonialVue from "~/components/webcv/laven/testimonial.vue"
import clientVue from "~/components/webcv/laven/client.vue"
import portofolio_two_colomunsVue from "~/components/webcv/laven/portofolio_two_columns.vue"
import blank_headerVue from "~/components/webcv/laven/blank_header.vue"

export default{
    auth:false,
    layout:'laven_preview',
    head(){
        return {
            title:this.getTitle()
        }
    },
    components:{
        header_preview,
        footer_previewVue,
        About_me_1Vue,
        About_me_2Vue,
        what_i_doVue,
        experienceVue,
        certificationVue,
        two_row_blogVue,
        three_row_blogVue,
        testimonialVue,
        clientVue,
        portofolio_two_colomunsVue,
        blank_headerVue
    },
    data(){
        return {
            kode:'',
            fullpath:'',
            list:{},
            current_menu:''
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getTitle(){
            if(this.list)
            {
                if(this.list.success == true)
                {
                    if(this.list.post)
                    {
                        if(this.list.post.data){
                            return this.list.post.data.title
                        }
                    }
                    
                }else if(this.list.success == false)
                {
                    return "404 - Not Found"
                }
            }
        },
        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.fullpath = app.$route.fullPath

            this.$axios.get('/page/post?path='+this.fullpath)
                .then(resp => {
                    this.list = resp.data

                    // if(this.list)
                    // {
                    //     if(this.list.success == true)
                    //     {
                    //         this.current_menu = this.list.current_menu
                    //     }
                    // }
                    
                })
        },

        getClassMenu(id){
            var asli = 'nav-link'

            if(id == this.current_menu)
            {
                asli = 'nav-link active'
            }

            return asli
        },

        changePage(id){
            this.current_menu = id
        }
    }
}
</script>