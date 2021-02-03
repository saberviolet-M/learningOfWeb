<template>
  <div class="tab-header" :style="{ backgroundColor: bgClr, color: clr }">
    <slot>我是标题</slot>
  </div>
</template>

<script>
export default {
  name: "TabHeader",
  props: {
    bgClr: {
      type: String,
      default: "royalblue",
    },
    clr: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="less" scoped>
.tab-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>

