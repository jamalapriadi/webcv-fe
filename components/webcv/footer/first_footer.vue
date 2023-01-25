<template>
    <div class="container" v-if="menu.data">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p class="col-md-4 mb-0 text-muted">© 2023 Webcv, Inc</p>

            <nuxt-link :to="'/u/'+profile.data.slug" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
            </nuxt-link>

            <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item" v-for="(l,idx) in menu.data" :key="idx">
                    <nuxt-link :class="getClassMenu(l.id)" :to="'/u/'+profile.data.slug+'/page/'+l.menu">{{ l.menu }}</nuxt-link>
                </li>
            </ul>
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