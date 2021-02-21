<template>
  <div class="notFoud">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark tip">{{contDown}}S后退回登录页</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      contDown: 5
    }
  },
  mounted () {
    setInterval(() => {
      this.contDown--
      if (this.contDown === 0) {
        this.$router.push('/login')
      }
    }, 1000)
  }
}
</script>

<style scoped>
.notFoud {
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  background: url(~@/assets/404.png);
  background-size: 100% 100%;
}
.tip {
  font-weight: 700;
  font-size: 4rem;
  text-align: center;
  background-image: -webkit-linear-gradient(bottom, #ead6ee, #a0f1ea);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
