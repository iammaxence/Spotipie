<script setup lang="ts">
const props = defineProps({
  label: String,
  text: String
})
</script>

<template>
  <div class="textlabel">
    <span id="label">{{ props.label }}: </span>
    <span id="text">{{ props.text }}</span>
  </div>
</template>
<style scoped lang="scss">
.textlabel {
}
</style>
