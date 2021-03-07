<template>
  <div>
    <h1>User</h1>
    <van-button type="info" @click="handleBtnClick">登录</van-button>
  </div>
</template>

<script>
export default {
  name: 'UserIndex',
  methods: {
    handleBtnClick() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  text-align: center;
  h1 {
    background-image: -webkit-linear-gradient(bottom, #ead6ee, #a0f1ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
