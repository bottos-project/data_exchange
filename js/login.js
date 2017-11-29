// 登陆逻辑
var desc='';//错误提示语;
var uName,password;//登陆用户名，密码全局声明。
var login = {
	// 用户名判断
	loginName:function(){
		uName=document.getElementById("userName").value;

		// 判断登陆用户是否为注册过的账户;
		/*var url='';
		$.get('json.json',{nName:uName},function(data){
			console.log(data)
		},'JSON')*/
		/*if(uName==''){
			desc="请填写用户名";
			return false;
		}else{
			desc=''
		}*/
	},
	password:function(){
		password=$('#password').val();
		/*if(!password){
			return;
			desc="请填写密码"
		}else{
			desc=""
		}*/
	}
	// 图形验证码

}

/*$.post('/user/login',data,function(res){
			console.log(res);
},'json')*/
$(function(){
	$('#userName').on('blur',function(){
		login.loginName();
	});
	$('#password').on('blur',function(){
		login.password();
	});
	$('.submit_sure').on('click',function(){
		if(uName==''||password==''){
			desc='请填写用户名或密码';
			return;
		}else{
			desc=''
		}
		$('.error').html(desc);
		var data={
			name:uName,
			passwd:password,
			verificationCode:$('.verificationCodes').html()
		}
		//登陆ajax接口.
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/user/login?random='+Math.round(Math.random()*100),
			data:JSON.stringify(data),
			dataType:'json',
			beforeSend:function(){
				$('.error').html('正在登录中...')
			},
			success:function(res){
				if(res.returnCode==0){
					$('.error').html('');
					// console.log(res);
					sessionStorage.setItem('name',res.items[0].name);
					sessionStorage.setItem('account',res.items[0].account)
					sessionStorage.setItem('login',uName);
					window.location='index.html';
					
				}else{
					$('.error').html('用户名或密码错误')
					// console.log('用户名或密码错误')
				}
			},
			complete:function(){
				// $('.error').html('')
			},
			error:function(res){
				$('.error').html('请检查网络，稍后再试')
				console.log(res)
			}
		})
		// $.post(url,{login:$("#userName"),password:$('#password')},function(data){


		// },"JSON")
	});
	$('.submit_sure').click(function(){
		var username=$("#userName").val()
		// sessionStorage.setItem('login',username)
		// window.location='index.html';
	})
	$('.submit_delete').click(function(){//清空input框;
		$('input').val('')
	})

})










