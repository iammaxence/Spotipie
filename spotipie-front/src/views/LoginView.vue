<script setup lang="ts">
import type { AuthorizationAdapter } from '@/adapter/AuthorizationAdapter'
import { inject, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userAuth'

const authorizationPort: AuthorizationAdapter = inject('authorizationPort')!

const userStore = useUserStore();
const router = useRouter();

onBeforeMount(async () => {
  if(userStore.getAccessToken()) {
    await setUserAndRedirectToHomePage()
  } else {
    const route = useRoute()
    const { code, state } = route.query

    if (code && state) {
      await userStore.setToken(code, state)
      await setUserAndRedirectToHomePage()
    }
  }
})

const setUserAndRedirectToHomePage = async () => {
  await userStore.setUser();
  await router.push({ path: '/'})
}

const connexion = async () => {
  const redirectUrl = await authorizationPort.getAuthorizationCode()
  window.location.replace(redirectUrl)
}

</script>
<template>
  <div class="container login">
    <div class="login--img-wrapper">
      <img class="login--img" src="/src/assets/pie.png" alt="spotipie-logo" />
    </div>
    <h1 class="login--title">Bienvenue sur Spotipie !</h1>
    <div class="login--button-wrapper">
      <button class="login--button" type="button" @click="connexion()">Log In</button>
      <span>
        En cliquant sur ce bouton, vous serez rediriger vers une page de connexion Spotify. En vous
        connectant, vous acceptez de partager vos données dans l'unique but d'y accéder sous une
        forme plus lisible. Nous ne gardons aucune trace de vos données.
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &--img-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;

    width: 10rem;
    height: 10rem;

    border: solid 1px white;
    border-radius: 50%;

    background-color: white;
  }

  &--img {
    width: 7rem;
  }

  &--title {
    font-size: 1.5rem;
  }

  &--button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    width: 15rem;
  }

  &--button {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
  }
}
</style>
