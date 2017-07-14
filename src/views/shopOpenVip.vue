<template>
	<div id="wrapp">
		<div id="prebar"></div>
		<div id="shopOpen" class="views" v-cloak v-show="isLoad">
	      <div class="view view-main">
	        <div class="pages">
	          <div class="page">
	            <div class="page-content">
	              <!--内容展示-->
	              <p>选择开通时长</p>
	              <ul class="select-time">
	              	<li v-for="item in vipTime"  track-by="$index"  :class="{active: item == select_item}" @click="selectVip(item,item.goodsUnitPrice*parseFloat(item.discount),item.propertyValue,$index,item.goodsId,item.goodsUnitPrice,item.discount)">
	              		<div>
	              			<span>{{item.property}}</span><span class="line"></span><span class="unitAmount">{{"￥"+item.goodsUnitPrice*parseFloat(item.discount)}}</span><s v-if="item.discount != 1">{{"￥"+item.goodsUnitPrice}}</s>
	              		</div>
	              		<div>
	              			<a  href="javascript:;" class="a" @click="payVipConti(item,item.goodsUnitPrice*parseFloat(item.discount),item.propertyValue,$index,item.goodsId,item.goodsUnitPrice,item.discount)">续费</a>
	              		</div>
	              		<img class="discount" src="../assets/images/img/discount.png" v-if="item.discount != 1"/>
	              		<img class="selected" src="../assets/images/img/select.png"/>
	              	</li>
	              </ul>
	              <p>应付金额：<span><i>￥</i>{{vipParam.amount}}</span></p>
	              <p @click="payVip"><a href="javascript:;" class="button button-fill">支付</a></p>
	              <!--<p v-show="vipParam.amount" >应付金额：<span><i>￥</i>{{vipParam.amount}}</span></p>
	              <p v-show="vipParam.amount" @click="payVip"><a href="javascript:;" class="button button-fill">支付</a></p>-->
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
			let url=window.location.search.substr(1).split("&");
			console.log(typeof(url));
			for(let item of url){
				console.log(item)
				if(item.indexOf("type")>-1){
					let type=item.split("=")[1];                                                                  
				}
				if(item.indexOf("goodsTypeId")>-1){
					this.goodsTypeId=item.split("=")[1];                                                                  
				}
				if(item.indexOf("Authorization")>-1){
					let authorization=item.split("Authorization=")[1];
					sessionStorage.setItem("user_author",authorization);
				}
			}
			
			//检测机型
