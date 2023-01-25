<template>
    <div class="container">
        <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item" v-for="(l,idx) in menu.data" :key="idx">
                    <nuxt-link :class="getClassMenu(l.id)" :to="'/u/'+profile.data.slug+'/page/'+l.menu">{{ l.menu }}</nuxt-link>
                </li>
            </ul>
            <p class="text-center text-muted">© 2023 Webcv, Inc</p>
        </footer>
    </div>
</template>

<script>
export default{
    props:['profile','menu'],
    data(){
        return {
            current_menu:''
        }
    },
    methods:{
        getClassMenu(id){
            var asli = 'nav-link px-2 text-muted'

            if(id == this.current_menu)
            {
                asli = 'nav-link px-2 text-muted active'
            }

            return asli
        },
    }
}
</script>