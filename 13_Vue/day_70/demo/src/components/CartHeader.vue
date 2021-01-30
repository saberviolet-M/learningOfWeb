<template>
  <div
    class="cart-header"
    :style="{
      title: title,
      backgroundColor: bgClr,
      color: clr,
    }"
  >
    {{ title }}
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "Cart Title",
    },
    bgClr: {
      type: String,
      default: "#1d7bff",
    },
    clr: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="less" scoped>
.cart-header {
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #1d7bff;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>