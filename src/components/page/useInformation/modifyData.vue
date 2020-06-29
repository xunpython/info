<!--修改资料  -->
<template>
  <div>
    <div class="elMenu">
      <div class="elTable" v-loading="loading" element-loading-text="数据处理中" element-loading-background="rgba(0, 0, 0, 0.5)">
        <div class="tablebox1" style="margin-left: 20px;">
          <el-button icon="el-icon-back" @click="canceladd">返回</el-button>
          <el-button type="primary" icon="el-icon-document-checked" @click="submitForm('ruleForm')">保存</el-button>
        </div>
        <div class="tablebox4">
          <p class="creattime">创建于 {{nowdate}}</p>
        </div>
        <!-- 头像 -->
        <div class="tablebox6">
          <div class="userimg">用户头像</div>
          <div class="control-form">
            <ul class="upload-imgs">
              <div class="uploadbox" v-bind:class="{uploadboxno:imgs!=null}">
                <!-- <i v-if='imgs==null' class="el-icon-plus avatar-uploader-icon"></i> -->
                <input type="file" class="upload" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg" style="width:120px;height:120px;position:absolute;top:300px;left:235px;opacity: 0" />
                <li v-for='(value, key) in imgs'>
                  <p class="img">
                    <img style="height: 120px;width:120px;border-radius:60px; " :src="getObjectURL(value)">
                  </p>
                </li>
                <img style="height: 120px;width:120px; border-radius:60px; " v-if='imgs==null' :src="ruleForm.avatar">
              </div>
            </ul>
          </div>
        </div>
        <!-- 头像 -->
        <div class="tablefrom">
          <el-form style="margin-left: 1px" :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :show-message="false">
            <div class="tablebox2">
              <!-- 修改资料 -->
              <div class="tablebox3" v-for="(item,index) in wt_mesage" :key="index" v-bind:class="{longwidth:item.allwidth}">
                <div class="xinxibox" :class="{'noxinxibox':item.position==1}">
                  <div style="width: 160px;">
                    {{item.labelname}}
                    <span v-if="item.required"> *</span>
                  </div>
                </div>
                <el-form-item :prop="item.prop" :required="item.required" :label-width="labelWidth">
                  <!-- 1 输入框  2下拉框 3日期 4单选框 5复选框 6数字 -->
                  <!-- 输入框 -->
                  <el-input v-if="item.entrytype==1" size="small" v-model="ruleForm[item.prop]" :disabled="item.disabled"></el-input>
                  <!-- 下拉框 -->
                  <el-select v-if="item.entrytype==2" v-model="ruleForm[item.prop]" placeholder="请选择">
                    <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- 时间选择器 -->
                  <el-date-picker style="margin-left: 1px;" v-if="item.entrytype==3" size="small" v-model="ruleForm[item.prop]" type="date" placeholder="选择日期">
                  </el-date-picker>
                  <!-- 单选框 -->
                  <el-radio v-if="item.entrytype==4" v-for="(item1,index1) in item.radio" :key="index1" v-model="ruleForm[item.prop]" :label="item1">{{item1}}</el-radio>
                  <!-- 复选框 -->
                  <el-checkbox-group v-if="item.entrytype==5" v-model="ruleForm[item.prop]">
                    <el-checkbox v-for="(item1,index1) in item.radio" :key="index1" v-model="ruleForm[item.prop]" :label="item1"></el-checkbox>
                  </el-checkbox-group>
                  <div v-if="item.entrytype==7">
                    <!-- <i class="el-icon-plus"></i> -->
                    <!-- {{ruleForm[item.prop]}} -->
                    <el-select v-if="ruleForm[item.prop]!=''" v-model="ruleForm[item.prop]" multiple placeholder="请选择" :style="{'width': minWidth + 'px'}">
                      <el-option v-for="item2 in item.options" :key="item2.role_ids" :label="item2.role_name" :value="item2.role_ids">
                      </el-option>
                    </el-select>
                    <img class="el-icon-plus" src="../../../../static/img/svg/el-icon-plus.svg">
                  </div>
                </el-form-item>
              </div>
              <!-- 修改资料 -->
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      labelWidth: '40px',
      //UserMsg: JSON.parse(localStorage.getItem("UserMsg")),
      loading: false,
      nowdate: '', //当前日期
      //用户信息
      wt_mesage: [{
        labelname: '用户名',
        prop: 'username',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期 4单选框 5复选框 6数字 7特制
        position: 1, //1左 2右
        disabled: true,
      }, {
        labelname: '真实姓名',
        prop: 'real_name',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期
        position: 1, //1左 2右
        disabled: false,
      }, {
        labelname: '手机号',
        prop: 'mobile',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期
        position: 1, //1左 2右
        disabled: false,
      }, {
        labelname: '电子邮箱',
        prop: 'email',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期
        position: 1, //1左 2右
        disabled: false,
      }, {
        labelname: '性别',
        prop: 'gender',
        required: true,
        allwidth: true,
        entrytype: 4, //4单选框
        radio: ["男", '女'],
        position: 1, //1左 2右
        disabled: false,
      }, {
        labelname: '用户角色',
        prop: 'role_ids',
        required: false,
        allwidth: true,
        entrytype: 1, //7 特制
        position: 1, //1左 2右
        disabled: true,
      }, ],
      //表单信息
      ruleForm: JSON.parse(JSON.stringify(this.$store.state.UserMsg)),

      imgs: null,
      imgLen: 0,
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    // console.log(this.ruleForm)
    //this.imgs = { dsa: 'http://172.168.10.100:8000/upload/userProfile/images/pictop.png' }
    this.nowdate = this.commonV.getnowdate()
  },

  methods: {
    //表单提交验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addsampleFailure()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //保存
    addsampleFailure() {
      this.loading = true
      const params = new FormData()
      params.id = this.ruleForm.id
      params.append('mobile', this.ruleForm.mobile)
      params.append('real_name', this.ruleForm.real_name)
      params.append('gender', this.ruleForm.gender)
      params.append('email', this.ruleForm.email)
      //console.log(typeof(this.ruleForm.avatar)== "string")
      if (typeof(this.ruleForm.avatar) == "string") {

      } else if (typeof(this.ruleForm.avatar) == "object") {
        params.append('avatar', this.ruleForm.avatar); //头像
      }
      this.$store.dispatch('updateusermsgData', params).then((response) => {
        this.loading = false;
        let res = response.data
        if (response.statusText === 'OK' && response.status === 200) {
          //console.log(res)
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.$store.commit('UserMsg', JSON.parse(JSON.stringify(res)))
          this.ruleForm = JSON.parse(JSON.stringify(this.$store.state.UserMsg))

        } else {
          this.loading = false;
          this.$message.error("网络错误")
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err);
        this.$message.error("网络连接错误");
      });
    },

    //返回
    canceladd() {
      this.$router.go(-1)
    },

    addImg(event) {
      //alert(111)
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      //console.log(this.fil.length)
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      //console.log(this.fil[0])
      if (this.fil[0] != undefined) {
        this.imgs = {
          dsa: this.fil[0]
        }
      }
      //console.log(this.imgs)
    },

    getObjectURL(file) {
      //console.log(file)
      this.ruleForm.avatar = file
      if (file != undefined) {
        try {
          var url = null;
          if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
          } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
          } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
          }
          return url;
        } catch (e) {
          console.log(e)
        }
      }
    },
  },
  components: {

  }
}

