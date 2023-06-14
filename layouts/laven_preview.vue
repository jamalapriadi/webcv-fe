<template>
    <div class="page">
        <!-- <div class="lm-animated-bg"></div> -->
    
        <!-- Loading animation -->
        <!-- <div class="preloader">
            <div class="preloader-animation">
                <div class="preloader-spinner">
                </div>
            </div>
        </div> -->
        <!-- /Loading animation -->
        <!-- <pre>{{ $nuxt.$route.path }}</pre> -->

        <!-- <pre>{{ $auth.user.data }}</pre> -->

        <div v-if="$auth.loggedIn">
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
                <a class="navbar-brand" href="#">CVAku</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="'/dashboard'">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-tabler" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M8 9l3 3l-3 3"></path>
                                    <path d="M13 15l3 0"></path>
                                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                                </svg> 
                                Dashboard
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="'/webcv'">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brush" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path>
                                    <path d="M21 3a16 16 0 0 0 -12.8 10.2"></path>
                                    <path d="M21 3a16 16 0 0 1 -10.2 12.8"></path>
                                    <path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
                                </svg> 
                                Customize
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="'/cvbuilder'">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-cv" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                    <path d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0"></path>
                                    <path d="M13 11l1.5 6l1.5 -6"></path>
                                </svg>  
                                Resume
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" :to="editPage($nuxt.$route.path)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                    <path d="M16 5l3 3"></path>
                                </svg>  
                                Edit Page
                            </nuxt-link>
                        </li>
                        <li class="nav-item" v-if="$auth.user.data && $auth.user.data.webcv && $auth.user.data.webcv.data">
                            <a class="nav-link" href="#" @click.prevent="addNewMenu($auth.user.data.webcv.data.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 5l0 14"></path>
                                    <path d="M5 12l14 0"></path>
                                </svg> 
                                Add
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                        <span class="avatar avatar-sm avatar-rounded" v-bind:style="{
                            backgroundImage: 'url('+$auth.user.data.profile_picture_url+')'}"></span>
                        <div class="d-none d-xl-block ps-2">
                            <div>{{$auth.user.data.name}}</div>
                            <!-- <div class="mt-1 small text-muted">UI Designer</div> -->
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <nuxt-link to="/settings" class="dropdown-item">Settings</nuxt-link>
                        <div class="dropdown-divider"></div>
                        <a @click.prevent="logout" href="#" class="dropdown-item">Logout</a>
                    </div>
                </div>
            </nav>

            <!-- modal qr-->
            <b-modal
                :ref="'modal-menu'"
                :id="'modal-menu'"
                size="lg"
                no-close-on-backdrop
                hide-footer
                :modal-class="'modal modal-blur fade'" 
                :dialog-class="'modal-dialog modal-dialog-centered'"
                title="Create new Menu"
            >
                <form action="#" @submit.prevent="saveMenu">
                    <div class="form-group">
                        <label for="" class="form-label">Menu</label>
                        <input type="text" v-model="state.menu" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="" class="form-label">Active</label>
                        <toggle-button v-if="state.active == 'Y'"
                            name="active"
                            :value="true"
                            :sync="true"
                            :labels="{checked: 'Ya', unchecked: 'No'}"
                            :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                            @change="changeSwitch($event)"/>

                        <toggle-button v-if="state.active == 'N'"
                            name="active"
                            :value="false"
                            :sync="false"
                            :labels="{checked: 'Ya', unchecked: 'No'}"
                            :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                            @change="changeSwitch($event)"/>
                    </div>

                    <hr>

                    <div class="card-footer text-end">
                        <div class="d-flex">
                            <a href="#" class="btn btn-link">Cancel</a>
                            <button type="submit" class="btn btn-primary ms-auto">Save</button>
                        </div>
                    </div>
                </form>
            </b-modal>

        </div>

        <!-- Scroll To Top Button -->
        <div class="lmpixels-scroll-to-top"><i class="lnr lnr-chevron-up"></i></div>

        <div class="page-scroll">
            <div id="page_container" class="page-container bg-move-effect" data-animation="transition-flip-in-right">

                <nuxt />

            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default{
    auth:false,
    head() {
        return {
            bodyAttrs: {
                class: "page"
            },
            link: [
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/normalize.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/bootstrap.min.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/owl.carousel.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/magnific-popup.css"
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "/css/main.css"
                }
            ],
            script: [
                {
                    src: "/js/modernizr.custom.js",
                    body: false
                },
                {
                    src: "/js/jquery-3.5.1.min.js",
                    body: false
                },
                {
                    src: "https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.js",
                    body: false
                },
                {
                    src: "/js/bootstrap.min.js",
                    body: false
                },
                {
                    src: "/js/jquery.shuffle.min.js",
                    body: false
                },
                {
                    src: "/js/masonry.pkgd.min.js",
                    body: false
                },
                {
                    src: "/js/owl.carousel.min.js",
                    body: false
                },
                {
                    src: "/js/jquery.magnific-popup.min.js",
                    body: false
                },
                // {
                //     src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrDf32aQTCVENBhFJbMBKOUTiUAABtC2o',
                //     body: false
                // },
                // {
                //     src: "/js/jquery.googlemap.js",
                //     body: false
                // },
                {
                    src: "/js/validator.js",
                    body: false
                },
                {
                    src: "/js/main.js",
                    body: false
                },
            ],
        };
    },
    data(){
        return {
            webcv:'',
            state:{
                kode:'',
                webcv_id: '',
                menu:'',
                active:'Y',
                thumb:''
            }
        }
    },
    methods:{
        addNewMenu(id){
            this.state.webcv_id = id
            this.webcv = id
            this.$bvModal.show("modal-menu");
        },

        changeSwitch(e){
            if(e.value == true)
            {
                this.state.active = 'Y'
            }else{
                this.state.active = 'N'
            }
        },

        changeSwitchMenu(e, l){
            this.state = {
                kode:l.id,
                webcv_id: this.webcv,
                menu:l.menu,
                active:l.active,
                thumb:l.thumb
            }

            if(e.value == true)
            {
                this.state.active = 'Y'
            }else{
                this.state.active = 'N'
            }

            this.saveMenu()
        },

        saveMenu(){
            this.$axios.post('/auth/webcv-menu', this.state)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.$bvModal.hide("modal-menu");
                        window.location.reload()

                    }
                })
        },

        resetFormMenu(){
            this.state = {
                kode:'',
                webcv_id: this.webcv,
                menu:'',
                active:'Y',
                thumb:''
            }
        },

        editPage(page){
            var current_page = page 

            if(this.$auth.loggedIn)
            {
                if(this.$auth.user)
                {
                    if(this.$auth.user.data)
                    {
                        if(this.$auth.user.data.webcv)
                        {
                            if(this.$auth.user.data.webcv.data)
                            {
                                if(page == '/u/'+this.$auth.user.data.webcv.data.slug)
                                {
                                    if(this.$auth.user.data.webcv.data.menu)
                                    {
                                        if(this.$auth.user.data.webcv.data.menu.data)
                                        {
                                            for(var a=0; a<this.$auth.user.data.webcv.data.menu.data.length; a++)
                                            {
                                                if(a == 0)
                                                {
                                                    current_page = '/webcv/'+this.$auth.user.data.webcv.data.menu.data[a].id+'/customize'
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    if(this.$auth.user.data.webcv.data.menu)
                                    {
                                        if(this.$auth.user.data.webcv.data.menu.data)
                                        {
                                            for(var a=0; a<this.$auth.user.data.webcv.data.menu.data.length; a++)
                                            {
                                                if('/u/'+this.$auth.user.data.webcv.data.slug+'/page/'+this.$auth.user.data.webcv.data.menu.data[a].slug == page)
                                                {
                                                    current_page = '/webcv/'+this.$auth.user.data.webcv.data.menu.data[a].id+'/customize'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return current_page
        },

        logout() {
            this.$swal({
                title: 'Keluar?',
                text: 'Apakah anda yakin ingin keluar?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Ya, Keluar',
                confirmButtonColor: '#EC5941',
                showCloseButton: true,
                reverseButtons:true,
                showLoaderOnConfirm: true,
                customClass: {
                    actions:'text-right',
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-white'
                },
                buttonsStyling: false
            })
            .then((result) => {
                if(result.value) {
                    this.$auth.logout();
                }
            })
        }
    }
    
}
</script>