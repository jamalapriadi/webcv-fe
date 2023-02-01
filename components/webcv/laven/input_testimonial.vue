<template>
    <div>
        <div class="form-group">
            <label for="" class="control-label">Feature Title</label>
            <input type="text" v-model="json_fields.title" class="form-control">
        </div>
        <hr style="border:1px solid gray">

        <div class="row">
            <div class="col-5">
                <div class="form-group">
                    <label for="" class="form-label">Fullname</label>
                    <input type="text" class="form-control" v-model="state.fullname">
                </div>
            </div>

            <div class="col-7">
                <div class="form-group">
                    <label for="" class="form-label">Title</label>
                    <input type="text" class="form-control" v-model="state.title">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="" class="form-label">Testimoni</label>
            <textarea class="form-control" v-model="state.testimoni"></textarea>
        </div>
        
        <div v-if="show_preview == false" class="mb-2">
            <InputDropzoneDefault @suksesUploadDropzone="handleUploadFoto"></InputDropzoneDefault>
        </div>

        <div v-if="show_preview == true" class="mb-2">
            <img class="img-fluid" :src="state.file_preview">
            <div class="text-center">
                <a href="#" class="btn btn-sm btn-danger" @click.prevent="hapusFoto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 7l16 0"></path>
                        <path d="M10 11l0 6"></path>
                        <path d="M14 11l0 6"></path>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                </a>
            </div>
        </div>

        <div class="text-end">
            <a v-if="kode == 'Y'" href="#" @click.prevent="simpan" class="btn btn-info">Add Testimoni</a>
            <a v-if="kode != 'Y'" href="#" @click.prevent="update" class="btn btn-info">Update Testimoni</a>
        </div>

        <div class="mt-2">
            <!-- Testimonials -->
            <table v-if="json_fields">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th></th>
                        <th>Fullname</th>
                        <th>Title</th>
                        <th>Testimoni</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="json_fields.list">
                    <tr v-for="(l,idx) in json_fields.list">
                        <td>{{ (idx+1) }}</td>
                        <td>
                            <img :src="l.file_preview" style="width:80px;height:80px">
                        </td>
                        <td>{{ l.fullname }}</td>
                        <td>{{ l.title }}</td>
                        <td>{{ l.testimoni }}</td>
                        <td>
                            <div class="btn-group">
                                <a href="#" class="btn btn-sm btn-warning" @click.prevent="edit(idx,l)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                        <path d="M16 5l3 3"></path>
                                    </svg>
                                </a>
                                <a href="#" class="btn btn-sm btn-danger" @click.prevent="hapus(idx)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 7l16 0"></path>
                                        <path d="M10 11l0 6"></path>
                                        <path d="M14 11l0 6"></path>
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                    </svg>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="p-40"></div>
        </div>

        <div v-if="json_fields.list.length > 0" class="text-center">
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
                title:this.title == '' ? this.title : 'Testimonials' ,
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
            if(this.json_fields.title == "")
            {
                this.$swal('Warning', 'Silahkan isi feature title' , 'error');
                return false
            }

            if(this.json_fields.list.length == 0)
            {
                this.$swal('Warning', 'Silahkan isi list feature' , 'error');
                return false
            }

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