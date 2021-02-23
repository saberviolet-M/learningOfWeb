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
    // +++++++++++++++++++
    if (this.status == PROMISE.PENDING) {
      this.callbacks.push({
        onFulfilled: (value) => {
          try {
            onFulfilled(value)
          } catch (error) {
            onRejected(error)
          }
        },
        onRejected: (value) => {
          try {
            onRejected(value)
          } catch (error) {
            onRejected(error)
          }
        },
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
