//个人表示account
var account=sessionStorage.getItem('account');
var account=sessionStorage.getItem('account');
var assetid;


var demand={
	//需求发布
	damand_select2:function(){
		
	},
	//点击需求提交
	submit:function(){
		var requireType,dataType,speciType;
		var saveTo=sessionStorage.getItem('saveData')
		//需求类型
		var require=$('#needtype').find('option:selected').val();
		var datat=$('#datatype').find('option:selected').val();
		var specit=$('#datause').find('option:selected').val();
		
		switch(require){
			case '0':requireType='DATA_RECRUITMENT';
			break;
			case '1':requireType='DATA_AUDITING';
			break;
			case '2':requireType='DATA_CLEANING';
			break;
		}
		switch(datat){
			case '0':dataType='VIDEO';
			break;
			case '1':dataType='VOICE';
			break;
			case '2':dataType='TEXT';
			break;
		}
		switch(specit){
			case '0':speciType='FACIAL_RECOGNITION';
			break;
			case '1':speciType='MACHINE_LEARNING';
			break;
			case '2':speciType='VOICE_INTERACTION';
			break;
			case '3':speciType='MACHINE_TRANSLATION';
			break;
		}
		var yxq1=Date.parse(new Date())+2505600*1000;
		if($('.yxq').val()){
			var yxq2=$('.yxq').val();
			yxq2=yxq2.replace(/-/g,'/');
			yxq1=Date.parse(new Date(yxq2));
		}
		var param={//需求类型参数；
			"actionAccount":account,
			"ownerAccount":account,
			"requirementName":$('.de_input1').val(), 
			"expirationTime":yxq1,
			"requirementType":requireType,		
			"applicationDomain":speciType,
			"dataType":dataType,
			"description":$('#textarea').val(),
			"specifications":$('#datasize').val(),
			"bidMoney":$('.de_input2').val(),
			"dataSampleRef":saveTo, 
			"dataSample1":saveTo, 
			"dataSample2":"cj2", 
			"dataSample3":"cj3"
		}
	// console.log(param)
	var html='',html1='';
	$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/publish?random='+Math.round(Math.random()*100),
			data:JSON.stringify(param),
			dataType:'json',
			beforeSend:function(){
				$('.success_buy').show();
				$('.success_buy p').html('正在发布需求...');
				$('.submit-info').attr('disabled',true);
				$('.submit-info').css('cursor','not-allowed')
			},
			complete:function(){
				$('.success_buy p').html('发布需求成功')
				setTimeout("$('.success_buy').hide()",2000)
				$('.submit-info').attr('disabled',false);
				$('.submit-info').css('cursor','pointer')
			},
			success:function(res){
				if(res.retCode==0){
					//成功后清空发布需求的input内容。
					$('.deploy_top').find('input').val('');
					$('.deploy textarea').val('');
					demand.market1();//成功之后重新渲染市场需求和我的需求。
					demand.market2();
					// 选择需求信息
					$('.damand_content').show()
					$('.deploy').hide();
					// 移除样式
					$('.damand_select1').addClass('active');
					$('.damand_select2').removeClass('active')
					$('.need-in').show();
					$('.success_buy').hide();//隐藏提示信息
				}else if(res.retCode==-2){
					$('.success_buy p').html('网络超时，请稍后再试')
					$('.success_buy').show();
					setTimeout("$('.success_buy').hide()",3000)

				}else{
					$('.success_buy').show();
					$('.success_buy p').html('发布需求失败！')
					setTimeout("$('.success_buy').hide()",2000)
				}
			},
			error:function(res){
				console.log(res)
			}
		})
		$('.market_add').append(html);
		$('.if_delete').append(html1);
	},
	//我的需求
	market2:function(){
		var url='http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/queryMine';
		var param={"actionAccount":account,//我的需求参数
			"ownerAccount":account,
			"requirementName":"",
			"expirationTime":0,
			"requirementType":"",
			"applicationDomain":"",
			"dataType":"",
			"description":"",
			"specifications":"",
			"bidMoney":0,
			"dataSampleRef":"", 
			"dataSample1":"", 
			"dataSample2":"", 
			"dataSample3":"",
			"requirementID":""
			}
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:url+'?random='+Math.round(Math.random()*100),
			data:JSON.stringify(param),
			dataType:'json',
			success:function(res){
				if(res.retCode==0){
					var html='',status,time,zjtime,applicat,aa='lllwerojjfs';
					var requ='';
					var data=JSON.parse(res.retResult);
					// console.log(data);
					for(var i=0;i<data.items.length;i++){
						//状态判断
						switch(data.items[i].status){
							case 0:status='有效';break;
							case 1:status='无效';break;
							// case 2:status='完成交易';break;
							// case 3:status='空';break;
						};
						// 领域
						switch(data.items[i].applicationDomain){
							case 'FACIAL_RECOGNITION':applicat='人脸识别';
							break;
							case 'MACHINE_LEARNING':applicat='机器语言';
							break;
							case 'VOICE_INTERACTION':applicat='智能语音交互';
							break;
							case 'MACHINE_TRANSLATION':applicat='机器翻译';
							break;
						}
						//时间戳转换为yy-mm-dd时间
						time=new Date(data.items[i].publishedTimename).toLocaleDateString();
						zjtime=new Date(data.items[i].expirationTime).toLocaleDateString();
						requ=data.items[i].dataRequirementID;

						html+='<li><i></i>'+
									'<span class="market_id">'+requ+'</span>'+
									'<span class="hidden">'+requ+'</span>'+
									'<span class="market_type">'+applicat+'</span>'+
									'<span class="market_cont">'+data.items[i].description+'</span>'+
									'<span class="market_size">'+data.items[i].specifications+'<i></i></span>'+
									'<span class="market_status"><i></i>'+data.items[i].bidMoney+'</span>'+
									'<span class="market_stay">'+data.items[i].collectionNum+'人提交<i></i></span>'+
									'<span class="minchange_id">'+time+'<i></i></span>'+
									'<span class="mexchange_id">'+zjtime+'<i></i></span>'+
									'<a class="buy" onclick="buy(this,\''+requ+'\')"></a>'+
								'</li>';
							
					};
					$('.if_delete').html(html);	
				}
			},
			error:function(res){
				console.log(res);
			}
		})
	},
	//市场需求
	market1:function(){
		//所有市场查询
		var url="http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/queryMarket";
		var param={
			"actionAccount":account,
			"ownerAccount":account,
			"requirementName":"", 
			"expirationTime":"",
			"requirementType":"",
			"applicationDomain":"",
			"dataType":"",
			"description":"",
			"specifications":"",
			"bidMoney":0,
			"dataSampleRef":"", 
			"dataSample1":"", 
			"dataSample2":"", 
			"dataSample3":"",
			"requirementID":""
		}
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:url+'?random='+Math.round(Math.random()*100),
			data:JSON.stringify(param),
			dataType:'json',
			success:function(res){
				// console.log(res)
				
				var html='';
				if(res.retCode==0){
					var data=JSON.parse(res.retResult).items;
					var dataSample='';
					console.log(data)
					var commonTime,expireationTime;
					var applica,applicationDomain;//应用领域
					// debugger;
					for(var i=0;i<data.length;i++){
						var unixTimestamp=new Date(data[i].publishedTimename);
						dataSample=data[i].dataSample1;
						commonTime=unixTimestamp.toLocaleDateString();
						// debugger;
						applica=data[i].applicationDomain;
						switch(applica){
							case 'FACIAL_RECOGNITION':applicationDomain='人脸识别';
							break;
							case 'MACHINE_LEARNING':applicationDomain='机器语言';
							break;
							case 'VOICE_INTERACTION':applicationDomain='智能语音交互';
							break;
							case 'MACHINE_TRANSLATION':applicationDomain='机器翻译';
							break;
						}
						var nonce=new Date(data[i].expirationTime);
						expireationTime=nonce.toLocaleDateString();
						html+='<li>'+
								'<span class="market_id">'+data[i].dataRequirementID+'</span>'+
								'<span class="hidden" style="display:none;">'+data[i].dataRequirementID+'</span>'+
								'<span class="market_type">'+applicationDomain+'</span>'+
								'<span class="market_cont">'+data[i].description+'</span>'+
								'<span class="market_size">'+data[i].specifications+'<i></i></span>'+
								'<span class="market_status"><i></i>'+data[i].bidMoney+'</span>'+
								'<!-- <span class="market_time">具体信息<i></i></span> -->'+
								'<span class="market_stay">'+data[i].collectionNum+'人提交<i></i></span>'+
								'<span class="minchange_id">'+commonTime+'<i></i></span>'+
								'<span class="mexchange_id">'+expireationTime+'<i></i></span>'+
								'<a class="xz" onclick="download1(this,\''+dataSample+'\')"></a>'+
								'<span class="gw"></span>'+
							'</li>'
					}
					// debugger;
					$('.market_add').html(html);
				}
			},
			error:function(res){
				console.log(res)
			}
		})
		



	}
}
//首次加载所有需求信息展示
// demand.market1();
//需求发布tab切换
$('.damand_select2').on('click',function(){
	demand.damand_select2();
})
//需求发布按钮----发布
$('.submit-info').on('click',function(){
	demand.submit();
})
$('.market2').click(function(){
	demand.market2();
})
$('.damand_select1').on('click',function(){
	demand.market1();
})
// 不同类型筛选
$('.search').on('click',function(){
	$('.search_show').toggle();

})
var data1={
			"actionAccount":account,
			"ownerAccount":account,
			"requirementName":"", 
			"expirationTime":"",
			"requirementType":"",
			"applicationDomain":"",
			"dataType":"",
			"description":"",
			"specifications":"",
			"bidMoney":0,
			"dataSampleRef":"", 
			"dataSample1":"", 
			"dataSample2":"", 
			"dataSample3":"",
			"requirementID":""
};

