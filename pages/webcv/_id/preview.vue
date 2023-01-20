<template>
    <div v-if="list" class="bg-white">
        <div v-if="list.data">
            <div v-if="list.data.menu" class="bg-white">
                <header class="d-flex justify-content-center py-3" v-if="list.data.menu.data">
                    <ul class="nav nav-pills">
                        <li class="nav-item" v-for="(l,idx) in list.data.menu.data" :key="idx">
                            <a href="#" :class="getClassMenu(l.id)" @click.prevent="changePage(l.id)" aria-current="page">{{ l.menu }}</a>
                        </li>
                    </ul>
                </header>
            </div>

            <div v-if="list.data.menu">
                <div v-if="list.data.menu.data">
                    <div v-for="(l,idx) in list.data.menu.data" :key="idx">
                        <div v-if="l.id == current_menu">
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
            list: {},
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

            this.$axios.get('/auth/webcv/'+id)
                .then(resp => {
                    this.list = resp.data

                    if(this.list)
                    {
                        if(this.list.data)
                        {
                            if(this.list.data.menu)
                            {
                                if(this.list.data.menu.data)
                                {
                                    for(var a=0;a<this.list.data.menu.data.length; a++)
                                    {
                                        if(a == 0)
                                        {
                                            this.current_menu = this.list.data.menu.data[a].id
                                        }
                                    }   
                                }
                            }
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