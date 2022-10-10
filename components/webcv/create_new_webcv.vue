<template>
    <div>
        <p>Let's get started by setting up your webcv URL. 
            This is the web address you can paste into social media profiles 
            or share just like you would any other link.
        </p>

        <form @submit.prevent="save">
            <div class="form-group">
                <label for="" class="form-label">
                    <strong>Webcv URL</strong>
                </label>

                <div v-if="loading" class="text-center">
                    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                </div>

                <div class="row" style="background:#edf2ff;padding:10px;">
                    <div class="col-5">
                        <div class="form-group">
                            <label for="" class="form-label">Domain</label>
                            <select v-model="state.domain" name="domain" id="domain" class="form-select">
                                <option value="https://webcv.id">webcv.id</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-auto">
                        <div class="form-group">
                            <label for="" class="form-label mt-4">/</label>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="form-group">
                            <label for="" class="form-label">Slug</label> 
                            <div class="input-icon">
                                <input @input="cekShortUrl($event)" type="text" class="form-control" v-model="state.slug">
                                <span class="input-icon-addon" v-if="cek">
                                    <div class="spinner-border spinner-border-sm text-muted" role="status"></div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-footer text-end">
                <div class="d-flex">
                    <a href="#" class="btn btn-link" @click.prevent="batal">Cancel</a>
                    <button :disabled="can_create" type="submit" class="btn btn-primary ms-auto">{{btnText}}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            backBtn:'/webcv',
            btnText:'Create Webcv',
            loading:false,
            message:'',
            messageclass:'',
            can_create:true,
            cek:false,
            state:{
                domain:'https://webcv.id',
                slug:''
            },
            errors:[],
            timer: undefined,
        }
    },
    methods:{
        getClass(l){
            var defaultClass = 'form-control'

            if(this.errors)
            {
                if(this.errors[l])
                {
                    defaultClass = 'form-control is-invalid'
                }
            }  

            return defaultClass
        },

        cekShortUrl(e){
            this.can_create = true
            this.cek = true

            clearTimeout(this.timer)

            this.timer = setTimeout(() => {
                this.validateShortUrl(e.target.value)
            }, 1000)
        },

        validateShortUrl(e)
        {
            this.$axios.post('/auth/check-slug-url/'+e)
                .then(resp => {
                    this.cek = false
                    if(resp.data.success == true)
                    {
                        this.can_create = false

                        this.$toasted.show(resp.data.message, { 
                            className: ['toasting'], 
                            position: "top-center", 
                            duration : 2000
                        })
                    }else{
                        this.$toasted.show(resp.data.message, { 
                            className: ['toasting'], 
                            position: "top-center", 
                            duration : 2000
                        })
                    }
                })
        },
        
        batal(){
            this.$emit('batal')
        },

        save(){
            this.loading = true

            this.$axios.post('/auth/webcv',this.state)
                .then(resp => {
                    this.loading = false 

                    if(resp.data.success == true)
                    {
                        this.$auth.fetchUser()
                        this.$emit('suskesWebcv')
                    }else{
                        this.$toasted.show('Data gagal disimpan', { 
                            className: ['toasting'], 
                            position: "top-center", 
                            duration : 2000
                        })
                    }
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        // this.$swal('422', this.message, 'Danger')
                    }

                    if (error.response.status == 500) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        this.$swal('500', this.message, 'Danger')
                    }
                })
        }
    }
}
</script>