var data3={"actionAccount":account,"ownerAccount":account,"requirementName":"", "expirationTime":"","requirementType":" DATA_RECRUITMENT","applicationDomain":" ","dataType":"","description":"","specification":"","bidMoney":0,"dataSampleRef":"", "dataSample1":"", "dataSample2":"", "dataSample3":"","requirementID":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"};
var data4={"actionAccount":account,"ownerAccount":account,"requirementName":"", "expirationTime":"","requirementType":"","applicationDomain":" FACIAL_RECOGNITION ","dataType":"","description":"","specification":"","bidMoney":0,"dataSampleRef":"", "dataSample1":"", "dataSample2":"", "dataSample3":"","requirementID":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"};
var data5={"actionAccount":account,"ownerAccount":account,"requirementName":"", "expirationTime":"","requirementType":"","applicationDomain":"","dataType":"VIDEO","description":"","specification":"","bidMoney":0,"dataSampleRef":"", "dataSample1":"", "dataSample2":"", "dataSample3":"","requirementID":""};
$('.search_show').on('click','p',function(e){
	$('.search').html($(this).html())
	// debugger
	$(this).parent().hide();
	//判断何种筛选类型
	var search=$('.search').html();
	switch (search){
		case '全部需求':;
		break;
		case '需求ID':;
		break;
		case '需求领域':;
		break;
		/*case '应用领域':ajax(data4);
		break;*/
		/*case '数据类型':ajax(data5);
		break;*/
	}
	if(search=='全部需求'){
		// ajax(data1);
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/queryMarket?random='+Math.round(Math.random()*100),
			data:JSON.stringify(data1),
			dataType:'json',
			success:function(res){
				if(res.retCode==0){
					//成功后清空发布需求的input内容。
					var h=JSON.parse(res.retResult).items;
						var commonTime,expireationTime,html='',applica,applicationDomain;
						for(var i=0;i<h.length;i++){
							var unixTimestamp=new Date(h[i].publishedTimename);
							commonTime=unixTimestamp.toLocaleDateString();//截止时间
							applica=h[i].applicationDomain;
							switch(applica){
								case 'FACIAL_RECOGNITION':applicationDomain='人脸识别';
								break;
								case 'MACHINE_LEARNING':applicationDomain='机器语言';
								break;
								case 'VOICE_INTERACTION':applicationDomain='智能语音交互';
								break;
								case 'MACHINE_TRANSLATION':applicationDomain='机器翻译';
								break;
							}
							var nonce=new Date(h[i].expirationTime);
							expireationTime=nonce.toLocaleDateString();
							html+=`<li>
									<span class="market_id">`+h[i].dataRequirementID+`</span>
									<span class="hidden">`+h[i].dataRequirementID+`</span>
									<span class="market_type">`+applicationDomain+`</span>
									<span class="market_cont">`+h[i].description+`</span>
									<span class="market_size">`+h[i].specifications+`<i></i></span>
									<span class="market_status"><i></i>`+h[i].bidMoney+`</span>
									<!-- <span class="market_time">具体信息<i></i></span> -->
									<span class="market_stay">`+h[i].collectionNum+`人提交<i></i></span>
									<span class="minchange_id">`+commonTime+`<i></i></span>
									<span class="mexchange_id">`+expireationTime+`<i></i></span>
									<span class="xz"></span>
									<span class="gw"></span>
								</li>`
						}
						$('.market_add').html(html);
				};
				$('#xqid').val('');
			},
			error:function(res){
				console.log(res)
			}
		})
	}
	if(search=="需求ID"||search=="全部需求"){
		$('#xqly').hide();
		$('#xqid').show();
	}
	if(search=="应用领域"){
		$('#xqly').show();
		$('#xqid').hide();
	}
	
})
// console.log(search)
	// 筛选条件-----》应用领域
