<template>
    <div class="container" v-if="menu.data">
        <footer class="row row-cols-5 py-5 my-5 border-top">
            <div class="col">
                <nuxt-link :to="'/u/'+profile.data.slug" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
                    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                </nuxt-link>
                <p class="text-muted">© 2023 Webcv, Inc</p>
            </div>

            <div class="col">

            </div>

            <div class="col"></div>

            <div class="col">
                <h5>Menu</h5>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2" v-for="(l,idx) in menu.data" :key="idx">
                        <nuxt-link :class="getClassMenu(l.id)" :to="'/u/'+profile.data.slug+'/page/'+l.menu">{{ l.menu }}</nuxt-link>
                    </li>
                </ul>
            </div>
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
            var asli = 'nav-link p-0 text-muted'

            if(id == this.current_menu)
            {
                asli = 'nav-link p-0 text-muted active'
            }

            return asli
        },
    }
}
</script>