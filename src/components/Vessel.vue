<template>
  <div class="vessel"></div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    },

    position: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.vessel {
  position: absolute;
  width: 30px;
  height: 50px;
  top: 335px;
  left: 35px;
  background: #A9A9A9;
  border-radius: 10px;
}

.vessel:before {
  content: "";
  position: absolute;
  right: 0;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #A9A9A9;
}
</style>
