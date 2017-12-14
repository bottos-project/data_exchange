// 登陆逻辑
var desc='';//错误提示语;
var uName='',password='';//登陆用户名，密码全局声明。
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
		}	·*/
	},
	password:function(){
		password=$('#password').val();
		/*if(!password){
			return;
			desc="请填写密码"
		}else{
			desc=""
		}*/
	},
	// 图形验证码
	imgcode:function(){
		var url='/checkimgcode';
		var data={"validataCode":$('#validataCode').val}
		$.ajax({
				type:'POST',
				contentType:'application/json;charset=utf-8',
				url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/checkimagecode?random='+Math.round(Math.random()*100),
				data:JSON.stringify(data),
				dataType:'json',
				success:function(res){
					if(res==0){
						$('.error').html('')
					}else{
						desc="验证码错误，请重新输入";
						$('.error').html(desc)
					}
				}
		})
	}



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
			$('.error').html(desc);
			return;
		}else if($('#validataCode').val == ''){
			$('.error').html('请输入验证码')
			return;
		}else{  
			//用户名或密码需非空
			desc=''
			

			var data={
				name:uName,
				passwd:password,
				verificationCode:$('#validataCode').val()
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
						
					}else if(res.returnCode==-2){
						$('.error').html('验证码错误，请重新输入')
					}else{
						$('.error').html('用户名或密码错误')
					}
				},
				complete:function(){
				},
				error:function(res){
					$('.error').html('请检查网络，稍后再试')
					// console.log(res)
				}
			})
		}
		
	});
	$('.submit_sure').click(function(){
		var username=$("#userName").val()
		// sessionStorage.setItem('login',username)
		// window.location='index.html';
	})
	$('.submit_delete').click(function(){//清空input框;
		$('input').val('');
		$('.error').html('')
	})

})










