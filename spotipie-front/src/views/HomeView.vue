<script setup lang="ts">
import { Filter } from '@/interfaces/Filter'
import RadioToggle from '@/components/radio-toggle/RadioToggle.vue'
import SongCard from '@/components/card/SongCard.vue'
import { onBeforeMount, ref, type Ref, watch } from 'vue'
import type { Song } from '@/interfaces/Song'
import { useUserStore } from '@/stores/userAuth'
import type { UserPort } from '@/interfaces/UserPort'
import { UserAdapter } from '@/adapter/UserAdapter'

const NUMBER_OF_SONGS = 10;

const userStore = useUserStore();
const userPort: UserPort = new UserAdapter(userStore);


const selectedFilter: Ref<Filter> = ref(Filter.ALL_TIME)
const songs: Ref<Song[]> = ref([])
const offset = ref(0);

onBeforeMount(async () => {
  songs.value = await userPort.getSongs(userStore.getAccessToken(), selectedFilter.value, NUMBER_OF_SONGS, offset.value)
})


watch(selectedFilter, async () => {
  songs.value = await userPort.getSongs(userStore.getAccessToken(), selectedFilter.value, NUMBER_OF_SONGS, offset.value)
})

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
      <div class="home--card-wrapper" v-for="(song, index) in songs" :key="song.position + song.title">
        <div class="home--card-position">{{ index + 1 }}</div>
        <SongCard
          :artists="song.artists"
          :title="song.title"
          :album-name="song.albumName"
          :url-image="song.urlImages[0].url" />
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
    grid-template-columns: 24px auto;
    align-items: center;
    gap: 1rem;
  }
}
</style>
