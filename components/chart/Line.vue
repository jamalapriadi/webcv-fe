<template>
    <div>
        <LineChart :data="barChartData" :options="barChartOptions" id="chart" :height="height"/>
    </div>
</template>

<script>
import LineChart from "~/components/vue-chart/VueLineChart.vue";
export default {
    components:{
        LineChart
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