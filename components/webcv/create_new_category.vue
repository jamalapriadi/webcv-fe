<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="" class="form-label">New Category Name</label>
                <input type="text" v-model="state.nama" class="form-control" placeholder="Category Name">
            </div>
            <div class="text-end">
                <div class="d-flex">
                    <button type="submit" class="btn btn-primary ms-auto">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        layout:'main',
        data(){
            return {
                title:"Create New Category",
                btnText: "Save",
                state:{
                    nama:''
                }
            }
        },
        methods:{
            handleSubmit(){
                this.$axios.post('/auth/category', this.state)
                    .then(resp => {
                        if(resp.data.success == true)
                        {
                            this.$emit('suksesCreateCategory')
                        }
                    })
            }
        }
    }
</script>