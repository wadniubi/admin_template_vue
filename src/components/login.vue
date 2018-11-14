<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="loginForm" label-position="left" autocomplete="true"
             :rules="loginRules">
      <div class="login_title">
        <h1>后台管理</h1>
      </div>
      <el-form-item label="用户名" prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on">
          <i slot="suffix" title="隐藏密码" @click="showPwd" style="cursor:pointer;margin-top: -5px"
             class="el-input__icon el-icon-view show-pwd"></i>
          <!--<span class="show-pwd" @click="showPwd">-->
            <!--<i slot="suffix" class="el-input__icon el-icon-view"></i>-->
          <!--</span>-->
        </el-input>
      </el-form-item>
      <el-button style="width:100%;margin-bottom:30px;" type="primary" :loading="loading"
                 @click.native.prevent="handleLogin">Login In
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          {required: true, trigger: 'blur', min: 5, max: 8, message: 'please input correct username'}
        ],
        password: [
          {required: true, trigger: 'blur', min: 6, message: 'password.length must be >6 '}
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({path: '/'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #6f7180;
    cursor: pointer;
    user-select: none;
  }
</style>
