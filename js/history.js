//历史纪录
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
						callBack(res);
						
					}
				},
				error:function(res){
					// console.log(1,res);
				}
			})
		}
var param={
	"actionAccount":account,
 	"exchangeID":"",
 	"requirementID":"",
 	"requirementOwnerAccount":account,
 	"assetOwnerAccount":account, 
  	"status":3
};
ajax('http://47.96.180.164:8080/bottosapp-0.0.1-SNAPSHOT/exchange/query',param,null,null,function(res){
	var data=JSON.parse(res.retResult).items;
	var html='',time,status;
	for(var i=0;i<data.length;i++){
		switch(data[i].status){
			case 0:status='无效';break;
			case 1:status='已提交';break;
			case 2:status='完成交易';break;
			case 3:status='空';break;
		}
		time=new Date(data[i].exchangeTime*1000).toLocaleString();
		html+=`<li>
					<span class="t_id">`+data[i].exchangeID+`</span>
					<span class="t_coin">`+data[i].amout+` </span>
					<span class="t_time">`+time+`</span>
					<span class="t_status">`+status+`</span>
					<span class="t_provide">`+data[i].secondParty+` </span>
					<span class="t_send">`+data[i].firstParty+` </span>
				</li>`
	}
	// debugger;
	$('.trans_body_ul').html(html);

})
/*if(document.getElementById("con_content_4").style.display=='block'){
	// demand.market1();
	ajax('/exchange/query',param,null,null,function(res){
	var data=JSON.parse(res.retResult).items;
	console.log(data)
	var html='',time,status;
	for(var i=0;i<data.length;i++){
		switch(data[i].status){
			case 0:status='无效';break;
			case 1:status='已提交';break;
			case 2:status='完成交易';break;
			case 3:status='空';break;
		}
		time=new Date(data[i].exchangeTime*1000).toLocaleString();
		html+=`<li>
					<span class="t_id">`+data[i].exchangeID+`</span>
					<span class="t_coin">`+data[i].amout+` </span>
					<span class="t_time">`+time+`</span>
					<span class="t_status">`+status+`</span>
					<span class="t_provide">`+data[i].firstParty+` </span>
					<span class="t_send">`+data[i].secondParty+` </span>
				</li>`
	}
	$('.trans_body_ul').html(html);

})
};*/