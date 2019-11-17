<template>
  <div id="app">
    <div id="nav">
      <span class="font-link"><router-link to="/">Home</router-link> | </span>
      <span class="font-link"><router-link to="/game">Jogar</router-link> |</span>
      <span class="font-link"><router-link to="/about"> About</router-link></span>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Bangers|Press+Start+2P&display=swap');

body {
  background-color: white;
}

h1 {
  font-family: 'Bangers', cursive;
}

#nav .font-link {
  font-family: 'Press Start 2P', cursive;
}

h1, h2 {
  font-family: 'Press Start 2P', cursive;
}

/* p {
  font-family: 'Press Start 2P', cursive;
}
*/

#app {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #7957d5;
}
</style>
