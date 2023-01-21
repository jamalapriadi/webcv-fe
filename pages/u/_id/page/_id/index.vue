<template>
    <div v-if="list">
        <div v-if="list.success == true" class="bg-white">
            <div v-if="list.profile.data">
                <div v-if="list.profile.data.menu" class="bg-white">
                    <header class="d-flex justify-content-center py-3" v-if="list.profile.data.menu.data">
                        <ul class="nav nav-pills">
                            <li class="nav-item" v-for="(l,idx) in list.profile.data.menu.data" :key="idx">
                                <!-- <a href="#" :class="getClassMenu(l.id)" @click.prevent="changePage(l.id)" aria-current="page">{{ l.menu }}</a> -->
                                <nuxt-link :class="getClassMenu(l.menu)" :to="'/u/'+list.user+'/page/'+l.menu">{{ l.menu }}</nuxt-link>
                            </li>
                        </ul>
                    </header>
                </div>

                <div v-if="list.profile.data.menu">
                    <div v-if="list.profile.data.menu.data">
                        <div v-for="(l,idx) in list.profile.data.menu.data" :key="idx">
                            <div v-if="l.menu == current_menu">
                                <div v-if="l.sections.data" v-for="(k,ix) in l.sections.data" :key="ix">
                                    <div v-if="k.section">
                                        <div v-if="k.section.data">
                                            <div v-if="k.section.data.title == 'centered_hero'">
                                                <centered_hero :fields="k.json_fields"></centered_hero>
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
            </div>
        </div>

        <div v-if="list.success == false">
        
        </div>
        <!-- <pre>{{ list }}</pre> -->
    </div>
</template>

<script>
import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import accordionVue from '~/components/webcv/sections/accordion.vue'

export default{
    auth:false,
    components:{
        centered_hero,
        accordionVue
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