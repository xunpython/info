<!-- import store from './vuex/store' -->
<script type="text/javascript">
// 定义一些公共的属性和方法

//后台服务地址
const httpUrl = 'http://127.0.0.1:8000/' //172.168.10.29:8000/           258660r2h8.wicp.vip:13968/


//系统菜单
const sysMenu = [{
  label: "统计数据",
  icon: 'setting',
  children: [
    {
    label: "企业管理",
    url: 'userManagement',
  }],
}]

function commonFun() {
  console.log("公共方法")
}



//提交数据
function submitData(params, wayname) {
  this.$store.dispatch(wayname, params).then((response) => {
    let res = response.data;
    if (response.statusText === 'OK' && response.status === 200) {
      console.log(res)
      return {
        status: 'suceess',
        msg: res
      }
    } else {
      return {
        status: 'fail',
        msg: 'fail'
      }
    }
  }).catch((err) => {
    console.log(err);
    return {
      status: 'fail',
      msg: 'fail'
    }
  });
}


//数组取某个字段叠加显示
function reverarr(arr, param) {
  let selectcode = ""
  //console.log(arr)
  if (typeof (arr) != "undefined" && arr != null) {
    for (var i = 0; i < arr.length; i++) {
      let ccc = (i == arr.length - 1) ? "" : ","
      selectcode += arr[i][param] + ccc
    }
    //console.log(selectcode)
  }
  return selectcode
}

//提取数组id转化
function deveridarrry(arr) {
  if (typeof (arr) != "undefined" && arr != null) {
    let array = []
    for (var i = 0; i < arr.length; i++) {
      array.push(parseInt(arr[i].id))
    }
    return JSON.stringify(array)
  } else {
    return []
  }
}

//日期格式转化
function verdate(timew) {
  //console.log(timew)
  var char = "-";
  var date = new Date(timew)
  var day = date.getDate();
  var month = date.getMonth() + 1; //注意月份需要+1
  var year = date.getFullYear();
  //补全0，并拼接
  var currentdate = year + char + (month < 10 ? "0" + month : month) + char + (day < 10 ? "0" + day : day);
  return currentdate
}
//获取前后日期
function getDay(day, datec = new Date()) {
  //Date()返回当日的日期和时间。
  var days = new Date(datec);
  //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
  var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
  //setTime()以毫秒设置 Date 对象。
  days.setTime(gettimes);
  var year = days.getFullYear();
  var month = days.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var today = days.getDate();
  if (today < 10) {
    today = "0" + today;
  }
  return year + "-" + month + "-" + today;
}

//日期格式化
function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}


//url地址取文件名字
//文件格式转化
function varfile(url) {
  //console.log(url)
  if (url != null) {
    let vnskja = url.slice(url.lastIndexOf("/") + 1, url.length)
    //console.log(vnskja)
    //console.log(decodeURIComponent(vnskja))
    return decodeURIComponent(vnskja)
  } else {
    return ""
  }
}


//获取当前年月日
function getnowdate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var currentdate = year + '年' + month + '月' + strDate + '日';
  return currentdate;
}

// 暴露出这些属性和方法
export default {
  httpUrl,
  sysMenu,
  commonFun,
  submitData,
  reverarr,
  deveridarrry,
  verdate,
  getDay,
  varfile,
  getnowdate,
  formatDate
}

</script>
