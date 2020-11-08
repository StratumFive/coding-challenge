<template>
  <div class="bg-white rounded-lg p-6 border shadow-xl">
    <h1 class="text-center text-2xl">{{ title }}</h1>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      required: true,
      type: String,
    },
  },
}
</script>
