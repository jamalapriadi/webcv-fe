<template>
    <div v-if="list">
        <div v-if="list.success == true">
            <div v-if="list.profile">
                <div v-if="list.profile.data">

                    <header_preview v-if="list.profile.data" :profile="list.profile.data" :current_menu="current_menu"></header_preview>

                    <div id="main" class="site-main">
                        <div id="main-content" class="single-page-content">

                            <div id="primary" class="content-area">    
                                <div id="content" class="page-content site-content single-post" role="main">

                                    <div v-if="list.profile.data.menu">
                                        <div v-if="list.profile.data.menu.data">
                                            <div v-for="(l,idx) in list.profile.data.menu.data" :key="idx">
                                                <div v-if="l.menu == current_menu">
                                                    <div v-if="l.sections.data" v-for="(k,ix) in l.sections.data" :key="ix">
                                                        <div v-if="k.section">
                                                            <div v-if="k.section.data">

                                                                <div v-if="k.section.data.title == 'about_me_2'">
                                                                    <About_me_2Vue :person="list.profile.data.person.data" :ijin_download_cv="list.profile.data.ijin_download_cv" @downloadCv="handleDownloadCvSaya(list.profile.data.slug)"></About_me_2Vue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'about_me_1'">
                                                                    <About_me_1Vue :person="list.profile.data.person.data" :ijin_download_cv="list.profile.data.ijin_download_cv" @downloadCv="handleDownloadCvSaya(list.profile.data.slug)"></About_me_1Vue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'what_i_do'">
                                                                    <what_i_doVue :title="k.json_fields.title" :list="k.json_fields.list"></what_i_doVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'experience'">
                                                                    <experienceVue :title="'Experience'" :person="list.profile.data.person.data"></experienceVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'education'">
                                                                    <experienceVue :title="'Education'" :person="list.profile.data.person.data"></experienceVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'certification'">
                                                                    <certificationVue :person="list.profile.data.person.data"></certificationVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == '2_row_blog'">
                                                                    <two_row_blogVue :profile="list.profile.data" :user_id="list.profile.data.person.data.user_id"></two_row_blogVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == '3_row_blog'">
                                                                    <three_row_blogVue :profile="list.profile.data" :user_id="list.profile.data.person.data.user_id"></three_row_blogVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'testimonial'">
                                                                    <testimonialVue :title="k.json_fields.title" :list="k.json_fields.list"></testimonialVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'client'">
                                                                    <clientVue :title="k.json_fields.title" :list="k.json_fields.list"></clientVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'portofolio_two_columns'">
                                                                    <portofolio_two_colomunsVue :profile="list.profile.data" :title="'portofolio_two_columns'" :user_id="list.profile.data.person.data.user_id" :class_title="'portfolio-grid two-columns shuffle'"></portofolio_two_colomunsVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'portofolio_three_columns'">
                                                                    <portofolio_two_colomunsVue :profile="list.profile.data" :title="'portofolio_three_columns'" :user_id="list.profile.data.person.data.user_id" :class_title="'portfolio-grid three-columns shuffle'"></portofolio_two_colomunsVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'portofolio_four_columns'">
                                                                    <portofolio_two_colomunsVue :profile="list.profile.data" :title="'portofolio_four_columns'" :user_id="list.profile.data.person.data.user_id" :class_title="'portfolio-grid four-columns shuffle'"></portofolio_two_colomunsVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'portofolio_five_columns'">
                                                                    <portofolio_two_colomunsVue :profile="list.profile.data" :title="'portofolio_five_columns'" :user_id="list.profile.data.person.data.user_id" :class_title="'portfolio-grid five-columns shuffle'"></portofolio_two_colomunsVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'blank_header'">
                                                                    <blank_headerVue :title="k.json_fields.title"></blank_headerVue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'feature_title'">
                                                                    <div class="block-title">
                                                                        <h2>{{ k.json_fields.title }}</h2>
                                                                    </div>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'feature_spacer'">
                                                                    <div v-bind:style="{
                                                                        width:'100%',
                                                                        height:k.json_fields.title+'px',
                                                                        background:'transparent'
                                                                    }">
                                                                        
                                                                    </div>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'textarea'">
                                                                    <div v-html="k.json_fields.title"></div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


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
        <!-- <pre>{{ list }}</pre> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import header_preview from "~/components/webcv/laven/header_preview.vue"
import footer_previewVue from "~/components/webcv/laven/footer_preview.vue"

import About_me_1Vue from '~/components/webcv/laven/about_me_1.vue';
import About_me_2Vue from '~/components/webcv/laven/about_me_2.vue';
import what_i_doVue from '~/components/webcv/laven/what_i_do.vue';
import experienceVue from '~/components/webcv/laven/experience.vue';
import certificationVue from "~/components/webcv/laven/certification.vue"
import two_row_blogVue from "~/components/webcv/laven/two_row_blog_live.vue"
import three_row_blogVue from '~/components/webcv/laven/three_row_blog_live.vue';
import testimonialVue from "~/components/webcv/laven/testimonial.vue"
import clientVue from "~/components/webcv/laven/client.vue"
import portofolio_two_colomunsVue from "~/components/webcv/laven/portofolio_two_columns_live.vue"
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
    async fetch({store, params}){
        await store.dispatch('preview/get_profile',params.id)
    },
    computed:{
        ...mapState('preview',{
            list: state=> state.list,
        })
    },
    data(){
        return {
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
                    if(this.list.profile)
                    {
                        if(this.list.profile.data){
                            return this.list.profile.data.title
                        }
                    }
                    
                }else if(this.list.success == false)
                {
                    return "404 - Not Found"
                }
            }
        },
        getData(){
            if(this.list)
            {
                if(this.list.success == true)
                {
                    if(this.list.profile.data)
                    {
                        if(this.list.profile.data.menu)
                        {
                            if(this.list.profile.data.menu.data)
                            {
                                for(var a=0;a<this.list.profile.data.menu.data.length; a++)
                                {
                                    if(a == 0)
                                    {
                                        this.current_menu = this.list.profile.data.menu.data[a].menu
                                    }
                                }   
                            }
                        }
                    }
                }
            }
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
        },

        handleDownloadCvSaya(data){
            let route = this.$router.resolve({path: '/u/'+data+'/download-cv-saya'});
            window.open(route.href, '_blank');
        }
    }
}
</script>