var xqlyz='FACIAL_RECOGNITION',xqly='DATA_AUDITING';
sessionStorage.setItem('xqlyz',xqlyz);
var data6={"actionAccount":account,
		"ownerAccount":account,
		"requirementName":"", 
		"expirationTime":"",
		"requirementType":'',
		"applicationDomain":sessionStorage.getItem('xqlyz'),
		"dataType":"",
		"description":"",
		"specifications":"",
		"bidMoney":0,
		"dataSampleRef":"", 
		"dataSample1":"", 
		"dataSample2":"", 
		"dataSample3":"",
		"requirementID":""
	};
$('#xqly').change(function(){
	xqly=$('#xqly').find('option:selected').val();
	switch(xqly){
				case '0':xqlyz='FACIAL_RECOGNITION';
				break;
				case '1':xqlyz='MACHINE_LEARNING';
				break;
				case '2':xqlyz='VOICE_INTERACTION';
				break;
				case '3':xqlyz='MACHINE_TRANSLATION';
				break;
	};
	// console.log(xqlyz);
	sessionStorage.setItem('xqlyz',xqlyz);
	data6={"actionAccount":account,
		"ownerAccount":account,
		"requirementName":"", 
		"expirationTime":"",
		"requirementType":'',
		"applicationDomain":sessionStorage.getItem('xqlyz'),
		"dataType":"",
		"description":"",
		"specifications":"",
		"bidMoney":0,
		"dataSampleRef":"", 
		"dataSample1":"", 
		"dataSample2":"", 
		"dataSample3":"",
		"requirementID":""
	}
})
// var get_xqlyz=sessionStorage.getItem('xqlyz');

