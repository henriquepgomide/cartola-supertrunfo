<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="has-text-centered">
        <h1 class="is-size-4">Ranking dos Campeões</h1>
      </div>
      <br>
      <br>
      <div class="rankings">
        <b-table :data="data" :columns="columns"></b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankings',
  data () {
    return {
      data: [
        { 'id': 1, 'name': 'Big Boss', 'points': 1000 },
        { 'id': 2, 'name': 'Everton Klopp', 'points': 954 },
        { 'id': 3, 'name': 'Gomide', 'points': 200 }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'name',
          label: 'Apelido'
        },
        {
          field: 'points',
          label: 'Pontos',
          centered: true
        }
      ]
    }
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
