<template>
  <div class="game">

    {{ playerCards.length }}
    {{ opponentCards.length }}
    <br>
    N=Order{{ i }}
    <button @click="increment">+</button>
    <button @click="removeI">-</button>

    <div class="columns">
      <div class="column">
        Jogador: {{ playerData }}
      </div>
      <div class="column">
          IA: {{ opponentData }}
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="notification is-primary">
          <h1 class="is-size-2">{{ playerName }}</h1>
          <h2>Pontos: {{ playerScore }}</h2>
        </div>
      </div>
      <div class="column">
        <div class="notification is-warning">
          <h1 class="is-size-2">Inteligência Artificial</h1>
          <h2>Pontos: {{ opponentScore }}</h2>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <PlayerCard
          :playerName="playerCards[i].player_nickname"
          :playerPosition="playerCards[i].player_position"
          :teamName="playerCards[i].team_name"
          :teamBadge="playerCards[i].team_name"
          :playerPicture="playerCards[i].player_id"
          :price="playerCards[i].price"
          :aggAvg="playerCards[i].score_mean"
          :homeAvg="playerCards[i].score_mean_home"
          :awayAvg="playerCards[i].score_mean_away"
          :goals="playerCards[i].goals"
          :assists="playerCards[i].assists"
          :shots="playerCards[i].shotsx"
          :steals="playerCards[i].steals"
          :roundNumber="roundNumber"
          :fixPositionName="fixPositionName"
          @selectRow="updateComparison"
          />
      </div>

      <div class="column">
        <PlayerCard
          :playerName="opponentCards[i].player_nickname"
          :playerPosition="opponentCards[i].player_position"
          :teamName="opponentCards[i].team_name"
          :teamBadge="opponentCards[i].team_name"
          :playerPicture="opponentCards[i].player_id"
          :price="opponentCards[i].price"
          :aggAvg="opponentCards[i].score_mean"
          :homeAvg="opponentCards[i].score_mean_home"
          :awayAvg="opponentCards[i].score_mean_away"
          :goals="opponentCards[i].goals"
          :assists="opponentCards[i].assists"
          :shots="opponentCards[i].shotsx"
          :steals="opponentCards[i].steals"
          :roundNumber="roundNumber"
          :fixPositionName="fixPositionName"
          />
      </div>
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
      i: 0,
      playerCards: [],
      opponentCards: []
    }
  },
  methods: {
    increment () {
      this.i += 1
    },
    removeI () {
      this.i -= 1
    },
    snackbar () {
      this.$buefy.snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
    },
    updateComparison (value) {
      if ((this.playerCards.length > this.i + 1) && (this.opponentCards.length > this.i + 1)) {
        // Get player statistics
        this.playerData = value[1]
        switch (value[0]) {
          case 'PREÇO:' : this.opponentData = this.opponentCards[this.i].price; break
          case 'MÉDIA:' : this.opponentData = this.opponentCards[this.i].score_mean; break
          case 'MÉDIA CASA:' : this.opponentData = this.opponentCards[this.i].score_mean_home; break
          case 'MÉDIA FORA:' : this.opponentData = this.opponentCards[this.i].score_mean_away; break
          case 'GOLS:' : this.opponentData = this.opponentCards[this.i].goals; break
          case 'ASSISTÊNCIAS:' : this.opponentData = this.opponentCards[this.i].assists; break
          case 'CHUTES:' : this.opponentData = this.opponentCards[this.i].shotsx; break
          case 'ROUBADAS:' : this.opponentData = this.opponentCards[this.i].steals; break
          default: return console.log('error')
        }

        this.snackbar()

        // Compare player statistics
        if (this.playerData >= this.opponentData) {
          console.log('player wins')
          this.playerCards.push(this.opponentCards[this.i])
          this.i += 1
          this.playerScore += 5
        } else {
          console.log('AI wins')
          this.opponentCards.push(this.playerCards[this.i])
          this.i += 1
          this.opponentScore += 5
          this.playerScore -= 10
        }
      } else {
        console.log('game over')
      }
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
    let players = this.players.sort((a, b) => parseFloat(b.score_mean) - parseFloat(a.score_mean))
      .slice(0, 49)
    this.players = players
  },
  mounted () {
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
  }
}

</script>
