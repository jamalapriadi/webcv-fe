<template>
    <div class="form-group">
        <label for="background_color" class="form-label">{{title}}</label>
        <div class="row">
            <div class="col-auto" style="padding-right:0">
                <input type="color" v-model="color" class="form-control form-control-color" style="border-top-right-radius:0;border-bottom-right-radius:0;border-right:0" @input="changeInput($event)">
            </div>
            <div class="col-6" style="padding-left:0">
                <input type="text" :value="color" class="form-control" readonly disabled style="border-top-left-radius:0;border-bottom-left-radius:0;border-left:0">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title','default'],
    data(){
        return {
            color:this.default
        }
    },
    methods:{
        changeInput(e){
            this.$emit('input',e.target.value)
        }
    }
}
</script>