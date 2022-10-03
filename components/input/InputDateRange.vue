<template>
    <date-range-picker
        :opens="'left'"
        v-model="dateRange"
        @update="updateValues"
        :date-format="dateFormat"
    >
        <template v-slot:input="picker" style="min-width: 350px;">
            {{ picker.startDate | moment }} - {{ picker.endDate | moment }}
        </template>
    </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'


export default {
    components:{
        DateRangePicker,
    },
    filters: {
        moment: function (date) {
            return moment(date).format('DD MMM YYYY');
        }
    },
    data(){
        return {
            state:{
                start:new Date(Date.now()-604800000).toISOString().substring(0,10),
                end: new Date().toJSON().slice(0,10).replace(/-/g,'/')
            },
            dateRange: {
                startDate: new Date(Date.now()-604800000).toISOString().substring(0,10),
                endDate: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            },
        }
    },
    methods:{
        dateFormat (classes, date) {
            return classes
        },

        updateValues(event){

            this.state.start =  moment(event.startDate).format('YYYY-MM-DD')
            this.state.end = moment(event.endDate).format('YYYY-MM-DD')

            this.$emit('change',this.state.start,this.state.end)            
        },
    }
}
</script>