<template>
  <div class="tab-footer">
    <div
      class="tab-item"
      v-for="(item, index) in tabList"
      :class="{ current: value === index }"
      :key="item.title"
      @click="changeTag(index)"
    >
      <span class="iconfont" :class="item.icon"></span>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabFooter",

  props: {
    value: {
      taype: Number,
      default: 0,
    },
    tabList: {
      type: Array,
      require: true,
      validator(val) {
        if (val.length >= 2 && val.length <= 5) {
          return true;
        } else {
          alert("tabList长度必须2-5位");
          return false;
        }
      },
    },
  },

  methods: {
    changeTag(tagIndex) {
      this.$emit("input", tagIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .iconfont {
      font-size: 18px;
    }
  }
  .current {
    color: #1d7bff;
  }
}
</style>