function xqly(){
	$('#xqly').show();
	$('#xqid').hide();
}


$('.searall').on('click',function(){
	var data2={
		"actionAccount":account,
		"ownerAccount":account,
		"requirementName":"", 
		"expirationTime":"",
		"requirementType":"",
		"applicationDomain":"",
		"dataType":"",
		"description":"",
		"specifications":"",
		"bidMoney":0,
		"dataSampleRef":"", 
		"dataSample1":"", 
		"dataSample2":"", 
		"dataSample3":"",
		"requirementID":$('#xqid').val()
	};
	if($('#xqly').css('display')=="none"){
		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/queryMarket?random='+Math.round(Math.random()*100),
			data:JSON.stringify(data2),
			dataType:'json',
			success:function(res){
				var html='';
				if(res.retCode==0){
					//成功后清空发布需求的input内容。
					if(JSON.parse(res.retResult).totalNum<1){
						html='<li></li>'
					}else{

						var h=JSON.parse(res.retResult).items;
						var commonTime,expireationTime,applica,applicationDomain;
						for(var i=0;i<h.length;i++){
							var unixTimestamp=new Date(h[i].publishedTimename);
							commonTime=unixTimestamp.toLocaleDateString();
							applica=h[i].applicationDomain;//类型
							switch(applica){
								case 'FACIAL_RECOGNITION':applicationDomain='人脸识别';
								break;
								case 'MACHINE_LEARNING':applicationDomain='机器语言';
								break;
								case 'VOICE_INTERACTION':applicationDomain='智能语音交互';
								break;
								case 'MACHINE_TRANSLATION':applicationDomain='机器翻译';
								break;
							}

							var nonce=new Date(h[i].nonce);
							expireationTime=nonce.toLocaleDateString();
							html+=`<li>
									<span class="market_id">`+h[i].dataRequirementID+`</span>
									<span class="hidden">`+h[i].dataRequirementID+`</span>
									<span class="market_type">`+applicationDomain+`</span>
									<span class="market_cont">`+h[i].description+`</span>
									<span class="market_size">`+h[i].specifications+`<i></i></span>
									<span class="market_status"><i></i>`+h[i].bidMoney+`</span>
									<!-- <span class="market_time">具体信息<i></i></span> -->
									<span class="market_stay">`+h[i].collectionNum+`人提交<i></i></span>
									<span class="minchange_id">`+commonTime+`<i></i></span>
									<span class="mexchange_id">`+expireationTime+`<i></i></span>
									<span class="xz"></span>
									<span class="gw"></span>
								</li>`
						}
					}
					$('.market_add').html(html);
				};
				$('#xqid').val('');
			},
			error:function(res){
				console.log(res)
			}
		})
	}else{
		console.log(data6)

		$.ajax({
			type:'POST',
			contentType:'application/json;charset=utf-8',
			url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/queryMarket?random='+Math.round(Math.random()*100),
			data:JSON.stringify(data6),
			dataType:'json',
			success:function(res){
				console.log(res)
				if(res.retCode==0){
					//成功后清空发布需求的input内容。
						var title=JSON.parse(res.retResult).totalNum;
						var h=JSON.parse(res.retResult).items;
						var commonTime,expireationTime,html='',applica,applicationDomain;
						if(title<1){
							html=`<li>
									
								</li>`
						}else{
							for(var i=0;i<h.length;i++){
								var unixTimestamp=new Date(h[i].publishedTimename);
								commonTime=unixTimestamp.toLocaleDateString();
								applica=h[i].applicationDomain;
									switch(applica){
										case 'FACIAL_RECOGNITION':applicationDomain='人脸识别';
										break; 
										case 'MACHINE_LEARNING':applicationDomain='机器语言';
										break;
										case 'VOICE_INTERACTION':applicationDomain='智能语音交互';
										break;
										case 'MACHINE_TRANSLATION':applicationDomain='机器翻译';
										break;
									}
								var nonce=new Date(h[i].nonce);
								expireationTime=nonce.toLocaleDateString();
								html+=`<li>
										<span class="market_id">`+h[i].dataRequirementID+`</span>
										<span class="hidden">`+h[i].dataRequirementID+`</span>
										<span class="market_type">`+applicationDomain+`</span>
										<span class="market_cont">`+h[i].description+`</span>
										<span class="market_size">`+h[i].specifications+`<i></i></span>
										<span class="market_status"><i></i>`+h[i].bidMoney+`</span>
										<!-- <span class="market_time">具体信息<i></i></span> -->
										<span class="market_stay">`+h[i].collectionNum+`人提交<i></i></span>
										<span class="minchange_id">`+commonTime+`<i></i></span>
										<span class="mexchange_id">`+expireationTime+`<i></i></span>
										<span class="xz"></span>
										<span class="gw"></span>
									</li>`
							}
						}
						$('.market_add').html(html);
				}
			},
			error:function(res){
				console.log(res)
			}
		})
	}
})
//下载文件
function download1(that,sam){
	var text=$(that).parent().children().eq(0).text();
	// console.log('/download?account='+account+'?requireID='+text+'?storeID='+sam)
	$(that).attr('href','http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/download?account='+account+'&requireID='+text+'&storeID='+sam);
}
//购买信息
var _this;
var sstore='';
function buy(that,requireid){//当前this，，需求id
	console.log(that,requireid);
	var html='';
	$('.mbody').show();
	_this=that;
	/*$(that).addClass('buyback').removeClass('buy');*/
	//点击购买需求发送接口ajax
	$.ajax({
		url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/listCart/'+account+'/'+requireid,
		type:'GET',
		contentType:'application/json;charset=utf-8',
		dataType:'json',
		success:function(res){
			console.log(res)
			if(res.retCode==0){
				var data=JSON.parse(res.retResult).items,time,stat;
				if(JSON.parse(res.retResult).totalNum<1){
					html='';
				}else{
					console.log(data);
					var store='';
					for(var i=0;i<data.length;i++){
						switch(data[i].assetDataType){
							case 0:stat='音频';break;
							case 1:stat='文本';break;
							case 2:stat='视频';break;
						}
						sstore=data[i].dataAssetInfo.dataStoreID;
						time=new Date((data[i].dataAssetInfo.registerTime)*1000).toLocaleDateString();
						html+='<li>'+
							'<span class="mymarket_1">'+data[i].dataAssetInfo.owner+'</span>'+
							'<span class="mymarket_2">'+data[i].dataAssetInfo.assetID+' </span>'+
							'<span class="mymarket_3">'+stat+'</span>'+
							'<span class="mymarket_4">'+data[i].description+'</span>'+
							'<span class="mymarket_5">'+data[i].dataAssetInfo.size+'&nbsp;K</span>'+
							'<span class="mymarket_6">'+time+'</span>'+
							'<span class="mymarket_8" onclick="surebuy(this,\''+requireid+'\')">确认购买</span>'+
							'</li>';
					};
				}
				
				// 购买信息
				$('.mymarket_body').html(html);
			}
			

		},
		error:function(res){
			// debugger;
			console.log(res)
		}
	})
	// var arr=$(that).parent().children();
	
}
//确认购买
var load='';
function surebuy(that,requireid,store){
	assetid=$(that).parent().children().eq(1).text();
	load=assetid;
	$.ajax({
		url:'http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/buyAsset/'+account+'/'+requireid+'/'+assetid,
		contentType:'application/json;charset=utf-8',
		data:JSON.stringify(param),
		type:'post',
		dataType:'json',
		beforeSend:function(){
			$('.success_buy').show();
			$('.success_buy p').html('正在购买中...');
		},
		complete:function(){
			setTimeout('$(".success_buy").fadeOut()', 1500);
		},
		success:function(res){
			// 购买成功显示框;
			if(res.retCode==0){
				$('.success_buy').show();
				$(_this).addClass('buyback').removeClass('buy');
				// $('.buyback').attr('href','/download');
				$('.success_buy p').html('购买成功');
				$('.mbody').hide();
				setTimeout('$(".success_buy").fadeOut()', 1500);
				// 按钮变色
				if($(_this).has('.buyback')){
					$(_this).removeAttr('onclick');
					$(_this).attr('onclick','buyover(this,\''+requireid+'\')')
				}else{
					// $(that).bind('click');
					$(_this).attr("onclick","buy(this,\''+requ+'\')")
				}
			}else if(res.retCode==-2){
				$('.success_buy p').html('网络超时，请稍后再试');
				$('.success_buy').show();
				setTimeout('$(".success_buy").fadeOut()', 1500);
			}else{
				$('.success_buy').show();
				$('.success_buy p').html('购买失败');
				setTimeout('$(".success_buy").fadeOut()', 1500);
			}
			
			
		},
		error:function(res){
			console.log(res)
		}
	})
}
//我的需求购买后可下载。
function buyover(that,requireid,storeID){
	String.prototype.trim = function() {
  		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	var newload=load.trim();
	$(that).attr('href','http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/download?account='+account+'&requireID='+requireid+'&storeID='+sstore);
}
//我的需求-->>>>>>>>>>>>>>>>>>确认购买
/*$('.mymarket_body').on('click','.mymarket_8',function(e){
	$(this).parent().children().eq(1).text();
	console.log($(this).parent().children().eq(1).text() )
	var param={
		"account":'0xfe67c5731484b044de64a620db511dbdd44201e8',
		"requirementID":requireID,
		"assetID":$(this).parent().children().eq(1).text(),
	};
	console.log(param)
	$.ajax({
		url:'/requirement/buyAsset'+'/'+param.account+'/'+param.requirementID+'/'+param.assetID,
		contentType:'application/json;charset=utf-8',
		data:'',
		// type:type||'',
		dataType:dataType||'json',
		success:function(res){
			console.log(res)
		},
		error:function(res){
			console.log(res)
		}
	})
	debugger;

})*/

//需求ID查询 封装ajax(简易版----后期需要加动画效果)
		function ajax(param,type,dataType,callBack){
			var html='',url="http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/requirement/queryMarket";
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
					$('body').append('<div id="pload"></div>');
				},
				//请求结束用complaste结束加载提示。
				complete:function(){
					$('#pload').remove()
				},
				success:function(res){
					if(res.retCode==0){
						// callBack(res);
						var h=JSON.parse(res.retResult).items;
						var commonTime,expireationTime;
						for(var i=0;i<h.length;i++){
							var unixTimestamp=new Date(h[i].publishedTimename);
							commonTime=unixTimestamp.toLocaleString();

							var nonce=new Date(h[i].nonce);
							expireationTime=nonce.toLocaleString();
							html+=`<li>
									<span class="market_id">`+h[i].dataRequirementID+`</span>
									<span class="market_type">`+h[i].dataRequirementName+`</span>
									<span class="market_cont">`+h[i].description+`</span>
									<span class="market_size">`+h[i].specifications+`<i></i></span>
									<span class="market_status"><i></i>`+h[i].bidMoney+`</span>
									<!-- <span class="market_time">具体信息<i></i></span> -->
									<span class="market_stay">`+h[i].collectionNum+`人提交<i></i></span>
									<span class="minchange_id">`+commonTime+`<i></i></span>
									<span class="mexchange_id">`+expireationTime+`<i></i></span>
									<span class="xz"></span>
									<span class="gw"></span>
								</li>`
						}
						$('.market_add').html(html);
					}
				},
				error:function(res){
					console.log(res);
				}
			})
		}
//需求管理展现时候调取ajax
if(document.getElementById("con_content_3").style.display=='block'){
	demand.market1();
};