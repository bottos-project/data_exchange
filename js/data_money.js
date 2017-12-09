// 数据资产
//封装ajax信息
var account=sessionStorage.getItem('account')
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
		success:function(res){
			if(res.retCode==0){
				callBack(res);
			}else{
				console.log('访问失败！')
			}
		},
		error:function(res){
			console.log(1,res);
		}
	})
}
// 数据资产
var asset={
	// 注册资产
	submit:function(){
		var applicationDomain,assetType1;
		var assetType=$('#zc1').find('option:selected').val();
		var specit=$('#zc3').find('option:selected').val();
		switch(assetType){
			case '0':assetType1='VIDEO';
			break;
			case '1':assetType1='VOICE';
			break;
			case '2':assetType1='TEXT';
			break;
		}
		switch(specit){
			case '0':applicationDomain='FACIAL_RECOGNITION';
			break;
			case '1':applicationDomain='MACHINE_LEARNING';
			break;
			case '2':applicationDomain='VOICE_INTERACTION';
			break;
			case '3':applicationDomain='MACHINE_TRANSLATION';
			break;
		}
		var yxq1=Date.parse(new Date())+2*365*24*3600*1000;
		if($('.ctime').val()){
			var yxq2=$('.ctime').val();
			yxq2=yxq2.replace(/-/g,'/');
			yxq1=Date.parse(new Date(yxq2));
		}
		var param={
			"actionAccount":account,
			"ownerAccount":account,
			"dataRequirementID":$('#require').val(), 
			"expirationTime":yxq1, 
			"priceHigh":$('.price1').val(), 
			"priceLow":$('.price').val(), 
			"applicationDomain":applicationDomain,
			"assetType":assetType1,
			"subType":"0",
			"description":$('#require_about').val(),
			"dataStoreID":sessionStorage.getItem('saveData1'),
			"size":sessionStorage.getItem('size1')
		}
		$.ajax({
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/dataAsset/register?random='+Math.round(Math.random()*100),
			contentType:'application/json;charset=utf-8',
			data:JSON.stringify(param),
			type:'post',
			dataType:'json',
			beforeSend:function(){
				$('.success_buy').show();
				$('.success_buy p').html('正在注册资产中...');
				//注册成功之前禁用按钮
				$('.select_url_submit').attr('disabled',true);
			},
			complete:function(){
				setTimeout('$(".success_buy").hide()', 1500);
				$('.select_url_submit').attr('disabled',false);
			},
			success:function(res){
				if(res.retCode==0){
					$('.success_buy').hide();
					asset.allData();
					$('.data_header .data_left ').show();
					$('.data_icon ').show();
					$('.data_click ').each(function(){
						$(this).removeClass('active')
					})
					$('.mydata').addClass('active')
					$('.data_list').show();
					$('.updata_all').hide();	
				}else if(res.retCode==-2){
					$('.success_buy p').html('网络超时，请稍后再试');
					$('.success_buy').show();
					setTimeout('$(".success_buy").fadeOut()',3000);

				}else{
					$('.success_buy').show();
					$('.success_buy p').html('注册资产失败！');
				}
			}
		})
		
	},
	// 资产--我的数据
	allData:function(){
		$('.success_buy').hide();
		var param={
			"actionAccount":account,
			"owner":account,
			"requirementID":"", 
			"expirationTime":'', 
			"priceHigh":0, 
			"priceLow":0, 
			"applicationDomain":"",
			"assetID":"",
			"assetType":"",
			"subType":"0",
			"description":"",
			"dataStoreID":"",
			"dataRequirementID":""
		};
		// console.log(param)
		ajax('http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/dataAsset/query',param,null,null,function(data){
			// console.log(data);
			var html='',assetType;
			var time,jztime,status;
			var res=JSON.parse(data.retResult).items;
			var totalNum=JSON.parse(data.retResult).totalNum;
			
			//判断totalNum 是否有数据。
			if(totalNum>0){
				for(var i=0;i<res.length;i++){
					// 检测状态信息
					switch(res[i].dataAssetInfo.lastStatus){
						case 0:status='无效';break;
						case 1:status='已提交';break;
						case 2:status='完成交易';break;
						case 3:status='空';break;
					}
					switch(res[i].assetDataType){
						case 0:assetType='视频';
						break;
						case 1:assetType='音频';
						break;
						case 2:assetType='文本';
						break;
					}
					time=new Date(res[i].dataAssetInfo.registerTime*1000).toLocaleDateString();
					jztime=new Date(res[i].dataAssetInfo.expirationTime).toLocaleDateString();
					html+=`<li>
								<i></i>
								<span class="data_id">`+res[i].dataAssetInfo.assetID+`</span>
								<span class="data_type">`+assetType+`</span>
								<span class="data_cont">`+res[i].description+`</span>
								<span class="data_size">`+res[i].dataAssetInfo.size+`&nbsp;K</span>
								<span class="data_status">`+status+`</span>
								<span class="data_time">`+time+`</span>
								<span class="data_stay">`+jztime+`</span>
								<span class="exchange_id">`+res[i].dataAssetInfo.dataRequirementID+`</span>
							</li>`
				}
				$('.date_list_i').html(html);
			}
		});
	}
}
//执行函数
$(function(){
	// 注册按钮
	$('.select_url_submit').on('click',function(){
		asset.submit()//执行注册事件;
	})
	//不同筛选类型
	$('.data_goback').on('click',function(){
		$('.date_list_i').find('li i').css('display','none')
	})
	//取消数据资产注册
	$('.select_url_delete').on('click',function(){
		//清空数据资产
		$('.updata_top_content input').val('');
		$('.updata_top_content textarea').val('');
	});
	//所有数据
	$('.mydata').on('click',function(){
	})

})









