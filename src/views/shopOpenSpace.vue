<template>
	<div id="wrapp">
		<div id="prebar"></div>
		<div id="shopOpenSpace" class="views" v-cloak v-show="isLoad">
	      <div class="view view-main">
	        <div class="pages">
	          <div class="page">
	            <div class="page-content">
	              <!--内容展示-->
	              <p>选择空间大小</p>
		            <ul class="select-size">
		              	<li v-for="item in spaceTypeList"  track-by="$index" @click="selectSize(item.goodsTypeId,item)" :class="{actives: item == select_size}">
		              		<div class="spaceSize">{{item.goodsTypeName}}</div>
		              		<img class="selected" src="../assets/images/img/select.png"/>
	              		</li>
		            </ul>
	              <p>选择开通时长</p>
	              <ul class="select-time">
	              	<li v-for="items in vipTime"  track-by="$index" @click="selectVip(items,items.goodsUnitPrice*parseFloat(items.discount),items.propertyValue,$index,items.goodsId,items.goodsUnitPrice,items.discount)" :class="{active: items == select_time}">
	              		<div>
	              			<span>{{items.property}}</span><span class="line"></span><span class="unitAmount">{{"￥"+items.goodsUnitPrice*parseFloat(items.discount)}}</span><s v-if="items.discount != 1">{{"￥"+items.goodsUnitPrice}}</s>
	              		</div>
	              		<div>
	              			<a  href="javascript:;" class="a" @click="payVipConti(items,items.goodsUnitPrice*parseFloat(items.discount),items.propertyValue,$index,items.goodsId,items.goodsUnitPrice,items.discount)">续费</a>
	              		</div>
	              		<img class="discount" src="../assets/images/img/discount.png" v-if="items.discount != 1"/>
	              		<img class="selected" src="../assets/images/img/select.png"/>
	              	</li>
	              </ul>
	              <p v-show="spaceParam.amount" >应付金额：<span><i>￥</i>{{spaceParam.amount}}</span></p>
	              <p v-show="spaceParam.amount" @click="payVip"><a href="javascript:;" class="button button-fill">支付</a></p>
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
		created(){
			var url=window.location.search.substr(1).split("&");
			for(let item of url){
				if(item.indexOf("type")>-1){
					var type=item.split("=")[1];                                                                  
				}
				if(item.indexOf("goodsTypeId")>-1){
					this.goodsTypeId=item.split("=")[1];                                                                  
				}
				if(item.indexOf("Authorization")>-1){
					var authorization=item.split("Authorization=")[1];
					sessionStorage.setItem("user_author",authorization);
				}
			}
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
			this.loadSize();
		},
		data(){
			return {
				isLoad : false,
				vipTime:[],
				isActive:true,
				isActives:true,
				spaceTypeList:[],
				goodsTypeId:'',
				firstTypeId:'',
				spaceParam:{
					discount:'',
					goodsUnitPrice:'',
					goodsTypeId:'',
					goodsId:'',
					termValue:'',
					amount:'',
					type:'2',
					spaceSize:'',
				},
				select_size:'',
				select_time:''
			}
		},
		methods:{
			loadSize:function(){
				this.superVip = true;
//						var url="http://192.168.18.97:8080/hxgm-mall-web/rest/v1.0/combobox\vip-privilege";
				var url="/goods-type/"+this.goodsTypeId+"/childs";
				var that=this;
				let param = {};
				that.http('mall',url,'get',param, res => {
					console.log("商品返回");
					console.log(res);
					that.spaceTypeList=res.data.data;
					that.select_size = that.spaceTypeList[0];
	                that.firstTypeId = that.spaceTypeList[0].goodsTypeId;
	                that.spaceParam.goodsTypeId = that.spaceTypeList[0].goodsTypeId;
	                that.spaceParam.spaceSize = that.spaceTypeList[0].goodsTypeName;
	                that.loadTime();
				})
			},
			//默认第一种商品下的 商品列表
			loadTime:function(){
				var that=this;
				var url="/mobile/goods?goodsTypeId="+that.firstTypeId;
				let param = {};
				that.http('mall',url,'get',param, res => {
					console.log("商品列表");
					console.log(res);
					if(res.data.data.goodsList){
						that.isLoad = true;
					}
	                var openVipTime = res.data.data.goodsList;
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
					that.select_time = that.vipTime[0];
	                that.spaceParam.amount = (that.vipTime[0].goodsUnitPrice)*parseFloat(that.vipTime[0].discount)
	                that.spaceParam.goodsId=that.vipTime[0].goodsId;
					that.spaceParam.goodsUnitPrice =that.vipTime[0].goodsUnitPrice;
					that.spaceParam.discount = that.vipTime[0].discount;
					that.spaceParam.termValue = that.vipTime[0].propertyValue;
				})
			},
//			选择开通空间大小
			selectSize (typeId,item){
				let that=this;
				that.select_size = item;
				that.spaceParam.spaceSize = item.goodsTypeName;
				that.spaceParam.goodsTypeId = typeId;
				const url="/mobile/goods?goodsTypeId="+typeId;
				let param = {};
				that.http('mall',url,'get',param, res => {
					console.log("选择开通大小");
					console.log(res);
					var openVipTime = res.data.data.goodsList;
					for(var i=0;i<openVipTime.length;i++){
						var property = openVipTime[i].property;
						for(var j=0;j<property.length;j++){
							if(property[j].propertyKey == "termDesc"){
								openVipTime[i].property = property[j].propertyValue;
							}
							if(property[j].propertyKey == "term"){
								openVipTime[i].propertyValue = property[j].propertyValue;
							}
						}
					}
	                that.vipTime = openVipTime;
	                that.select_time = that.vipTime[0];
	                that.spaceParam.amount = (that.vipTime[0].goodsUnitPrice)*parseFloat(that.vipTime[0].discount)
	                that.spaceParam.goodsId=that.vipTime[0].goodsId;
					that.spaceParam.goodsUnitPrice =that.vipTime[0].goodsUnitPrice;
					that.spaceParam.discount = that.vipTime[0].discount;
					that.spaceParam.termValue = that.vipTime[0].propertyValue;
				})
			},
			//选择开通时长
			selectVip (item,b,m,index,goodsId,danjia,zhekou){
				var that = this;
				that.select_time = item;
				that.spaceParam.amount = b;
				that.spaceParam.goodsId=goodsId;
				that.spaceParam.goodsUnitPrice =danjia;
				that.spaceParam.discount = zhekou;
				that.spaceParam.termValue = m;
			},
			payVipConti (item,b,m,index,goodsId,danjia,zhekou){
				var that=this;
				that.selectVip(item,b,m,index,goodsId,danjia,zhekou);
				that.payVip();
			},
			payVip (){
//						判断ios android机型
				var that = this;							
				if(that.browser.versions.ios){
					window.location.href="objc://:~"+JSON.stringify(that.spaceParam);
				}else if(that.browser.versions.android){
					window.player.playOk(''+JSON.stringify(that.spaceParam));
				}else{
					return;
				}
				//测试
						var authorization = sessionStorage.getItem("user_author");
//						window.location.href="shopOpenSpaceNext.html?type=2&Authorization="+authorization+"&goodsTypeId="+this.goodsTypeId+"&month="+this.spaceParam.termValue+"&amount="+this.spaceParam.amount+"&spaceSize="+this.spaceParam.spaceSize+"&goodsId="+this.spaceParam.goodsId;
				that.$router.push({
					path: 'shopOpenSpaceNext',
					query: {
						type: '2',
						Authorization: authorization,
						goodsTypeId: this.goodsTypeId,
						month: this.spaceParam.termValue,
						amount: this.spaceParam.amount,
						spaceSize: this.spaceParam.spaceSize,
						goodsId: this.spaceParam.goodsId
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
	#shopOpenSpace p{
		padding: 0 0.5rem;
		color: #666666;
	}
	#shopOpenSpace ul{
		padding: .5rem;
		padding-top: 0;
		list-style: none;
	}
	#shopOpenSpace ul li{
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
	#shopOpenSpace ul li img.discount{
		position: absolute;
	    width: 3rem;
	    top: -0.2rem;
	    right: 0;
	    z-index: 2;
	}
	#shopOpenSpace ul li img.selected{
	    width: 1.3rem;
	    height: 1.3rem;
	    position: absolute;
	    bottom: 0;
	    right: 0;
	    z-index: 2;
	    display: none;
	}
	
	#shopOpenSpace ul li.active img.selected{
	    display: block;
	}
	#shopOpenSpace ul li.active{
		border: 1px solid #007aff;
	}
	#shopOpenSpace ul li div{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		position: relative;
	}
	#shopOpenSpace ul li span{
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
	#shopOpenSpace span.line{
		width: 1px;
		height: 20px;
		position: absolute;
		top: 13px;
		left: 7rem;
		z-index: 2;
		background: #DDDDDD;
	}
	#shopOpenSpace s{
		font-size: 0.7rem;
		color: #9e9e9e;
	}
	#shopOpenSpace .a{
		text-decoration: none;
	    color: #007aff;
	    padding: 0 1rem;
	    font-size: 0.8rem;
	}
	[v-cloak] {
	  display: none;
	}
	#shopOpenSpace p span{
		color: #ff6600;
		font-size: 1rem;
	}
	#shopOpenSpace p:last-of-type{
		margin-top: 0;
	}
	#shopOpenSpace p i{
		font-style: normal;
		font-size: 0.6rem;
	}
	p .button.button-fill{
		background: #3e9dff;
		height: 2.5rem;
		line-height: 2.5rem;
		font-size:0.8rem;
	}
	#shopOpenSpace ul.select-size{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	    -ms-flex-wrap: wrap;
	        flex-wrap: wrap;
	    -webkit-box-pack: justify;
	        -ms-flex-pack: justify;
	            justify-content: space-between;
	}
	#shopOpenSpace ul.select-size li{
		width: 48.5%;
	    -ms-flex-negative: 0;
	        flex-shrink: 0;
	}
	#shopOpenSpace ul.select-size li .spaceSize{
		width: 100%;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: center;
	        -ms-flex-pack: center;
	            justify-content: center;
	}
	#shopOpenSpace ul.select-size li.actives img.selected{
	    display: block;
	}
	#shopOpenSpace ul.select-size li.actives{
		border: 1px solid #007aff;
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
		to{width:s 100%;}
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