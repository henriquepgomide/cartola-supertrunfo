<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="has-text-centered">
        <h1 class="is-size-4">Ranking dos Campeões</h1>
      </div>
      <br>
      <br>
      <div class="rankings">
        <div v-if="loaded">
        <b-table
          :data="ranking"
          :default-sort="['score', 'desc']"
          :columns="columns"></b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankings',
  data () {
    return {
      loaded: false,
      ranking: [],
      columns: [
        {
          field: 'player',
          label: 'Apelido'
        },
        {
          field: 'score',
          label: 'Pontos',
          centered: true,
          numeric: true,
          sortable: true
        }
      ]
    }
  },
  methods: {
    fetchData () {
      const database = 'https://pfc-cardgame.firebaseio.com/pfc-cardgame.json?orderBy="score"&limitToFirst=50'
      this.$http.get(database)
        .then(response => {
          return response.json()
        })
        .then(data => {
          let ranking = Object.values(data).map(function (ele) {
            return { 'player': ele.player, 'score': Math.abs(ele.score) }
          })
          this.ranking = ranking
          this.loaded = true
        })
    }
  },
  async mounted () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}

h1 {
  text-transform: uppercase;
}
</style>
