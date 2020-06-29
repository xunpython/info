<template>
  <div>
    <div class="loginBox" v-loading="loading" element-loading-text="登录中" element-loading-background="rgba(255, 255, 255, 1)">
      <div class="leftBox">
        <p>登录</p>
        <img height="33px;" src="../../../../static/img/svg/dfdLOGO.svg">
      </div>
      <div class="rightBox">
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="1px" class="demo-ruleForm" label-position="left"
          :show-message="false">
          <p class="oyjory">用户名</p>
          <el-form-item label="" prop="usesrname">
            <el-input style='width:440px;height: 44px;' v-model="loginForm.usesrname" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <p class="oyjory">密码</p>
          <el-form-item label="" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="loginbtn" @click="postUpdateIsLogin('ruleForm')">登录</div>
          </el-form-item>
          <div class="mlkre">
            <el-checkbox v-model="selectRemember">记住密码</el-checkbox>
            <p style="color: #20A0FF;font-size:14px; cursor: pointer" @click="forgetpwd">忘记密码？</p>
          </div>
        </el-form>
      </div>
    </div>
    <p class="companyCopyright">本系统兼容IE9,IE10,Chrome,FireFox浏览器，为了浏览达到最佳效果，建议使用以上指定浏览器。</p>
  </div>
</template>
<script type="text/javascript">
// import "@/assets/css/login.css"
export default {
  data() {
    return {
      selectRemember: false,
      loading: false,
      loginForm: {
        usesrname: 'jcm',
        password: '111',
        keeplogin: false,
      },
      rules: {
        usesrname: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],

      }
    }
  },
  props: {

  },
  computed: {

  },
  wacth: {

  },
  created() {
    this.$store.state.Token = ''
    localStorage.setItem("Token", '')
  },
  mounted() {
    //document.getElementById("pwd").value="123456";
    //console.log(localStorage.getItem("selectRemember"))
    //判断是否记住用户名
    if (localStorage.getItem("selectRemember") == "true") {
      this.selectRemember = true
      // this.loginForm.usesrname = JSON.parse(localStorage.getItem("UserMsg")).id localStorage.getItem("username")
      // this.loginForm.password = JSON.parse(localStorage.getItem("UserMsg")).id localStorage.getItem("password")
    } else {
      // this.selectRemember = true
      this.loginForm.usesrname = ""
      this.loginForm.password = ""
    }



  },
  methods: {

    //忘记密码
    forgetpwd() {
      this.$parent.chageactive(2)
    },
    //登录函数
    postUpdateIsLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {}
          params.username = this.loginForm.usesrname
          params.password = this.loginForm.password
          this.$store.dispatch('postUpdateIsLogin', params).then((response) => {

            let res = response.data;
            if (response.statusText === 'OK' && response.status === 200) {
              if (res.status == 'success') {

                this.$store.state.Token = res.msg.token
                localStorage.setItem("Token", res.msg.token)
                localStorage.setItem("UserMsg", JSON.stringify(res.msg.usermsg))
                //console.log(res.msg.usermsg)
                this.setselectRemember()
                this.$store.commit('UserMsg', res.msg.usermsg)
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });

                this.$router.push({ path: 'homePage' })
                this.loading = false

              } else {
                this.loading = false
                this.$message.error(res.msg)
              }
            } else {
              this.loading = false;
              this.$message.error("网络错误")
            }
          }).catch((err) => {
            this.$message.error("网络连接错误")
            this.loading = false;
            console.log(err)
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    setselectRemember() {
      //console.log(this.selectRemember)
      if (this.selectRemember) {
        localStorage.setItem("usesrname", this.loginForm.usesrname)
        localStorage.setItem("password", this.loginForm.password)
        localStorage.setItem("selectRemember", "true")
      } else {
        localStorage.setItem("selectRemember", "false")
      }
    },

  },
  components: {

  }
}

</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}

.loginBox {
  z-index: 1;
  width: 440px;
  height: 340px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.5);
  padding: 30px 20px;
}

.leftBox {
  display: flex;
  justify-content: space-between;
  color: #1f2d3d;
  font-size: 24px;
  font-weight: 500;
  line-height: 33px;
}

.rightBox {
  margin-top: 20px;
}

.oyjory {
  color: #8492a6;
  font-size: 18px;
  margin-bottom: 10px;
}

.loginbtn {
  width: 440px;
  height: 44px;
  background: rgba(1, 101, 180, 1);
  border-radius: 4px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  line-height: 44px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.el-form-item {
  margin-bottom: 10px;
}

.mlkre {
  display: flex;
  justify-content: space-between;
}

.companyCopyright {
  bottom: 300px;
  color: #ffffff;
  width: 400px;
  font-size: 14px;
  margin-top: 20px;
  /*text-align: center;*/
  margin-left: 40px;
}
</style>
