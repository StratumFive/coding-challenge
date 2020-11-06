<template>
  <tr>
    <td
      v-for="data in reportData"
      :key="data"
      class="vessel-report-cell"
    >
      {{ data }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'VesselReportsRow',

  props: {
    report: {
      type: Object,
      required: true
    }
  },

  computed: {
    reportData () {
      const { vesselId, coordinates: { x, y }, heading, lost, output } = this.report

      return [
        vesselId,
        `${x} ${y}`,
        heading,
        lost,
        output
      ]
    }
  }
}
</script>

<style scoped>
.vessel-report-cell {
  border: solid 1px #0F5E9C;
  color: #333;
  padding: 10px;
  text-shadow: 1px 1px 1px #fff;
}
</style>
