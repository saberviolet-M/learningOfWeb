<template>
  <div class="login-container">
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!-- 表单 -->
      <el-form :model="form"
               :rules="rules"
               ref="form"
               status-icon>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号码"
                    v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码"
                    v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.isAgree">我已阅读用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-button type="primary"
                     class="login-btn"
                     @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        isAgree: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1[3,9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: ['blur', 'change'] }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('请阅读隐私协议'))
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return this.$message.warning('请完写或选择必要信息')
        try {
          const res = await this.$axios.post('/mp/v1_0/authorizations', this.form)
          console.log(res)
          this.$message.success('登陆成功')
          this.$router.push('/')
        } catch (err) {
          this.$message.error('登陆失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('~@/assets/login_bg.jpg') no-repeat;
  background-size: cover;
  .login-form-wrap {
    width: 400px;
    padding: 30px 50px 10px;
    box-sizing: border-box;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url('~@/assets/logo_index.png') no-repeat;
        background-size: contain;
      }
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
