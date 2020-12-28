// 辅助函数

/*
*函数名：getObjectToString
*函数作用：得到对象转换的字符串
*函数形参：data(对象)
*返回值：dataStr(字符串)
*/
function getObjectToString(data) {
    let dataStr = [];
    for (const k in data) {
        dataStr.push(`${k}=${data[k]}`);
    }
    dataStr = dataStr.join('&');
    return dataStr;
}

