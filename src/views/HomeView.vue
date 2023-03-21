<script setup lang="ts">
import PokemonForm from '../components/PokemonForm.vue';
</script>

<template>
  <div class="main">
    <h1 class="main__heading">自分と同じ体型のポケモンを探してみよう！</h1>
    <p class="main__text">身長&nbsp;or&nbsp;体重もしくは両方入れてみてね<br><small>※小数点可</small></p>
    <section class="main__form">
      <pokemon-form />
    </section>
    <footer class="footer"><small class="footer-text">&copy; 2023 Saeka Hirai</small></footer>
  </div>
</template>

<style lang="sass" scoped>
.main
  &__heading, &__text
    text-align: center
  
  &__text
    margin-top: 20px

  &__form
    margin-top: 30px

    @media screen and (min-width:480px)
      margin-top: 40px
</style>
