<template>
  <div>
    <div>I'm a text-based solution</div>
    <v-textarea
      id="text-input"
      label="Input"
      v-model="commandInput"
    ></v-textarea>
    <v-btn color="success">Calculate Ship Positions</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commandInput:
        "5 3 \n 1 1 E \n RFRFRFRF \n\n 3 2 N \n FRRFLLFFRRFLL \n\n 0 3 W \n LLFFFLFLFL",
    };
  },
};
</script>

<style scoped></style>
