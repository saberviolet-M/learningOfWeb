<template>
  <div>
    <h1>Search</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
  created() {
    setTimeout(() => {
      this.$router.push('/')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
h1 {
  background-image: -webkit-linear-gradient(bottom, #ead6ee, #a0f1ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
