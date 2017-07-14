<template>
	<div  class="view view-main" id="business">
        <!--页面主体内容-->
        <div class="pages toolbar-through">
          	<div class="page">
          		<!--进度条-->
            	<div id="prebar"></div>
            	<div class="page-content  hide-bars-on-scroll">
	              	<div v-if="companyInfo.companyName">
						<div class="head">
							<!--页面上部分-->
							<div class="bg_img">
								<img :src="imgurl"/>
								<!--<img src="bg.jpg"/>-->
								<p>{{companyInfo.companyName}}</p>
							</div>
							<div class="add_tim">
								<span>地区：{{companyInfo.address}}</span>
							</div>
						</div>
						<div class="main">
							<!--公司简介-->
							<div class="title">
								<span>公司简介</span>
							</div>
							<div class="content">
								{{companyInfo.description}}
							</div>
						</div>
						<div class="product_info" id="jumpPro">
							<!--产品介绍-->
							<div class="title">
								<span>产品介绍</span>
							</div>
							<div class="noProduct" v-if="noPro">暂无</div>
							<ul class="product_list">
								<li v-for="item in productList">
									<div class="proImg">
										<img :src="item.url" />
									</div>
									<div class="info">
										<p>{{item.productName}}</p> 
										<p>{{item.remark}}</p>
									</div>
									<span class="pro_price">{{item.price}}</span>
								</li>
							</ul>
						</div>
					</div>
					<!--弹出层-->
            	</div>
         	</div>
         	
        </div>
        <!-- 底部-->
        <div class="toolbar">
          	<div class="toolbar-inner">
	            <a href="#" class="link" @click="go_product">
		            <img src="../assets/images/img/product.png"/> 产品
		        </a>
		        <!--<a href="#" id="share" class="link">
		            <img src="images/img/share.png"/> 分享
		        </a>-->
		        <a href="#" class="link alert-text">
		            <img src="../assets/images/img/callhim.png"/> 联系他
		        </a>
          	</div>
        </div>
    </div>
</template>
<script>
	import '../assets/css/framework7.ios.min.css'
	export default { 
		ready:function(){
			//获取url的参数
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("companyId")>-1){
					var companyId=url[item].split("=")[1];
				}
				if(url[item].indexOf("Authorization")>-1){
					var authorization="Basic "+(url[item].split("Authorization=")[1]);
				}
			}
			sessionStorage.setItem("user_author",authorization);
			this.param.companyId=companyId;
			
			//页面初始化时 执行load方法
			this.load()
		},
		data (){
			return {
				noPro:false,
				popover:false,
				companyInfo:{},
				aboutImgs:{},
				param:{companyId:""},
				authorization:"",
				productList:[],
				imgurl:""
			}
		},
		methods:{
			load:function(){
				
				var url="/clan-enterprise/"+this.param.companyId;
//					var url ="http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/clan-enterprise/"+this.param.companyId;
//测试url：http://127.0.0.1:8020/hxgm-web-rebuild/template/app/business_details.html?companyId=7b837c8e-b9f2-452b-92be-3c31f4511585&Authorization=MTIyOTo2OTlkNzQxN2RkYzkwM2RkYzVkZDVmYzZlNzEwN2U3MA==
				var that=this;
		        var callback = {
		          	success:function(response){
		                console.log("查询 企业详情 返回："+JSON.stringify(response.data.data));
		                that.companyInfo=response.data.data.company;
		                that.aboutImgs=that.companyInfo.additionalInfo[0];
//			                console.log("企业详情"+that.companyInfo)
		                //
		                 var reg = /style=\"(.*)\"/g;
						 that.companyInfo.description=that.companyInfo.description.replace(reg,'');
						that.imgurl=response.data.data.company.additionalInfo[0].url;
		                that.productList=response.data.data.productList;
		                if(that.productList && that.productList.length>0){
		                	for(var i=0;i<response.data.data.productList.length;i++){
								if(response.data.data.productList[i].additionalInfo[0] != undefined){
									response.data.data.productList[i].url=response.data.data.productList[i].additionalInfo[0].thumbnailUrlMedium;
								}else{
									return;
								}
			                }
		                }else{
		                	that.noPro=true;
		                }
		            }
		        }
		        http_site_app(url,'get','',callback);
			},
			//点击评论跳转到 最新评论
			go_product:function(){
				$('html,.page-content').animate({scrollTop: $("#jumpPro").offset().top },500);
			},
		}
	}
	var myApp = new Framework7(); 
	var $$ = Dom7;
	$$('.alert-text').on('click', function () {
		if(business.companyInfo.address.length > 24){
		  	business.companyInfo.address = business.companyInfo.address.slice(0,24);
		  }
	     myApp.modal({
	    text: '<div class="popInfo"><div class="popInfo-left"><ul><li><img src="images/img/Man.png"/><span>'+business.companyInfo.personName+'</span></li><li><img src="images/img/Phone.png"/><span>'+business.companyInfo.phone+'</span></li><li class="comEmail"><img src="images/img/Web.png"/><span>'+business.companyInfo.companyEmail+'</span></li><li><img src="images/img/Address.png"/><span>'+business.companyInfo.address+'</span></li></ul></div><div class="popInfo-right"><img src="../assets/images/img/Logo.png"/><span>'+business.companyInfo.companyName+'</span></div></div>',
	    buttons: [
	      {
	        text: '关闭',
	        bold: true
	      },
	    ]
	  })
	  if(business.companyInfo.companyEmail == ""){
		$('li.comEmail').html("");
	  }
	  
	});
