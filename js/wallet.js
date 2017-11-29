//   ----账户钱包-------
var name=sessionStorage.getItem('name');//当前账户姓名;
function ajax(url,param,type,dataType,callBack){
	var html='';
	var type=type || 'post';
	var dataType=dataType || 'JSON';
	$.ajax({
		url:url+'?random='+Math.round(Math.random()*100),
		contentType:'application/json;charset=utf-8',
		data:JSON.stringify(param),
		type:type,
		dataType:dataType,
		beforeSend:function(){
			//开始发送数据时在页面正在显示加载动画
			// before();
			
			// $('.token_submit_add').css('background','#f3f3f3')
		},
		//请求结束用complaste结束加载提示。
		complete:function(){
			// compl();
		},
		success:function(res){
			if(res.retCode==0){
				callBack(res);
			}
		},
		error:function(res){
			// console.log(1,res);
		}
	})
}
var wallet={
	// 添加钱包
	add:function(){
		$('.add_box').show();
	},
	// 返回
	goback:function(){
		$('.add_box').hide();
	},
	//显示账户钱包信息
	payinfo:function(){
		//钱包总额；
		var html='',wallet='',mywallet='<option value="">请选择</option>',arr,account;
		var param={"name":name};//参数

		
		ajax('http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/wallet/queryAccountInfo?random='+Math.round(Math.random()*100),param,null,null,function(res){
			console.log(res);
			var title=JSON.parse(res.retResult).totalTokenInfo;
			var data=JSON.parse(res.retResult).accountInfoList;
			//我的总额；res.totalTokenInfo
			for(var i=0;i<title.length;i++){
				html+='<span>总额</span><i class="fl"></i><span class="title" style="padding-left: 0;">'+title[i].totalToken;
			}
			$('.wallet_shell_header .shell_left').html(html);//渲染我的账户余额
			//钱包账户展示
			for(var i=0;i<data.length;i++){
				wallet+=`<li>
							<span class="wallet_data1">`+data[i].accountAlias+`</span>
							<span class="wallet_data2">`+data[i].account+`</span>
							<span class="wallet_data3 zzje">
								`+data[i].accountToken+`
							</span>
						</li>`;
					//下拉select列表
				mywallet+=`<option value="">`+data[i].accountAlias+`</option>`;
				arr=data[i].accountAlias;//账户信息
				account=data[i].account;//地址
				$('#mywallet').change(function(){
					var payshow_select=$('#mywallet').find('option:selected').text();
					if(payshow_select==arr){
						$('.address').html(account)
					}else{
						$('.address').html('')
						
					};
				})
			}
			$('.wallet_data').html(wallet);//钱包信息展示
			$('#mywallet').html(mywallet);//下拉框我的钱包
		});
	},
	// 转账
	token:function(){
		var param={
			'name':name,
			"accountAlias": $('#mywallet').find('option:selected').text(),
			'account':$('.address').text(),
			'accountToken':$('#zzje').val(),
			'receiveAccount':$('#address').val()
		};
		if($('.address').text()==''){
			return false;
		};
		$.ajax({
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/wallet/transferToken?random='+Math.round(Math.random()*100),
			contentType:'application/json;charset=utf-8',
			data:JSON.stringify(param),
			type:'post',
			dataType:'JSON',
			beforeSend:function(){
				$('.token_error').show();
				$('.token_error').html('转账已提交,请稍后...');
				$('.token_submit_add').attr({disabled:"disabled"});
				$('.token_submit_add').css('cursor','not-allowed');
			},
			success:function(res){
				//成功调取查询ajax记录；
				//清空转账记录
				// $('.token_submit_add').attr('disabled',false);
				$('.token_submit_add').removeAttr('disabled');
				if(res.retCode==0){
					$('.wallet_token_content').find('input').val('');
					$("#mywallet option:first").prop("selected", 'selected');
					$('.address').html('');
					wallet.payinfo();//调取总额
					// debugger;
				}else{//转账失败~
					$('.token_error').html('转账失败')
					$('.token_error').show();
					setTimeout('$(".token_error").html("")',3000)
				}
			},
			complete:function(){
				$('.token_error').html('转账成功');
				$('.token_submit_add').css('cursor','pointer');
				$('.token_submit_add').removeAttr('disabled');
				setTimeout("$('.token_error').html('')",3000);
			},
			error:function(){
				$('.token_submit_add').removeAttr('disabled');

			}
		})
		/*ajax('wallet/transferToken',param,null,null,function(){
			$('.token_error').show()
			$('.token_error').html('转账已提交,请稍后...');
			$('.token_submit_add').attr('disabled',true);
			$('.token_submit_add').css('cursor','not-allowed')
		},function(){
			$('.token_error').html('转账成功');
			$('.token_submit_add').css('cursor','pointer')
			setTimeout("$('.token_error').hide()",3000)
			$('.token_submit_add').attr('disabled',true);
		},function(res){
				//成功调取查询ajax记录；
				//清空转账记录
				$('.wallet_token_content').find('input').val('');
				$("#mywallet option:first").prop("selected", 'selected');
				$('.address').html('')
				debugger;
				// queryTransferInfo();
			
		})*/
		//获取钱包下拉列表如下
		
	}
}
//点击转账清空
$('.token_submit_delet').click(function(){
	$('.wallet_token_content').find('input').val('');
	$('#mywallet option:first').prop('selected','selected');
	$('.address').html('')
})
function queryTransferInfo(){
	var html='',htmlfirst='',time,alltime;
	var param={'name':name}
	ajax('http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/wallet/queryTransferInfo',param,null,null,function(res){
		console.log(res);
		if(res.retCode==0){
			for(var i=0;i<res.data.length;i++){
				time=Date.parse(new Date(res.data[0].transferTime)).toLocaleString();//交易时间time
				alltime=Date.parse(new Date(res.data[0].transferTime)).toLocaleString();//交易时间time
				//第一条数据最新记录
				/*htmlfirst=`<p><span class="p_span1 fl">交易号</span><span class="p_span2 fl" style="width:calc(100% - 80px)">`+res.data[i].transferID+`</span></p>
							<p><span class="p_span1 fl">交易号</span><span class="p_span3 fl"></span><span class="p_span4 fl"></span><span class="p_span2 fl">`++`</span><span class="p_span5" style="padding:0 10px 0 10px">交易时间</span><span>`+time+`</span></p>
							<p><span class="p_span1 fl">打款方:</span><span class="fl">`+res.data[i].sendRecType+`</span><span class="p_span1 fl">收款方:</span><span class="fl">`+res.data[i].tokenType+`</span></p>`
				html+=`<li>
							<span class="new_all1">`+res.data[i].payAccount+`</span>
							<span class="new_all2">`+res.data[i].receiveAccount+`</span>
							<span class="new_all3">`+alltime+`</span>
							<span class="new_all4"><i></i> <i></i>`+res.data[i].transferToken+`</span>
						</li>`*/
			}
			$('.new_exchange').html(htmlfirst);
			$('.new_all').html(new_all);
		}
	})
}
$(function(){
	wallet.payinfo()
	$('.zh_add').click(function(){
		wallet.add();
	})
	$('.add_back').click(function(){
		wallet.goback();
	})
	//转账按钮
	$('.token_submit_add').click(function(){
		wallet.token();

	})
})
