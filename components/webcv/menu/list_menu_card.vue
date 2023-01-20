<template>
    <div>
        <a href="#" class="btn btn-primary mb-2" @click.prevent="addNewMenu">
            Add New Menu
        </a>

        <div v-if="lists">
            <div v-if="lists.data">
                <div v-for="(l,idx) in lists.data" :key="idx" class="card mb-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-auto">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="4" y1="6" x2="20" y2="6"></line>
                                        <line x1="4" y1="12" x2="20" y2="12"></line>
                                        <line x1="4" y1="18" x2="20" y2="18"></line>
                                    </svg>
                                </a>
                            </div>
                            <div class="col-7">
                                {{l.menu}}
                            </div>
                            <div class="col-2">
                                <nuxt-link :to="'/webcv/'+l.id+'/customize'" class="btn btn-primary">Set Content</nuxt-link>
                            </div>
                            <div class="col-2 text-end">
                                <toggle-button v-if="l.active == 'Y'"
                                    name="active"
                                    :value="true"
                                    :sync="true"
                                    :height="24"
                                    :labels="{checked: 'Ya', unchecked: 'No'}"
                                    :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                    @change="changeSwitchMenu($event, l)"/>

                                <toggle-button v-if="l.active == 'N'"
                                    name="active"
                                    :value="false"
                                    :sync="false"
                                    :height="24"
                                    :labels="{checked: 'Ya', unchecked: 'No'}"
                                    :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                    @change="changeSwitchMenu($event, l)"/>

                                <a href="#" @click.prevent="editTab(l)" class="btn btn-icon btn-warning">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                    </svg>
                                </a>

                                <a href="#" @click.prevent="deleteTab(l.id)" class="btn btn-icon btn-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <pre>{{lists}}</pre> -->

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
</template>

<script>
    export default{
        props:['webcv'],
        data(){
            return {
                lists:[],
                state:{
                    kode:'',
                    webcv_id: this.webcv,
                    menu:'',
                    active:'Y',
                    thumb:''
                }
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                this.lists = []
                var params = {
                    webcv: this.webcv
                }
                this.$axios.get('/auth/webcv-menu', params)
                    .then(resp => {
                        this.lists = resp.data
                    })
            },

            addNewMenu(){
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
                            this.resetFormMenu()
                            this.getData()

                            this.$bvModal.hide("modal-menu");
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

            editTab(l){
                this.state = {
                    kode:l.id,
                    webcv_id: this.webcv,
                    menu:l.menu,
                    active:l.active,
                    thumb:l.thumb
                }

                this.$bvModal.show("modal-menu");
            },

            deleteTab(id){
                this.$swal({
                    title: 'Delete Tab?',
                    text: 'Apakah anda yakin ingin menghapus data ini!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Lanjutkan!',
                    cancelButtonText: 'Tidak',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                })
                .then((result) => {
                    if(result.value) {
                        this.$axios.delete('/auth/webcv-menu/'+id)
                            .then(response => {
                                if(response.data.success==true){
                                    this.$swal('Success', 'Berhasil menghapus data' , 'success');
                                    this.getData()
                                }else{
                                    this.$swal('Failed', 'Gagal menghapus data' , 'error');
                                }
                            })
                    } else {
                        
                    }
                })
            },
        }
    }
</script>