</script>
<style type="text/css">
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #F3F2F2;
		/*font-family: "苹方"!important;*/
		color: #333333;
	}
	/*@font-face {
		font-family:"苹方";
		src: url('PINGFANG MEDIUM.TTF');
	}*/
	/*页面上部*/
	.head{
		width: 100vm;
		height: auto;
		background: #FFFFFF;
	}
	.head .bg_img{
		width: 100%;
		height: 230px;
		overflow: hidden;
		position: relative;
	}
	.head .bg_img img{
		width: 100%;
		height: 100%;
	}
	.head .bg_img p{
		width: 100%;
		position: absolute;
		bottom:0;
		padding: 0.6rem;
		color:#FFFFFF;
		font-size: 1rem;
		background: rgba(0,0,0,0.5);
		margin:0;
	}
	.head .add_tim{
		padding: 0.9rem;
	}
	.head .add_tim span{
		font-size: 0.9rem;
	}
	/*公司简介*/
	.main{
		background: #FFFFFF;
		margin-top: 5px;
		/*border-bottom:1px solid #CCCCCC;*/
	}
	.main .title,.product_info .title{
		padding: 0.9rem;
		/*border-bottom:1px solid #E5E5E5;*/
	}
	.main .title span,.product_info .title span{
		color:#060606;
		font-size: 1rem;
	}
	.main .content{
		padding:0.9rem;
		padding-top:0;
		letter-spacing: 1px;
	}
	/***覆盖录入时自带的样式****/
	.main .content img{
		width: 100% !important;
		height: auto !important;
	}
	.main .content div p,.main .content p{
		line-height: 1.4rem!important;
		font-size: 1rem!important;
		text-align: justify;
		text-indent: 20px;
	}
	/*产品介绍*/
	.product_info{
		background: #FFFFFF;
	}
	.product_info ul.product_list{
		overflow: hidden;
	}
	.product_info ul.product_list li{
		padding: 0.9rem;
		border-bottom:1px solid #E5E5E5;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		position: relative;
	}
	.product_info ul.product_list li .proImg{
		overflow: hidden;
		width: 25vw;
		height:25vw;
		line-height: 25vw;
		padding-top:5px;
	}
	.product_info ul.product_list li .proImg img{
		display: block;
		width: 100%;
		height: 100%;
		-ms-flex-negative: 0;
		    flex-shrink: 0;
	}
	.product_info ul.product_list li .info{
		max-width:66vw;
		text-align: justify;
	}
	.product_info ul.product_list li .info p{
		line-height: 1.4rem;
		padding: 3px;
		font-size: 0.9rem;
		text-align: justify;
		padding-left: 0.6rem;
	}
	.product_info ul.product_list li .info p:first-of-type{
		font-size: 1rem;
		font-weight: 600;
		text-align: left;
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
		z-index: 2;
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
	.pro_price{
		color: #E4393C;
		font-size: 0.8rem;
		position: absolute;
		bottom: 15px;
		right: 20px;
	}
	#business .toolbar {
	    background: #FFFFFF;
	}
	#business a {
	    color: #666666;
		font-size: 0.8rem;
	}
	/*弹层*/
	#business .popInfo{
		background: url(../assets/images/img/Main-bg.png) no-repeat;
	    background-size: 104%;
	    min-height: 10rem;
	    display: flex;
	    justify-content: space-around;
	    color: #333333;
	    font-size: 0.8rem;
	    text-align: left;
	}
	#business .popInfo ul{
		list-style: none;
		
	}
	#business .modal-inner{
		padding: 0;
	}
	#business .modal {
	    width: 22rem;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    margin: auto;
	}
	#business .modal-button{
		color: #ffffff;
		background: #57aafe;
	}
	#business .popInfo-left ul{
		width: 12.5rem;
		min-height: 7rem;
		padding: 2rem 0 1rem 0.5rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	#business .popInfo-left ul li{
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
	#business .popInfo-left ul li img{
		width: 1.5rem;
		height: 1.5rem;
		margin: 0.3rem 0.5rem 0.3rem 0.5rem;
		flex-shrink: 0;
	}
	/*#business .popInfo-left ul li span{
		margin: 0.5rem 0;
	}*/
	#business .popInfo-right{
		display: flex;
		align-items: center;
		margin-right: 1rem;
	}
	#business .popInfo-right img{
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.3rem;
		flex-shrink: 0;
	}
	#business .toolbar a img{
		width: 1.3rem;
		margin-right: 0.3rem;
		flex-shrink: 0;
	}
	#business .toolbar-inner{
		padding: 0 20px;
	}
	#business .noProduct{
		padding: 0 3rem 2rem;
		font-size: 0.9rem;
	}
</style>