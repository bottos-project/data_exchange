/*$.ajax({
    type: "POST",
    url: "/user/login",
    data:{"name":"wcj","passwd":"1","verificationCode":"123456"},
    beforeSend: function(request) {
        request.setRequestHeader("Test", "Chenxizhang");
    },
    success: function(result) {
        alert(result);
    }
});*/

// var DataDeal = {
//           formToJson: function (data) {
//               data=data.replace(/&/g,"\",\"");
//               data=data.replace(/=/g,"\":\"");
//               data="{\""+data+"\"}";
//               return data;
//            },
// };


var userType=0;//userType用户类型判断;
$('#select_style').on('change',function(){
	$(this).val()=='person' ? $('.company_show').hide() : $('.company_show').show();
	type=$('#select_style').find('option:selected').text()
	$(this).val()=='person' ? userType=0 : userType=1;
	console.log($(this).val());

})
console.log(userType);

	// 角色类型选中\
	// $('.resign_drigh t input[type=checkbox]').is(':checked')
	/*var groupCheckbox=$('.resign_dright input[type=checkbox]')
	for(var i=0;i<groupCheckbox;i++){
		if(groupCheckbox[i].checked){
			var val=groupCheckbox[i].value;
			alert(val)
		}
	}*/
$('.resign_dright input[type=checkbox]:checked').each(function(value,index){
	// console.log(value,index)
	// console.log($(this).value);
})
//角色类型
var regUserName,pwd;
// console.log($('#select_style option:checked').html())
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
		// var desc = "";
		var c = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[\\S]{6,}$");
		if (pwd == "") {
			desc = '请输入密码';
		} else if (pwd.length < 6) {
			desc = '密码长度不能小于6';
		} else if (pwd.length > 16) {
			desc = '密码长度不能大于16';
		} else if (!c.test(pwd)) {
			desc = "密码格式错误，密码必须大于等于6位且包含字母和数字！";
		}else{
			desc='';
		}
		return desc;
	},
	checkEmail : function(email) {
		filter = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		if (!filter.test(this.trim(email))) {
			return false;
		} else {
			return true;
		}
	},
}
// 用户注册
var register={
	// 用户名判断  
	checkRegUsername:function(){
		var regType=document.getElementById('regType').value;
		regUserName=$('#register-phone').val();
		// var regUserName=''; //用户名
		// regUserName=util.trim(document.getElementById("register-phone").value)
		// 
		// var desc='';//错误提示语
		// 使用手机号注册
		/*if(regType==0){
			regUserName=util.trim(document.getElementById("register-phone").value)
			if(regUserName.indexOf(' ') > -1){
				desc='手机号不能包含空格';
				// alert(desc)
			}else{
				if (regUserName == '') {
					desc = "请输入手机号";

				} else if (!util.checkMobile(regUserName)) {
					desc ='手机号格式不正确';
				}else{
					desc='';
				}
			}

		}*/
		/*if(!regType){
			return;
		}*/
		var url='';
		//判断手机号是否存在调用ajax。
		/*$.get(url,{regType:regType},function(data){

		},"json")*/
		$('.error').html(desc)
		// return console.log(desc);
	},
	//密码判断
	checkPassword:function(){
		pwd=util.trim(document.getElementById('register-password').value);
		desc=util.isPassword(pwd);
		if(desc!=''){

		}
		$('.error').html(desc)

	},
	//确认密码判断
	checkRePassword:function(){
		var errortip=''

		var pwd=util.trim(document.getElementById('register-password').value);
		rePwd=util.trim(document.getElementById('register-repassword').value);
		// var desc=util.isPassword(psd);
		if(pwd!=rePwd){
			desc="两次密码输入不一致"
			// console.log(errortip)
		}else{
			desc='';
		}
	
	},
	//输入手机号判断
	checkPhone:function(){
		 phone=$('#phone').val();
		if(phone.indexOf(' ') > -1){
				desc='手机号不能包含空格';
			}else{
				if (phone == '') {
					desc = "请输入手机号";

				} else if (!util.checkMobile(phone)) {
					desc ='手机号格式不正确';
				}else{
					desc=''
				}
			}
		// return console.log(desc)
	},
	//邮箱
	checkEmail:function(){
		// var email=$('#email').val();
		 email = util.trim(document.getElementById("email").value);
			if (email.indexOf(" ") > -1) {
				desc = '邮箱不能包含空格';
			} else {
				if (email == '') {
					desc = '请您输入邮箱！';
				} else if (!util.checkEmail(email)) {
					desc = '邮箱格式不正确,请重新输入';
				} else if (new RegExp("[,]", "g").test(email)) {
					desc = '含有非法字';
				} else if (email.length > 100) {
					desc = '邮箱长度应小于100个字';
				}else{
					desc = '';
				}
			}
	},
	submit:function(){
		if(desc!=''){
			return;
		}
		var data={
			"name":regUserName,
			"passwd":pwd,
			"mobile":phone,
			"email":email,	
			"userType":userType,
			"roleType":0,
			"companyName":$('#companyName').val(),
			"companyAddr":$('#companyAddr').val(),
			"orgCode":$('#orgCode').val(),
			"verificationCode":"123456"
		}
		console.log(data)
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			// url:'http://10.104.11.235:8080/user/register?random='+Math.round(Math.random()*100),
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/user/register?random='+Math.round(Math.random()*100),
			data:JSON.stringify(data),
			dataType:'json',
			beforeSend:function(){
				$('.error').html('正在注册，请耐心等待');
				$('.resign_sure').attr('disabled',true);
				$('.resign_sure').css('cursor','not-allowed');
				$('.resign_sure').addClass('active')
			},
			complete:function(){
				$('.resign_sure').removeAttr('disabled')
				$('.resign_sure').css('cursor','pointer');
				$('.resign_sure').removeClass('active')
			},
			success:function(res){
				if(res.returnCode==0){ //注册成功0
					console.log(res);
					$('.error').html('');
					sessionStorage.setItem('account',res.items[0].account);
					sessionStorage.setItem('login',regUserName);
					window.location='index.html';
				}else if(res.returnCode==11){ //用户名已存在11
					$('.error').html('用户名已存在')
					setTimeout("$('.error').html('')",3000)
					// $('.error').html('用户名已存在')
				}else{ //注册失败
					$('.error').html('注册失败，请稍后再试')
					setTimeout("$('.error').html('')",3000);
				}
			},
			error:function(res){
				$('.error').html('注册失败，请检查网络')
			}
		})

	}

};
$(function(){
	//用户名
	$('#register-phone').on('blur',function(){
		register.checkRegUsername();

	});
	// 密码
	$('#register-password').on('blur',function(){
		register.checkPassword();
		console.log(desc)
		$('.error').html(desc);

	})
	// 重新输入密码
	$('#register-repassword').on('blur',function(){
		register.checkRePassword();
		$('.error').html(desc);
	})
	//手机号
	$('#phone').on('blur',function(){
		register.checkPhone();
		$('.error').html(desc);

	})
	$('#email').on('blur',function(){
		register.checkEmail();
		$('.error').html(desc);
	});
	
	//注册
	$('.resign_sure').on('click',function(){
		register.submit();
		// var username=$("#register-phone").val()
		// sessionStorage.setItem('login',username)
		// window.location='index.html'
	})  
	// 点击确认按钮时   
	$(".user-content").keyup(function(e){
            //keyCode ===13 表示回车键
            if(e.keyCode === 13){
                register.submit()
                var username=$("#register-phone").val()
		sessionStorage.setItem('login',username)
		window.location='index.html'
            }
        });    
      $('.resign_cancel').click(function(){
      	$('.resign_body input').val('')	;
      	$('.error').html('')
      })                                                          
});











































