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
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulfilled(value)
        })
      })
    }
  }
  reject(reason) {
    if (this.status == PROMISE.PENDING) {
      this.status = PROMISE.REJECTED
      this.value = reason
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason)
        })
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled != 'function') {
      onFulfilled = () => this.value
    }
    if (typeof onRejected != 'function') {
      onRejected = () => {
        throw this.value
      }
    }
    let promise = new PROMISE((resolve, reject) => {
      if (this.status == PROMISE.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            // $ 异步执行是可以接收到return 的promise的
            this.parse(promise, onFulfilled(value), resolve, reject)
          },
          onRejected: (value) => {
            // $ 异步执行是可以接收到return 的promise的
            this.parse(promise, onRejected(value), resolve, reject)
          },
        })
      }
      if (this.status == PROMISE.FULFILLED) {
        setTimeout(() => {
          // $ 异步执行是可以接收到return 的promise的
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        })
      }
      if (this.status == PROMISE.REJECTED) {
        setTimeout(() => {
          // $ 异步执行是可以接收到return 的promise的
          this.parse(promise, onRejected(this.value), resolve, reject)
        })
      }
    })
    return promise
  }
  // $原生promise中是不允许.then返回自身的，于是进行判断，返回结果和输出结果相等则抛出错误
  parse(promise, result, resolve, reject) {
    if (promise == result) {
      throw new TypeError('Changing cycle detected')
    }
    try {
      if (result instanceof PROMISE) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
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
