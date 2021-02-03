<template>
  <div id="app">
    <tab-header :bgClr="bgClr" :clr="clr">Tab案例</tab-header>
    <!-- <goods-list></goods-list>
    <goods-search></goods-search>
    <user-info></user-info> -->
    <keep-alive>
      <component :is="changePage"></component>
    </keep-alive>
    <tab-footer :tabList="tabList" v-model="highLight"></tab-footer>
  </div>
</template>

<script>
import GoodsList from "./components/GoodsList.vue";
import GoodsSearch from "./components/GoodsSearch.vue";
import TabFooter from "./components/TabFooter.vue";
import TabHeader from "./components/TabHeader.vue";
import UserInfo from "./components/UserInfo.vue";
export default {
  name: "App",
  components: { TabHeader, TabFooter, GoodsList, GoodsSearch, UserInfo },
  data() {
    return {
      // 默认高亮的tag
      highLight: 0,
      bgClr: "#ffa0c4",
      clr: "#fff",
      // tab栏的数据
      tabList: [
        { icon: "icon-shangpinliebiao", title: "商品列表", name: "goods-list" },
        { icon: "icon-sousuo", title: "商品搜索", name: "goods-search" },
        { icon: "icon-user", title: "用户中心", name: "user-info" },
      ],
    };
  },
  computed: {
    changePage() {
      return this.tabList[this.highLight].name;
    },
  },
  methods: {},
};
</script>

<style>
#app {
  padding: 50px 0;
}
</style>
