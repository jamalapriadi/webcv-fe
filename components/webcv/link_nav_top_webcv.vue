<template>
    <div style="border-bottom:1px solid lightgray">
        <div class="card" style="border:none">
            <div class="card-body">
                <div class="row">
                    <div class="col-auto">
                        <a href="#" class="text-reset" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-link" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path>
                                <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="col-auto" v-if="edit == false">
                        <strong>{{$auth.user.data.webcv.data.link_url}}</strong>
                    </div>

                    <div class="col-auto" v-if="edit">
                        <b-form inline style="border:none !important" @submit.prevent="updateShortUrl">
                            <div class="input-group">
                                <div style="border:none" class="input-group-text">{{$auth.user.data.webcv.data.domain}}</div>
                                <div class="input-icon">
                                    <input @input="cekShortUrl($event, $auth.user.data.webcv.data.slug)" v-model="state.url" type="text" class="form-control" style="border-left:none;border-top:none;border-right:none;border-bottom:1px solid lightgray;border-radius:0" autofocus="true">
                                    <span class="input-icon-addon" v-if="cek">
                                        <div class="spinner-border spinner-border-sm text-muted" role="status"></div>
                                    </span>
                                </div>
                            </div>

                            <div class="btn-list ml-2">

                                <a href="#" class="btn btn-danger" v-if="canedit" @click.prevent="updateShortUrl">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                        <path d="M16 5l3 3"></path>
                                    </svg>
                                </a>

                                <a href="#" class="btn btn-secondary" @click.prevent="goEdit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </a>
                            </div>
                        </b-form>
                    </div>

                    <div class="col-auto" v-if="edit == false">
                        <a href="#" class="text-link" @click.prevent="goEdit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                            </svg>
                            Edit
                        </a>
                    </div>

                    <div class="col-auto">
                        <a href="#" @click.prevent="copyLink($auth.user.data.webcv.data.link_url)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="8" y="8" width="12" height="12" rx="2"></rect>
                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
                            </svg>
                            Copy
                        </a>
                    </div>

                    <div class="col-auto">
                        <a href="#" @click.prevent="showQr">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-qrcode" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                                <line x1="7" y1="17" x2="7" y2="17.01"></line>
                                <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                                <line x1="7" y1="7" x2="7" y2="7.01"></line>
                                <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                                <line x1="17" y1="7" x2="17" y2="7.01"></line>
                                <line x1="14" y1="14" x2="17" y2="14"></line>
                                <line x1="20" y1="14" x2="20" y2="14.01"></line>
                                <line x1="14" y1="14" x2="14" y2="17"></line>
                                <line x1="14" y1="20" x2="17" y2="20"></line>
                                <line x1="17" y1="17" x2="20" y2="17"></line>
                                <line x1="20" y1="17" x2="20" y2="20"></line>
                            </svg>
                            Qr Code
                        </a>
                    </div>

                    <div class="col-auto">
                        <a :href="$auth.user.data.webcv.data.link_url" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-maximize" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <polyline points="16 4 20 4 20 8"></polyline>
                                <line x1="14" y1="10" x2="20" y2="4"></line>
                                <polyline points="8 20 4 20 4 16"></polyline>
                                <line x1="4" y1="20" x2="10" y2="14"></line>
                                <polyline points="16 20 20 20 20 16"></polyline>
                                <line x1="14" y1="14" x2="20" y2="20"></line>
                                <polyline points="8 4 4 4 4 8"></polyline>
                                <line x1="4" y1="4" x2="10" y2="10"></line>
                            </svg>
                            Preview
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal qr-->
        <b-modal
            :ref="'modal-qr'"
            :id="'modal-qr'"
            size="sm"
            no-close-on-backdrop
            hide-footer
            :modal-class="'modal modal-blur fade'" 
            :dialog-class="'modal-dialog modal-dialog-centered'"
            title="QR Code"
        >
            <div v-if="$auth.user">
                <div v-if="$auth.user.data">
                    <div v-if="$auth.user.data.webcv">
                        <div class="row" v-if="$auth.user.data.webcv.data">
                            <div class="col-auto">
                                <div class="card">
                                    <div class="card-body">
                                        <vue-qr 
                                            :size="400" 
                                            :correctLevel="1" 
                                            id="qrcode" 
                                            :logoCornerRadius="25" 
                                            :color="'red'" 
                                            :text="$auth.user.data.webcv.data.link_url" 
                                            qid="testid">
                                        </vue-qr>
                                    </div>
                                </div>

                                <a href="#" class="btn btn-primary mt-2 btn-block" @click.prevent="downloadQr">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                        <polyline points="7 11 12 16 17 11"></polyline>
                                        <line x1="12" y1="4" x2="12" y2="16"></line>
                                    </svg>
                                    
                                    Download PNG
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </b-modal>
        <!-- end modal qr-->
    </div>
