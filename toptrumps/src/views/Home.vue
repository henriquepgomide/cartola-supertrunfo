<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <img id="pfclogo" alt="Logomarca do Cartola Fantasy Clube" src="../assets/img/pfc-logo.png">
          <br>
          <br>
          <h1 class="has-text-centered is-size-3">SUPER PFC</h1>
          <p class="has-text-centered"> O Card Game não oficial do Cartola FC.</p>
        </div>
      </div>
      <div class="has-text-centered">
        <b-button tag="router-link"
                  to="/choose-game-mode"
                  type="is-light"
                  size="is-large">
          Jogar
        </b-button>
      </div>
      <br>
      <br>
    </div>
    <Rankings />
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

button span {
  font-family: 'Press Start 2P', cursive;
}
</style>
