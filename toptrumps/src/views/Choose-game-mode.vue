<template>
  <div class="choose-game-mode">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <div class="notification" id="signin">
          <h1 class="is-size-3 has-text-black-ter">Registro</h1>
          <br>
          <p class="has-text-black-ter">Registre seus dados para o painel dos campeões!</p>
          <br>
          <b-message title="Erro" type="is-danger" has-icon :active.sync="validationAlert">
            Você precisa incluir um nome de usuário
        </b-message>
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
            <b-button @click="selectGame(1)" type="is-dark" expanded> VS. Máquina</b-button>
            <br>
            <b-button @click="selectGame(2)" type="is-dark" disabled expanded>VS. Jogador</b-button>
            <br>
            <b-button @click="goToGame" type="is-dark" size="is-large">Jogar</b-button>
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
      validationAlert: false,
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
      if (this.playerName === null) {
        this.validationAlert = true
      } else {
        this.$router.push(
          { name: 'gamescreen',
            params: {
              playerName: this.playerName,
              playerEmail: this.playerEmail
            }
          })
      }
    }
  }
}
</script>
