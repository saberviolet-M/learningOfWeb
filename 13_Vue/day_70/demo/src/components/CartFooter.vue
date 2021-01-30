<template>
  <!-- 底部 -->
  <div class="cart-footer">
    <!-- 全选 -->
    <div class="custom-control custom-checkbox">
      <input
        type="checkbox"
        class="custom-control-input"
        id="footerCheck"
        v-model="isAllCheck"
      />
      <label class="custom-control-label" for="footerCheck">全选</label>
    </div>
    <!-- 合计 -->
    <div>
      <span>合计:</span>
      <span class="price"> {{ account | keepTwoDecimals }}</span>
    </div>
    <!-- 按钮 -->
    <button type="button" class="footer-btn btn btn-primary">
      结算 ({{ goodsConut }})
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goodslist: {
      type: Array,
    },
  },
  computed: {
    account() {
      return this.goodslist
        .filter((item) => item.goods_state)
        .reduce((sum, item) => (sum += item.goods_count * item.goods_price), 0);
    },
    goodsConut() {
      return this.goodslist
        .filter((item) => item.goods_state)
        .reduce((sum, item) => (sum += item.goods_count), 0);
    },
    isAllCheck: {
      get() {
        return this.goodslist.every((item) => item.goods_state);
      },
      set(isAllCheck) {
        this.$emit("checkAll", isAllCheck);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background: #fff;

  .price {
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  .footer-btn {
    min-width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 25px;
    padding: 0;
  }
}
</style>