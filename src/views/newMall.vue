<template>
<div id="wrapp">
	<div id="prebar"></div>
	<div class="views" id="shopMall">
		<div class="view view-main">
			<div class="pages">
				<div class="page">
					<div class="page-content">
						<!--内容展示-->
             			 <!--我的钱包-->
			            <div class="walletInfo">
			              	<p>我的钱包</p>
		                	<ul class="wallet">
		                		<li><div class="v-img"><img src="../assets/images/img/recharge.png"/></div><span>充值</span></li>
		                		<li><div class="v-img"><img src="../assets/images/img/wallet.png"/></div><span>零钱</span><span class="margin-t-10">￥20.00</span></li>
		                		<li><div class="v-img"><img src="../assets/images/img/depositors.png"/></div><span>提现</span></li>
		                	</ul>
			            </div>
			            <div class="walletInfo">
			              	<p>选择产品</p>
		              		<div class="">
						        <div class="buttons-row">
						            <a href="#tab1" class="tab-link active">适用型</a>
						            <a href="#tab2" class="tab-link">功能型</a>
						            <a href="#tab3" class="tab-link">全能型</a>
						        </div>
						    </div>
					        <div class="tabs">
					        	<!--适用型-->
					            <div id="tab1" class="tab active">
					                <div class="open-vip">
					                	<div class="vip-left">
					                		<div class="vl-right">
					                			<div class="price"><span class="orange">60元/年</span><span><s>90元/年</s></span></div>
					                			<span>开通年费更优惠</span>
					                		</div>
					                	</div>
					                	<div class="vip-right">
					                		<img src="../assets/images/img/open-vip.png"/>
					                	</div>
					                </div>
					                <div class="vip-list">
					                	 <div class="crown">
						                	<img src="../assets/images/img/crown-perks.png"/>
						                </div>
					                	<ul>
					                		<li><div class="v-img"><img src="../assets/images/img/touxiang.png"/></div><span>终身头像使用权</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/huiyuan.png"/></div><span>尊贵会员成就图标</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/200m.png"/></div><span>赠送存储空间200M</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/xunzhao.png"/></div><span>族谱查找优先权</span></li>
					                	</ul>
					                </div>
					            </div>
					            <!--功能型-->
					            <div id="tab2" class="tab">
					                <div class="open-vip">
					                	<div class="vip-left">
					                		<div class="vl-right">
					                			<div class="price"><span class="orange">70元/年</span><span><s>90元/年</s></span></div>
					                			<span>开通年费更优惠</span>
					                		</div>
					                	</div>
					                	<div class="vip-right">
					                		<img src="../assets/images/img/open-vip.png"/>
					                	</div>
					                </div>
					                <div class="vip-list">
					                	<div class="crown">
						                	<img src="../assets/images/img/crown-perks.png"/>
						                </div>
					                	<ul>
					                		<li><div class="v-img"><img src="../assets/images/img/touxiang.png"/></div><span>终身头像使用权</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/huiyuan.png"/></div><span>尊贵会员成就图标</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/500m.png"/></div><span>赠送存储空间500M</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/xunzhao.png"/></div><span>族谱查找优先权</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/quanxian.png"/></div><span>创建圈子权限</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/renmai.png"/></div><span>添加人脉权限</span></li>
					                	</ul>
					                </div>
					            </div>
					            <!--全能型-->
					            <div id="tab3" class="tab">
					                <div class="open-vip">
					                	<div class="vip-left">
					                		<div class="vl-right">
					                			<div class="price"><span class="orange">80元/年</span><span><s>90元/年</s></span></div>
					                			<span>开通年费更优惠</span>
					                		</div>
					                	</div>
					                	<div class="vip-right">
					                		<img src="../assets/images/img/open-vip.png"/>
					                	</div>
					                </div>
					                <div class="vip-list">
					                	 <div class="crown">
						                	<img src="../assets/images/img/crown-perks.png"/>
						                </div>
					                	<ul>
					                		<li><div class="v-img"><img src="../assets/images/img/touxiang.png"/></div><span>终身头像使用权</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/huiyuan.png"/></div><span>尊贵会员成就图标</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/1g.png"/></div><span>赠送存储空间1G</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/xunzhao.png"/></div><span>族谱查找优先权</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/renmai.png"/></div><span>添加人脉权限</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/quanxian.png"/></div><span>创建圈子权限</span></li>
					                		<li><div class="v-img"><img src="../assets/images/img/huodong.png"/></div><span>受邀线下宗亲活动</span></li>
					                		
					                	</ul>
					                </div>
					            </div>
					        </div>
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
		ready: function(){
			//测试 http://127.0.0.1:8020/hxgm-web-rebuild/template/app/newMall.html?Authorization=M2RkNmVhMDEtNTAwYi00OWMyLThiYjItNzA0ZjIxZjc0ZThlQDE6OGJkZWQyYmRiY2E0N2U4MzFhZTFiMmNhMGQ3YzcwYTk=
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("Authorization")>-1){
					var authorization=url[item].split("Authorization=")[1];
				}
			}
			sessionStorage.setItem("user_author",authorization);
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
			this.login();
			this.queryMall();
		},
		methods:{
			login (){
				sendAjax('', '/login', 'post', this.loginParam, res => {
            	// 登录成功
		        console.log('登录成功')
		        const result = res.data.data
		        this.$store.commit('loginSuccess', {
		          auth: result.authorization,
		          userInfo: result.user
		        })
		        this.$router.push('/')
		      },
		      error => {
		        // 登录失败
		        console.log(error)
		        this.errorMsg = error.data.msg || ''
		      })
			},
			queryMall (){
//						var url = "";
//						var that =this;
//						var param = {};
//						var callback = function(){
//							console.log("查询数据返回")
//							console.log(response)
//						}
//						http_mall(url, 'get', param, callback)
			},
		}
	}
	var myApp = new Framework7();
