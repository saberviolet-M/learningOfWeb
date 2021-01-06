/* 从layui对象中解构form对象 */

const { form } = window.layui
form.verify({
    /* login页面 */
    // 用户名
    username: [
        /^[a-z0-9]{6,10}$/,
        '账号名是6到10位由数字, 小写字母组成'
    ],
    // 密码
    password: [
        /^[\S]{6,10}$/,
        '密码是6到10位, 不能有空格'
    ],
    // 注册页-确认密码
    repwd: function (value) {
        return ($(".pwd").val() !== value) && '两次密码不相同'
    },

    /* userInfo页面 */
    // 昵称
    nickname: [
        /^[\u4E00-\u9FA5]+$/,
        '昵称只能是中文'
    ],
    // email验证(上网可查，正则)

    /* repwd页面 */
    // 修改密码页面使用 - 新旧密码不能一样
    diff: function (value) {
        return ($(".oldPwd").val() == value) && "新密码和旧密码不能一样"
    },
    // 修改密码页 - 使用
    same: function (value) {
        return ($(".newPwd").val() !== value) && '两次密码不相同'
    },

    /* category页面 */
    ctname: [
        /^[\u4E00-\u9FA5]+$/,
        "分类名只能是中文"
    ],
    aliname: [
        /^[a-z0-9]+$/,
        "小写英文和数字组成"
    ],
});  