<template>
  <div class="container">
    <div class="player-card">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by4">
            <img :src="urlImagePath(playerPicture)" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="addTeamLogo(teamBadge)">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ playerName }}</p>
                <p class="subtitle is-7">{{ upperCase(fixPositionName(playerPosition)) }}</p>
            </div>
          </div>
          <div class="content">
            <table class="table is-fullwidth is-striped">
              <tr id="price" class="stats" @click="selectRow('stats', 'price')">
                <td>PREÇO:</td>
                <td>{{ roundNumber(price)}}</td>
              </tr>
              <tr id="avg" class="stats" @click="selectRow('stats', 'avg')">
                <td>MÉDIA:</td>
                <td>{{ roundNumber(aggAvg)}}</td>
              </tr>
              <tr id="avgHome" class="stats" @click="selectRow('stats', 'avgHome')">
                <td>MÉDIA CASA:</td>
                <td>{{ roundNumber(homeAvg)}}</td>
              </tr>
              <tr id="avgAway" class="stats" @click="selectRow('stats', 'avgAway')">
                <td>MÉDIA FORA:</td>
                <td>{{ roundNumber(awayAvg)}}</td>
              </tr>
              <tr id="goals" class="stats" @click="selectRow('stats', 'goals')">
                <td>GOLS:</td>
                <td>{{ roundNumber(goals) }}</td>
              </tr>
              <tr id="assists" class="stats" @click="selectRow('stats', 'assists')">
                <td>ASSISTÊNCIAS:</td>
                <td>{{ roundNumber(assists) }}</td>
              </tr>
              <tr id="shots" class="stats" @click="selectRow('stats', 'shots')">
                <td>CHUTES:</td>
                <td>{{ roundNumber(shots) }}</td>
              </tr>
              <tr id="steals" class="stats" @click="selectRow('stats', 'steals')">
                <td>ROUBADAS:</td>
                <td>{{ roundNumber(steals) }}</td>
              </tr>
            </table>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-card',
  props: {
    playerName: String,
    playerPosition: String,
    teamName: String,
    teamBadge: String,
    playerPicture: Number,
    price: Number,
    aggAvg: Number,
    homeAvg: Number,
    awayAvg: Number,
    goals: Number,
    assists: Number,
    shots: Number,
    steals: Number,
    roundNumber: Function,
    fixPositionName: Function
  },
  data () {
    return {
      statToCompare: null,
      valueToCompare: null
    }
  },
  methods: {
    selectRow (className, id) {
      const items = document.getElementsByClassName(className)
      for (const item of items) {
        if (item.id === id) {
          item.classList.toggle('is-selected')
        } else {
          item.classList.remove('is-selected')
        }
      }
      const stat = document.getElementById(id).childNodes
      this.statToCompare = stat[0].innerText
      this.valueToCompare = stat[1].innerText
    },
    upperCase (text) {
      return text.toUpperCase()
    },
    urlImagePath (imgId) {
      return `https://www.cartolapfc.com.br/static/images/players-photos/2019/${imgId}.png`
    },
    addTeamLogo (teamName) {
      switch (teamName) {
        case '282': return 'https://s.glbimg.com/es/sde/f/equipes/2017/11/23/Atletico-Mineiro-escudo45px.png'
        case '262': return 'https://s.glbimg.com/es/sde/f/equipes/2018/04/09/Flamengo-45.png'
        case '293': return 'https://s.glbimg.com/es/sde/f/organizacoes/2018/12/13/escudo45.png'
        case '314': return 'https://s.glbimg.com/es/sde/f/organizacoes/2018/09/04/escudo-avai-45x45.png'
        case '265': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/bahia_45x45.png'
        case '263': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/botafogo_45x45.png'
        case '354': return 'https://s.glbimg.com/es/sde/f/equipes/2018/05/11/ceara-45x45.png'
        case '341': return 'https://s.glbimg.com/es/sde/f/equipes/2013/09/18/CSA_45.png'
        case '315': return 'https://s.glbimg.com/es/sde/f/equipes/2015/08/03/Escudo-Chape-145.png'
        case '264': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/corinthians_45x45.png'
        case '283': return 'https://s.glbimg.com/es/sde/f/equipes/2015/04/29/cruzeiro_45.png'
        case '266': return 'https://s.glbimg.com/es/sde/f/equipes/2015/07/21/fluminense_45x45.png'
        case '284': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/gremio_45x45.png'
        case '285': return 'https://s.glbimg.com/es/sde/f/equipes/2016/05/03/inter45.png'
        case '275': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/palmeiras_45x45.png'
        case '277': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/santos_45x45.png'
        case '276': return 'https://s.glbimg.com/es/sde/f/equipes/2013/12/16/sao_paulo_45x45.png'
        case '267': return 'https://s.glbimg.com/es/sde/f/equipes/2016/07/29/Vasco-45.png'
        case '356': return 'https://s.glbimg.com/es/sde/f/organizacoes/2018/06/10/fortaleza-ec-45px.png'
        case '290': return 'https://s.glbimg.com/es/sde/f/organizacoes/2019/05/01/Goias_45px.png'
        default: return 'Sem time'
      }
    }
  }
}
</script>

<style scoped>
.player-card {
  -webkit-box-shadow: 6px 7px 0px -1px rgba(31,31,31,0.18);
  -moz-box-shadow: 6px 7px 0px -1px rgba(31,31,31,0.18);
  box-shadow: 6px 7px 0px -1px rgba(31,31,31,0.18);
}

.card-content {
  background-color: #eaeaea;
}
</style>
