<template>
    <div class="mb-3">
        <label class="form-label">{{label}}</label>
        <client-only placeholder="loading...">
            <ckeditor-nuxt :config="editorConfig" @input="inputText($event)"/>
        </client-only>
    </div>
</template>

<script>
export default {
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
    },
    props:{
        label:{
            type:String,
            required: true
        },
        inputNumber:{
            type:Number,
            default:0
        },
        maxNumber:{
            type:Number,
            default:0
        },
    },
    data(){
        return {
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
                    'FontSize',
                    'FontFamily',
                    'Highlight',
                    'FontBackgroundColor',
                    'CodeBlock',
                    'Essentials',
                    'List',
                    'ListStyle',
                    'ImageInsert',
                    'HorizontalLine',
                    'Table',
                    'Strikethrough',
                    'ImageInsert',
                    'ImageUpload',
                    'TodoList',
                    'Indent',
                    'IndentBlock',
                    'BlockQuote',
                    'Link',
                    'LinkImage',
                    'FontColor',
                    'Underline'
                ],
            },
        }
    },
    methods:{
        inputText(e){
            // console.log(e)
            this.$emit('inputText',e)
        }
    }
}
</script>