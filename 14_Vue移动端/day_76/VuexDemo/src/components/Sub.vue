<template>
  <div>
    <h1>当前Count为：{{$store.state.count}}</h1>
    <button @click="sub">-1</button>
    <br>
    <input type="text"
           @keyup.enter="inptHandler">
    <br>
    <br>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Sub',
  methods: {
    ...mapMutations(['sub', 'subN']),
    inptHandler (e) {
      this.subN(+e.target.value)
    }
  }
}
</script>

<style>
</style>
