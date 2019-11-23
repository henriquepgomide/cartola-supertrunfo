<template>
  <div id="app">
    <div id="nav">
      <span class="font-link"><router-link to="/">Home</router-link> | </span>
      <span class="font-link"><router-link to="/choose-game-mode">Jogar</router-link></span>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Bangers|Press+Start+2P&display=swap');

body {
  background-image: url('assets/img/background.png');
  background-repeat: repeat;
}

h1, h2, nav, .font-link {
  font-family: 'Press Start 2P', cursive;
}

#app {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #white;
  text-decoration: underline;
}
</style>
