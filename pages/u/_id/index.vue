<template>
    <div v-if="list">
        <div v-if="list.success == true" class="bg-white">
            <div v-if="list.profile.data">
                <div v-if="list.profile.data.menu" class="bg-white">
                    <header class="d-flex justify-content-center py-3" v-if="list.profile.data.menu.data">
                        <ul class="nav nav-pills">
                            <li class="nav-item" v-for="(l,idx) in list.profile.data.menu.data" :key="idx">
                                <!-- <a href="#" :class="getClassMenu(l.id)" @click.prevent="changePage(l.id)" aria-current="page">{{ l.menu }}</a> -->
                                <nuxt-link :class="getClassMenu(l.id)" :to="'/u/'+list.profile.data.slug+'/page/'+l.menu">{{ l.menu }}</nuxt-link>
                            </li>
                        </ul>
                    </header>
                </div>

                <div v-if="list.profile.data.menu">
                    <div v-if="list.profile.data.menu.data">
                        <div v-for="(l,idx) in list.profile.data.menu.data" :key="idx">
                            <div v-if="l.id == current_menu">
                                <div v-if="l.sections.data" v-for="(k,ix) in l.sections.data" :key="ix">
                                    <div v-if="k.section">
                                        <div v-if="k.section.data">
                                            <div v-if="k.section.data.title == 'centered_hero'">
                                                <centered_hero :title="k.json_fields.title" :description="k.json_fields.description" :img="k.json_fields.img"></centered_hero>
                                            </div>

                                            <div v-if="k.section.data.title == 'centered_screenshoot'">
                                                <centered_screenshoot :title="k.json_fields.title" :description="k.json_fields.description" :img="k.json_fields.img"></centered_screenshoot>
                                            </div>

                                            <div v-if="k.section.data.title == 'responsive_left_alignment'">
                                                <responsive_left_alignment :title="k.json_fields.title" :description="k.json_fields.description" :img="k.json_fields.img"></responsive_left_alignment>
                                            </div>

                                            <div v-if="k.section.data.title == 'border_hero'">
                                                <border_hero :title="k.json_fields.title" :description="k.json_fields.description" :img="k.json_fields.img"></border_hero>
                                            </div>

                                            <div v-if="k.section.data.title == 'dark_hero_mode'">
                                                <dark_hero_mode :title="k.json_fields.title" :description="k.json_fields.description" :img="k.json_fields.img"></dark_hero_mode>
                                            </div>

                                            <div v-if="k.section.data.title == 'hanging_icons'">
                                                <hanging_icons :title="k.json_fields.title" :lists="k.json_fields.forms"></hanging_icons>
                                            </div>

                                            <div v-if="k.section.data.title == 'accordion'" class="container">
                                                <accordionVue :fields="k.json_fields"></accordionVue>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <first_footerVue v-if="list.profile.data.menu" :profile="list.profile" :menu="list.profile.data.menu"></first_footerVue>
                <!-- <second_footerVue v-if="list.profile.data.menu" :profile="list.profile" :menu="list.profile.data.menu"></second_footerVue> -->
                <!-- <third_footerVue v-if="list.profile.data.menu" :profile="list.profile" :menu="list.profile.data.menu"></third_footerVue> -->
                <!-- <four_footerVue v-if="list.profile.data.menu" :profile="list.profile" :menu="list.profile.data.menu"></four_footerVue> -->
            </div>
        </div>

        <div v-if="list.success == false">
        
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import centered_screenshoot from '~/components/webcv/sections/centered_screenshoot.vue'
import responsive_left_alignment from "~/components/webcv/sections/responsive_left_alignment.vue"
import border_hero from '~/components/webcv/sections/border_hero.vue'
import dark_hero_mode from '~/components/webcv/sections/dark_hero_mode.vue'
import hanging_icons from "~/components/webcv/sections/hanging_icons.vue"

import accordionVue from '~/components/webcv/sections/accordion.vue'

import first_footerVue from '~/components/webcv/footer/first_footer.vue'
import second_footerVue from '~/components/webcv/footer/second_footer.vue'
import third_footerVue from "~/components/webcv/footer/third_footer.vue"
import four_footerVue from '~/components/webcv/footer/four_footer.vue'

export default{
    auth:false,
    layout:'laven',
    components:{
        centered_hero,
        accordionVue,
        centered_screenshoot,
        responsive_left_alignment,
        border_hero,
        dark_hero_mode,
        first_footerVue,
        second_footerVue,
        third_footerVue,
        four_footerVue,
        hanging_icons
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
        getData(){
            if(this.list)
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
                                    this.current_menu = this.list.profile.data.menu.data[a].id
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
        }
    }
}
</script>