//			this.browser = {
//				versions:function(){ 
//				var u = navigator.userAgent, app = navigator.appVersion; 
//				return {//移动终端浏览器版本信息 
//					trident: u.indexOf("Trident") > -1, //IE内核
//					presto: u.indexOf("Presto") > -1, //opera内核
//					webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
//					gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
//					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
//					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
//					android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
//					iPhone: u.indexOf("iPhone") > -1 , //是否为iPhone或者QQHD浏览器
//					iPad: u.indexOf("iPad") > -1, //是否iPad
//					webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
//					};
//				}(),
//				language:(navigator.browserLanguage || navigator.language).toLowerCase()
//			} 
			this.loadTime();
		},
		data(){
			return {
				isLoad : false,
				vipTime:[],
				goodsTypeId:'',
				isActive:false,
				vipParam:{
					discount:'',
					goodsUnitPrice:'',
					goodsTypeId:'',
					goodsId:'',
					termValue:'',
					type:'1',
					amount:''
				},
				select_item:''
			}
		},
		computed: {
	        http () {
	            return this.$store.state.http
	        }
	    },
	    activated () {
	        this.loadTime()
	    },
		methods:{
			//加载开通时长
			loadTime:function(){
				this.superVip = true;
//						var url="http://192.168.18.97:8080/hxgm-mall-web/rest/v1.0/combobox\vip-privilege";
				const url="/mobile/goods?goodsTypeId="+this.goodsTypeId;
				let that=this;
				let param = {};
				that.http('mall',url,'get',param,res => {
					console.log("开通超级会员");
					console.log(res);
					let openVipTime = res.data.data.goodsList;
	                if(res.data.data.goodsList){
	                	that.isLoad = true;
	                }
					for(var i=0;i<openVipTime.length;i++){
						var property = openVipTime[i].property;
						for(var j=0;j<property.length;j++){
							//显示时长
							if(property[j].propertyKey == "termDesc"){
								openVipTime[i].property = property[j].propertyValue;
							}
							//时长参数
							if(property[j].propertyKey == "term"){
								openVipTime[i].propertyValue = property[j].propertyValue;
							}
						}
					}
					that.vipTime = openVipTime;
	                that.select_item = that.vipTime[0];
	                that.vipParam.amount = (that.vipTime[0].goodsUnitPrice)*parseFloat(that.vipTime[0].discount);
	                that.vipParam.goodsId=that.vipTime[0].goodsId;
	                that.vipParam.goodsTypeId = that.goodsTypeId;
					that.vipParam.goodsUnitPrice =that.vipTime[0].goodsUnitPrice;
					that.vipParam.discount = that.vipTime[0].discount;
					that.vipParam.termValue = that.vipTime[0].propertyValue;
				})
			},
//			选择vip类型
			selectVip (item,b,m,index,goodsId,danjia,zhekou){
				var that = this;
				that.select_item = item;
				that.vipParam.goodsId=goodsId;
				that.vipParam.amount = b;
				that.vipParam.goodsTypeId = that.goodsTypeId;
				that.vipParam.goodsUnitPrice =danjia;
				that.vipParam.discount = zhekou;
				that.vipParam.termValue = m;
			},
			//续费
			payVipConti (item,b,m,index,goodsId,danjia,zhekou){
				var that=this;
				that.selectVip(item,b,m,index,goodsId,danjia,zhekou);
				that.payVip();
			}, 
//			支付
			payVip(){
//						判断ios android机型
//				let that=this;
//				if(that.browser.versions.ios){
//					window.location.href="objc://:~"+JSON.stringify(that.vipParam);
//														
//				}else if(that.browser.versions.android){
//					window.player.playOk(""+JSON.stringify(that.vipParam));
//				}else{
//					return;
//				}
				//测试
						var authorization = sessionStorage.getItem("user_author");
//						window.location.href="shopOpenVipNext.html?type=1&Authorization="+authorization+"&goodsTypeId="+this.goodsTypeId+"&month="+this.vipParam.termValue+"&amount="+this.vipParam.amount+"&goodsId="+this.vipParam.goodsId;
				this.$router.push({ 
					path: 'shopOpenVipNext', 
					query: { 
						type: '1',
						Authorization: authorization,
						goodsTypeId: this.spaceTypeId,
						month: this.vipParam.termValue,
						amount: this.vipParam.amount,
						goodsId: this.vipParam.goodsId
					}
				})
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
	#shopOpen p{
		padding: 0 0.5rem;
		color: #666666;
	}
	#shopOpen ul{
		padding: .5rem;
		padding-top: 0;
		list-style: none;
	}
	#shopOpen ul li{
		background: #FFFFFF;
		margin-bottom: 0.5rem;
		height: 3rem;
		line-height: 3rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		position: relative;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		border: 1px solid transparent;
		border-radius: 3px;
	}
	#shopOpen ul li img.discount{
		position: absolute;
	    width: 3rem;
	    top: -0.2rem;
	    right: 0;
	    z-index: 2;
	}
	#shopOpen ul li img.selected{
	    width: 1.3rem;
	    height: 1.3rem;
	    position: absolute;
	    bottom: 0;
	    right: 0;
	    z-index: 2;
	    display: none;
	}
	#shopOpen ul li.active img.selected{
	    display: block;
	}
	#shopOpen ul li.active{
		border: 1px solid #007aff;
	}
	#shopOpen ul li div{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		position: relative;
	}
	#shopOpen ul li span{
		width: 7rem;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: center;
	        -ms-flex-pack: center;
	            justify-content: center;
	}
	#shopOpen ul li span.unitAmount{
		width: 5.5rem;
	    -webkit-box-pack: start;
	    -ms-flex-pack: start;
	            justify-content: flex-start;
	    padding-left: 2.5rem;
	}
	#shopOpen span.line{
		width: 1px;
		height: 20px;
		position: absolute;
		top: 13px;
		left: 7rem;
		z-index: 2;
		background: #DDDDDD;
	}
	#shopOpen s{
		font-size: 0.7rem;
		color: #9e9e9e;
	}
	#shopOpen .a{
		text-decoration: none;
	    color: #007aff;
	    padding: 0 1rem;
	    font-size: 0.8rem;
	}
	[v-cloak] {
	  display: none;
	}
	#shopOpen p span{
		color: #ff6600;
		font-size: 1rem;
	}
	#shopOpen p:last-of-type{
		margin-top: 0;
	}
	#shopOpen p i{
		font-style: normal;
		font-size: 0.6rem;
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