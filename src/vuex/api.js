import Vue from 'vue';
import axios from 'axios';
import store from './store';
import {
  MessageBox
} from 'element-ui';
import commom from "../../commonFunction/common.vue"

//console.log(store)
let token = ''
//添加请求拦截器
axios.interceptors.request.use(
  config => {
    //在发送请求之前做些什么
    token = localStorage.getItem("Token")
    //console.log(token)
    if (token != '') { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    //对响应错误做什么
    //console.log(err)
    return Promise.reject(err);
  })

//添加响应拦截器
axios.interceptors.response.use(
  response => {
    //console.log(111)
    return response
  },
  error => {
    console.log(error)
    if (error.response.status == 401) {
      //console.log(error.response.status)
      MessageBox.alert('登录信息超时，请重新登录！', '登录超时', {
        confirmButtonText: '跳转登录页面',
        callback: action => {
          window.location.href = '/'
        }
      })
    }
    return Promise.reject(error)
  }
)


let urltit = commom.httpUrl + 'api/'

export default {
  upload_file({
    commit,
    state
  }, params) {
    return axios({
      //url: urltitle + '/Mesapp/test',
      url: "https://192.168.22.122:8001/websocketD/upload_file/",
      method: 'post',
      data: params,
    });
  },

  umppWorkOrder({
    commit,
    state
  }, params) {
    return axios({
      //url: urltitle + '/Mesapp/test',
      url: "http://127.0.0.1:8000/umppWorkOrder/",
      method: 'post',
      data: params,
    });
  },


  //登录
  postUpdateIsLogin({
    commit,
    state
  }, params) {
    return axios({
      //url: urltitle + '/Mesapp/test',
      url: urltit + "login/",
      method: 'post',
      data: params,
    });
  },

  //忘记密码
  resetUser({
    commit,
    state
  }, params) {
    return axios({
      url: urltit + "resetUser/",
      method: 'post',
      data: params,
    });
  },


  //修改密码
  modifyUserPassword({
    commit,
    state
  }, params) {
    return axios({
      url: urltit + "modifyUserPassword/",
      method: 'post',
      data: params,
    });
  },


  //put 修改密码  delete 删除
  userProfilelist({
    commit,
    state
  }, params) {
    return axios({
      //url: urltitle + '/Mesapp/test',
      url: urltit + "userProfile/list/" + params.id + '/',
      method: params.method,
      data: params,
    });
  },







 

  /*用户管理*/
  //查
  usermsgData({
    commit,
    state
  }, params) {
    return axios({
      url: urltit + "commy/",
      method: 'get',
      params: params,
    });
  },
  //增
  addusermsgData({
    commit,
    state
  }, params) {
    return axios({
      url: urltit + "commy/",
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  //改
  updateusermsgData({
    commit,
    state
  }, params) {
    return axios({
      url: urltit + "commy/" + params.id + '/',
      method: 'put',
      data: params,
    });
  },

 
}
