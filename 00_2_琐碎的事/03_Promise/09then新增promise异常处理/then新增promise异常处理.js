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
      onFulfilled = () => {}
    }
    if (typeof onRejected != 'function') {
      onRejected = () => {}
    }
    return new PROMISE((resolve, reject) => {
      if (this.status == PROMISE.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              let result = onFulfilled(value)
              resolve(result)
            } catch (error) {
              // $ 对于存在的异常直接交由reject处理
              reject(error)
            }
          },
          onRejected: (value) => {
            try {
              let result = onRejected(value)
              resolve(result)
            } catch (error) {
              // $ 对于存在的异常直接交由reject处理
              reject(error)
            }
          },
        })
      }
      if (this.status == PROMISE.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            resolve(result)
          } catch (error) {
            // $ 对于存在的异常直接交由reject处理
            reject(error)
          }
        })
      }
      if (this.status == PROMISE.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            resolve(result)
          } catch (error) {
            // $ 对于存在的异常直接交由reject处理
            reject(error)
          }
        })
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
