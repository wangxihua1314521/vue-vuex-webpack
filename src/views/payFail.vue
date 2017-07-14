<template>
	<div id="payFail">
		<img src="../assets/images/img/failure(1).png"/>
		<p><span> 支付失败，请重新支付</span></p>
		<!--<p class="fail-info">点击"返回"重新支付或者点击"取消"取消订单</p>-->
		<!--<p class="two-btn">
		<a href="#" class="button button-raised button-fill color-blue ripple-green" @click="repay">返回</a>
		<a href="#" class="button button-raised button-fill color-blue ripple-green" @click="cancel">取消</a>
		</p>-->
   </div>
</template>
<script>
	import '../assets/css/toast.css'
	import '../assets/libs/toast.js'
	import '@/assets/css/framework7.ios.min.css'
	import '@/assets/css/framework7.ios.colors.min.css'
	export default {
		ready:function(){
	//					var url=window.location.search.substr(1).split("&");
	//					for(item in url){
	//						if(url[item].indexOf("Authorization")>-1){
	//							var authorization=url[item].split("Authorization=")[1];
	//						}
	//					}
	//					sessionStorage.setItem("user_author",authorization);
			//检测机型
			this.browser = {
				versions:function(){ 
				var u = navigator.userAgent, app = navigator.appVersion; 
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
		},
		data:{
	//					authorization:""
		},
		methods:{
			repay:function(){
				//判断ios android机型
				var that=this;
				if(that.browser.versions.ios){
					window.location.href="objc://:~repay";
														
				}else if(that.browser.versions.android){
					window.player.playOk('repay');
				}else{
					return;
				}
			},
			cancel:function(){
				var that=this;
				var url="";
		        var callback = {
		          	success:function(response){
		                console.log("取消订单 返回："+JSON.stringify(response.data.data));
		                //判断ios android机型
	//								if(that.browser.versions.ios){
	//									window.location.href="objc://:~cancel";
	//																		
	//								}else if(that.browser.versions.android){
	//									window.player.playOk('cancel');
	//								}else{
	//									return;
	//								}
		            }
		        }
		        http_mall(url,'get','',callback);
			},
		}
	}
	var myApp = new Framework7();
	var toast = myApp.toast('', '<div style="font-size:0.9rem;padding:2rem 0;">订单取消成功</div>', {})
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #FFFFFF;
		color: #000000;
		font-size: 0.9rem;
	}
	#payFail{
		text-align: center;
		padding-top: 5rem;
	}
	#payFail p:first-of-type{
		padding: 0 1rem;
		margin:0.5rem 0;
		font-size: 1rem;
	}
	#payFail p.fail-info{
		font-size: 0.8rem;
		padding: 4px 1rem;
		margin:0.5rem 0;
		color: #9E9E9E;
	}
	#payFail p.two-btn{
		display: flex;
	    justify-content: space-around;
	    width: 225px;
	    margin: 0 auto;
	    margin-top: 2rem;
	}
	.two-btn a{
		width: 60px;
	}
	#payFail img{
		width: 3rem;
	}
	.button.button-fill.color-blue{
		background: #2c91ff;
	}
</style>