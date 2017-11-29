// 登陆逻辑
var login = {
	// 用户名判断
	loginName:function(){
		var uName=document.getElementById("userName").value;
		var desc='';//错误提示语;

		// 判断登陆用户是否为注册过的账户;
		var url='';
		$.get(url,{nName:uName},function(data){
			console.log(data)
		},'JSON')

	},

}

$(function(){
	$('#userName').on('blur',function(){
		login.loginName();
	});
	$('#password').on('blur',function(){

	});
	$('.submit_sure').on('click',function(){
		console.log($('#userName').val(),$('#password').val());
		$.post(url,{login:$("#userName"),password:$('#password')},function(data){


		},"JSON")
	})
})










