<template>
    <div>
        <div slot="pageheader">
            <!-- Page title -->
            <div class="page-header d-print-none">
                <div class="row align-items-center">
                    <div class="col">
                        <!-- Page pre-title -->
                        <div class="page-pretitle">
                            Page
                        </div>
                        <h2 class="page-title">
                            {{title}}
                        </h2>
                    </div>
                    <!-- Page title actions -->
                    <div class="col-auto ms-auto d-print-none" v-if="btnAction">
                        <div class="btn-list">
                            <!-- <nuxt-link :to="addLink"  class="btn btn-primary d-none d-sm-inline-block"> -->
                            <nuxt-link :to="addLink"  class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                New {{title}}
                            </nuxt-link>

                            <!-- <a v-if="btnImport" href="#" class="btn btn-success" @click.prevent="showFormImport">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v8m5.009 .783c.924 .14 1.933 .217 2.991 .217c4.418 0 8 -1.343 8 -3v-6" /><path d="M11.252 20.987c.246 .009 .496 .013 .748 .013c4.418 0 8 -1.343 8 -3v-6m-18 7h7m-3 -3l3 3l-3 3" /></svg>
                                Import {{title}}
                            </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <slot name="filtertable"></slot>
        
        <div style="margin-top:15px" class="card mt-20">
            <div class="card-body border-bottom py-3" v-if="showPaginate">
                <div class="d-flex">
                    <div class="text-muted">
                        Show
                        <div class="mx-2 d-inline-block">
                            <select class="form-select" @change="change_per_page($event)">
                                <option value="10">10</option>
                                <option v-if="meta.total > 10" value="25">25</option>
                                <option v-if="meta.total > 25" value="50">50</option>
                                <option v-if="meta.total > 50" value="100">100</option>
                            </select>
                        </div>
                        entries
                    </div>
                    <div class="ms-auto text-muted">
                        Search:
                        <div class="ms-2 d-inline-block">
                            <div class="input-icon mb-3">
                                <input type="search" v-model="cari" class="form-control" placeholder="Search…" @input="search($event)">
                                <span class="input-icon-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="10" cy="10" r="7"></circle><line x1="21" y1="21" x2="15" y2="15"></line></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isFinish == 1" class="text-center">
                <h1>Loading<span class="animated-dots"></span></h1>
            </div>

            <div class="table-responsive" v-if="lists.data.length > 0">
                <b-table :items="lists.data" :fields="fields" show-empty>
                    <template v-slot:cell(No)="data">
                        {{ data.index + 1 }}
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(namauser)="row">
                        <div class="d-flex py-1 align-items-center">
                            <span class="avatar me-2" v-bind:style="{
                                backgroundImage: 'url(' + row.item.profile_picture_url + ')',
                                }"></span>
                            <div class="flex-fill">
                                <div class="font-weight-medium">{{row.item.name}}</div>
                                <div class="text-muted"><a href="#" class="text-reset">{{row.item.email}}</a></div>
                            </div>
                        </div>
                    </template>

                    <template v-slot:cell(categories)="row">
                        <div class="d-flex align-items-center">
                            <a class="badge badge-primary mb-2 mt-2" style="margin-right:5px" v-for="(l,idx) in row.item.category.data" :key="idx" href="#">{{l.name}}</a>
                        </div>
                    </template>

                    <template v-slot:cell(description)="row">
                        <div v-html="row.item.description"></div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(roleuser)="row">
                        <div v-for="(l,idx) in row.item.role" :key="idx" class="text-muted" style="margin-right:10px;margin-bottom:10px">{{l.name}}</div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(activeuser)="row">
                        <span v-show="row.item.active == 'Y' && row.item.email !='jamal.apriadi@gmail.com'" style="padding-top:15px">
                            <toggle-button :value="true"
                                :sync="true"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="nonAktifUser(row.item.id)"/>
                        </span>

                        <span v-show="row.item.active == 'N' && row.item.email !='jamal.apriadi@gmail.com'" style="padding-top:15px">
                            <toggle-button :value="false"
                                name="phone"
                                :sync="false"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="aktifUser(row.item.id)"/>
                        </span>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(publish)="row">
                        <span v-show="row.item.publish == 'Y'" style="padding-top:15px">
                            <toggle-button :value="true"
                                :sync="true"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="nonAktifMember(row)"/>
                        </span>

                        <span v-show="row.item.publish == 'N'" style="padding-top:15px">
                            <toggle-button :value="false"
                                name="phone"
                                :sync="false"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="aktifMember(row)"/>
                        </span>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(actions)="row">
                        <div class="btn-list flex-nowrap">
                            <div class="dropdown">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a>

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                    
                    <template v-if="btnAction == true" v-slot:cell(actionrole)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-info" @click.prevent="goToSetPermission(row)">
                                Set Permissions
                            </a>
                            <div class="dropdown">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a>

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(actionuser)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-info" @click.prevent="goToSetRole(row)">
                                Set Role
                            </a>
                            <div class="dropdown" v-if="row.item.email !='jamal.apriadi@gmail.com'">
                                <button class="btn dropdown-toggle align-text-top" data-bs-toggle="dropdown" aria-expanded="false">
                                    Actions
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" style="">
                                    <!-- <a class="dropdown-item" href="#" @click.prevent="goToEdit(row)">
                                        Edit
                                    </a> -->

                                    <a class="dropdown-item" href="#" @click="openDeleteModal(row)">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template v-slot:cell(preview_image)="row">
                        <img :src="row.item.preview_image" alt="" style="width:80px">
                    </template>

                    <template v-slot:cell(icon)="row">
                        <div v-html="row.item.icon"></div>
                    </template>

                    <template v-if="btnAction == true" v-slot:cell(qrcode)="row">
                        <div class="btn-list flex-nowrap">
                            <a href="#" class="btn btn-success" @click.prevent="showQrcode(row)">
	                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><line x1="7" y1="17" x2="7" y2="17.01" /><rect x="14" y="4" width="6" height="6" rx="1" /><line x1="7" y1="7" x2="7" y2="7.01" /><rect x="4" y="14" width="6" height="6" rx="1" /><line x1="17" y1="7" x2="17" y2="7.01" /><line x1="14" y1="14" x2="17" y2="14" /><line x1="20" y1="14" x2="20" y2="14.01" /><line x1="14" y1="14" x2="14" y2="17" /><line x1="14" y1="20" x2="17" y2="20" /><line x1="17" y1="17" x2="20" y2="17" /><line x1="20" y1="17" x2="20" y2="20" /></svg>
                                QRCode
                            </a>
                        </div>
                    </template>

                    <template v-slot:cell(active)="row">
                        <span v-show="row.item.active == 'Y'" style="padding-top:15px">
                            <toggle-button :value="true"
                                :sync="true"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="nonAktifCard(row.item.id)"/>
                        </span>

                        <span v-show="row.item.active == 'N'" style="padding-top:15px">
                            <toggle-button :value="false"
                                name="phone"
                                :sync="false"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="aktifCard(row.item.id)"/>
                        </span>
                    </template>
                </b-table>
            </div>

            <div style="margin-top:15px;border:none" class="empty card" v-else>
                <div class="empty-img">
                    <img src="~/static/illustrations/undraw_printing_invoices_5r4r.svg" height="128" alt="">
                </div>
                <p class="empty-title">No results found</p>
                <p class="empty-subtitle text-muted">
                    Try adjusting your search or filter to find what you're looking for.
                </p>
                <div class="empty-action" v-if="btnAction">
                    <nuxt-link :to="addLink"  class="btn btn-primary d-none d-sm-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Add your first {{title}}
                    </nuxt-link>
                </div>
            </div>

            <div class="card-footer d-flex align-items-center" v-if="meta.total > meta.per_page">
                <p class="m-0 text-muted">
                    Showing 
                    <span> {{meta.per_page}} from {{meta.total}}</span>
                    entries
                </p>
                <b-pagination
                    v-model="meta.current_page"
                    :total-rows="meta.total"
                    :per-page="meta.per_page"
                    :first-text="'Prev'"
                    :last-text="'Next'"
                    first-number
                    last-number
                    align="right"
                    @change="change_page"
                    class="pagination m-0 ms-auto"
                    aria-controls="dw-datatables">

                        <template #prev-text>Prev</template>
                        <template #next-text>Next</template>
                </b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        showPaginate:{
            type: Boolean,
            default:true
        },
        title:{
            type:String,
            required:true
        },
        btnAction:{
            type: Boolean
        },
        addLink:{
            type:String
        },
        fields:{
            type:Array,
            required:true
        },
        saveUrl:{
            type:String
        },
        lists:{
            type:Object
        },
        meta:{
            type:Object
        },
        isFinish:{
            type: String
        },
        kode:{
            type:String,
            // required:true,
            default:''
        },
        hasilcari:{
            type:String
        },
        editUrl:{
            type:String
        },
        btnImport:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            cari: this.hasilcari,
            timer: undefined,
            current_title:'',
            current_image:''
        }
    },
    methods:{
        bukaImage(title,image){
            this.current_title = title
            this.current_image = image
            this.$bvModal.show('bv-modal-image')
        },

        goToEdit(val){
            // this.$emit('edit', val)
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/edit" })
        },

        goToStep2(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/step1" })
        },

        goToDetail(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/detail" })
        },

        goToSetUser(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/user" })
        },

        goToSetFitur(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/set-fitur" })
        },

        goToSetRegulation(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/set-regulation" })
        },

        showQrcode(val){
            this.$emit('openQr', val)
        },

        showFoQrcode(val){
            this.$emit('openFoQr', val)
        },

        showFormImport(){
            this.$emit('showFormImport')
        },

        goToSetPermission(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/permission" })
        },

        goToSetRole(val){
            this.$router.push({ path: this.editUrl+'/'+val.item.id+"/role" })
        },

        openDeleteModal(val){
            this.$emit('delete', val)
        },

        search(e){
            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.$emit('search', e.target.value)
            }, 500)
        },

        change_page(val){
            this.$emit('pagination', val)
        },

        change_per_page(val){
            this.$emit('changePerPage', val)
        },

        nonAktifUser(id){
            this.$swal({
                title: 'Non Aktif User?',
                text: 'Apakah anda yakin ingin menonaktifkan user ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/status-user/'+id+'?status=N')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Non Aktif user berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Non aktif user gagal' , 'error');
                            }

                            this.$emit('changeStatusUser')
                        })
                } else {
                    this.$swal('Cancelled', 'User tidak di non aktifkan', 'info')
                    this.$emit('changeStatusUser')
                }
            })
        },

        aktifUser(id){
            this.$swal({
                title: 'Aktif User?',
                text: 'Apakah anda yakin ingin mengaktifkan user ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/status-user/'+id+'?status=Y')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Aktif', 'Aktif user berhasil' , 'success');
                            }else{
                                this.$swal('Aktif', 'aktif user gagal' , 'error');
                            }

                            this.$emit('changeStatusUser')
                        })
                } else {
                    this.$swal('Cancelled', 'User tidak di aktifkan', 'info')

                    this.$emit('changeStatusUser')
                }
            })
        },

        nonAktifMember(id){
            this.$swal({
                title: 'Non Aktif Data?',
                text: 'Apakah anda yakin ingin menonaktifkan data ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.patch(id.item.links.detail+'?status=N')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Non Aktif berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Non aktif gagal' , 'error');
                            }

                            this.$emit('changeStatusMember')
                        })
                } else {
                    this.$swal('Cancelled', 'Data tidak di non aktifkan', 'info')
                    this.$emit('changeStatusUser')
                }
            })
        },

        aktifMember(id){
            this.$swal({
                title: 'Aktif Data?',
                text: 'Apakah anda yakin ingin mengaktifkan data ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.patch(id.item.links.detail+'?status=Y')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Aktif', 'Aktif  berhasil' , 'success');
                            }else{
                                this.$swal('Aktif', 'aktif  gagal' , 'error');
                            }

                            this.$emit('changeStatusMember')
                        })
                } else {
                    this.$swal('Cancelled', 'Member tidak di aktifkan', 'info')

                    this.$emit('changeStatusMember')
                }
            })
        },

        nonAktifCard(id){
            this.$swal({
                title: 'Non Aktif Card?',
                text: 'Apakah anda yakin ingin menonaktifkan card ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/design-card-active/'+id+'?status=N')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Non Aktif card berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Non aktif card gagal' , 'error');
                            }

                            this.$emit('changeStatusCard')
                        })
                } else {
                    this.$swal('Cancelled', 'Card tidak di non aktifkan', 'info')
                    this.$emit('changeStatusCard')
                }
            })
        },

        aktifCard(id){
            this.$swal({
                title: 'Aktif Card?',
                text: 'Apakah anda yakin ingin mengaktifkan card ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.post('api/auth/design-card-active/'+id+'?status=Y')
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Aktif', 'Aktif card berhasil' , 'success');
                            }else{
                                this.$swal('Aktif', 'aktif card gagal' , 'error');
                            }

                            this.$emit('changeStatusCard')
                        })
                } else {
                    this.$swal('Cancelled', 'Card tidak di aktifkan', 'info')

                    this.$emit('changeStatusCard')
                }
            })
        },
    }
}
</script>