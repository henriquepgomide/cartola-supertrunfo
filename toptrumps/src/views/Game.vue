// TODO: Provide a flip function to players see which card they've won
//     : Use WarpGAN to create cartoons based on players
//     : Use pixelate to pixelate player pictures
//     : Save player score to Firebase and then update scoreboard view
//     : Add button to restart match
<template>
  <div class="game">
    <br>

    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-4">
        <div class="notification is-warning">
          <h2 class="is-size-4">{{ playerName }}</h2>
          <h2>Pontos: {{ playerScore }}</h2>
          <h2>Cartas Restantes: {{ playerCards.length }}</h2>
        </div>
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
        <div class="notification is-warning">
          <h2 class="is-size-4">PC</h2>
          <h2>Pontos: {{ opponentScore }}</h2>
          <h2>Cartas Restantes: {{ opponentCards.length }}</h2>
        </div>
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

<script>
import PlayerCard from '@/components/player-card.vue'
import players from '../assets/playerstats/data.json'

export default {
  name: 'game',
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
      playerName: null,
      playerEmail: null,
      round: 0,
      player_i: 0,
      opponent_i: 0,
      playerCards: [],
      opponentCards: [],
      opponentFlip: true
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
        confirmText: 'Próxima rodada',
        onConfirm: this.flipCard()
      })
    },
    getCards () {
      // Get cards from player statistics
      let players = this.players.sort((a, b) => parseFloat(b.score_mean) - parseFloat(a.score_mean))
        .slice(0, 49)
      this.players = players
    },
    endGameMsg (msg) {
      this.$buefy.dialog.confirm({
        message: msg,
        onConfirm: () => [this.getCards(), this.shuffleCards()]
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
    checkVictory () {
      if (this.playerCards.length === 0) {
        this.endGameMsg('Derrota com D maiúsculo, quer mais uma partida?')
      } else if (this.opponentCards.length === 0) {
        this.endGameMsg('V de vitória! Quer mais uma partida?')
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

      // let playerCards = cards.slice(0, 24)
      // let opponentCards = cards.slice(25, 49)

      let playerCards = cards.slice(0, 4)
      let opponentCards = cards.slice(5, 9)

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
          default: return console.log('error')
        }

        // Compare player statistics
        if (this.playerData >= this.opponentData) {
          this.alertBox('Mitou!', 'Você venceu a batalha, mas não a guerra...')
          this.flipCard()
          this.playerCards.push(this.opponentCards[this.opponent_i])
          this.opponentCards.splice(this.opponent_i, 1)
          this.setIndex()
          this.playerScore += 5
          this.checkVictory()
        } else {
          this.alertBox('Perdeu!', 'Inteligência Artificial ganhou esta rodada')
          this.opponentCards.push(this.playerCards[this.player_i])
          this.playerCards.splice(this.player_i, 1)
          this.setIndex()
          this.playerScore -= 10
          this.checkVictory()
        }
      } else {}
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
    }
  },
  created () {
    // Get player name and email
    let url = new URL(window.location.href)
    this.playerName = url.searchParams.get('username')
    this.playerEmail = url.searchParams.get('email')

    // Get cards from player statistics
    this.getCards()
    this.shuffleCards()
  },
  mounted () {
  }
}

</script>
