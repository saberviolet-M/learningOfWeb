<template>
  <div id="app">
    <h1>todos</h1>
    <a-row>
      <a-col :span="8"></a-col>
      <a-col :span="8">
        <!-- 添加任务 -->
        <a-input-search
          placeholder="请输入任务"
          enter-button="添加"
          size="large"
          @search="handleInputChange"
          v-model="iptVal"
        />
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
    <br />
    <a-row>
      <a-col :span="8"></a-col>
      <a-col :span="8">
        <a-list bordered :data-source="infoList">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-checkbox
              @change="
                e => {
                  cbChange(e, item.id)
                }
              "
              :checked="item.done"
            ></a-checkbox>
            {{ item.info }}
            <a slot="actions" @click="handledelItem(item.id)">删除</a>
          </a-list-item>
        </a-list>
        <br />
        <!-- 事项 -->
        <footer>
          <a-col :span="5">{{ unfinished }}条剩余</a-col>
          <a-col :span="14">
            <a-button-group>
              <a-button
                :type="viewKey === 'all' ? 'primary' : 'default'"
                @click="handleChangeList('all')"
              >
                全部
              </a-button>
              <a-button
                :type="viewKey === 'hasDone' ? 'primary' : 'default'"
                @click="handleChangeList('hasDone')"
              >
                未完成
              </a-button>
              <a-button
                :type="viewKey === 'hasNotDone' ? 'primary' : 'default'"
                @click="handleChangeList('hasNotDone')"
              >
                已完成
              </a-button>
            </a-button-group>
          </a-col>
          <a-col :span="5">
            <a-button type="link" @click="handleBtnClearFinished"
              >清除已完成</a-button
            >
          </a-col>
        </footer>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
// + 辅助函数简化store的引入
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'App',
  created() {
    this.$store.dispatch('getList')
  },
  data() {
    return {
      iptVal: ''
    }
  },
  computed: {
    ...mapState(['list', 'iptValue', 'viewKey']),
    ...mapGetters(['unfinished', 'infoList'])
  },
  methods: {
    ...mapMutations([
      'setIptVal',
      'addItem',
      'delItem',
      'checkBoxChange',
      'ClearFinished',
      'changeViewKey'
    ]),
    // * 获取输入框值，传递给store修改数据
    handleInputChange(value) {
      if (value === '') return this.$message.warning('事项不能为空！')
      this.setIptVal(value)
      this.addItem()
      this.iptVal = ''
    },
    // * checkbox的状态修改
    cbChange(e, id) {
      this.checkBoxChange(id, e.target.checked)
    },
    // * 删除事项
    handledelItem(id) {
      this.delItem(id)
    },
    // * 清空已完成的事项
    handleBtnClearFinished() {
      this.ClearFinished()
    },
    // * 更改视窗关键字，通过视窗关键字来决定页面展示的内容
    handleChangeList(key) {
      this.changeViewKey(key)
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    h1 {
      background-image: -webkit-linear-gradient(bottom, #ead6ee, #a0f1ea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      font-weight: 700;
      font-size: 60px;
      margin: 0;
    }
    footer {
      text-align: center;
    }
  }
}
</style>
