<template>
    <header class="navbar navbar-expand-md navbar-light d-print-none">
        <div class="container-xl">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                <a href="#">
                    <Logo />
                </a>
            </h1>
            <div class="navbar-nav flex-row order-md-last">
                <div class="d-md-flex">
                    <div class="nav-item dropdown d-md-flex me-3">
                        <a href="#" class="nav-link px-0" data-bs-toggle="dropdown" tabindex="-1" aria-label="Show notifications">
                            <!-- Download SVG icon from http://tabler-icons.io/i/bell -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                            <span class="badge bg-red"></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                            <!-- <div class="card" v-if="$auth.user.data.unreadnotification">
                                <div class="card-header">
                                    <h3 class="card-title">Last updates</h3>
                                </div>
                                <div class="list-group list-group-flush list-group-hoverable">
                                    <div class="list-group-item" v-for="(l,idx) in $auth.user.data.unreadnotification.data" :key="idx">
                                        <div class="row align-items-center">
                                            <div class="col-auto" v-if="l.fromuser && l.fromuser.data">
                                                <span class="avatar avatar-sm avatar-rounded" v-bind:style="{
                                                    backgroundImage: 'url('+l.fromuser.data.profile_picture_url+')'}"></span>
                                            </div>
                                            <div class="col text-truncate">
                                                <nuxt-link class="text-body d-block" :to="l.url">
                                                    <span v-html="l.text"></span>
                                                </nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer bg-light">
                                    <div class="text-center">
                                        <nuxt-link :to="'/notification'">Lihat semua Pesan</nuxt-link>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>
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
            </div>

            <div class="collapse navbar-collapse" id="navbar-menu">
                <div>
                    <form action="." method="get">
                        <div class="input-icon">
                            <span class="input-icon-addon">
                                <!-- Download SVG icon from http://tabler-icons.io/i/search -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="10" cy="10" r="7" /><line x1="21" y1="21" x2="15" y2="15" /></svg>
                            </span>
                            <input type="text" value="" class="form-control" placeholder="Search…" aria-label="Search in website">
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </header>
</template>

<script>
export default {
    methods:{
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
                    this.$router.replace("/login");
                }
            })
        }
    }
}
</script>