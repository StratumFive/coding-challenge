<template>
  <v-app>
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
  data() {
    return {
      output: `
      
      `,
    };
  },
};
</script>
