<template>
    <div class="mb-3">
        <label class="form-label">{{label}}</label>
        <div class="input-icon mb-3">
            <span class="input-icon-addon">
                <span v-html="iconSvg"></span>
            </span>
            <input type="text" class="form-control" :placeholder="placeholder" @input="inputText($event)">
        </div>
    </div>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            required: true
        },
        iconSvg:{
            type:String,
            required: true
        },
        placeholder:{
            type:String,
            required: false
        }
    },
    methods:{
        inputText(e){
            this.$emit('inputText',e.target.value)
        }
    }
}
</script>