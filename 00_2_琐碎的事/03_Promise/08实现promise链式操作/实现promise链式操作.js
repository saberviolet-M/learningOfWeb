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
    // $ 实现链式就是将then作为新promise返回
    return new PROMISE((resolve, reject) => {
      if (this.status == PROMISE.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              // $ 原生promise的.then默认为成功状态，所以每个处理函数作为成功返回
              let result = onFulfilled(value)
              resolve(result)
            } catch (error) {
              onRejected(error)
            }
          },
          onRejected: (value) => {
            try {
              // $ 原生promise的.then默认为成功状态，所以每个处理函数作为成功返回
              let result = onRejected(value)
              resolve(result)
            } catch (error) {
              onRejected(error)
            }
          },
        })
      }
      if (this.status == PROMISE.FULFILLED) {
        setTimeout(() => {
          try {
            // $ 原生promise的.then默认为成功状态，所以每个处理函数作为成功返回
            let result = onFulfilled(this.value)
            resolve(result)
          } catch (error) {
            onRejected(error)
          }
        })
      }
      if (this.status == PROMISE.REJECTED) {
        setTimeout(() => {
          try {
            // $ 原生promise的.then默认为成功状态，所以每个处理函数作为成功返回
            let result = onRejected(this.value)
            resolve(result)
          } catch (error) {
            onRejected(error)
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
