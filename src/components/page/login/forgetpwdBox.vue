<template>
  <div class="loginBox" v-loading="loading" element-loading-text="发送中" element-loading-background="rgba(255, 255, 255, 1)">
    <div class="leftBox">
      <p>忘记了你的登录密码？</p>
      <p>请在下面填写你的用户名，我们会给您注册时填写的邮箱发一封重置密码邮件，或者联系管理员要求修改密码。</p>
    </div>
    <div class="rightBox">
      <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="1px" class="demo-ruleForm" label-position="left">
        <p class="oyjory">输入用户名</p>
        <el-form-item label="" prop="usesrname" required :show-message="false">
          <el-input style='width:322px;margin-top: 10px;' v-model="loginForm.usesrname" placeholder="请填写您的用户名"   @keyup.enter.native="sendemail" ></el-input>
        </el-form-item>
        <p class="reloginB" @click="relogin">想起来了，重新登录！</p>
        <el-form-item>
          <div class="loginbtn" @click="sendemail">发送</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
// import "@/assets/css/login.css"
export default {
  data() {
    return {
      selectRemember: 0,
      loading: false,
      loginForm: {
        usesrname: '',
      },
      rules: {
        usesrname: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
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

    //重新登录
    relogin() {
      this.$parent.chageactive(1)
    },


    //发送email
    sendemail() {
      this.loading = true
      let params = {}
      params.username = this.loginForm.usesrname
      params.url = "http://127.0.0.1:8081/#/"
      this.$store.dispatch('resetUser', params).then((response) => {
        this.loading = false;
        let res = response.data;
        if (response.statusText === 'Created' && response.status === 201) {
          //console.log(res)
          // this.$message({
          //   message: res.msg,
          //   type: 'success'
          // });
          //用户名正确
          this.$confirm('您的密码已经发送到'+res.msg+'邮箱，请点击邮件链接更改地址。', '邮件已发送', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {}).catch(() => {});

        } else {
          this.loading = false;
          this.$message.error("网络错误")
        }
      }).catch((err) => {
        this.loading = false;
        let dataerr = err.response.data.msg
        this.$message.error(dataerr)

        //用户名错误
      // this.$confirm('没有该用户，请核对用户名是否输入正确，或联系系统管理员修改密码。', '没有该用户', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {}).catch(() => {});
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
  width: 322px;
  height: 348px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 30px 30px;
}

.leftBox {
  color: #333333;

}

.leftBox p:nth-child(1) {
  font-size: 23px;
  text-align: center;
}

.leftBox p:nth-child(2) {
  font-size: 16px;
  margin-top: 20px;
  width: 322px;
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
  width: 322px;
  height: 44px;
  background: rgba(1, 101, 180, 1);
  border-radius: 4px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  line-height: 44px;
  margin-top: 22px;
  cursor: pointer;
}

.reloginB {
  font-size: 14px;
  color: #9B9B9B;
  margin-top: 20px;
  text-align: right;
  cursor: pointer;
}

</style>
