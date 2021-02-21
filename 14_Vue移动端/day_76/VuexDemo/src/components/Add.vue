<template>
  <div>
    <h1>当前Count为：{{count}}</h1>
    <button @click="btnHandler">+1</button>
    <br>
    <input type="text"
           @keyup.enter="inptHandler">
    <br>
    <br>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Add',
  computed: {
    ...mapState(['count'])
  },
  methods: {
    btnHandler () {
      this.$store.commit('add')
    },
    inptHandler (e) {
      this.$store.commit('addN', +e.target.value)
    }
  }
}
</script>

<style>
</style>
