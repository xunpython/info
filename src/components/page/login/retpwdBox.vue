<!-- 重置密码弹窗 -->
<template>
  <div>
    <div class="loginBox" v-loading="loading" element-loading-text="提交中" element-loading-background="rgba(255, 255, 255, 1)">
      <div class="leftBox">
        <p>重置密码</p>
      </div>
      <div class="rightBox">
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="1px" class="demo-ruleForm" label-position="left">
          <p class="oyjory">新密码</p>
          <el-form-item label="" prop="newpwd">
            <el-input type="password" style='width:440px;height: 44px;' v-model="loginForm.newpwd" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <div style="height: 10px"></div>
          <p class="oyjory">确认密码</p>
          <el-form-item label="" prop="confirepwd">
            <el-input type="password" v-model="loginForm.confirepwd" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="loginbtn" @click="userProfilelist('ruleForm')">确认</div>
          </el-form-item>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.loginForm.confirepwd !== '') {
          this.$refs.ruleForm.validateField('confirepwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loginForm.newpwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      selectRemember: 0,
      loading: false,
      loginForm: {
        newpwd: '',
        confirepwd: '',
      },
      rules: {
        newpwd: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        confirepwd: [
          { validator: validatePass2, required: true, trigger: 'blur' }
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

  },
  mounted() {

  },
  methods: {

    //忘记密码
    forgetpwd() {
      this.$parent.chageactive(2)
    },
    //修改密码
    userProfilelist(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {}
          params.code = this.$parent.$data.code
          params.password = this.loginForm.newpwd
          // let paramdata = params
          this.$store.dispatch('modifyUserPassword', params).then((response) => {
            this.loading = false;
            let res = response.data;
            if (response.statusText === 'Created' && response.status === 201) {
              //console.log(res)
              this.$confirm('密码已经重置成功，请登录。', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
              }).then(() => {
                this.$parent.chageactive(1)
              }).catch(() => {
                this.$parent.chageactive(1)
              });
            } else {
              this.loading = false;
              this.$message.error("网络错误")
            }
          }).catch((err) => {
            this.loading = false;
            let dataerr = err.response.data.msg
            this.$message.error(dataerr)
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
  color: #1F2D3D;
  font-size: 24px;
  font-weight: 500;
  line-height: 33px;
}


.rightBox {
  margin-top: 20px;
}

.oyjory {
  color: #8492A6;
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
