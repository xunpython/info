<template>
  <div class="topbar">
    <div class="nabbar">
      <div style="display: flex;align-items:center;font-size: 24px;">
        <i class="el-icon-menu" style="margin-right: 20px;" @click="changgecollapse"></i>
        <a href="/"><img src="../../../static/img/svg/DFD_logo.svg"></a>
      </div>
      <div class="nab2">
        <img class="nab2i" src="../../../static/img/svg/scanCode.svg" @click="scanner">
        <img class="nab2i" src="../../../static/img/svg/ic_translate.svg">
        <div style="display: flex;margin-right: 15px;">
          <img class="nab2i" style="margin-right: 0" src="../../../static/img/svg/message.svg">
          <div class="badge">12</div>
        </div>
        <img class="nab2i" :src="UserMsg.avatar">
        <!-- <img src=""> -->
        <div class="nab21">
          <p>{{UserMsg.real_name}}</p>
          <p>{{UserMsg.username}}</p>
        </div>
        <!-- <img class="arrow" src="../../static/img/svg/arrow_down.svg"> -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"></template>
            <el-menu-item index="1-1" @click='selectway(1)'>用户资料</el-menu-item>
            <el-menu-item index="1-2" @click='selectway(2)'>修改密码</el-menu-item>
            <el-menu-item index="1-3" @click='loginout'>退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <!-- 用户信息弹窗 -->
    <!-- <usermsgDialog v-if="modalStatus=='用户信息弹窗'"></usermsgDialog> -->
  </div>
</template>
<script type="text/javascript">
import '../../../static/css/element_menutop.css'
import usermsgDialog from '@/components/common/usermsg_dialog' //用户信息弹窗
export default {
  data() {
    return {
      activeIndex: '1',
      currenRow: this.$store.state.UserMsg,
    }
  },
  watch: {
    UserMsg(o, v) {
      // console.log(o)
    }
  },
  created() {
    if (JSON.stringify(this.$store.state.UserMsg) == "{}") {
      this.$store.commit('UserMsg', JSON.parse(localStorage.getItem("UserMsg")))
    }
  },
  mounted() {

  },

  computed: {
    UserMsg() {
      return this.$store.state.UserMsg
    },

    //显示弹框类型
    modalStatus() {
      return this.$store.state.modalStatus
    },
  },

  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },

    //更改侧边栏样式
    changgecollapse() {
      this.$parent.changgecollapse()
    },

    //扫码功能
    scanner() {
      try {
        let a = api.appId;
        this.scanner_api();
      } catch (e) {
        //这里存放错误执行后 应该要执行的代码  根据不同的错误类型
        this.$message({
          message: '请在对应app上使用此功能',
          type: 'warning'
        });
        this.testNum('http://www.downxia.com/zixun/44431.html')
      } finally {
        //不管有没有错误发生，都始终执行
      }
    },
    scanner_api() {
      var FNScanner = api.require('FNScanner');
      let that = this;
      FNScanner.openScanner({
        autorotation: true,
      }, function (ret, err) {
        if (ret) {
          // alert( JSON.stringify( ret ) );
          if (ret.eventType == 'success') {
            //that.inputVal = ret.content;

            that.testNum(ret.content)
          }
          if (ret.eventType == 'fail') {
            that.$message.error("扫码失败,请扫条码或二维码");
          }
        } else {
          console.log(err)
          that.$message.error(JSON.stringify(err));
        }
      })
    },

    //退出登录
    loginout() {

      this.$confirm('确认退出当前用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => { });

    },

    testNum(str) {
      //console.log(str)
      var numReg = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      var reg = new RegExp(numReg)
      if (reg.test(str)) {
        this.$router.push({ name: 'ScanMsgShow', query: { scan: str } });
      } else {
        this.$message({
          message: '请扫码正确的url格式二维码',
          type: 'warning'
        });
      };
    },


    //跳转用户资料
    selectway(index) {

      if (index == 1) {
        //this.$parent.selectway()
        // this.$router.push({ path: 'useInformation', query: { index: index } })
        this.$store.commit('showModal', true)
        this.$store.commit('updateModalStatus', '用户信息弹窗')
      } else {
        this.$router.push({ path: 'useInformation', query: { index: index } })
      }
      //this.$router.push({ path: 'useInformation', query: { index: index } })
    },

  },
  components: {
    usermsgDialog
  }
}

</script>
<style scoped>
.topbar {
  /*width: 100%;*/
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 1000;
  /* position: relative; */
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  /* font-size: 22px; */
  /* color: #fff; */
}

.nabbar {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nab2 {
  display: flex;
  align-items: center;
  height: 80px;
}

.nab2i {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-right: 15px;
}

.arrow {
  margin-left: 15px;
}

.nab21 {
  margin-right: 10px;
}

.nab21 p:nth-child(1) {
  font-size: 16px;
  color: rgba(31, 45, 61, 1);
  height: 25px;
}

.nab21 p:nth-child(2) {
  font-size: 12px;
  color: #c0ccda;
}

.badge {
  height: 17px;
  padding: 0 6px;
  background: rgba(255, 73, 73, 1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 1);
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  z-index: 2;
  margin-left: -20px;
}
</style>
