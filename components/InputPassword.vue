<template>
    <div>
        <div class="input-group input-group-flat" @input="inputData($event)">
            <input :type="tipe" class="form-control"  placeholder="Password" autocomplete="off">
            <span class="input-group-text">
                <a tabindex="-1"  href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                    <svg v-if="btnText == 'Show Password'" @click.prevent="showPassword" xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
	                <svg v-else @click.prevent="showPassword" xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="3" y1="3" x2="21" y2="21" /><path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" /><path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" /></svg>
                </a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Object,
            required: true
        }
    },
    data(){
        return {
            btnText:'Show Password',
            tipe:'password'
        }
    },
    methods:{
        showPassword(){
            if(this.tipe === 'password') {
                this.tipe = 'text'
                this.btnText = 'Hide Password'
            } else {
                this.tipe = 'password'
                this.btnText = 'Show Password'
            }
        },

        inputData(e){
            this.$emit('input', this.list.model, e.target.value)
        }
    }
}
</script>