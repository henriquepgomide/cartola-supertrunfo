<template>
  <div class="choose-game-mode">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <div class="notification">
          <h1 class="is-size-3">Registro</h1>
          <br>
          <p>Registre seus dados para o painel dos campeões!</p>
          <br>
          <section>
            <b-field label="Nome">
              <b-input v-model="playerName"></b-input>
            </b-field>
            <b-field label="Email">
              <b-input type="email"
                       placeholder="Email"
                       icon="email"
                       maxlength="30"
                       v-model="playerEmail"
                       validation-message="Por favor, insira um e-mail válido">
              </b-input>
            </b-field>
            <b-field label="Modo de Jogo"></b-field>
            <b-button @click="selectGame(1)" type="is-primary" expanded> Contra a Inteligência Artificial</b-button>
            <br>
            <b-button @click="selectGame(2)" type="is-primary" disabled expanded> Contra um Pato Humano</b-button>
            <br>
            <b-button @click="goToGame" type="is-primary">Entrar</b-button>
          </section>
          <br>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'choose-game-mode',
  data () {
    return {
      gameMode: 1,
      playerName: null,
      playerEmail: null
    }
  },
  methods: {
    selectGame (type) {
      this.gameMode = type
    },
    checkData () {
      return null
    },
    goToGame () {
      let username = this.playerName
      let email = this.playerEmail
      window.location.replace(`/game-screen?username=${username}&email=${email}`)
    }
  }
}
</script>
