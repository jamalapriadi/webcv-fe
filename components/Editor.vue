<template>
    <div>
        <client-only placeholder="loading...">
            <ckeditor-nuxt :config="editorConfig" v-model="description" @input="inputDesc"/>
        </client-only>
    </div>
</template>

<script>
export default {
    props:{
        'desc':{
            type:String
        }
    },
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    data(){
        return {
            description:this.desc,
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
                    'MathType'
                ],
            },
        }
    },
    methods:{
        inputDesc(e){
            this.$emit('inputDesc',e)
        }
    }
}
</script>

<style>
    .ck-editor__editable {
        min-height: 480px;
    }
</style>