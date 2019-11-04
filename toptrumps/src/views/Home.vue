<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <img id="pfclogo" alt="Logomarca do Cartola Fantasy Clube" src="../assets/logo-cartola-fantasy-club.svg">
          <div class="has-text-centered">
            <b-button type="is-primary">Jogar</b-button>
          </div>
          <br>
        </div>
      </div>
    </div>
    <Rankings />
    <PlayerCard />
  </div>
</template>

<script>
import Rankings from '@/components/rankings.vue'

export default {
  name: 'home',
  components: {
    Rankings
  }
}

</script>

<style>
#pfclogo {
  width: 200px;
}
</style>
