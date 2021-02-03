<template>
  <div>
    <common-table :data="goodsList">
      <template #thead>
        <th>#</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>标签</th>
        <th>操作</th>
      </template>
      <template #tbody="{ item, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ item.goods_name }}</td>
        <td>¥ {{ item.goods_price.toFixed(2) }}</td>
        <td>
          <input
            v-if="item.inputVisible"
            class="tag-input form-control"
            type="text"
            v-focus
            @blur="item.inputVisible = false"
            @keyup.enter="addTag(item, $event)"
            @keyup.esc="$event.target.value = ''"
          />
          <button
            v-else
            @click="item.inputVisible = true"
            class="btn btn-primary btn-sm add-tag"
          >
            +Tag
          </button>
          <span
            v-for="tag in item.tags"
            :key="tag"
            class="badge badge-warning"
            >{{ tag }}</span
          >
        </td>
        <td>
          <button class="btn btn-danger btn-sm" @click="del(item.id)">
            删除
          </button>
        </td>
      </template>
    </common-table>
  </div>
</template>

<script>
import axios from "axios";
import CommonTable from "./CommonTable.vue";
export default {
  components: { CommonTable },
  name: "GoodsList",
  data() {
    return {
      // 商品列表数据
      goodsList: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 初始化商品的数据
    async getGoodsList() {
      // 发送ajax请求
      const res = await axios.get("https://www.escook.cn/api/goods");
      const { status, data } = res.data;
      if (status !== 0) return console.log("获取商品列表失败");
      // 请求成功
      this.goodsList = data;
      console.log(data);
    },
    del(id) {
      this.goodsList = this.goodsList.filter((item) => item.id !== id);
    },
    isInputVisible(inputVisible) {
      this.isInputVisible = inputVisible;
    },
    addTag(arrOfTag, e) {
      if (e.target.value.trim() == "") return alert("输入为空");
      arrOfTag.tags.push(e.target.value);
      arrOfTag.inputVisible = false;
    },
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.my-goods-list {
  .badge {
    margin-right: 5px;
  }
}
</style>