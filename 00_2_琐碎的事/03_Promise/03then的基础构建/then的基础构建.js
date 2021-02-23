class PROMISE {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = PROMISE.PENDING
    this.value = null

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(value) {
    if (this.status == PROMISE.PENDING) {
      this.status = PROMISE.FULFILLED
      this.value = value
    }
  }
  reject(reason) {
    if (this.status == PROMISE.PENDING) {
      this.status = PROMISE.REJECTED
      this.value = reason
    }
  }
  // + 原生promise通过.then处理修改状态之后的结果，可传入两个函数
  then(onFulfilled, onRejected) {
    // + 原生promise不传入函数也可以执行，于是通过if判断，不传入时构建一个函数
    if (typeof onFulfilled != 'function') {
      onFulfilled = () => {}
    }
    // + 由于原生promise能够链式编程，所以()=>{}是存在问题的
    if (typeof onRejected != 'function') {
      onRejected = () => {}
    }
    // + 原生promise只有成为对应的状态，才会执行对应的函数
    if (this.status == PROMISE.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status == PROMISE.REJECTED) {
      onRejected(this.value)
    }
  }
}

// new Promise((resolve, reject) => {
//   resolve('解决')
//   reject('拒绝')
// }).then(
//   (resolve) => {

//   },
//   (reject) => {

//   }
// )
