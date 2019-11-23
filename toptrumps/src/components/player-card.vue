<template>
  <div class="container">
    <div class="player-card">
      <div class="flip-box">
        <div :class="{'flip-box-inner': isFlipped}">
          <div class="flip-box-front">
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
                    <p class="title is-6">{{ upperCase(playerName) }}</p>
                    <p class="subtitle is-7">{{ fixPositionName(playerPosition) }}</p>
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
          <div class="flip-box-back">
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
    fixPositionName: Function,
    isFlipped: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    flipCard () {
      this.isFlipped = !this.isFlipped
    },
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
      const statToCompare = [stat[0].innerText, stat[1].innerText]
      this.$emit('selectRow', statToCompare)
    },
    upperCase (text) {
      return text.toUpperCase()
    },
    urlImagePath (imgId) {
      return `https://www.cartolapfc.com.br/static/images/super-pfc/${imgId}.png`
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
/* entire container, keeps perspective */
.flip-container {
  -webkit-box-shadow: 6px 7px 0px -1px rgba(31,31,31,0.18);
  -moz-box-shadow: 6px 7px 0px -1px rgba(31,31,31,0.18);
  box-shadow: 6px 7px 0px -1px rgba(31,31,31,0.18);
}

tr {
  font-size: 1rem;
}

/* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-box {
  background-color: transparent;
  width: 100%;
  height: auto;
  /*height: 1100px;*/
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-box-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side */
.flip-box-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-box-back {
  /* background-image: url("../../public/img/back_card.jpeg"); */
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  transform: rotateY(180deg);
}
</style>
