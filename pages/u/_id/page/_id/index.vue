<template>
    <div v-if="list">
        <div v-if="list.success">
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
                                                                    <About_me_2Vue :person="list.profile.data.person.data"></About_me_2Vue>
                                                                </div>

                                                                <div v-if="k.section.data.title == 'about_me_1'">
                                                                    <About_me_1Vue :person="list.profile.data.person.data"></About_me_1Vue>
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
            </div>
        </div>

        <div v-if="list.success == false">
        
        </div>
    </div>
</template>

<script>
import header_preview from "~/components/webcv/laven/header_preview.vue"

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
            title:this.list.profile ? this.list.profile.data.title : '',
        }
    },
    components:{
        header_preview,
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
        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.fullpath = app.$route.fullPath
            
            this.$axios.get('/page/page?path='+this.fullpath)
                .then(resp => {
                    this.list = resp.data

                    if(this.list)
                    {
                        if(this.list.success == true)
                        {
                            this.current_menu = this.list.current_menu
                        }
                    }
                    
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