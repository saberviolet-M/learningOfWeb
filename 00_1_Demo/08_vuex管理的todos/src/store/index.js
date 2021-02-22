import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // + 待办事项的数组
    list: [],
    // + 输入框中的待办事项
    iptValue: '',
    // + 模拟新增的代办事项id
    nextId: null,
    // + 视窗切换的关键字
    viewKey: 'all'
  },
  // ! 用于state数据修改，且规定只能在mutation中修改
  mutations: {
    // * 初始化列表数据（详见actions）
    initList(state, list) {
      state.list = list
      // * 根据请求来的数据最后一项的id+1作为下一项id的初始值
      if (list.length === 0) {
        state.nextId = 0
      }
      state.nextId = list[list.length - 1].id + 1
    },
    // * 设置输入框中的代办事项
    setIptVal(state, newIpt) {
      state.iptValue = newIpt
    },
    // * 配合setIptVal实现列表的增加
    addItem(state) {
      const addItem = {
        id: state.nextId,
        info: state.iptValue.trim(),
        done: false
      }
      // * 压入列表
      state.list.push(addItem)
      // * 每次添加之后下一项id值加一
      state.nextId++
    },
    // * 配合传回来的id删除事项
    delItem(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    // * 变换点击的checkbox状态
    checkBoxChange(state, id) {
      state.list.map(item => {
        if (item.id === id) {
          item.done = !item.done
        }
      })
    },
    // * 清除所有完成事项
    ClearFinished(state) {
      state.list = state.list.filter(item => !item.done)
    },
    // * 修改视窗关键字
    changeViewKey(state, key) {
      state.viewKey = key
    }
  },
  // ! 用于所有异步代码，但不允许修改state中的数据
  actions: {
    // * 通过fastmock配置的json文件，模拟数据请求
    getList(context) {
      axios
        .get(
          'https://www.fastmock.site/mock/006e83dac98612b47a7c296d91d06fe6/todos/api/todolists'
        )
        .then(({ data: { list } }) => {
          context.commit('initList', list)
        })
    }
  },
  // ! 相当于计算属性，不对state中数据修改
  getters: {
    // * 计算出已完成的事项
    unfinished(state) {
      return state.list.filter(item => !item.done).length
    },
    // * 根据视窗关键字来返回相应页面的数据
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'hasDone') {
        return state.list.filter(item => item.done)
      } else {
        return state.list.filter(item => !item.done)
      }
    }
  }
})
