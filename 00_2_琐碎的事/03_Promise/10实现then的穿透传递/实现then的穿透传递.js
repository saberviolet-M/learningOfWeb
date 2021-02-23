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
    // $ then穿透意味着不传参数时返回同上一次的value
    if (typeof onFulfilled != 'function') {
      onFulfilled = () => this.value
    }
    // $ 为了保证reject状态下下一次.then依然进入reject，要用throw 抛出this.value
    if (typeof onRejected != 'function') {
      onRejected = () => {
        throw this.value
      }
    }
    return new PROMISE((resolve, reject) => {
      if (this.status == PROMISE.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              let result = onFulfilled(value)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          },
          onRejected: (value) => {
            try {
              let result = onRejected(value)
              resolve(result)
            } catch (error) {
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
