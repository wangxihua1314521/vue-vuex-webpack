<template>
	<div id="wrapp">
		<div id="prebar"></div>
		<div id="orderPayment" class="views" v-cloak>
	      <div class="view view-main">
	        <div class="pages">
	          <div class="page">
	            <div class="page-content">
	              <!--内容展示-->
	              <p>选择开通时长</p>
	               <div class="list-block">
				      <ul>
				        <li class="item-content">
				          <div class="item-inner">
				            <div class="item-title">产品名称</div>
				            <div class="item-after">{{param.type}}</div>
				          </div>
				        </li>
				        <li class="item-content">
				          <div class="item-inner">
				            <div class="item-title">开通时间</div>
				            <div class="item-after">{{param.month}}</div>
				          </div>
				        </li>
				        <li class="item-content">
				          <div class="item-inner">
				            <div class="item-title">应付金额</div>
				            <div class="item-after"><span><i>￥</i>{{param.amount}}</span></div>
				          </div>
				        </li>
				      </ul>
				    </div>
				    <p>选择支付方式</p>
				    <div class="list-block payMethod">
					  <ul>
					    <li>
					      <label class="label-radio item-content">
					        <input type="radio" id="zhifubao" value="zhifubao" checked="checked" v-model="param.picked">
					        <div class="item-inner">
					          <div class="item-title">
					          	<div><img style="width: 2.5rem;" src="../assets/images/img/zhifubao.png"/></div>
					          	<div class="item-title-r">
					          		<span>支付宝</span><img src="../assets/images/img/recommend.png"/>
					          		<span class="info">数亿用户都在用，安全可托付</span>
					          	</div>
					          </div>
					        </div>
					      </label>
					    </li>
					    
					    <li class="accordion-item">
					    	<div class="accordion-item-content">
						        <label class="label-radio item-content">
							        <input type="radio" id="weixin" value="weixin" v-model="param.picked">
							        <div class="item-inner">
							          <div class="item-title">
							          	<div><img style="width: 2.5rem;" src="../assets/images/img/weixin.png"/></div>
							          	<div class="item-title-r">
							          		<span>微信支付</span>
							          		<span class="info">使用微信支付，安全便捷</span>
							          	</div>
							          </div>
							        </div>
							    </label>
						    </div>
					    	<a href="#" class="item-content item-link">
						        <div class="item-inner">
						           <div class="item-title">更多支付方式</div>
						        </div>
					    	</a>
					      
					    </li>
					  </ul>
					  <p @click="payVipNext"><a href="javascript:;" class="button button-fill">确认支付</a></p>
					</div> 
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	import '@/assets/libs/jquery.min.js'
	import '@/assets/libs/framework7.min.js'
	import '@/assets/css/framework7.ios.min.css'
	import '@/assets/css/framework7.ios.colors.min.css'
	export default{
		created (){
			var url=window.location.search.substr(1).split("&");
			for(let item of url){
				if(item.indexOf("type")>-1){
					this.param.type=item.split("=")[1];   
					
				}
				if(item.indexOf("goodsTypeId")>-1){
					this.param.goodsTypeId=item.split("=")[1];
				}
				if(item.indexOf("Authorization")>-1){
					var authorization=item.split("Authorization=")[1];
					sessionStorage.setItem("user_author",authorization);
				}
				if(item.indexOf("month")>-1){
					this.param.month=item.split("=")[1];                                                                  
				}
				if(item.indexOf("amount")>-1){
					this.param.amount=item.split("=")[1];
				}
				if(item.indexOf("goodsId")>-1){
					this.param.goodsId=item.split("=")[1];
				}
				if(item.indexOf("spbill_create_ip")>-1){
					this.spbill_create_ip = item.split("=")[1];
				}
			}
			//检测机型
			this.browser = {
				versions:function(){ 
				var u = navigator.userAgent, app = navigator.appVersion; 
				console.log(u);
				return {//移动终端浏览器版本信息 
					trident: u.indexOf("Trident") > -1, //IE内核
					presto: u.indexOf("Presto") > -1, //opera内核
					webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
					gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
					iPhone: u.indexOf("iPhone") > -1 , //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf("iPad") > -1, //是否iPad
					webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
					};
				}(),
				language:(navigator.browserLanguage || navigator.language).toLowerCase()
			} 
			this.loadOrderInfo();
		},
		data(){
			return {
				isLook:false,
				param:{
					type:'',
					goodsTypeId:'',
					month:'',
					amount:'',
					picked:'zhifubao',
					goodsId:''
				},
				spbill_create_ip:''
			}
		},
		methods:{
			//数据处理
			loadOrderInfo (){
				if(this.param.type == "1"){
					this.param.type = "超级会员";
				}
				if(this.param.month == "12"){
					this.param.month = "1年"
				}else{
					this.param.month = this.param.month+"个月";
				}
			},
			//查看更多支付方式
			moreMethod (){
				this.isLook = true;
			},
			//确认支付
			payVipNext (){
				if(this.param.picked == "weixin"){
					this.pay_weixin();
				}
				if(this.param.picked == "zhifubao"){
					this.pay_zhifubao();
				}
			},
			//微信支付
			pay_weixin (){
//						var url="/wechat/pay";
				var that = this;
				var amount =that.param.amount;
				amount += '';
				amount = amount.replace(/[^0-9|\.]/g, '');
				if(!/\./.test(amount)) //为整数字符串在末尾添加00  
		            amount += '00';  
		        var tmpBody = "我是谁-" + that.param.type;
		        	tmpBody = encodeURI(tmpBody);
				var paramios ={
					body : tmpBody,
					total_fee : amount,
					spbill_create_ip : that.spbill_create_ip
				};
				var paramAndro = {
					body : "我是谁-"+that.param.type,
					total_fee : amount,
					spbill_create_ip : that.spbill_create_ip
				}
				that.send_payParam(paramios,paramAndro);
//				        var callback = {
//				          	success:function(response){
//				                console.log("查询微信 支付参数 返回："+JSON.stringify(response.data.data));
//							    
//				          	}
//				        }
//				        http_mall(url,'post',param,callback);
			},
			//支付宝支付
			pay_zhifubao (){
				var that=this;
				var amount =this.param.amount;
				amount += '';
				amount = amount.replace(/[^0-9|\.]/g, '');
				if(!/\./.test(amount)) //为整数字符串在末尾添加.00  
		            amount += '.00';  
		        if(/^\./.test(amount)) //字符以.开头时,在开头添加0  
		            amount = '0' + amount;  
		        amount += '00';        //在字符串末尾补零  
		        amount = amount.match(/\d+\.\d{2}/)[0];
		        var typeIos = encodeURI(this.param.type);
				var paramios = {
					body : typeIos,
					subject : typeIos,
					total_amount :amount
				};
				var paramAndro = {
					body : that.param.type,
					subject : that.param.type,
					total_amount :amount,
				};
				that.send_payParam(paramios,paramAndro);
			},
			//支付返回值 传到ios android
			send_payParam (paramios,paramAndro){
				//判断ios android机型						
				var that = this;
				if(that.browser.versions.ios){
					window.location.href="objc://:~"+that.param.picked+":~"+JSON.stringify(paramios);
				}else if(that.browser.versions.android){
					window.player.playOk(""+that.param.picked+","+JSON.stringify(paramAndro));
				}else{
					return;
				}
			},
		}
	}
	var myApp = new Framework7();	
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #E6E6E6;
		/*font-family: "苹方";*/
		color: #000000;
		font-size: 0.9rem;
		position: relative;
	}
	#wrapp{
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	#orderPayment p{
		padding: 0 0.5rem;
		color: #666666;
	}
	#orderPayment ul:before{
		background-color:#FFFFFF;
	}
	#orderPayment ul li{
		padding-right: 1rem;
	}
	#orderPayment ul li:last-of-type .item-after span{
		color: #ff6600;
		font-size: 1rem;
	}
	#orderPayment ul li:last-of-type .item-after i{
		font-style: normal;
		font-size: 0.6rem;
	}
	[v-cloak] {
	  display: none;
	}
	#orderPayment .list-block{
		margin: 0;
		font-size: 0.9rem;
	}
	#orderPayment .list-block .item-after{
		color: #000000;
	}
	#orderPayment .list-block .item-inner{
		min-height: 4rem;
		padding-right: 0;
	}
	#orderPayment .active-state{
		background: none;
	}
	#orderPayment ul li .item-title{
		font-size: 1rem;
	}
	#orderPayment .payMethod ul li .item-title{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	#orderPayment .payMethod ul li .item-title-r {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		margin-left: 0.5rem;
		position: relative;
	}
	#orderPayment .payMethod ul li .item-title-r img{
		position: absolute;
	    width: 2.2rem;
	    left: 3.7rem;
	    top: 0.25rem;
	}
	#orderPayment .payMethod ul li .item-title-r span:last-of-type{
		color: #9c9c9c;
		font-size: 0.8rem;
		margin-top: 0.1rem;
	}
	#orderPayment .payMethod ul li .item-title-r span:first-of-type{
		font-size: 1rem;
	}
	#orderPayment label.label-radio input[type=checkbox]:checked~.item-inner, label.label-radio input[type=radio]:checked~.item-inner{
		background-image: url(../assets/images/img/selected.png);
		background-size: 20px;
	}
	#orderPayment .payMethod ul li:last-of-type a .item-inner{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		color: #9C9C9C;
	}
	#orderPayment .payMethod ul li:last-of-type label .item-inner{
		    border-bottom: 1px solid #e4e3e6;
	}
	#orderPayment label.label-radio input[type=checkbox]~.item-inner, label.label-radio input[type=radio]~.item-inner{
		background-image: url(../assets/images/img/notSeleted.png);
		background-position: calc(100% - 15px) center;
		background-repeat: no-repeat;
		background-size: 20px;
	}
	#orderPayment .list-block .item-link .item-inner{
		background-image: url(../assets/images/img/back.png);
	    background-repeat: no-repeat;
	    background-position: calc(68%) center;
	    background-size:1rem;
	}
	#orderPayment .list-block:not(.media-list) .accordion-item-expanded:not(.media-item)>.item-link .item-inner{
		background-image: url(../assets/images/img/up.png);
	}
	p .button.button-fill{
		background: #3e9dff;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size:0.8rem;
	}
	/*进度条*/
	#prebar{
		/*width: 100%;*/
		height:2px;
		background:#62b0fe;
		-webkit-animation:load 500ms ease-in;
		        animation:load 500ms ease-in;
		position: absolute;
		top:0;
		left: 0;
		z-index: 9999;
		float: left;
	}
	@-webkit-keyframes load{
		from{width: 0%;}
		to{width: 100%;}
	}
	@keyframes load{
		from{width: 0%;}
		to{width: 100%;}
	}
</style>