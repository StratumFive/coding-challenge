<template>
  <select
    @input="$emit('input', $event.target.value)"
    class="border border-gray-300 px-2 py-1 rounded transition-colors duration-500"
  >
    <slot />
  </select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: {
      type: Number,
    },
  },
}
</script>
<style scoped>
select:focus {
  outline: none;
}
</style>
