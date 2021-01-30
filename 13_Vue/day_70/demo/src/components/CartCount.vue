<template>
  <div class="my-counter">
    <button type="button" class="btn btn-light" @click="subGoodsCount">
      -
    </button>
    <input
      type="number"
      class="form-control inp"
      :value="goodsCount"
      @change="changeInput"
    />
    <button type="button" class="btn btn-light" @click="addGoodsCount">
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goodsCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    addGoodsCount() {
      this.$emit("addGoodsCount", this.goodsCount + 1);
    },
    subGoodsCount() {
      if (this.goodsCount <= 1) {
        return (this.goodsCount = 1);
      }
      this.$emit("addGoodsCount", this.goodsCount - 1);
    },
    changeInput(e) {
      // 非空,非负,首位非0,非小数
      if (
        e.target.value == "" ||
        e.target.value < 0 ||
        e.target.value.split("").splice(0, 1) == "0" ||
        e.target.value.split("").includes(".") == true
      ) {
        e.target.value = 1;
      }
      this.$emit("changeInput", +e.target.value);
    },
  },
};
</script>

<style lang="less" scoped>
.my-counter {
  display: flex;
  .inp {
    width: 45px;
    text-align: center;
    margin: 0 10px;
  }
}
</style>