<template>
    <div>
        <form @submit.prevent="addAccordion">
            <div class="form-group">
                <label for="" class="form-label">Title</label>
                <input type="text" class="form-control" v-model="state.title" placeholder="Title">
            </div>

            <div class="form-group">
                <label for="" class="control-label">Description</label>
                <textarea class="form-control" v-model="state.description"></textarea>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Add</button>
            </div>
        </form>
    </div>
</template>

<script>
export default{
    data(){
        return {
            state:{
                title:'',
                description:''
            }
        }
    },
    methods:{
        addAccordion(){
            this.$emit('addAccordion', this.state)
            this.resetData()
        },

        resetData(){
            this.state = {
                title:'',
                description:''
            }
        }
    }
}
</script>