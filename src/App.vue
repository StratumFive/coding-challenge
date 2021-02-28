<template>
  <v-app :style="{ background: 'hsl(202deg 99% 95%)' }">
    <text-based-solution></text-based-solution>
  </v-app>
</template>

<script>
import TextBasedSolution from "@/components/TextBasedSolution";
export default {
  name: "App",
  components: {
    TextBasedSolution,
  },
};
</script>

<style scoped></style>
