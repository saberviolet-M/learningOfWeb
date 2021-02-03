<template>
  <table class="table table-bordered table-stripped">
    <!-- 表格标题区域 -->
    <thead>
      <tr>
        <slot name="thead"></slot>
      </tr>
    </thead>
    <!-- 表格主体区域 -->
    <tbody>
      <tr v-for="(item, index) in data" :key="item.id">
        <slot name="tbody" :item="item" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    data: {
      type: Array,
    },
  },
};
</script>

<style>
</style>
