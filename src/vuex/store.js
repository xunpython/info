import Vue from 'vue';
import Vuex from 'vuex';
import actions from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  state: {
    //模态框类型
    modalStatus: "", //this.$store.state.stateoptions;
    //模态框是否显示
    showModal: false,
    //菜单定位
    muenindex: '1',
    Token: '',
    currenRow: {}, //组件间传递值
    ifsave: true, //是否保存状态
    UserMsg: {}, //用户信息
    //台架运行状态
    stateoptions: [{
      value: '1',
      label: '性能运行',
      color: '#E5E9F2',
    }, {
      value: '2',
      label: '耐久运行',
      color: '#C0CCDA',
    }, {
      value: '3',
      label: '样件故障',
      color: '#FF9595',
    }, {
      value: '4',
      label: '设备故障',
      color: '#FF4949',
    }, {
      value: '5',
      label: '设备保养',
      color: '#F7E07C',
    }, {
      value: '6',
      label: '样件保养',
      color: '#D1FF00',
    }, {
      value: '7',
      label: '台架准备',
      color: '#3CC4FF',
    }, {
      value: '8',
      label: '台架闲置',
      color: '#13CE66',
    }, {
      value: '9',
      label: '样件延迟',
      color: '#B28EFF',
    }, {
      value: '10',
      label: '其他时间',
      color: '#F5A623',
    }, ],
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    }
  },

  mutations: { //this.$store.commit('UserMsg', true);
    //模态框状态更新，是否弹出，true是，false否
    showModal(state, showModal) {
      state.showModal = showModal;
    },
    //更新模态框类型
    updateModalStatus(state, modalStatus) {
      state.modalStatus = modalStatus;
    },

    currenRow(state, currenRow) {
      state.currenRow = currenRow;
    },

    ifsave(state, ifsave) {
      state.ifsave = ifsave;
    },

    UserMsg(state, UserMsg) {
      state.UserMsg = UserMsg;
    },
  }
});
