<template>
  <div id="app">
    <cart-header :title="title" :bgClr="bgClr" :clr="clr"></cart-header>
    <goods-item
      v-for="item in goodslist"
      :key="item.id"
      :goodsItem="item"
      @changeChoseType="changeChoseType"
      @addGoodsCount="addGoodsCount"
      @subGoodsCount="subGoodsCount"
      @changeInput="changeInput"
    ></goods-item>
    <cart-footer @checkAll="checkAll" :goodslist="goodslist"></cart-footer>
  </div>
</template>

<script>
import CartFooter from "./components/CartFooter.vue";
import CartHeader from "./components/CartHeader.vue";
import GoodsItem from "./components/GoodsItem.vue";
import axios from "axios";

export default {
  name: "App",
  components: { CartHeader, CartFooter, GoodsItem },
  data() {
    return {
      title: undefined,
      bgClr: undefined,
      clr: undefined,
      goodslist: [],
    };
  },
  computed: {
    isAllCheck() {
      return this.goodslist.every((item) => item.goods_state);
    },
  },
  methods: {
    changeChoseType(id) {
      let goodState = this.goodslist.find((item) => item.id == id);
      goodState.goods_state = !goodState.goods_state;
    },
    checkAll(isAllCheck) {
      this.goodslist.forEach((item) => (item.goods_state = isAllCheck));
    },
    addGoodsCount(cnt, id) {
      this.goodslist.find((item) => item.id == id).goods_count = cnt;
    },
    subGoodsCount(cnt, id) {
      this.goodslist.find((item) => item.id == id).goods_count = cnt;
    },
    changeInput(cnt, id) {
      this.goodslist.find((item) => item.id == id).goods_count = cnt;
    },
  },
  async created() {
    const res = await axios({
      method: "get",
      url: "https://www.escook.cn/api/cart",
    });
    const { status, list } = res.data;
    if (status === 200) {
      this.goodslist = list;
    }
  },
};
</script>

<style scoped>
#app {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
