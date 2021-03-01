function deepClone(org, tar) {
  var tar = tar || {},
    toStr = Object.prototype.toString,
    arrType = '[object Array]'
  for (var k in org) {
    if (org.hasOwnProperty(k)) {
      if (typeof org[k] === 'object' && org[k] !== null) {
        tar[k] = toStr.call(org[k]) === arrType ? [] : {}
        deepClone(org[k], tar[k])
      } else {
        tar[k] = org[k]
      }
    }
  }
  return tar
}
