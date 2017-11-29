var desc='';
//可调用的对象函数。
var util = {
	ltrim : function(s) {
		return s.replace(/^\s*/, "");
	},

	rtrim : function(s) {
		return s.replace(/\s*$/, "");
	},

	trim : function(s) {
		return this.rtrim(this.ltrim(s));
	},
	checkNumber : function(num) {
		filter = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
		if (!filter.test(this.trim(num))) {
			return false;
		} else {
			return true;
		}
	}, 
	// 检测手机号格式是否正确
	checkMobile : function(mobile) {
		filter = /^1[3|4|5|8|7][0-9]\d{8}$/;
		if (!filter.test(this.trim(mobile))) {
			return false;
		} else {
			return true;
		}
	},
	//输入密码格式是否正确
	isPassword : function(pwd) {
		var desc = "";
		var c = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[\\S]{6,}$");
		if (pwd == "") {
			desc = '请输入密码';
		} else if (pwd.length < 6) {
			desc = '密码长度不能小于6';
		} else if (pwd.length > 16) {
			desc = '密码长度不能大于16';
		} else if (!c.test(pwd)) {
			desc = "密码格式错误，密码必须大于等于6位且包含字母和数字！";
		}
		return desc;
	},
}
// 用户注册
var register={
	// 用户名判断  
	checkRegUsername:function(){
		var regType=document.getElementById('regType').value;
		var regUserName=''; //用户名
		var desc='';//错误提示语
		// 使用手机号注册
		if(regType==0){
			regUserName=util.trim(document.getElementById("register-phone").value)
			if(regUserName.indexOf(' ') > -1){
				desc='手机号不能包含空格';
			}else{
				if (regUserName == '') {
					desc = "请输入手机号";
				} else if (!util.checkMobile(regUserName)) {
					desc ='手机号格式不正确';
				}
			}

		}
		var url='';
		//判断手机号是否存在调用ajax。
		/*$.get(url,{regType:regType},function(data){

		},"json")*/
		return console.log(desc);
	},
	//密码判断
	checkPassword:function(){
		var pwd=util.trim(document.getElementById('register-password').value);
		var desc=util.isPassword(pwd);
		if(desc!=''){

		}
		 return console.log(desc);
	},
	//确认密码判断
	checkRePassword:function(){
		var errortip=''

		var pwd=util.trim(document.getElementById('register-password').value);
		var rePwd=util.trim(document.getElementById('register-repassword').value);
		// var desc=util.isPassword(psd);
		if(pwd!=rePwd){
			errortip="两次密码输入不一致"
		}
		/*if (desc!=''){
			return util.isPassword();
		}else{

		}*/
		return console.log(errortip);
	}
	//输入手机号判断


};
$(function(){
	$('#register-phone').on('blur',function(){
		register.checkRegUsername();
	});
	$('#register-password').on('blur',function(){
		register.checkPassword();
	})
	$('#register-repassword').on('blur',function(){
		register.checkRePassword();
	})

	$('.resign_sure').on('click',function(){
		console.log(2)
	})                                                                      
});











































