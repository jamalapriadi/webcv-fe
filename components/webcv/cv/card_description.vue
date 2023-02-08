<template>
    <div>
        <div class="card">
            <div class="card-header">
                Profile
            </div>
            <div class="card-body">
                <form @submit.prevent="simpan">
                    <div v-if="loading" class="mt-2 text-center">
                        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                    </div>

                    <div v-if="message" :class="messageclass" role="alert">
                        <div class="text-muted" v-html="message"></div>
                    </div>

                    <div class="form-group">
                        <label for="" class="control-label">Summary</label>
                        <client-only placeholder="loading...">
                            <ckeditor-nuxt :config="editorConfig" v-model="state.description"/>
                        </client-only>
                    </div>

                    <div class="text-end">
                        <div class="d-flex">
                            <button type="submit" class="btn btn-outline-primary ms-auto">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['person'],
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    data(){
        return {
            state:{
                description:this.person.description
            },
            errors:[],
            loading:false,
            message:'',
            messageclass:'',
            editorConfig: {
                simpleUpload: {
                    uploadUrl: process.env.LARAVEL_ENDPOINT+'/api/uploads',
                    headers: {
                        // 'Authorization': 'optional_token'
                        'accept': 'application/json'
                    }
                },
                removePlugins: [
                    'Title',
                    'Code',
                    'Superscript',
                    'Subscript',
                    'PageBreak',
                    'MathType',
                    'LinkImage',
                    'CodeBlock',
                    'CloudServices',
                    'FontColor',
                    'FontBackgroundColor',
                    'FontFamily',
                    'FontSize',
                    'Link',
                    'LinkImage',
                    'Image',
                    'ImageCaption',
                    'ImageInsert',
                    'ImageResize',
                    'ImageStyle',
                    'ImageToolbar',
                    'ImageUpload',
                    'Heading',
                    'Strikethrough',
                    'BlockQuote',
                    'IndentBlock',
                    'Indent',
                    'TodoList',
                    'Table',
                    'TableCellProperties',
                    'TableProperties',
                    'TableToolbar',
                    'HorizontalLine',
                    'Highlight',
                ],
            },
        }
    },
    methods:{
        simpan(){
            this.loading = true
            this.$axios.patch('/auth/cv/person/'+this.person.id, this.state)
                .then(resp => {
                    this.loading = false

                    if(resp.data.success == true)
                    {
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-success'

                        this.$toast.success(resp.data.message,{ 
                            className: ['toasting'], 
                            position: "top-right", 
                            duration : 2000
                        })

                        this.$emit('sukses')
                    }else{
                        this.message = resp.data.message
                        this.messageclass = 'alert alert-warning'

                        this.$toast.error(resp.data.message,{ 
                            position: "top-right", 
                            duration : 2000
                        })
                    }
                }).catch(error => {
                    if (error.response.status == 422) {
                        this.loading=false
                        this.errors = error.response.data.errors;
                        this.messageclass='alert alert-danger';
                        this.message = error.response.data.message

                        this.$swal('422', this.message, 'Danger')
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

<style>
.ck-editor .ck-editor__main .ck-content {
    min-height: 130px;
}
</style>