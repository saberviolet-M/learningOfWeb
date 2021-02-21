<template>
  <div id="app">
    <img src="@/assets/logo.png"
         @click="clear">
    <br>
    <input type="text"
           @keyup.enter="inptHandlerAddAsync">
    <button @click="addAsync">async+1</button>
    <br>
    <input type="text"
           @keyup.enter="inptHandlerSubAsync">
    <button @click="subAsync">async-1</button>
    <Add></Add>
    <hr>
    <Sub></Sub>
  </div>
</template>

<script>
import Add from './components/Add.vue'
import Sub from './components/Sub.vue'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: { Add, Sub },
  name: 'App',
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['clear']),
    ...mapActions(['addAsync', 'subAsync', 'subNAsync']),
    inptHandlerAddAsync (e) {
      this.$store.dispatch('addNAsync', +e.target.value)
    },
    inptHandlerSubAsync (e) {
      this.subNAsync(+e.target.value)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  background-image: -webkit-linear-gradient(135deg, #373b44, #4286f4);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  background-image: -webkit-linear-gradient(bottom, #ead6ee, #a0f1ea);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
button {
  margin: 1rem 0;
  width: 100px;
  height: 50px;
}
img {
  cursor: pointer;
}
</style>
