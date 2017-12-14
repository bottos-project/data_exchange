//   ----账户钱包-------
var name1=sessionStorage.getItem('name');//当前账户姓名;

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
		},
		//请求结束用complaste结束加载提示。
		complete:function(){
		},
		success:function(res){
			if(res.retCode==0){
				callBack(res);
			}
		},
		error:function(res){
		}
	})
}
var address,account,totalaccount;
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
		name1=sessionStorage.getItem('login');
		var html='',wallet='',mywallet='<option value="">请选择</option>',arr;
		var param={"name":name1};//参数

		
		ajax('http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/wallet/queryAccountInfo?random='+Math.round(Math.random()*100),param,null,null,function(res){
			if(res.retCode==0){
				var title=JSON.parse(res.retResult).totalTokenInfo;
				var data=JSON.parse(res.retResult).accountInfoList;
				//我的总额；res.totalTokenInfo
				for(var i=0;i<title.length;i++){
					html+='<span>总额</span><i class="fl"></i><span class="title" style="padding-left: 0;">'+title[i].totalToken+'</span>';
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
					totalaccount=data[i].accountToken;
					$('#mywallet').change(function(){
						var payshow_select=$('#mywallet').find('option:selected').text();
						if(payshow_select==arr){
							$('.address').html(account)
						}else{
							$('.address').html('')
							
						};
					})
					// 转账地址
					 address=$('#address').val();
					$('#address').on('blur',function(){
						//目的地址和转出地址不能相同
						if($('#address')==account){
							$('.token_error').html('目的地址和转出地址不能相同')
							return false;
						}else{
							$('.token_error').html('')
						}
						
					})
					

				}
				$('.wallet_data').html(wallet);//钱包信息展示
				$('#mywallet').html(mywallet);//下拉框我的钱包
			}else{
				$('.wallet_data').hide();
				$('#mywallet').html('')
			}
			
		});
	},
	// 转账
	token:function(){
		name1=sessionStorage.getItem('login');
		var param={
			'name':name1,
			"accountAlias": $('#mywallet').find('option:selected').text(),
			'account':$('.address').text(),
			'accountToken':$('#zzje').val(),
			'receiveAccount':$('#address').val()
		};
		if($('.address').text()==''){
			$('.token_error').html('请选择账户');
			$('.token_error').show();
			return false;
		}else{
			$('.token_error').html('');
		};
		//金额
			var num=$('#zzje').val();	
			if(!num){
				$('.token_error').html('请输入转账金额');
				return false;
			}else if(num<=0){
				$('.token_error').html('请输入正确的转账金额');
				return false;
			}else if(num > totalaccount){
				$('.token_error').html('没有足够转账金额');
				return false;
			}else{
				$('.token_error').html('');
			}
				
				// 转账地址长度
				address=$('#address').val();
				if(!address){
					$('.token_error').html('请输入转账地址');
					return false;
				}
				
				if($('#address').val().length){
						if($('#address').val().length==42){
							if($('#address').val().indexOf('0x')==0){//判断地址开头是否为ox;

								if($('#address').val()==account){
									$('.token_error').html('目的地址和转出地址不能相同')
									return false;
								}else{
									$('.token_error').html('');//合法的地址
								}

							}else{
								$('.token_error').html('请输入合法的转账地址');
								return false;
							}
						}else{
							$('.token_error').html('请输入合法的转账地址');
							return false;
						}
					}else{
						$('.token_error').html('请输入转账地址');
						return false;
					};
				
		$.ajax({
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/wallet/transferToken?random='+Math.round(Math.random()*100),
			contentType:'application/json;charset=utf-8',
			data:JSON.stringify(param),
			type:'post',
			dataType:'JSON',
			beforeSend:function(){
				$('.token_error').html('转账已提交,请稍后...');
				$('.token_error').show();
				$('.token_submit_add').attr({disabled:"disabled"});
				$('.token_submit_add').css('cursor','not-allowed');
				// 禁用其他input
				$('.token_left input').attr({disabled:"disabled"})
				$('.token_left select').attr({disabled:"disabled"})
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
					$('.token_error').html('转账成功')
					$('.token_error').show();
					setTimeout('$(".token_error").html("")',3000);
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
				$('.token_left input').removeAttr('disabled');
				$('.token_left select').removeAttr('disabled');
				setTimeout("$('.token_error').html('')",3000);
			},
			error:function(){
				$('.token_submit_add').removeAttr('disabled');

			}
		})
	
		
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
		// console.log(res);
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
	// wallet.payinfo()
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
