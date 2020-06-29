import ChangeLanguage from './changeLanguage.js' //引用模块进来

export default {
	//判断系统语言
	tellLan() {
		let language
		if (localStorage.getItem("languageType") == '中文') {
			language = ChangeLanguage.ChinesesLa;
			//console.log(ChangeLanguage.ChinesesLa)
		} else if (localStorage.getItem("languageType") == 'English') {
			language = ChangeLanguage.EnglishLa;
		} else {
			localStorage.setItem("languageType", "中文");
			language = ChangeLanguage.ChinesesLa;
		}
		return language
	},


}