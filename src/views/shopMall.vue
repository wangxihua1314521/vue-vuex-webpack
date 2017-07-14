<template>
	<div id="wrapp">
		<div id="prebar"></div>
		<div id="shopMall" class="views" v-cloak v-show="isLoad">
	      <div class="view view-main">
	        <div class="pages">
	          <div class="page">
	            <div class="page-content">
	              <!--内容展示-->
	              <!--我的钱包-->
	              <!--<div class="walletInfo">
	              	<p>我的钱包</p>
                	<ul class="wallet">
                		<li><div class="v-img"><img src="images/img/recharge.png"/></div><span>充值</span></li>
                		<li><div class="v-img"><img src="images/img/wallet.png"/></div><span>零钱</span><span>￥20.00</span></li>
                		<li><div class="v-img"><img src="images/img/depositors.png"/></div><span>提现</span></li>
                	</ul>
	              </div>-->
	              	<div class="banner-img">
	              		<img class="banner" src="../assets/images/img/banner1.png"  v-if="superVip"/>
			           
			            <img class="banner"  src="../assets/images/pic.jpg" v-if="!superVip"/>
	              	</div>
			            
			            
	              <!--选择产品-->
	              <div class="walletInfo">
	              	<p>选择产品</p>
              		<div class="">
			          <div class="buttons-row">
			            <a href="#tab1" class="tab-link active" @click="superVipb">{{vipInfo.goodsTypeName}}</a>
			            <a href="#tab2" class="tab-link" @click="superSpaceb" >{{spaceInfo.goodsTypeName}}</a>
			            <span class="line"></span>
			          </div>
			        </div>
			        <div class="tabs">
			        	<!--超级会员-->
			            <div id="tab1" class="tab active">
			                <div class="open-vip">
			                	<div class="vip-left">
			                		<!--<img src="images/img/crown.png"/>-->
			                		<img :src="vipInfo.additionalInfo"/>
			                		<div class="vl-right">
			                			<span>{{vipInfo.goodsTypeName}}</span>
			                			<span>{{vipInfo.description}}</span>
			                		</div>
			                	</div>
			                	<div class="vip-right">
			                		<img @click="go_open" src="../assets/images/img/open-vip.png"/>
			                	</div>
			                </div>
			                <div class="vip-list">
			                	 <div class="crown">
				                	<img src="../assets/images/img/crown-perks.png"/>
				                </div>
			                	<ul>
			                		<li v-for="ite in vipPrivilege"><div class="v-img"><img src="../assets/images/dengbi.jpg"/></div><span>{{ite.dictName}}</span></li>
			                		<li @click="morePerks"><div class="v-img"><img src="../assets/images/dengbi.jpg"/></div><span>更多</span></li>
			                	</ul>
			                </div>
			            </div>
			            <!--存储空间-->
			            <div id="tab2" class="tab">
			              <div class="open-vip">
			                	<div class="vip-left">
			                		<!--<img src="images/img/space.png"/>-->
			                		<img :src="spaceInfo.additionalInfo"/>
			                		<div class="vl-right">
			                			<span>{{spaceInfo.goodsTypeName}}</span>
			                			<span>{{spaceInfo.description}}</span>
			                			<!--<span>空间剩余(328M/1024M 34%)</span>-->
			                		</div>
			                	</div>
			                	<div class="vip-right">
			                		<img @click="go_space" src="../assets/images/img/discount-1.png"/>
			                	</div>
			                </div>
			                <div class="vip-list">
			                	 <div class="crown">
				                	<img src="../assets/images/img/space-perks.png"/>
				                </div>
			                	<ul>
			                		<li v-for="item in spacePrivilege"><div class="v-img"><img src="../assets/images/dengbi.jpg"/></div><span>{{item.dictName}}</span></li>
			                		<li @click="morePerks"><div class="v-img"><img src="../assets/images/dengbi.jpg"/></div><span>更多</span></li>
			                	</ul>
			                </div>
			                <button @click="news">新闻</button>
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
<script>
	import '@/assets/libs/jquery.min.js'
	import '@/assets/libs/framework7.min.js'
	import '@/assets/css/framework7.ios.min.css'
	import '@/assets/css/framework7.ios.colors.min.css'
    import '@/assets/css/toast.css'
	import '@/assets/libs/toast.js'
	import { mapState } from 'vuex'
	import {sendAjax, systemIdKey} from '@/assets/js/http.js'
	export default{
		data(){
			return {
				isLoad:false,
				superVip:true,
				authorization:"",
				vipInfo:{
					goodsTypeName:'',
					description:'',
					additionalInfo:''
				},
				spaceInfo:{
					goodsTypeName:'',
					description:'',
					additionalInfo:''
				},
				vipPrivilege:[],
				spacePrivilege:[],
				vipTypeId:'',
				spaceTypeId:''
			}
		},
		computed:
			mapState({
			    http: 'http',
			    auth: 'auth',
			  }),
	    created () {
//	    	var url=window.location.search.substr(1).split("&");
//			for(item in url){
//				if(url[item].indexOf("Authorization")>-1){
//					var authorization=url[item].split("Authorization=")[1];
//				}
//			}
//			sessionStorage.setItem("user_author",authorization);
	    	this.browserVersions();
		    this.loadMall();
		    this.superVipb();
		},
        activated () {
           
			console.log("进入页面");
			this.loadMall();
			this.superVipb();
       },	
		methods:{
			//检测机型
			browserVersions (){ 
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
				language:(navigator.browserLanguage || navigator.language).toLowerCase()
			},
			//测试 http://127.0.0.1:8020/hxgm-web-rebuild/template/app/shopMall.html?Authorization=MTIyOTowMGVmZDFjZTRjMjUyYjM4YmRkNDE3ODBjNGFiMDg4YQ==
			loadMall (){
//						var url="http://192.168.18.97:8080/hxgm-mall-web/rest/v1.0/mobile/goods-type";
				const url="/mobile/goods-type";
				let param = {};
				let that = this;
				that.http('mall',url,'get',param,res => {
					console.log("查询商品类型");
					console.log(res);
					if(res.data.data.goodsTypeList){
						that.isLoad = true;
					}
	                var typeList = res.data.data.goodsTypeList;
	                for(var i=0;i<typeList.length;i++){
	                	that.vipInfo.goodsTypeName = typeList[0].goodsTypeName;
	                	that.vipInfo.description = typeList[0].description;
	                	that.vipTypeId = typeList[0].goodsTypeId;
	                	if(typeList[0].additionalInfo[0]){
	                		that.vipInfo.additionalInfo = typeList[0].additionalInfo[0].thumbnailUrlSmall;
	                	}else{
	                		that.vipInfo.additionalInfo = "../assets/images/img/crown.png";
	                	}
	                	
	                	that.spaceInfo.goodsTypeName = typeList[1].goodsTypeName;
	                	that.spaceInfo.description = typeList[1].description;
	                	that.spaceTypeId = typeList[1].goodsTypeId;
	                	
	                	if(typeList[1].additionalInfo[0]){
	                		that.spaceInfo.additionalInfo = typeList[1].additionalInfo[0].thumbnailUrlSmall;
	                	}else{
	                		that.spaceInfo.additionalInfo = "../assets/images/img/space.png";
	                	}
	                }
	                 that.superVip = true;
				})
			},
			//开通会员 type=1
			go_open (){
//						判断ios android机型						
//				var that = this;
//				if(that.browserVersions.ios){
//					window.location.href="objc://:~"+that.vipTypeId+":~"+1;
//														
//				}else if(that.browserVersions.android){
//					window.player.playOk(that.vipTypeId+","+1);
//				}else{
//					return;
//				}
				//测试
						var authorization = sessionStorage.getItem("user_author");
				this.$router.push({ 
					path: 'shopOpenVip', 
					query: { 
						type: '2',
						Authorization: authorization,
						goodsTypeId: this.spaceTypeId
					}
				})
//						window.location.href="shopOpenVip.html?type=1&Authorization="+authorization+"&goodsTypeId="+this.vipTypeId;
			},
			//开通存储空间 type=2
			go_space(){
//						判断ios android机型
//				var that = this;
//				if(that.browserVersions.ios){
//					window.location.href="objc://:~"+that.spaceTypeId+":~"+2;
//														
//				}else if(that.browserVersions.android){
//					window.player.playOk(that.spaceTypeId+","+2);
//				}else{
//					return;
//				}
				//测试
				var authorization = sessionStorage.getItem("user_author");
				this.$router.push({ 
					path: 'shopOpenSpace', 
					query: { 
						type: '2',
						Authorization: authorization,
						goodsTypeId: this.spaceTypeId
					}
				})
//				window.location.href="shopOpenSpace.html?type=2&Authorization="+authorization+"&goodsTypeId="+this.spaceTypeId;
			},
			news(){
				var authorization = sessionStorage.getItem("user_author");
				this.$router.push({ 
					path: 'clanNews', 
					query: { 
						newsId: '3a454165-2683-4e6c-8f68-900691cb5091',
						Authorization: 'MTIyOTo3YjljODA1YmQzMzc3N2I0MjcxZGVkNTZiYjRhYTgyYQ==',
						userId: '40b321dd-ffa5-4be2-bbe8-f2880bb94b52'
					}
				})
			},
			//更多
			morePerks (){
				toast.show(true);
			},
			//超级会员 特权   banner图
			superVipb (){
				this.superVip = true;
//						var url="http://192.168.18.97:8080/hxgm-mall-web/rest/v1.0/combobox\vip-privilege";
				const url="/combobox/vip-privilege";
				console.log("超级会员");	
				let param = {};
				let that = this;
				that.http('admin',url,'get',param, res => {
					console.log("查询会员");
					console.log(res);
					that.vipPrivilege = res.data.data
				})
			},
			
			//存储空间 特权 banner图
			superSpaceb (){
				this.superVip = false;
				const url="/combobox/space-privilege";
				let param = {};
				this.http('admin',url,'get',param, res => {
					console.log("存储空间");
					console.log(res);
					this.spacePrivilege = res.data.data;
				})
			},
		}
	}
	var myApp = new Framework7();
	var toast = myApp.toast('', '<div style="font-size:0.9rem;padding:2rem 0;">敬 请 期 待</div>', {})
	
</script>
<style>
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
		overflow: hidden;
		width: 100%;
		height: 100%;
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
		padding: 2rem 0;
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
	#shopMall span.line{
		width: 1px;
		height: 30px;
		position: absolute;
		top: 10px;
		left: 50%;
		z-index: 2;
		background: #DDDDDD;
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