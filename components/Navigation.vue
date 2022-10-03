<template>
    <div class="navbar-expand-md" v-if="renderComponent">
        <div class="collapse navbar-collapse" id="navbar-menu">
            <div class="navbar navbar-light">
                <div class="container-xl">
                    <ul class="navbar-nav">
                        <li v-for="(l,idx) in menus" :key="'menu'+idx" v-bind:class="getClass(l)">
                            <nuxt-link :to="l.to" v-bind:class="getClassMenu(l)" v-if="l.type == 'menu' && cekPermission(l.permission)">
                                <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="l.icon"></span>
                                <span class="nav-link-title" v-html="l.title"></span>
                            </nuxt-link>

                            <nuxt-link v-if="l.type == 'dropdown' && cekPermission(l.permission)" :to="l.to" v-bind:class="getClassMenu(l)" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false">
                                <span class="nav-link-icon d-md-none d-lg-inline-block" v-html="l.icon"></span>
                                <span class="nav-link-title" v-html="l.title"></span>
                            </nuxt-link>

                            <div v-if="l.type == 'dropdown' && cekPermission(l.permission) && l.submenu.length >0" class="dropdown-menu">
                                <nuxt-link v-for="(k,ix) in l.submenu" :key="'sub'+ix" :to="k.to" class="dropdown-item">
                                    {{k.title}}
                                </nuxt-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            renderComponent:false,
            menus:[
                {
                    to:'/home',
                    type:'menu',
                    title:'Home',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>',
                    class:'active',
                    submenu:[],
                    permission:'dashboard'
                },
                {
                    to:'/member',
                    type:'menu',
                    title:'Member',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 11l2 2l4 -4" /></svg>',
                    class:'',
                    submenu:[],
                    permission:'list member'
                },
                {
                    to:'/booklet',
                    type:'menu',
                    title:'Booklet',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><line x1="3" y1="6" x2="3" y2="19" /><line x1="12" y1="6" x2="12" y2="19" /><line x1="21" y1="6" x2="21" y2="19" /></svg>',
                    class:'',
                    submenu:[],
                    permission:'list booklet'
                },
                {
                    to:'/merchant',
                    type:'menu',
                    title:'Merchant',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3" /><path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3" /></svg>',
                    class:'',
                    submenu:[],
                    permission:'list merchant'
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'Power Pro',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-augmented-reality" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><desc>Download more icon variants from https://tabler-icons.io/i/augmented-reality</desc><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path><path d="M4 16v2a2 2 0 0 0 2 2h2"></path><path d="M16 4h2a2 2 0 0 1 2 2v2"></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path><path d="M12 12.5l4 -2.5"></path><path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5z"></path><path d="M8 10v4.5l4 2.5"></path></svg>',
                    class:'',
                    permission:'power pro',
                    submenu:[
                        {
                            to:'/fo-member',
                            title:'Fo Member'
                        },
                        {
                            to:'/fo-member-type',
                            title:'Fo Member Type'
                        },
                    ]
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'User Management',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>',
                    class:'',
                    permission:'user management',
                    submenu:[]
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'Facility',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-autofit-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 20h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8"></path><path d="M18 4v17"></path><path d="M15 18l3 3l3 -3"></path></svg>',
                    class:'',
                    permission:'facility',
                    submenu:[]
                },
                {
                    to:'#',
                    type:'dropdown',
                    title:'Report',
                    icon:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report-analytics" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path><rect x="9" y="3" width="6" height="4" rx="2"></rect><path d="M9 17v-5"></path><path d="M12 17v-1"></path><path d="M15 17v-3"></path></svg>',
                    class:'',
                    permission:'report',
                    submenu:[]
                }
            ]
        }
    },
    mounted(){
        this.generateSubMenuUser('user management')
        this.generateSubMenuUser('facility')
        this.generateSubMenuUser('report')
        this.reBuildMenu()
    },
    methods:{
        reBuildMenu(){
            this.$nextTick(() => {
                this.renderComponent = true;
            });
        },
        getClass(l){
            if(l.submenu.length > 0){
                return 'nav-item dropdown'
            }else{
                return 'nav-item'
            }
        },

        generateSubMenuUser(type){
            this.renderComponent = false
            for(var a=0; a<this.menus.length; a++)
            {
                if('user management' == type)
                {
                    if(this.menus[a].permission == type){
                        for(var b=0;b<this.$auth.user.data.permissions.length;b++)
                        {
                            if(this.$auth.user.data.permissions[b].name == "list user")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/users',
                                        title:'User',
                                    }
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "list roles")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/roles',
                                        title:'Roles'
                                    }
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "list permissions")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/permissions',
                                        title:'Permission'
                                    },
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "list design ecard")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/design-ecard',
                                        title:'Design E-Card'
                                    },
                                )
                            }
                        }
                    }
                }

                if('facility' == type)
                {
                    if(this.menus[a].permission == type){
                        for(var b=0;b<this.$auth.user.data.permissions.length;b++)
                        {
                            if(this.$auth.user.data.permissions[b].name == "list member type fasilitas")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/member-type-fasilitas',
                                        title:'Member Type Fasilitas'
                                    }
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "list member type")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/member-type',
                                        title:'Member Type'
                                    }
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "list member type pricing")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/member-type-pricing',
                                        title:'Member Type Pricing'
                                    }
                                )
                            }
                        }
                    }
                }

                if('report' == type)
                {
                    if(this.menus[a].permission == type){
                        for(var b=0;b<this.$auth.user.data.permissions.length;b++)
                        {
                            if(this.$auth.user.data.permissions[b].name == "report sales summary")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/report/sales-summary',
                                        title:'Laporan Pendapatan'
                                    },
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "report penggunaan booklet")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/report/penggunaan-booklet',
                                        title:'Pengunaan Booklet'
                                    },
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "report user checkin")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/report/user-checkin',
                                        title:'Member Checkin'
                                    },
                                )
                            }

                            if(this.$auth.user.data.permissions[b].name == "report logs")
                            {
                                this.menus[a].submenu.push(
                                    {
                                        to:'/report/logs',
                                        title:'Logs'
                                    }
                                )
                            }

                            
                        }
                    }
                }
            }
        },

        getClassMenu(l){
            if(l.type == 'menu')
            {
                return 'nav-link'
            }else if(l.type == 'dropdown'){
                return 'nav-link dropdown-toggle'
            }
        },

        cekPermission(perm)
        {
            for(var a=0;a<this.$auth.user.data.permissions.length;a++)
            {
                if(this.$auth.user.data.permissions[a].name == perm)
                {
                    return true
                }
            }

            return false
        }
    }
}
</script>