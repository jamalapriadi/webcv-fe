<template>
    <div>
        <div slot="pageheader">
            <!-- Page title -->
            <div class="page-header d-print-none">
                <div class="row align-items-center">
                    <div class="col">
                        <h2 class="page-title">
                            {{title}}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
            <div class="card">
                <div class="card-body">
                    <div v-for="(l,idx) in list" :key="'f'+idx" class="mb-3">
                        <div class="uploadphoto" v-if="l.type == 'image'">
                            <label class="form-label" for="upload_photo">{{l.label}}</label>
                            <input class="form-control" type="file" id="upload_photo" ref="file" accept="image/*" v-on:change="onFileChange" title="Ganti Foto"/>
                            <img v-if="nmodel.image_url != ''" :src="nmodel.image_url" alt="" class="img-fluid" style="height:100px;margin-top:10px">
                            <div v-else class="preview" style="margin-top:10px">
                                <!-- <button class="btn btn-link btn-delete" type="button">Hapus</button> -->
                                <!-- <img v-if="show_preview == false" src="~/assets/images/default-avatar.png" alt="photo"/> -->
                                <img v-if="show_preview == true" :src="file" alt="photo" class="img-fluid" style="width:120px"/>
                            </div>
                        </div>

                        <div class="uploadphoto" v-if="l.type == 'image2'">
                            <label class="form-label" for="upload_photo">{{l.label}}</label>
                            <input class="form-control" type="file" id="upload_photo" ref="bukti" accept="image/*" v-on:change="onFileChangeBukti" title="Ganti Foto"/>
                            <img v-if="nmodel.bukti_url != ''" :src="nmodel.bukti_url" alt="" class="img-fluid" style="height:100px;margin-top:10px">
                            <div v-else class="preview" style="margin-top:10px">
                                <!-- <button class="btn btn-link btn-delete" type="button">Hapus</button> -->
                                <!-- <img v-if="show_preview == false" src="~/assets/images/default-avatar.png" alt="photo"/> -->
                                <img v-if="show_previewbukti == true" :src="filebukti" alt="photo" class="img-fluid" style="width:120px"/>
                            </div>
                        </div>

                        <label v-if="l.type != 'image' && l.type != 'image2'">{{l.label}}</label>

                        <input v-if="l.type == 'text'" class="form-control" :class="{'is-invalid': errors[l.model]}" type="text" :required="l.required" v-model="nmodel[l.model]" :placeholder="l.placeholder"/>

                        <client-only v-if="l.type == 'textarea'" placeholder="loading...">
                            <ckeditor-nuxt :config="editorConfig"  :required="l.required" v-model="nmodel[l.model]" />
                        </client-only>

                        <div class="input-group mb-2" v-if="l.type == 'email'">
                            <span class="input-group-text">
                                @
                            </span>
                            <input v-if="l.type == 'email'" class="form-control" :class="{'is-invalid': errors[l.model]}" type="text" :required="l.required" v-model="nmodel[l.model]" :placeholder="l.placeholder"/>
                        </div>

                        <input v-if="l.type == 'number'" class="form-control" :class="{'is-invalid': errors[l.model]}" type="number" :required="l.required" v-model="nmodel[l.model]"/>
                        
                        <!-- <input-password v-if="l.type =='password'" @input="handleInput(l.model)" :list="l" v-model="state[l.model]" /> -->
                        <input v-if="l.type == 'password'" class="form-control" :class="{'is-invalid': errors[l.model]}" type="password" :required="l.required" v-model="nmodel[l.model]" :placeholder="l.placeholder"/>
                        
                        <multiselect v-if="l.type=='multiselect'" :name="l.name" v-model="nmodel[l.model]" :multiple="true" :options="l.list" :searchable="true" :required="l.required" :allow-empty="false" :close-on-select="true" :show-labels="false" placeholder="Select" label="nama" track-by="id"></multiselect>
                        
                        <select v-if="l.type=='select'" :name="l.name" v-model="nmodel[l.model]" @change="changeSelect(l.model, nmodel[l.model])" class="form-select" :class="{'is-invalid': errors[l.name]}">
                            <option value="" disabled>Pilih {{l.label}}</option>
                            <option v-for="(k,ix) in l.list" :key="'s'+ix" :value="k.id">{{k.nama}}</option>
                        </select>

                        <div class="input-icon" v-if="l.type == 'date'">
                            <input type="date" class="form-control" placeholder="Select a date" :required="l.required" v-model="nmodel[l.model]">
                        </div>

                        <div v-if="l.type == 'file'">
                            <UploadComponentVue :type="l.variant" :nmodel="l.model" @getResultPath="handleGetResultPath"></UploadComponentVue>

                            <div v-if="l.variant == 'image'">
                                <img v-if="nmodel[l.model] != '' && original_file == true" :src="nmodel[l.model]" alt="" class="img-fluid" style="height:100px;margin-top:10px">
                            </div>
                        </div>

                        <div v-if="l.type =='switch'">
                            <toggle-button v-if="nmodel[l.model] == 'N'"
                                :value="false"
                                :sync="false"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="changeSwitch($event, nmodel[l.model])"/>

                            <toggle-button v-if="nmodel[l.model] == 'Y'"
                                :value="true"
                                :sync="true"
                                name="phone"
                                :labels="{checked: 'Ya', unchecked: 'No'}"
                                :color="{checked: '#7DCE94', unchecked: '#82C7EB'}"
                                @change="changeSwitch($event, nmodel[l.model])"/>
                        </div>

                        <span v-if="errors">
                            <p class="text-danger" v-if="errors[l.model]">{{ errors[l.model][0] }}</p>
                        </span>
                        
                    </div>

                    <slot name="custom"></slot>

                </div>
                <div class="card-footer text-end">
                    <div class="d-flex">
                        <nuxt-link :to="backBtn" class="btn btn-link">Cancel</nuxt-link>
                        <button type="submit" class="btn btn-primary ms-auto">{{btnText}}</button>
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
import UploadComponentVue from './UploadComponent.vue'
export default {
    components: {
        'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt') },
        UploadComponentVue
    },
    props:{
        backtitle:{
            type:Object
        },
        title:{
            type:String
        },
        btnText:{
            type:String,
        },
        backBtn:{
            type:String
        },
        list:{
            type:Array,
            requred: true,
            default:[]
        },
        errors:{
            type:Object,
            default:{}
        },
        edit:{
            type: Object
        },
        nmodel:{
            type:Object
        },
        
    },
    data(){
        return{
            state:[],
            show_preview:false,
            file:'',
            show_previewbukti:false,
            original_file:true,
            filebukti:'',
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
        onSubmit(){
            this.$emit('submit', this.nmodel)
        },
        onReset(){

        },
        
        handleInput(m){
            this.$emit('handleInputPassword', m);
        },

        changeSelect(type, model){
            this.$emit('changeSelect', type, model);
        },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            let ukuran = files[0].size;

            if(ukuran > 10000000){
                this.$swal('Warning', 'Ukuran file image tidak boleh lebih dari 10 MB' , 'warning');
                return;
            }

            if(files[0]['type']==='image/jpeg' || files[0]['type']==='image/png' || files[0]['type']==='image/jpg'){
                this.createImage(files[0]);
            }else{
                this.$swal('Warning', 'Format file tidak diketahui' , 'warning');
                return;
            }
        },
        
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.file = e.target.result;

                this.$emit('changeImage', e.target.result)
                this.$emit('changeImageUrl')
                vm.show_preview = true;
            };
            reader.readAsDataURL(file);
        },

        onFileChangeBukti(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            let ukuran = files[0].size;

            if(ukuran > 10000000){
                this.$swal('Warning', 'Ukuran file image tidak boleh lebih dari 10 MB' , 'warning');
                return;
            }

            if(files[0]['type']==='image/jpeg' || files[0]['type']==='image/png' || files[0]['type']==='image/jpg'){
                this.createImageBukti(files[0]);
            }else{
                this.$swal('Warning', 'Format file tidak diketahui' , 'warning');
                return;
            }
        },
        
        createImageBukti(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.file = e.target.result;

                this.$emit('changeImageBukti', e.target.result)
                this.$emit('changeImageUrlBukti')
                vm.show_previewbukti = true;
            };
            reader.readAsDataURL(file);
        },

        changeSwitch(e, m){
            this.$emit('changeSwitch',e.value, m)
        },

        handleGetResultPath(md, file)
        {
            this.original_file = false
            this.$emit('getResultPathImage',md, file)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>