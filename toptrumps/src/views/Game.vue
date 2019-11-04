<template>
  <div class="game">

    {{ playerCards.length }}
    {{ opponentCards.length }}
    <div class="columns">
      <div class="column">
        <div class="notification is-primary">
          <h1 class="is-size-2">{{ playerName }}</h1>
          <h2>Pontos: XXX</h2>
        </div>
      </div>
      <div class="column">
        <div class="notification is-warning">
          Adversário: XXX
        </div>
      </div>
    </div>

    <div class="columns">

      <div class="column">
        <br>
        <PlayerCard
          :playerName="player.player_nickname"
          :playerPosition="player.player_position"
          :teamName="player.team_name"
          :teamBadge="player.team_name"
          :playerPicture="player.player_id"
          :price="player.price"
          :aggAvg="player.score_mean"
          :homeAvg="player.score_mean_home"
          :awayAvg="player.score_mean_away"
          :goals="player.goals"
          :assists="player.assists"
          :shots="player.shotsx"
          :steals="player.steals"
          :roundNumber="roundNumber"
          :fixPositionName="fixPositionName"
          />
      </div>

      <div class="column">
        <h1>Opponent's</h1>
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
      players,
      playerScore: null,
      opponentScore: null,
      playerName: null,
      playerEmail: null,
      playerCards: [],
      opponentCards: [],
      player: {
        'player_id': 87863,
        'player_slug': 'arrascaeta',
        'player_nickname': 'Arrascaeta',
        'team_name': '262',
        'player_position': 'mei',
        'price': 11.37,
        'score_mean': 4.53333333333333,
        'score_no_clean_sheets': 4.53333333333333,
        'diff_home_away_s': -1.32909882674896,
        'n_games': 3,
        'score_mean_home': 1.5,
        'score_mean_away': 6.05,
        'shotsx': 1.0,
        'fouls': 0.666666666666667,
        'steals': 1.0,
        'wpasses': 3.33333333333333,
        'assists': 0.0,
        'offsides': 0.0,
        'goals': 0.333333333333333,
        'great_saves': 0.0,
        'player_status': 'Nulo',
        'price_diff': -2.38,
        'last_points': 0.5
      }
    }
  },
  methods: {
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

    let playerCards = cards.slice(0, 24)
    let opponentCards = cards.slice(25, 49)

    this.playerCards = playerCards
    this.opponentCards = opponentCards
  }
}

</script>
