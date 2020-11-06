<template>
  <table class="vessel-reports">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          class="vessel-reports__header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>

    <tbody>
      <VesselReportsRow
        v-for="report in reports"
        :key="report.vesselId"
        :report="report"
      />
    </tbody>
  </table>
</template>

<script>
import VesselReportsRow from './VesselReportsRow'

export default {
  name: 'VesselReports',

  components: { VesselReportsRow },

  props: {
    reports: {
      type: Array,
      required: true
    }
  },

  computed: {
    headers () {
      return [
        'Vessel',
        'Position',
        'Heading',
        'Lost',
        'Report output'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.vessel-reports {
  border: solid 1px #0F5E9C;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;

  &__header {
    background-color: #B5D3E7;
    border: solid 1px #0F5E9C;
    padding: 10px;
    text-align: left;
    text-shadow: 1px 1px 1px #fff;
  }
}
</style>
