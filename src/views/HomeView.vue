<script setup lang="ts">
import PokemonForm from '../components/PokemonForm.vue';
</script>

<template>
  <main class="main">
    <h1 class="main__heading">自分と同じ体型のポケモンを探してみよう！</h1>
    <section class="main__form">
      <pokemon-form />
    </section>
  </main>
</template>

<style lang="sass" scoped>
.main
  &__heading
    text-align: center

  &__form
    margin-top: 30px
</style>
