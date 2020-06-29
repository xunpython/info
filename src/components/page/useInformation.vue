<!-- 用户资料 -->
<template>
  <div>
    <div class="pagebox">
      <p class="titleP">用户资料</p>
      <!-- 表格菜单 -->
      <div class="elMenu">
        <el-menu :default-active="menuindex" class="el-menu-demo" mode="horizontal" background-color="#F5F7FA" text-color="#8492A6"
          active-text-color="#0165B4" @select="handleSelect">
          <el-menu-item index="1">修改资料</el-menu-item>
          <el-menu-item index="2">修改密码</el-menu-item>
        </el-menu>
        <div class="linemenu"></div>
      </div>
      <!-- 表格菜单 -->
      <modifyData v-if="menuindex=='1'"></modifyData>
      <modifyPwd v-if="menuindex=='2'"></modifyPwd>
    </div>
  </div>
</template>
<script type="text/javascript">
import modifyData from './useInformation/modifyData' //修改资料
import modifyPwd from './useInformation/modifyPwd' //修改密码
export default {
  data() {
    return {
      menuindex: this.$route.query.index.toString(),
    }
  },
  watch: {
    menuindex(o, v) {
      console.log(o)
    }

  },
  created() {

  },
  mounted() {
    this.menuindex = this.$route.query.index.toString()
  },

  methods: {

    handleSelect(key, keyPath) {
      this.menuindex = key
    },

  },
  components: {
    modifyData,
    modifyPwd
  }
}

</script>
<style scoped>
/*@import '../../../../../static/css/element_input.css';*/
.pagebox {
  padding: 20px 40px;
}

.titleP {
  font-size: 20px;
  color: rgba(31, 45, 61, 1);
}

.elMenu {
  margin-top: 10px;
  /*display: */
}

.linemenu {
  width: 100%;
  height: 1px;
  background: rgba(211, 220, 230, 1);
}

.elTable {
  margin-top: 20px;
  /*width: 100%;*/
  /*height: 690px;*/
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 20px 0;
  border: 1px solid rgba(211, 220, 230, 1);
}

.tablename {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.tablename p:nth-child(1) {
  font-size: 18px;
  color: #1f2d3d;
}

.tablename p:nth-child(2) {
  font-size: 14px;
  color: #99a9bf;
}

.tablefrom {
  /* margin-top: 40px;
  width: 70%;*/
}

.demo-ruleForm {
  margin-left: -60px;
}

.line1 {
  height: 1px;
  background: rgba(211, 220, 230, 1);
  margin-top: 20px;
}

.tablebox4 {
  height: 50px;
  border-top: 1px solid rgba(211, 220, 230, 1);
  border-bottom: 1px solid rgba(211, 220, 230, 1);
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.tablebox2 {
  display: flex;
  /*align-items: center;*/
  /*justify-content: space-between;*/
  flex-wrap: wrap;
}

.tablebox3 {
  width: 50%;
  border-bottom: 1px solid rgba(211, 220, 230, 1);
  height: 50px;
  display: flex;
  align-items: center;
}

.tablebox6 {
  height: 136px;
  border-bottom: 1px solid rgba(211, 220, 230, 1);
  display: flex;
  /*align-items: center;*/
  color: #8492a6;
  font-size: 16px;
  padding: 14px 20px;
}

.tablebox6 .control-form {
  margin-left: 97px;
}

.creattime {
  color: #1f2d3d;
  font-size: 14px;
  margin-left: 20px;
}

.xinxibox {
  height: 30px;
  /*width: 160px;*/
  color: #8492a6;
  padding-left: 20px;
  font-size: 16px;
  line-height: 30px;
  /*margin-left: -2px;*/
  border-right: 1px solid #d3dce6;
  border-left: 1px solid #d3dce6;
}

.noxinxibox {
  border-left: none;
}

.xinxibox span {
  color: #ff4949;
  font-size: 16px;
}

.el-form-item {
  margin-bottom: 0;
}

.tablebox3 >>> .el-input__inner {
  border: 1px solid #ffffff;
  font-size: 16px;
  color: #1f2d3d;
  width: 500px;
  /*padding: 0 0;*/
  /*margin-left: -10px;*/
}

.tablebox3 >>> .is-disabled .el-input__inner {
  color: #5e6d82;
}

.tablebox3 >>> .el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
}

.errinput >>> .el-input__inner {
  border-color: #f56c6c;
}

.tablebox3 >>> .el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
  border-color: #f56c6c;
}

.tablebox3 >>> .el-input__prefix {
  /*left: -25px;*/
}

.tablebox3 >>> .el-date-editor {
  /*margin-left: 20px;*/
  margin-left: -10px;
}

.longwidth {
  width: 100%;
}

.tablebox5 {
  height: 50px;
  border-bottom: 1px solid rgba(211, 220, 230, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /*margin-left: 20px;*/
}

.line2span {
  color: #1f2d3d;
  font-size: 16px;
  line-height: 50px;
  margin-left: 28px;
  /*margin-top: 10px;*/
}

.tablebox5 p {
  color: #0165b4;
  font-size: 14px;
  cursor: pointer;
}

.line2 {
  width: 120px;
  height: 4px;
  background: rgba(1, 101, 180, 1);
  /*margin-top: 10px;*/
}

.el-icon-plus {
  cursor: pointer;
}

.uploadbox {
  margin-bottom: 20px;
  width: 120px;
  height: 120px;
  background: rgb(251, 253, 255);
  border: 1px solid #d3dce6;
  text-align: center;
  line-height: 120px;
  border-radius: 60px;
}

.uploadboxno {
  border: none !important;
  background: #ffffff !important;
}

.tablebox3 >>> .el-select {
  display: inline-block;
  /*position: fixed; */
  /*width: 400px;*/
}
</style>
