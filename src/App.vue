<template>
  <div id="app">
    <text-based-solution></text-based-solution>
  </div>
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
