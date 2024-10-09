<script setup lang="ts">
import { Filter } from '@/interfaces/Filter'
import RadioToggle from '@/components/radio-toggle/RadioToggle.vue'
import SongCard from '@/components/card/SongCard.vue'
import { ref, type Ref } from 'vue'
import type { Song } from '@/interfaces/Song'
import { useUserStore } from '@/stores/userAuth'

const userStore = useUserStore();
const name = 'Maxence'
const selectedFilter: Ref<Filter> = ref(Filter.ALL_TIME)

const songs: Song[] = [
  { artists: ['Guizmo'], title: 'Escort Girl', albumName: 'Banquize', urlImage: '', position: 1 },
  {
    artists: ['Guizmo', 'Tupac', 'TheWeekend', 'polak'],
    title: 'Escort Girl',
    albumName: 'Banquize',
    urlImage: '',
    position: 1
  },
  {
    artists: ['Guizmo'],
    title: 'Escort Girl',
    albumName: 'Banquize Banquize Banquize Banquize',
    urlImage: '',
    position: 1
  }
]
</script>

<template>
  <div class="home">
    <!-- Heading -->
    <div class="home--head">
      <div class="home--head-text-wrapper">
        <span>Bonjour {{ userStore.getUser()!.pseudo }},</span>
        <span class="home--head-text-wrapper--secondary"> Vos statistiques </span>
      </div>
      <img class="home--head-img" :src="userStore.getUser()!.images[0].url" alt="user-profil-img" />
    </div>
    <!-- Radio buttons -->
    <RadioToggle v-model="selectedFilter" />
    <!-- Cards -->
    <div class="home--cards">
      <div class="home--card-wrapper" v-for="song in songs" :key="song.position + song.title">
        <div class="home--card-position">{{ song.position }}</div>
        <SongCard :artists="song.artists" :title="song.title" :album-name="song.albumName" />
      </div>
    </div>
    <!-- Pagination buttons -->
  </div>
</template>
<style scoped lang="scss">
.home {
  padding-top: 1.5rem;

  &--head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-text-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      &--secondary {
        font-size: 1.5rem;
      }
    }

    &-img {
      width: 3.5rem;
      border-radius: 50%;
    }
  }

  &--cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &--card-position {
    display: flex;
    align-items: center;
    justify-content: center;

    color: black;
    background-color: white;

    border: solid 1px black;
    border-radius: 50%;

    width: 1.5rem;
    height: 1.5rem;
  }

  &--card-wrapper {
    display: grid;
    grid-template-columns: 24px auto auto;
    align-items: center;
    gap: 1rem;
  }
}
</style>
