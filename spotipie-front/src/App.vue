<script setup lang="ts">
import { RouterView } from 'vue-router'
import { provide } from 'vue'
import { AuthorizationAdapter } from '@/adapter/AuthorizationAdapter'

const authorizationAdapter = new AuthorizationAdapter()
provide('authorizationPort', authorizationAdapter)

</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>
