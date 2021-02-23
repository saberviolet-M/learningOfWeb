class PROMISE {
  // + promise通过更改状态产生不同结果
  // + 定义成class 的静态属性
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  // + promise构造时执行promise内部代码，通过class 的constructor实现
  constructor(executor) {
    // + promise原生就是修改状态，并获取值
    this.status = PROMISE.PENDING // * 默认为pending（等待）状态
    this.value = null

    // + 原生执行器通过两个函数改变状态，获取值value或者拒绝原因reason
    // ! this指向需要人为干预,class内部遵循严格模式
    executor(this.resolve.bind(this), this.reject.bind(this))
  }
  // + 将resolve 和 reject 作为类的方法
  resolve(value) {
    this.status = PROMISE.FULFILLED
    this.value = value
  }
  reject(reason) {
    this.status = PROMISE.REJECTED
    this.value = reason
  }
}

// + 原生promise
// new Promise((resolve, reject) => {
//   resolve('解决')
//   reject('拒绝')
// })
