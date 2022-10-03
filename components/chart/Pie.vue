<template>
    <div>
        <PieChart :data="barChartData" :options="barChartOptions" id="chart" :spacing="1200"/>
    </div>
</template>

<script>
import PieChart from "~/components/vue-chart/VuePieChart.vue";
export default {
    components:{
        PieChart
    },
    props:{
        barChartData:{
            type:Object,
            required: true
        },
        barChartOptions:{
            type:Object,
            required: true
        }
    }
}
</script>