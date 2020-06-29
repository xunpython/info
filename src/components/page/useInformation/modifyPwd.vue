<template>
  <div>
    <div class="elMenu">
      <div class="elTable" v-loading="loading" element-loading-text="数据处理中" element-loading-background="rgba(0, 0, 0, 0.5)">
        <div class="tablebox1" style="margin-left: 20px;">
          <el-button icon="el-icon-back" @click="canceladd">返回</el-button>
          <el-button type="primary" icon="el-icon-document-checked" @click="submitForm('ruleFormpwd')">保存</el-button>
        </div>
        <div class="line1"></div>
        <div class="tablefrom">
          <el-form style="margin-left: 1px" :model="ruleFormpwd" ref="ruleFormpwd" class="demo-ruleForm" :rules="rules">
            <div class="tablebox2">
              <!-- 修改密码 -->
              <div class="tablebox3" v-for="(item,index) in changepwdM" :key="index" v-bind:class="{longwidth:item.allwidth}">
                <div class="xinxibox" :class="{'noxinxibox':item.position==1}">
                  <div style="width: 160px;">
                    {{item.labelname}}
                    <span v-if="item.required"> *</span>
                  </div>
                </div>
                <el-form-item :prop="item.prop" :required="item.required" :label-width="labelWidth">
                  <!-- 1 输入框  2下拉框 3日期 4单选框 5复选框 6数字 -->
                  <!-- 输入框 -->
                  <el-input v-if="item.entrytype==1" size="small" v-model="ruleFormpwd[item.prop]"></el-input>
                </el-form-item>
              </div>
              <!-- 修改密码 -->
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleFormpwd.confirm_pwd !== '') {
          this.$refs.ruleFormpwd.validateField('confirm_pwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleFormpwd.new_pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      rules: {
        new_pwd: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        confirm_pwd: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ],
        original_pwd: [
          { required: true, trigger: 'blur', message: '请输入原始密码' }
        ]
      },
      loading: false,
      labelWidth: '40px',
      //修改密码信息
      changepwdM: [{
        labelname: '原始密码',
        prop: 'original_pwd',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期 4单选框 5复选框 6数字 7特制
        position: 1, //1左 2右
      }, {
        labelname: '新密码',
        prop: 'new_pwd',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期 4单选框 5复选框 6数字 7特制
        position: 1, //1左 2右
      }, {
        labelname: '确认密码',
        prop: 'confirm_pwd',
        required: true,
        allwidth: true,
        entrytype: 1, //1 输入框  2下拉框 3日期 4单选框 5复选框 6数字 7特制
        position: 1, //1左 2右
      }, ],
      //表单信息
      ruleFormpwd: {
        original_pwd: '',
        new_pwd: '',
        confirm_pwd: '',
      },
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {

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
      let params = {}
      params.password = this.ruleFormpwd.original_pwd
      params.newpassword = this.ruleFormpwd.new_pwd
      params.id = this.$store.state.UserMsg.id
      this.$store.dispatch('updateusermsgData', params).then((response) => {
        this.loading = false;
        let res = response.data;
        if (response.statusText === 'OK' && response.status === 200) {
          //console.log(res)
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.$refs.ruleFormpwd.resetFields()

        } else {
          this.loading = false;
          this.$message.error("网络错误")
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err.response.data);
        this.$message.error(err.response.data.msg);
      });

    },

    //返回
    canceladd() {
      this.$router.go(-1)
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
  width: 300px;
  padding: 0 0;
  /*margin-left: -10px;*/
}

.tablebox3>>>.el-form-item__error {
  position: position;
  left: 320px;
  width: 300px;
  top: 5px;
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
