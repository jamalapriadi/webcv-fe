<template>
    <!-- Footer -->
    <footer class="site-footer clearfix" v-if="profile">
        <div class="footer-social" v-if="profile.person">
            <ul class="footer-social-links" v-if="profile.person.data">
                <li v-if="profile.person.data.linkedin">
                    <a :href="profile.person.data.linkedin" target="_blank">Linkedin</a>
                </li>

                <li v-if="profile.person.data.website">
                    <a :href="profile.person.data.website" target="_blank">Website</a>
                </li>

                <!-- <li>
                    <a href="https://www.instagram.com/jamalapriadi/" target="_blank">Instagram</a>
                </li> -->
            </ul>
        </div>
            
        <div class="footer-copyrights">
            <p>© 2023 All rights reserved. Jamal Apriadi.</p>
        </div>
    </footer>
    <!-- /Footer -->
</template>

<script>
export default{
    props:['profile','current_menu'],
    methods:{
        getClassMenu(id){
            var asli = 'menu-item'

            if(id == this.current_menu)
            {
                asli = 'menu-item current-menu-item'
            }

            return asli
        }
    }
}
</script>