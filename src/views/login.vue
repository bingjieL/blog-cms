<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <el-card>
        <div slot="header">
          <i class="iconfont icon-huanyingqiapian" style="font-size: 15px;" />欢迎登录
        </div>
        <div class="form-con">
          <el-form ref="loginForm" :model="form" :rules="rules">
            <el-form-item prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户名">
                <template slot="prepend"><i class="iconfont icon-wode"/></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" placeholder="请输入密码">
                <template slot="prepend"><i class="iconfont icon-mima-"/></template>
              </el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" :loading="loginLoading" @click="handleSubmit">登录</el-button>
          </el-form>
        </div>
    </el-card>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { LoginApi } from '@/server/login'
export default {
  data() {
    return {
      form: {
        userName: null,
        password: null
      },
      shopData:[],
      loginLoading: false,
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    localStorage.removeItem('userBasic')
  },
  methods: {
    ...mapMutations(['setBasicInfo']),
    handleSubmit() {
       this.$refs.loginForm.validate((valid) => {
        if(valid) {
          this.loginLoading = true
          this.loginLoading = false
          LoginApi(this.form).then(res => {
            if(res.code === 200) {
              let { userName } =  res.data
              let redirect = this.$route.query.redirect
              window.localStorage.setItem('userBasic',JSON.stringify({userName, isLogin: true}))
              this.$message.success('登录成功！')
              this.setBasicInfo({ userName })
              if(redirect && redirect !='/login'){
                this.$router.push(redirect)
              }else{
                this.$router.push('/')
              }
            }
          })
         
        }
      })
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/style/login.scss";
</style>

