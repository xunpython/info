<!-- 登录页面 -->
<template>
  <div>
    <div class="bgImg">
      <div class="titbox">
        <p>武汉有限公司</p>
        <p>数字化试验管理系统</p>
      </div>
      <transition name="loginBox">
        <LoginBox v-if="active==1"></LoginBox>
      </transition>
      <transition name="loginBox">
        <ForgetpwdBox v-if="active==2"></ForgetpwdBox>
      </transition>
      <transition name="loginBox">
        <RetpwdBox v-if="active==3"></RetpwdBox>
      </transition>
      <!-- <p class="companyCopyright">本系统兼容IE9,IE10,Chrome,FireFox浏览器，为了浏览达到最佳效果，建议使用以上指定浏览器。</p> -->
    </div>
    <div class="footbox">
      <img src="../../../static/img/png/DFD.png">
      <p style="color:#475669;font-size:14px;margin-top: 10px;margin-left: 50px; ">Copyright © 2018 ~ 2023 东风设计研究院有限公司 鄂ICP备15003372号 By Windy.</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import LoginBox from './login/loginBox' //登陆栏
import ForgetpwdBox from './login/forgetpwdBox' //忘记密码
import RetpwdBox from './login/retpwdBox' //重置密码
// import "@/assets/css/login.css"


export default {
  data() {
    return {
      author: false,
      active: 1, //active:判断页面显示，1为显示登录框，2为显示设置框  3为重置密码框
      code:'',
    }
  },
  props: {

  },
  created() {
    //document.setTitle('登录');
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },


  },
  wacth: {

  },
  mounted() {
    //console.log(JSON.stringify(this.$route.query)=='{}')
    if (JSON.stringify(this.$route.query)!='{}') {
      this.active = 3
      console.log(this.$route.query)
      this.code=this.$route.query.code
    }
  },
  methods: {
    //进入网络设置页面，将Vuex里面的active设置为2
    joinSetting() {
      this.$store.commit('updateActive', 2)
    },
    //进入登录页面，将Vuex里面的active设置为1
    joinLogin() {
      this.$store.commit('updateActive', 1)
    },

    chageactive(v) {
      this.active = v
    },
  },
  components: {
    LoginBox,
    ForgetpwdBox,
    RetpwdBox
  }
}

</script>
<style scoped>
.footbox {
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 0;
  /*padding: 20px 0 10px 50px;*/
}

.footbox img {
  height: 40px;
  margin-top: 20px;
  margin-left: 50px;
}

.bgImg {
  width: 100%;
  height: 90%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: #333333;*/
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(../../assets/img/bg.png);
}

.titbox {
  position: absolute;
  top: 40px;
  left: 40px;
  color: #ffffff;
}

p {
  margin: 0;
  padding: 0;
  font-size: 30px;
}

.titbox p:nth-child(2) {
  font-size: 46px;
}

.settingBox {
  width: 520px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  /*justify-content: center;*/
  flex-direction: column;
  align-items: center;
}

.companyCopyright {
  position: fixed;
  bottom: 300px;
  color: #ffffff;
  width: 400px;
  font-size: 14px;
  margin-top: 20px;
}

.loginBox-enter-active {
  transition: all .5s ease .6s;
}

.loginBox-leave-active {
  transition: all .8s cubic-bezier(1.0, 2, 0.8, 1.0);
  animation: reverse;
}

.loginBox-enter,
.loginBox-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

  {
  transform: translateX(150px);
  opacity: 0;
}

@keyframes loginBox-in {
  0% {
    opacity: 0%;
  }

  10% {
    opacity: 10%;
  }

  20% {
    opacity: 20%;
  }

  50% {
    opacity: 50%;
  }

  100% {
    opacity: 100%;
  }
}

</style>
