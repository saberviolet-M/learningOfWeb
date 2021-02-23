class PROMISE {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = PROMISE.PENDING
    this.value = null
    // + 通过try-catch来处理执行器中的错误
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      // + 一旦执行器里出现错误，等同于进入reject选项
      this.reject(error)
    }
  }
  resolve(value) {
    // + 通过if判断来隔绝resolve和reject同时执行
    if (this.status == PROMISE.PENDING) {
      this.status = PROMISE.FULFILLED
      this.value = value
    }
  }
  reject(reason) {
    // + 通过if判断来隔绝resolve和reject同时执行
    if (this.status == PROMISE.PENDING) {
      this.status = PROMISE.REJECTED
      this.value = reason
    }
  }
}

// new Promise((resolve, reject) => {
//   resolve('解决')
//   reject('拒绝')
// })
