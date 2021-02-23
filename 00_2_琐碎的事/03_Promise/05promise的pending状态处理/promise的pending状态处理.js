class PROMISE {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = PROMISE.PENDING
    this.value = null
    this.callbacks = []
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
      this.callbacks.map((callback) => {
        callback.onFulfilled(value)
      })
    }
  }
  reject(reason) {
    if (this.status == PROMISE.PENDING) {
      this.status = PROMISE.REJECTED
      this.value = reason
      this.callbacks.map((callback) => {
        callback.onRejected(reason)
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != 'function') {
      onFulfilled = () => {}
    }
    if (typeof onRejected != 'function') {
      onRejected = () => {}
    }
    // $ 在promise()的同步代码中如果存在异步改变状态，如定时器则需要在改变状态之后执行.then中的方法
    // $ 解决办法为在pending状态时将onFulfilled和onRejected压入数组
    // $ 当执行resolve或reject时，循环数组来重新执行对应方法
    if (this.status == PROMISE.PENDING) {
      this.callbacks.push({
        onFulfilled,
        onRejected,
      })
    }
    if (this.status == PROMISE.FULFILLED) {
      setTimeout(() => {
        try {
          onFulfilled(this.value)
        } catch (error) {
          onRejected(error)
        }
      })
    }
    if (this.status == PROMISE.REJECTED) {
      setTimeout(() => {
        try {
          onRejected(this.value)
        } catch (error) {
          onRejected(error)
        }
      })
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
