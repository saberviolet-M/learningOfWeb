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
    return new PROMISE((resolve, reject) => {
      if (this.status == PROMISE.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              let result = onFulfilled(value)
              // $ .then的返回结果是值还是promise，如果是promise则通过调用.then取到值
              if (result instanceof PROMISE) {
                result.then(resolve, reject)
              } else {
                resolve(result)
              }
            } catch (error) {
              reject(error)
            }
          },
          onRejected: (value) => {
            try {
              let result = onRejected(value)
              // $ .then的返回结果是值还是promise，如果是promise则通过调用.then取到值
              if (result instanceof PROMISE) {
                result.then(resolve, reject)
              } else {
                resolve(result)
              }
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
            // $ .then的返回结果是值还是promise，如果是promise则通过调用.then取到值
            if (result instanceof PROMISE) {
              result.then(resolve, reject)
              //   (value) => {
              //     resolve(value)
              //   },
              //   (reason) => {
              //     reject(reason)
              //   }
              // )
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status == PROMISE.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            // $ .then的返回结果是值还是promise，如果是promise则通过调用.then取到值
            if (result instanceof PROMISE) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
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
