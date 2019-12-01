<template>
  <div class="gamescreen">
    <br>
    <h1 class="is-size-6">Tempo de Jogo: {{ timer - 10 }}</h1>
    <div class="column">
      <div v-if="(opponentCards.length != 0 && playerCards.length == 0) ||
                 (opponentCards.length == 0 && playerCards.length != 0)">
        <b-button @click="resetGame" type="is-dark">Reiniciar Partida</b-button>
      </div>
    </div>

    <div id="score-board" class="columns notification is-dark">
      <div class="column">
        <h2 class="is-size-5 has-text-warning">{{ playerName.toUpperCase() }}</h2>
        <p class="has-text-warning">Pontos: {{ playerScore }} </p>
        <p class="has-text-warning">Cartas: {{ playerCards.length }}</p>
      </div>
    </div>

    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-4">
        <div v-if="playerCards.length > 0">
          <PlayerCard
            :playerName="playerCards[player_i].player_nickname"
            :playerPosition="playerCards[player_i].player_position"
            :teamName="playerCards[player_i].team_name"
            :teamBadge="playerCards[player_i].team_name"
            :playerPicture="playerCards[player_i].player_id"
            :price="playerCards[player_i].price"
            :aggAvg="playerCards[player_i].score_mean"
            :homeAvg="playerCards[player_i].score_mean_home"
            :awayAvg="playerCards[player_i].score_mean_away"
            :goals="playerCards[player_i].goals"
            :assists="playerCards[player_i].assists"
            :shots="playerCards[player_i].shotsx"
            :steals="playerCards[player_i].steals"
            :roundNumber="roundNumber"
            :fixPositionName="fixPositionName"
            :isFlipped="false"
            @selectRow="updateComparison"
            />
        </div>
      </div>

      <div class="column is-4">
        <div v-if="opponentCards.length > 0 && !opponentFlip">
          <PlayerCard
            :playerName="opponentCards[opponent_i].player_nickname"
            :playerPosition="opponentCards[opponent_i].player_position"
            :teamName="opponentCards[opponent_i].team_name"
            :teamBadge="opponentCards[opponent_i].team_name"
            :playerPicture="opponentCards[opponent_i].player_id"
            :price="opponentCards[opponent_i].price"
            :aggAvg="opponentCards[opponent_i].score_mean"
            :homeAvg="opponentCards[opponent_i].score_mean_home"
            :awayAvg="opponentCards[opponent_i].score_mean_away"
            :goals="opponentCards[opponent_i].goals"
            :assists="opponentCards[opponent_i].assists"
            :shots="opponentCards[opponent_i].shotsx"
            :steals="opponentCards[opponent_i].steals"
            :roundNumber="roundNumber"
            :fixPositionName="fixPositionName"
            :isFlipped="opponentFlip"
            />
        </div>
      </div>
      <div class="column is-2"></div>
    </div>

  </div>
</template>

<style>
</style>

<script>
import PlayerCard from '@/components/player-card.vue'
import players from '../assets/playerstats/data-2019.json'

