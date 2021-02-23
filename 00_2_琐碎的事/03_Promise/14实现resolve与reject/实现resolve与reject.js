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
            this.parse(promise, onFulfilled(value), resolve, reject)
          },
          onRejected: (value) => {
            this.parse(promise, onRejected(value), resolve, reject)
          },
        })
      }
      if (this.status == PROMISE.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        })
      }
      if (this.status == PROMISE.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject)
        })
      }
    })
    return promise
  }
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
  // $ 作为promise 的方法，resolve返回成功，reject返回失败
  // $ 如果传入promise对象则需要通过then获取值，不能作为对象传递
  static resolve(value) {
    return new PROMISE((resolve, reject) => {
      if (value instanceof PROMISE) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  static reject(value) {
    return new PROMISE((resolve, reject) => {
      if (value instanceof PROMISE) {
        value.then(resolve, reject)
      } else {
        reject(value)
      }
    })
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
