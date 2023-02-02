<template>
    <aside class="navbar navbar-vertical navbar-expand-lg navbar-light" style="overflow:auto">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <h1 class="navbar-brand navbar-brand-autolight bg-dark">
                <a href="#" class="text-white">
                    <!-- <img src="./static/logo-white.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image"> -->
                    <h1 class="text-white">CV-AKU</h1>
                </a>
            </h1>

            <div class="navbar-nav flex-row d-lg-none">
                <div class="d-none d-lg-flex">
                    <a href="?theme=dark" class="nav-link px-0 hide-theme-dark" title="Enable dark mode" data-bs-toggle="tooltip" data-bs-placement="bottom">
                        <!-- Download SVG icon from http://tabler-icons.io/i/moon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>
                    </a>
                    <a href="?theme=light" class="nav-link px-0 hide-theme-light" title="Enable light mode" data-bs-toggle="tooltip" data-bs-placement="bottom">
                        <!-- Download SVG icon from http://tabler-icons.io/i/sun -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="4" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>
                    </a>
                    <div class="nav-item dropdown d-none d-md-flex me-3">
                        <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications">
                            <!-- Download SVG icon from http://tabler-icons.io/i/bell -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                            <span class="badge bg-red"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Last updates</h3>
                                </div>
                                <div class="list-group list-group-flush list-group-hoverable">
                                    <div class="list-group-item">
                                        <div class="row align-items-center">
                                            <div class="col-auto">
                                                <span class="status-dot status-dot-animated bg-red d-block"></span>
                                            </div>
                                            <div class="col text-truncate">
                                                <a href="#" class="text-body d-block">Example 1</a>
                                                <div class="d-block text-muted text-truncate mt-n1">
                                                    Change deprecated html tags to text decoration classes (#29604)
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <a href="#" class="list-group-item-actions">
                                                    <!-- Download SVG icon from http://tabler-icons.io/i/star -->
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon text-muted" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nav-item dropdown">
                    <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        
                        <div class="d-none d-xl-block ps-2">
                            <div><div>{{$auth.user.data.name}}</div></div>
                            <!-- <div class="mt-1 small text-muted">UI Designer</div> -->
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <a href="#" class="dropdown-item">Set status</a>
                        <a href="#" class="dropdown-item">Profile & account</a>
                        <a href="#" class="dropdown-item">Feedback</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">Settings</a>
                        <a href="#" class="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
        
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
                        }
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