export default {
  name: 'gamescreen',
  props: ['playerName', 'playerEmail'],
  components: {
    PlayerCard
  },
  data () {
    return {
      playerData: {},
      opponentData: {},
      players,
      playerScore: 0,
      opponentScore: 0,
      round: 0,
      player_i: 0,
      opponent_i: 0,
      playerCards: [],
      opponentCards: [],
      opponentFlip: true,
      timer: 0,
      finalScore: 0
    }
  },
  methods: {
    flipCard () {
      this.opponentFlip = !this.opponentFlip
    },
    alertBox (title, msg) {
      this.$buefy.dialog.alert({
        title: title,
        message: msg,
        confirmText: 'Próxima rodada'
      })
    },
    getCards () {
      // Get cards from player statistics
      let players = this.players.sort((a, b) => parseFloat(b.score_mean) - parseFloat(a.score_mean))
        .slice(0, 149)
      this.players = players
    },
    endGameMsg (msg) {
      this.$buefy.dialog.confirm({
        message: msg,
        confirmText: 'Nova Partida',
        cancelText: 'Retornar para Menu',
        onCancel: () => this.$router.push('/'),
        onConfirm: () => {
          this.storeStats()
          this.$router.push('/choose-game-mode')
        }
      })
    },
    setIndex () {
      if (this.player_i >= this.playerCards.length - 1) {
        this.player_i = 0
        this.opponent_i += 1
      } else if (this.opponent_i >= this.opponentCards.length - 1) {
        this.opponent_i = 0
        this.player_i += 1
      } else {
        this.player_i += 1
        this.opponent_i += 1
      }
    },
    computeFinalScore () {
      this.finalScore = (this.playerScore - ((this.timer - 10) * 0.1))
    },
    checkVictory () {
      if (this.playerCards.length === 0) {
        this.computeFinalScore()
        this.endGameMsg('Derrota com D maiúsculo, quer mais uma partida?')
      } else if (this.opponentCards.length === 0) {
        this.computeFinalScore()
        this.endGameMsg(`<h1>V de vitória! Quer mais uma partida?</h1> <br><br>
                         Pontuação: ${this.playerScore} <br>
                         Punição de tempo: ${this.roundNumber(this.finalScore - this.playerScore)}<hr>
                         Pontuação Total: ${this.finalScore}`)
      } else {}
    },
    shuffleCards () {
      let currentIndex = this.players.length
      let temporaryValue
      let randomIndex
      var cards = this.players

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
      }

      let playerCards = cards.slice(0, 24)
      let opponentCards = cards.slice(25, 49)

      this.playerCards = playerCards
      this.opponentCards = opponentCards
    },
    updateComparison (value) {
      if ((this.playerCards.length > 0) && (this.opponentCards.length > 0)) {
        // Get player statistics
        this.playerData = value[1]
        switch (value[0]) {
          case 'PREÇO:' : this.opponentData = this.opponentCards[this.opponent_i].price; break
          case 'MÉDIA:' : this.opponentData = this.opponentCards[this.opponent_i].score_mean; break
          case 'MÉDIA CASA:' : this.opponentData = this.opponentCards[this.opponent_i].score_mean_home; break
          case 'MÉDIA FORA:' : this.opponentData = this.opponentCards[this.opponent_i].score_mean_away; break
          case 'GOLS:' : this.opponentData = this.opponentCards[this.opponent_i].goals; break
          case 'ASSISTÊNCIAS:' : this.opponentData = this.opponentCards[this.opponent_i].assists; break
          case 'CHUTES:' : this.opponentData = this.opponentCards[this.opponent_i].shotsx; break
          case 'ROUBADAS:' : this.opponentData = this.opponentCards[this.opponent_i].steals; break
          default: return 0
        }

        // Compare player statistics
        if (this.playerData >= this.opponentData) {
          this.alertBox('Mitou!',
            `Você venceu a batalha, mas não a guerra... <br><br>
            ${this.opponentCards[this.opponent_i].player_nickname} agora é seu!`)
          this.playerCards.push(this.opponentCards[this.opponent_i])
          this.opponentCards.splice(this.opponent_i, 1)
          this.setIndex()
          this.playerScore += 20
          this.checkVictory()
        } else {
          this.alertBox('Perdeu!', `Inteligência Artificial ganhou esta rodada.`)
          this.opponentCards.push(this.playerCards[this.player_i])
          this.playerCards.splice(this.player_i, 1)
          this.setIndex()
          this.playerScore -= 40
          this.checkVictory()
        }
      } else {}
    },
    resetGame () {
      this.$router.push(
        { name: 'gamescreen',
          params: {
            playerName: this.playerName,
            playerEmail: this.playerEmail
          }
        })
    },
    roundNumber (stat) {
      return stat.toFixed(1)
    },
    fixPositionName (posName) {
      switch (posName) {
        case 'ata':
          return 'Atacante'
        case 'mei':
          return 'Meio campo'
        case 'lat':
          return 'Lateral'
        case 'zag':
          return 'Zagueiro'
        case 'gol':
          return 'Goleiro'
        case 'tec':
          return 'Técnico'
        default:
          return 'Outra posição'
      }
    },
    storeStats () {
      if (this.finalScore <= 0) {
        this.finalScore = 0
      }
      this.$http.post('https://pfc-cardgame.firebaseio.com/pfc-cardgame.json',
        { 'player': this.playerName,
          'email': this.playerEmail,
          'score': this.finalScore * -1,
          'date': new Date().toJSON().slice(0, 10).replace(/-/g, '/')
        })
        .then(response => {
          const formId = response.body.name
          this.$emit('sendId', formId)
        }, error => {
          this.$buefy.toast.open({
            message: error,
            type: 'is-success'
          })
          this.$router.push({ path: '/' })
        })
    }
  },
  created () {
    // Get cards from player statistics
    this.getCards()
    this.shuffleCards()
  },
  mounted () {
    this.timer = setInterval(() => {
      this.timer += 1
    }, 1000)
  }
}

</script>
