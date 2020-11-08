<template>
  <label class="flex flex-col">
    <span class="text-center font-bold text-sm">{{ label }}</span>
    <select
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      class="border border-gray-300 px-2 py-1 rounded transition-colors duration-500"
      :class="selectClass"
    >
      <slot />
    </select>
  </label>
</template>

<script>
export default {
  name: 'Select',
  props: {
    label: {
      type: String,
    },
    selectClass: {
      type: String,
    },
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