</script>
<style scoped>
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
  color: #1F2D3D;
}

.tablename p:nth-child(2) {
  font-size: 14px;
  color: #99A9BF;
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
  color: #8492A6;
  font-size: 16px;
  padding: 14px 20px;
}

.tablebox6 .control-form {
  margin-left: 97px;
}


.creattime {
  color: #1F2D3D;
  font-size: 14px;
  margin-left: 20px;
}

.xinxibox {
  height: 30px;
  /*width: 160px;*/
  color: #8492A6;
  padding-left: 20px;
  font-size: 16px;
  line-height: 30px;
  /*margin-left: -2px;*/
  border-right: 1px solid #D3DCE6;
  border-left: 1px solid #D3DCE6;
}

.noxinxibox {
  border-left: none;
}


.xinxibox span {
  color: #FF4949;
  font-size: 16px;
}

.el-form-item {
  margin-bottom: 0;
}

.tablebox3>>>.el-input__inner {
  border: 1px solid #ffffff;
  font-size: 16px;
  color: #1F2D3D;
  width: 500px;
  /*padding: 0 0;*/
  /*margin-left: -10px;*/
}

.tablebox3>>>.is-disabled .el-input__inner {
  color: #5E6D82;
}

.tablebox3>>>.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
}


.errinput>>>.el-input__inner {
  border-color: #F56C6C;
}

.tablebox3>>>.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
  border-color: #F56C6C;
}

.tablebox3>>>.el-input__prefix {
  /*left: -25px;*/
}

.tablebox3>>>.el-date-editor {
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
  color: #1F2D3D;
  font-size: 16px;
  line-height: 50px;
  margin-left: 28px;
  /*margin-top: 10px;*/
}

.tablebox5 p {
  color: #0165B4;
  font-size: 14px;
  cursor: pointer
}

.line2 {
  width: 120px;
  height: 4px;
  background: rgba(1, 101, 180, 1);
  /*margin-top: 10px;*/
}

.el-icon-plus {
  cursor: pointer
}


.uploadbox {
  margin-bottom: 20px;
  width: 120px;
  height: 120px;
  background: rgb(251, 253, 255);
  border: 1px solid #D3DCE6;
  text-align: center;
  line-height: 120px;
  border-radius: 60px;
}

.uploadboxno {
  border: none !important;
  background: #ffffff !important
}

.tablebox3>>>.el-select {
  display: inline-block;
  /*position: fixed; */
  /*width: 400px;*/
}

</style>