</script>
<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #E6E6E6;
		font-family: "苹方";
		color: #000000;
		font-size: 0.9rem;
		position: relative;
	}
	#wrapp{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	#shopMall p{
		padding: 0 1rem;
		margin:0.5rem 0;
		color: #666666;
	}
	.wallet{
		width: 100%;
		height: 6rem;
		background: #4593eb;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		color: #FFFFFF;
		padding: 2.5rem 0;
	}
	#shopMall .vip-list{
		background: #FFFFFF;
		padding: 0.5rem 0;
	}
	#shopMall  ul{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	    -ms-flex-wrap: wrap;
	        flex-wrap: wrap;
	    overflow: hidden;
	    list-style: none;
	}
	#shopMall ul li{
		width: 30%;
		padding: 0.3rem;
	    padding-bottom: 0;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	        -ms-flex-align: center;
	            align-items: center;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	        -ms-flex-direction: column;
	            flex-direction: column;
	    -ms-flex-negative: 0;
	        flex-shrink: 0;
	    font-size: 0.7rem;
	}
	 #shopMall ul li .v-img{
		width: 3rem;
	    height: 3rem;
	    margin-bottom: 0.5rem;
	    -ms-flex-negative: 0;
	        flex-shrink: 0;
	    border-radius: 50%;
	    overflow: hidden;
	}
	#shopMall ul.wallet li .v-img{
		border-radius: 0;
	}
	 #shopMall ul li .v-img img{
		width: 100%;
	}
	#shopMall .buttons-row{
		background: #FFFFFF;
		width: 100%;
		height: 50px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		line-height: 50px;
		position: relative;
	}
	#shopMall .buttons-row a{
		text-align: center;
		width: 50%;
		color: #333333;
		border-bottom: 2px solid transparent;
	}
	#shopMall .buttons-row a.active{
		border-bottom: 2px solid #4593eb;
	}
	.open-vip{
		padding: 0.2rem 0.8rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		
		-webkit-box-pack: justify;
		
		    -ms-flex-pack: justify;
		
		        justify-content: space-between;
	}
	.open-vip img{
		-ms-flex-negative: 0;
		    flex-shrink: 0;
	}
	.open-vip .vip-left{
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	.open-vip .vip-left img{
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 0.3rem;
	}
	.open-vip .vip-right img{
		width: 7rem;
		padding-top: 0.4rem;
	}
	.open-vip .vl-right{
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    font-size: 0.7rem;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	        -ms-flex-direction: column;
	            flex-direction: column;
	}
	.open-vip .vl-right span:last-of-type{
		color: #a1a1a1;
		margin-top: 0.3rem;
	}
	.crown{
		text-align: center;
	}
	.crown img{
		width: 20rem;
	}
	.banner-img{
		width: 100%;
		height: 14rem;
		overflow: hidden;
	}
	img.banner{
		width: 100%;
	}
	[v-cloak] {
	  display: none;
	}
	.orange{
		color: #dd5413;
		font-weight: 600;
		padding-right: 10px;
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
	#shopMall .margin-t-10{
		display: inline-block;
		margin-top: 10px;
	}
</style>
