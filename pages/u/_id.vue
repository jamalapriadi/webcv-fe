<template>
    <div>
        <pre>{{ list }}</pre>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import accordionVue from '~/components/webcv/sections/accordion.vue'

export default{
    auth:false,
    components:{
        centered_hero,
        accordionVue
    },
    async fetch({store}){
        await store.dispatch('profile/get_profile')
    },
    computed:{
        ...mapState('post',{
            list: state=> state.list,
        })
    },
    data(){
        return {

        }
    }
}
</script>