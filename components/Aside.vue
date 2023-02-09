<template>
    <aside class="navbar navbar-vertical navbar-expand-lg navbar-light" style="overflow:auto">
        <div class="container-fluid">

            <div class="bg-dark text-center text-white pt-10" style="padding:5px">
                <nuxt-link :to="'/dashboard'" class="text-link text-reset" style="text-decoration: none;">
                    <h1>CVAku</h1>
                </nuxt-link>
            </div>
            <div style="border-bottom: 0.14em solid lightgray;"></div>
        
            <div class="collapse navbar-collapse" id="navbar-menu">
                <ul class="navbar-nav pt-lg-3">
                    <li v-for="(l,idx) in menus" :key="'menu'+idx" v-bind:class="getClass(l)">
                        <nuxt-link v-if="l.type == 'menu'" v-show="showMenu(l.permission)" :to="l.to" style="color:#222" class="nav-link">
                            <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="l.icon"></span>
                            <span class="nav-link-title">
                                {{l.title}}
                            </span>
                        </nuxt-link>

                        <a v-show="showMenu(l.permission)" v-if="l.type == 'dropdown'" class="nav-link dropdown-toggle" href="#navbar-help" data-bs-toggle="dropdown" data-bs-auto-close="false" role="button" aria-expanded="false" >
                            <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="l.icon"></span>
                            <span class="nav-link-title" style="color:#222">
                                {{l.title}}
                            </span>
                        </a>

                        <div v-if="l.type == 'dropdown'" class="dropdown-menu">
                            <nuxt-link v-for="(k,ix) in l.submenu"  v-show="showMenu(k.permission)" :to="k.to" :key="ix" class="dropdown-item" style="color:#222;margin-left:30px">
                                {{k.title}}
                            </nuxt-link>
                        </div>
                    </li>
                    <div style="border-top:0.14em solid lightgray"></div>
                    <li class="nav-item mt-2">
                        <nuxt-link :to="'/settings'" style="color:#222" class="nav-link">
                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </span>
                            <span class="nav-link-title">
                                Pengaturan
                            </span>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>


    </aside>
</template>

<script>
export default {
    data(){
        return {
            menus:[
                {
                    to:'/dashboard',
                    type:'menu',
                    title:'Dashboard',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 4h6v8h-6z"></path><path d="M4 16h6v4h-6z"></path><path d="M14 12h6v8h-6z"></path><path d="M14 4h6v4h-6z"></path></svg>',
                    class:'active',
                    submenu:[],
                    permission:'dashboard'
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'Blog',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-news" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"></path><line x1="8" y1="8" x2="12" y2="8"></line><line x1="8" y1="12" x2="12" y2="12"></line><line x1="8" y1="16" x2="12" y2="16"></line></svg>',
                    class:'',
                    permission:'posts',
                    submenu:[
                        {
                            to:'/posts',
                            title:'Posts',
                            permission:'list_post'
                        },
                        {
                            to:'/category',
                            title:'Category',
                            permission:'list_category'
                        },
                    ]
                },
                {
                    to:'/portofolio',
                    type:'menu',
                    title:'Portofolio',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmarks" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M13 7a2 2 0 0 1 2 2v12l-5 -3l-5 3v-12a2 2 0 0 1 2 -2h6z"></path><path d="M9.265 4a2 2 0 0 1 1.735 -1h6a2 2 0 0 1 2 2v12l-1 -.6"></path></svg>',
                    class:'',
                    submenu:[],
                    permission:'portofolio'
                },
                {
                    to:'/cvbuilder',
                    type:'menu',
                    title:'My Resume',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-forms" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3"></path><path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3"></path><path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7"></path><path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1"></path><path d="M17 12h.01"></path><path d="M13 12h.01"></path></svg>',
                    class:'',
                    submenu:[],
                    permission:'cvbuilder'
                },
                {
                    to:'/webcv',
                    type:'menu',
                    title:'Website',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-template" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="16" height="4" rx="1"></rect><rect x="4" y="12" width="6" height="8" rx="1"></rect><line x1="14" y1="12" x2="20" y2="12"></line><line x1="14" y1="16" x2="20" y2="16"></line><line x1="14" y1="20" x2="20" y2="20"></line></svg>',
                    class:'',
                    submenu:[],
                    permission:'webcv'
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'Master',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="4"></circle><circle cx="12" cy="12" r="9"></circle><line x1="15" y1="15" x2="18.35" y2="18.35"></line><line x1="9" y1="15" x2="5.65" y2="18.35"></line><line x1="5.65" y1="5.65" x2="9" y2="9"></line><line x1="18.35" y1="5.65" x2="15" y2="9"></line></svg>',
                    class:'',
                    permission:'master',
                    submenu:[
                        {
                            to:'/template',
                            title:'Template',
                            permission:'list_template'
                        },
                        {
                            to:'/section',
                            title:'Section',
                            permission:'list_section'
                        },
                        {
                            to:'/section-category',
                            title:'Section Category',
                            permission:'list_section_category'
                        },
                        {
                            to:'/cv-template',
                            title:'CV Template',
                            permission:'list_cv_template'
                        },
                        {
                            to:'/sosmed',
                            title:'Social Media',
                            permission:'list_social_media'
                        },
                        {
                            to:'/negara',
                            title:'Negara',
                            permission:'list_negara'
                        }
                    ]
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'User',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></svg>',
                    class:'',
                    permission:'user',
                    submenu:[
                        {
                            to:'/users',
                            title:'User',
                            permission:'list_user'
                        },
                        {
                            to:'/roles',
                            title:'Role',
                            permission:'list_role'
                        },
                        {
                            to:'/permissions',
                            title:'Permission',
                            permission:'list_permission'
                        },
                    ]
                },
            ]
        }
    },
    methods:{
        getClass(l){
            if(l.submenu.length > 0){
                return 'nav-item mb-2 dropdown'
            }else{
                return 'nav-item mb-2'
            }
        },

        showMenu(perm)
        {
            for(var b=0;b<this.$auth.user.data.permissions.length;b++)
            {
                if(this.$auth.user.data.permissions[b].name == perm)
                {
                    return true
                }
            }

            return false
        }
    }
}
</script>