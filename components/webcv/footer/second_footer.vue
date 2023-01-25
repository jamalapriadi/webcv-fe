<template>
    <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div class="col-md-4 d-flex align-items-center">
                <nuxt-link :to="'/u/'+profile.data.slug" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                </nuxt-link>
                <span class="text-muted">© 2023 Webcv, Inc</span>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3" v-for="(l,idx) in menu.data" :key="idx">
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
            var asli = 'text-muted'

            if(id == this.current_menu)
            {
                asli = 'text-muted active'
            }

            return asli
        },
    }
}
</script>