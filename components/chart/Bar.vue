<template>
    <div>
        <VueBarChartVue :data="barChartData" :options="barChartOptions" id="chart" :height="height" ></VueBarChartVue>
    </div>
</template>

<script>
import VueBarChartVue from '../vue-chart/VueBarChart.vue'
export default {
    components:{
        VueBarChartVue  
    },
    props:{
        barChartData:{
            type:Object,
            required: true
        },
        barChartOptions:{
            type:Object,
            required: true
        },
        height:{
            required:true
        }
    }
}
</script>