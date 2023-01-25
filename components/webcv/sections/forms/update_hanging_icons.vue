<template>
    <div>
        
        <div class="form-group">
            <label for="" class="control-label">Title</label>
            <input type="text" v-model="state.title" class="form-control">
        </div>

        <div class="card" v-if="add_form == false">
            <div class="card-header">Feature</div>
            <div class="card-body">
                <a href="#" class="btn btn-primary" @click.prevent="addFeature">Add Feature</a>

                <div class="table-responsive mt-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Icon</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(l,idx) in state.forms" :key="idx">
                                <td>{{ (idx+1) }}</td>
                                <td>{{ l.icon }}</td>
                                <td>{{ l.title }}</td>
                                <td>{{ l.description }}</td>
                                <td>
                                    <a href="#" class="btn btn-danger btn-icon" @click.prevent="hapus(idx)">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M4 7l16 0m-10 4l0 6m4 -6l0 6m-9 -10l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12m-10 0v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer text-end">
                <div class="d-flex">
                    <a href="#" class="btn btn-link" @click.prevent="batal">Cancel</a>
                    <a href="#" @click.prevent="addToPreview" v-if="state.forms.length > 0" type="submit" class="btn btn-primary ms-auto">Show Preview</a>
                </div>
            </div>
        </div>

        <div class="card" v-if="add_form == true">
            <form @submit.prevent="simpan">
                <div class="card-header">Feature</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="" class="control-label">Icon</label>
                        <input type="text" class="form-control" v-model="form.icon">
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label">Title</label>
                        <input type="text" class="form-control" v-model="form.title">
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label">Description</label>
                        <textarea name="desc" class="form-control" v-model="form.description"></textarea>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <div class="d-flex">
                        <!-- <nuxt-link :to="backBtn" class="btn btn-link">Cancel</nuxt-link> -->
                        <a href="#" class="btn btn-link" @click.prevent="batalAddFeature">Cancel</a>
                        <button type="submit" class="btn btn-primary ms-auto">Add Feature</button>
                    </div>
                </div>
            </form>
        </div>
        
    </div>
</template>

<script>
export default{
    props:['title','lists'],
    data(){
        return {
            state:{
                title:this.title,
                forms:this.lists
            },
            form:{
                icon:'',
                title:'',
                description:''
            },
            add_form:false
        }
    },
    methods:{
        addFeature(){
            this.add_form = true
        },

        batalAddFeature(){
            this.add_form = false

            this.form = {
                icon:'',
                title:'',
                description:''
            }
        },

        simpan(){
            this.state.forms.push(this.form)
            this.batalAddFeature()
        },

        batal(){
            this.$emit('batal')
        },

        addToPreview(){
            this.$emit('simpan', this.state)
        },

        hapus(idx){
            var hasil = []
            for(var a=0;a<this.state.forms.length; a++)
            {
                if(a != idx)
                {
                    hasil.push(this.state.forms[a])
                }
            }

            this.state.forms = hasil
        }
    }
}
</script>