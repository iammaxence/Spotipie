<script setup lang="ts">
import TextLabel from '@/components/card/TextLabel.vue'
const ARTISTS_NAME_DELIMITER = ', '
const props = defineProps({
  artists: {
    type: Array<string>,
    default: []
  },
  title: String,
  albumName: String,
  urlImage: String
})
</script>

<template>
  <div class="card">
    <img class="card--img" src="/src/assets/default-song-img.png" alt="song-card" />
    <div class="card--text-wrapper">
      <TextLabel label="Artiste(s)" :text="props.artists.join(ARTISTS_NAME_DELIMITER)" />
      <TextLabel label="Titre" :text="props.title" />
      <TextLabel label="Album" :text="props.albumName" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  display: flex;

  &--img {
    width: 8rem;
  }

  &--text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
  }
}
</style>