</template>

<script>
    export default{
        data(){
            return {
                edit:false,
                state:{
                    kode:'',
                    domain:'https://webky.id',
                    url:'',
                },
                cek:false,
                canedit:false,
                renderPreview:true,
                loading:false,
                message:'',
                messageclass:'',
            }
        },
        mounted(){
            this.setUrl()
        },
        methods:{
            setUrl(){
                if(this.$auth.user)
                {
                    if(this.$auth.user.data)
                    {
                        if(this.$auth.user.data.webcv)
                        {
                            if(this.$auth.user.data.webcv.data)
                            {
                                this.renderPreview = false
                                
                                this.state.kode = this.$auth.user.data.webcv.data.id
                                this.state.domain = this.$auth.user.data.webcv.data.domain
                                this.state.url = this.$auth.user.data.webcv.data.slug

                                this.$nextTick(() => {
                                    this.renderPreview = true
                                });
                            }
                        }
                    }
                }
            },

            showQr(){
                this.$bvModal.show("modal-qr");
            },

            downloadQr(){
                var oQrcode = document.querySelector('#qrcode')
                var url = oQrcode.src
                var a = document.createElement('a')
                var event = new MouseEvent('click')

                //Download image name
                a.download = 'webcv QRCode'

                //url 
                a.href = url 

                //Synthesis function, execute download 
                a.dispatchEvent(event)
            },

            copyLink(link){
                this.$copyText(link)
                this.$toasted.show("Link berhasil disalin", { 
                    className: ['toasting'], 
                    position: "top-center", 
                    duration : 2000
                })
            },

            cekShortUrl(e, slug){
                this.canedit = false
                this.cek = true

                clearTimeout(this.timer)

                this.timer = setTimeout(() => {
                    this.validateShortUrl(e.target.value, slug)
                }, 1000)
            },

            validateShortUrl(e, slug)
            {
                if(e != slug)
                {
                    this.$axios.post('/auth/check-slug-url/'+e)
                        .then(resp => {
                            this.cek = false
                            if(resp.data.success == true)
                            {
                                this.can_create = false
                                this.canedit = true

                                this.$toasted.show(resp.data.message, { 
                                    className: ['toasting'], 
                                    position: "top-right", 
                                    duration : 2000
                                })
                            }else{
                                this.$toasted.show(resp.data.message, { 
                                    className: ['toasting'], 
                                    position: "top-right", 
                                    duration : 2000
                                })
                            }
                        })
                }else{
                    this.cek = false
                    this.canedit = true
                }
            },

            updateShortUrl(){
                this.$axios.patch('/auth/webcv/'+this.state.kode, this.state)
                    .then(resp => {

                        if(resp.data.success == true)
                        {
                            this.$toasted.show('Data berhasil diupdate', { 
                                className: ['toasting'], 
                                position: "top-right", 
                                duration : 2000
                            })

                            this.$auth.fetchUser()
                            this.edit = false
                        }
                    })
            },

            goEdit(){
                this.edit = !this.edit

                if(this.edit == true)
                {
                    this.canedit = true
                    this.cek = false
                }else{
                    this.canedit = false
                    this.cek = false
                }
                
            },
        }
    }
</script>