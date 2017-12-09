// index.js主页面逻辑
var myChart = echarts.init(document.getElementById('myChart'))
var options = {
    title: {
        text: '20天历史交易信息趋势图'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        data:['需求数量','数据资产数量','交易金额']
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: ['11/6','11/7','11/8','11/9','11/10','11/11','11/12','11/13']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}K'
        }
    },
    series: [
    	{
    		name:'需求数量',
            type:'line',
    	},
        {
            name:'数据资产数量',
            type:'line',
            data:[480, 420,600,50,300,480,496,550,400,500,300,500,400,300,500,800,500,100,800,190,200],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
           
        },
        {
            name:'交易金额',
            type:'line',
            // data:[280, 320,400,550,400,380,406,350,600,300,500,330,550,240,380,600,200,300,200,670,200],
            markPoint: {
                data: [
                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
            }
          
        }
    ]
};
myChart.setOption(options)
//模拟判断是否有登陆
if(!sessionStorage.getItem('login')){
	$('.login_form').show();
	$('.user').hide();
}else{
	
	$('.login_form').hide();
	$('.user').show();
	$('.user_preson p:first-child').html(sessionStorage.getItem('login'))
}
//取消退出登陆
$('.roll_out').click(function(){
	$('#loginout').show();
})
//确认退出登录
$('.login_s').click(function(){
	$('#loginout').hide();
	sessionStorage.clear();
	// 检测是否登陆
	if(!sessionStorage.getItem('login')){
	$('.login_form').show();
	$('.user').hide();
}else{
	
	$('.login_form').hide();
	$('.user').show();
	$('.user_preson p:first-child').html(sessionStorage.getItem('login'))
}
})
$('.login_return').click(function(){
	$('#loginout').hide();
})


//账户钱包
/*$('.shell_right').click(function(){
	$('.shell_user').show();
	$(this).hide()
})*/
$('.zh_over').click(function(){
	$(this).parent().hide();
	$('.shell_right').show();
})




// 信息概括 
//我的钱包 --添加地址
//
var account;
$('.add_return').on('click',function(){
	$('.safe_pw').val();//保护密钥
	account=$('.account_alias').val();//账户别名
	var html;
	$('.add_box').hide();

	setTimeout(function(){
		html='<li>'+
			'<span class="wallet_data1">'+account+'</span>'+
			'<span class="wallet_data2">YPNuiTewqYWBD3Lgzewq4wry348RgiRe1</span>'+
			'<span class="wallet_data3 add_wall">0</span>'+
		'</li>';
		$('.wallet_data').append(html)
		$('#mywallet').append('<option value="">'+account+'</option>');
	},2000)
})
// 转账钱包
/*$('.token_submit_add').on('click',function(){
	//时间转换方式
	//获取当前时间
	// 清空目的地址
	$('#address').val('')
	var zzje=$('#zzje').val();//转账金额
	var sy=$('.zzje').html()-zzje;
	$('.zzje').html(sy);
	$('.add_wall').html(zzje)
	$('#zzje').val('');//清空转账余额

	var time=new Date().toLocaleString();
	// var data=new Date().toLocaleString();
	// console.log(data)
	var html,html1;
	setTimeout(function(){
		html='<li>'+
			'<span class="new_all1">'+'0x5b92a3dace4bb43e1a39d3e48ea4f90d175af48d'+'</span>'+
			'<span class="new_all2">'+'0x2d178268629da47a394dad542438463c397289c7'+'</span>'+
			'<span class="new_all3">'+time+'</span>'+
			'<span class="new_all4"><i></i> <i></i>'+zzje+'</span>'+
		'</li>'
		$('.new_all').prepend(html);
		html1='<p><span class="p_span1 fl">交易号</span><span class="p_span2 fl">0x5b92a3dace4bb43e1a39d3e48ea4f90d175af48d</span></p>'+
				'<p><span class="p_span1 fl">区块</span><span class="p_span2 fl">0x140</span></p>'+
				'<p><span class="p_span1 fl">交易号</span><span class="p_span3 fl"></span><span class="p_span4 fl"></span>'+
				'<span class="p_span2 fl">'+zzje+'</span>'+
				'<span class="p_span5" style="padding:0 10px 0 10px">交易时间</span><span>'+time+'</span></p>'+
				'<p><span class="p_span1 fl">收款方:</span><span class="fl">我的账号1</span><span class="p_span1 fl">打款方:</span><span class="fl">'+account+'</span></p>'
		$('.new_exchange').html(html1)
	},10000)
	
})*/

