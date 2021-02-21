// + ECMAScript 6 新增的引用类型 Promise，可以通过 new 操作符来实例化。
let p = new Promise(() => {})
setTimeout(console.log, 0, p) // Promise <pending>

// * 期约状态机
// + 期约的状态代表期约是否完成。 “待定 pending”表示尚未开始或者正在执行中。“兑现 fulfilled”表示已经成功完成，而“拒绝 rejected”则表示没有成功完成。
