<script setup lang="ts">
import { Filter } from '@/interfaces/Filter'

const selectedFilter = defineModel()
</script>

<template>
  <div class="radio">
    <div class="radio--wrapper" :class="selectedFilter == Filter.ALL_TIME ? 'radio--select' : ''">
      <input
        class="radio--input"
        id="all-time"
        name="filter"
        type="radio"
        :value="Filter.ALL_TIME"
        v-model="selectedFilter"
      />
      <label class="radio--label" for="all-time">Tout</label>
    </div>
    <div class="radio--wrapper" :class="selectedFilter == Filter.SEMESTER ? 'radio--select' : ''">
      <input
        class="radio--input"
        id="semester"
        name="filter"
        type="radio"
        :value="Filter.SEMESTER"
        v-model="selectedFilter"
      />
      <label class="radio--label" for="semester">Semestre</label>
    </div>
    <div class="radio--wrapper" :class="selectedFilter == Filter.MONTH ? 'radio--select' : ''">
      <input
        class="radio--input"
        id="month"
        name="filter"
        type="radio"
        :value="Filter.MONTH"
        v-model="selectedFilter"
      />
      <label class="radio--label" for="month">Mois</label>
    </div>
  </div>
</template>
<style scoped lang="scss">
.radio {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  padding: 0.2rem;
  gap: 0.5rem;

  border: solid 1px black;
  border-radius: 3rem;

  color: black;
  background-color: white;

  width: fit-content;

  &--wrapper {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 0.25rem;
  }

  &--label {
    padding: 0.25rem 1rem;
    font-size: 1.5rem;
    text-align: center;
  }

  &--input {
    position: absolute;
    visibility: hidden;
  }

  &--select {
    border-radius: 3rem;

    color: white;
    background-color: black;
  }
}
</style>
