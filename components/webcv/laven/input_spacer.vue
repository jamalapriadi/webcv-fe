<template>
    <div>
        <div class="form-group">
            <label for="" class="control-label">Height (pixels)</label>
            <input type="numer" v-model="json_fields.title" class="form-control">
        </div>
        <hr style="border:1px solid gray">

        <div class="block-title">
            <h2>Sample</h2>
        </div>

        <div v-bind:style="{
            width:'100%',
            height:json_fields.title+'px',
            background:'lightgray'
        }"></div>

        <div class="text-center mt-4">
            <a href="#" @click.prevent="publishContent" class="btn btn-primary">Save Content</a>
        </div>
    </div>
</template>

<script>
import InputDropzoneDefault from '~/components/input/InputDropzoneDefault.vue'
import testimonialVue from "~/components/webcv/laven/testimonial.vue"

export default{
    props:['section','title','list'],
    components:{
        InputDropzoneDefault,
        testimonialVue
    },
    data(){
        return {
            state:{
                fullname:'',
                title:'',
                testimoni:'',
                file:'',
                file_preview:''
            },
            json_fields:{
                title:'' ,
                list:this.list ? this.list : []
            },
            show_preview:false,
            kode:'Y'
        }
    },
    methods:{
        reset(){
            this.state = {
                fullname:'',
                title:'',
                testimoni:'',
                file:'',
                file_preview:''
            }

            this.kode = 'Y'
            this.show_preview = false
        },

        handleUploadFoto(data){
            this.show_preview = true 
            this.state.file = data.path     
            this.state.file_preview = data.path
        },

        hapusFoto(){
            this.show_preview = false 
            this.state.file = ''
            this.state.file_preview = ''
        },

        simpan(){
            if(this.state.icon == "")
            {
                this.$swal('Warning', 'Silahkan isi icon' , 'error');
                return false
            }

            if(this.state.title == "")
            {
                this.$swal('Warning', 'Silahkan isi title' , 'error');
                return false
            }

            if(this.state.description == "")
            {
                this.$swal('Warning', 'Silahkan isi description' , 'error');
                return false
            }

            this.json_fields.list.push(this.state)
            this.reset()
        },

        publishContent(){
            this.$emit('addFeature', this.json_fields)
        },

        edit(idx,l){
            this.kode = idx

            this.state = {
                fullname:l.fullname,
                title:l.title,
                testimoni:l.testimoni,
                file:l.file_preview,
                file_preview:l.file_preview
            }

            if(l.file_preview)
            {
                this.show_preview = true
            }
        },

        update(){
            for(var a=0; a<this.json_fields.list.length; a++)
            {
                if(a == this.kode)
                {
                    this.json_fields.list[a] = this.state
                }
            }

            this.reset()
        },

        hapus(idx)
        {
            var list = []
            for(var a=0; a<this.json_fields.list.length; a++)
            {
                if(a != idx)
                {
                    list.push(this.json_fields.list[a])
                }
            }

            this.json_fields.list = []
            this.json_fields.list = list

            this.reset()
        }
    }
}
</script>