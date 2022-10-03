<script>
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    props: ['data', 'options'],
    mounted () {
        this.renderChart(this.data, this.options)
    },
    methods: {
        renderDoughnutChart() {
            this.renderChart(this.chartData, this.chartOptions);
        }
    },
    watch: {
        chartData () {
            this.$nextTick(() => {
                this.renderDoughnutChart();
            })
        }
    }
}
</script>

<style>
</style>