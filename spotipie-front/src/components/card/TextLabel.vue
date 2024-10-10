<script setup lang="ts">
const props = defineProps({
  label: String,
  text: String
})
</script>

<template>
  <div class="textlabel">
    <span id="text">{{ props.label }}: {{ props.text }}</span>
  </div>
</template>
<style scoped lang="scss">
.textlabel {
  /**white-space: nowrap;
  max-width: 70%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;**/

  display: grid;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
    font-weight: normal;
  }
}
</style>
