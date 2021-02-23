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
  static all(promises) {
    const values = []
    return new PROMISE((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            values.push(value)
            if (values.length == promises.length) {
              resolve(values)
            }
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }
  static race(promises) {
    // $ race 的返回对象是promise
    return new PROMISE((resolve, reject) => {
      // $ 将传入的promise对象遍历
      promises.map((promise) => {
        // $ 每个传入的promise取最快改变状态的promise的值赋值给返回的promise对象
        // ! promise 对象的状态只能转变一次不可逆
        promise.then(
          (value) => {
            resolve(value)
          },
          (reason) => {
            reject(reason)
          }
        )
      })
    })
  }
}
