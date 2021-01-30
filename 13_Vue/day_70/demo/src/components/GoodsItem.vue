<template>
  <div class="my-goods-item">
    <div class="left">
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          :id="goodsItem.id"
          :checked="goodsItem.goods_state"
          @change="changeChoseType(goodsItem.id)"
        />
        <label class="custom-control-label" :for="goodsItem.id">
          <img :src="goodsItem.goods_img" />
        </label>
      </div>
    </div>
    <div class="right">
      <div class="top">{{ goodsItem.goods_name }}</div>
      <div class="bottom">
        <span class="price">
          {{ goodsItem.goods_price | keepTwoDecimals }}
        </span>
        <span>
          <cart-count
            :goodsCount="goodsItem.goods_count"
            @addGoodsCount="addGoodsCount"
            @subGoodsCount="subGoodsCount"
            @changeInput="changeInput"
          ></cart-count>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CartCount from "./CartCount.vue";
export default {
  components: { CartCount },
  props: {
    goodsItem: {
      type: Object,
    },
  },
  methods: {
    changeChoseType(id) {
      this.$emit("changeChoseType", id);
    },
    addGoodsCount(goodsCnt) {
      this.$emit("addGoodsCount", goodsCnt, this.goodsItem.id);
    },
    subGoodsCount(goodsCnt) {
      this.$emit("subGoodsCount", goodsCnt, this.goodsItem.id);
    },
    changeInput(goodsCnt) {
      this.$emit("changeInput", goodsCnt, this.goodsItem.id);
    },
  },
};
</script>

<style lang="less" scoped>
.my-goods-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .left {
    img {
      width: 120px;
      height: 120px;
      margin-right: 8px;
      border-radius: 10px;
    }
    .custom-control-label::before,
    .custom-control-label::after {
      top: 50px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
</style>