//数据资产
//数据资产--》我的数据
// $('.')
//资产注册
/*var asset={
	submit:function(){
		//提交的参数
		var param={
			needid:$('#require').val(),//需求id
			zc1:$('#zc1 option:checked').text(),//数据资产类型
			zc2:$('#zc1 option:checked').text(),//应用领域
			zc3:$('#zc1 option:checked').text(),//数据子类
			price:$('.price').val(),//期望起始价格
			price1:$('.price1').val(),//期望截至价格
									//特殊标签
			
			require_about:$('#require_about')
		};

	 console.log(param)
	}
}*/
//数据上传
$('.select_url_submit').click(function(){
	var param={
			needid:$('#require').val(),//需求id
			zc1:$('#zc1 option:checked').text(),//数据资产类型
			zc2:$('#zc1 option:checked').text(),//应用领域
			zc3:$('#zc1 option:checked').text(),//数据子类
			price:$('.price').val(),//期望起始价格
			price1:$('.price1').val(),//期望截至价格
									//特殊标签
			
			require_about:$('#require_about')
		};
	var html='';
	html='<li>'+
			'<i></i>'+
			'<span class="data_id">'+param.needid+'</span>'+
			'<span class="data_type">大数据</span>'+
			'<span class="data_cont">'+$("#require_about").val()+'</span>'+
			'<span class="data_size">345K</span>'+
			'<span class="data_status">审核中</span>'+
			'<span class="data_time">2017.11.1</span>'+
			'<span class="data_stay">2017.11.19</span>'+
			'<span class="exchange_id">slajflsa</span>'+
		'</li>'
	// $('.date_list_i').append(html);

	//资产注册---》我的数据
	

})

$('.add_input').on('click',function(){
	// console.log(111)
	var element=document.createElement('input');
	// console.log(element)
	$('.add').append(element)
	// element.attr('class','require_price4')
})
$('.market_alert').on('click','li',function(e){
	var ev=window.e||e;
	var target=ev.target||ev.srcElement;
	if(target.nodeName.toLowerCase() == "li"){
		$('.mbody').hide();
	}
})

// 弹出框
$('.mymarket_remove').on('click',function(){
	$('.mbody').hide();
})
	
$('.market_alert li').on("click",'.buy',function(){
	$('.mbody').show();
})
//点击确认购买
var num =0;//临时存储变量
$('.mymarket_body').on('click','.mymarket_8',function(e){
	num+=1;
	var data1=new Date();
	var time=data1.toLocaleString()

	// console.log($(this).parent());
	
})
// 需求信息
$('.market1').click(function(){
	$(this).addClass('active');
	$('.market2').removeClass('active')
	$('.sel-ture').hide();$('.sel-all').hide();
	$('.alldamand').show();
	$('.mydamand').hide();
})
$('.market2').on('click',function(){
	$(this).addClass('active');
	$('.market1').removeClass('active')
	// $('.sel-ture').show();
	$('.alldamand').hide();
	$('.mydamand').show();
})
//点击需求信息---操作类型
$('.sel-ture').click(function(){
	$('.sel-ture').hide();
	$('.sel-all').show();
	$('.market_alert li i').css('display','block')
	
})
$('.sel-return').click(function(){
	$(this).parent().hide();
	$('.sel-ture').show();
})
var flag=false;
$('.if_delete').on('click','i',function(event){
	// console.log($(this).parent());
	if(!flag){
		$(this).addClass('active');
	}else{
		$(this).removeClass('active');
	}
	flag=!flag;
})
//点击删除需求
$('.sel-rubble').click(function(){
	//删除选中的需求dom
	
	$('.if_delete i.active').each(function(){
		$(this).parent().remove();
	})
})

//需求发布
var needInfo={

}




/*$('.select_url_submit').click(function(){
	asset.submit();
})*/

$('.data_goback').click(function(){
	$(this).hide();
	$('.data_rubble').hide();
	$('.data_icon').show();
})
$('.data_rubble').click(function(){

})

var flag1=false;
$('.date_list_i').on('click','i',function(event){
	// console.log($(this).parent());
	if(!flag1){
		$(this).addClass('active');
	}else{
		$(this).removeClass('active');
	}
	flag1=!flag1;
})
$('.data_rubble').click(function(){
	//删除选中的需求dom
	$('.date_list_i i.active').each(function(){
		$(this).parent().remove();
	})
})
