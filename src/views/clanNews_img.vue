<template>
	<div id="clanNews" class="view view-main" v-cloak>
        <!--页面主体内容-->
        <div class="pages toolbar-through">
          	<div class="page">
          		<!--进度条-->
            	<div id="prebar"></div>
            	<div class="page-content">
	              	<!--图片新闻-->
	              	<div class="news-img">
	              		
					  	<div class="swiper-container">
						    <div class="swiper-wrapper">
						        <div class="swiper-slide" v-for="item in newImg">
						            <img :src="item.thumbnailUrlSmall">
						        </div>
						    </div>
						    <div class="swiper-pagination"></div>
						</div>
					</div>
					<div class="news-info" v-show="newsInfo.newsSource">
						<p class="title">{{newsInfo.newsTitle}}</p>
	              		<p class="news-from">{{"新闻来源："+newsInfo.newsSource}}</p>
					  	<div class="news-contain">{{newsInfo.newsContent}}</div>
	              		<p class="news-from">{{"责任编辑： "+newsInfo.author}}</p>
	              	</div>
            	</div>
         	</div>
        </div>
        <!-- 底部-->
        <div class="toolbar">
          	<div class="toolbar-inner">
          		<span class="noTextArea" @click="reply_comment"> 发表评论...</span>
	            <!--<a href="#" class="link" onclick="blogMsg()">
		            <i class="comment-icon"></i>
		        </a>-->
		        <a href="#" class="link m-count"  @click="go_comment(newsInfo.newsId)">
		            <i class="msg-icon">
		            </i>
		             <span class="msg-count" v-if="replyInfo.replyCount">{{lessThen100 ? replyInfo.replyCount : "99+"}}</span>
		        </a>
		        <!--收藏-->
		        <!--<a href="#" class="link heart" @click="liked">
		            <i v-if="isHeart" class="heart-icon"></i>
		            <i v-if="!isHeart" class="hearted-icon"></i>
		        </a>-->
		        <!--<a href="#" id="share" class="link">
		            <i class="share-icon"></i>
		        </a>-->
          	</div>
        </div>
       <!--分享窗口-->
      	<!--<section class="screenW">
	        <div class="subW">
	            <div class="info">
	                <div class="shareBox">
	                    <h5>请选择您的分享方式：</h5>
	                    <div class="bdsharebuttonbox">
	                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a>
	                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a>
	                        <!--<a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ</a>
	                        <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a>
	                        <!--<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a>
	                    </div>
	                </div>
	            </div>
	            <div class="close">取消</div>
	        </div>
	    </section>-->
	    <div class="toolbar" id="replyComment">
          	<div class="toolbar-inner">
	           <div class="toolbar messagebar">
	              <div class="toolbar-inner">
	              	<div class="submit">
	              		<a href="#" @click="cancel">取消</a>
	              		<a href="#">评论</a>
	                	<a href="#" @click="send_comment(newsInfo.newsId)">发送</a>
	                </div>
	                <textarea id="textarea" v-model="commentContent" placeholder="评论内容" @keyup="input($event)"></textarea>
	              </div>
	           </div>
          	</div>
        </div>
    </div>
</template>
<script>	
	import '../assets/libs/toast.js'
	import '../assets/css/framework7.ios.min.css'
	import '../assets/css/toast.css'
	export default { 
		ready:function(){
			//获取url的参数
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("newsId")>-1){
					var newsId=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("Authorization")>-1){
					var authorization="Basic "+(url[item].split("Authorization=")[1]);
				}
				if(url[item].indexOf("userId")>-1){
					var userId=url[item].split("=")[1];
				}
			}
			sessionStorage.setItem("user_author",authorization);
			this.param.newsId=newsId;
			this.param.userId=userId;
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
			//页面初始化时 执行load方法
			this.load();
			this.blogList();
		},
		data (){
			return {
				isContain:false,
				isNews:true,
				isComment:false,
				isDel:true,
				isHeart:true,
				loading:false,
				newsInfo:{},
				replyInfo:{},
				authorization:"",
				param:{newsId:"",targetId:"",type:""},
				commentContent:"",
				currPage:1,
				pageSize:5,
				hotReplyList:[],
				myPhotoBrowser:{},
				ImgList:[],
				bigImgList:[],
				newImg:[]
			}
		},
        computed: {
            lessThen100: function() {
                if(this.replyInfo.replyCount < 100) {
                    return true;
                } else {
                    return false;
                }
            }
        },
		methods:{
			//加载页面内容
			load:function(){
				var url = '/press/'+this.param.newsId;
				//http:127.0.0.1:8020/hxgm-web-rebuild/template/app/clanNews_img.html?newsId=0d73f691-7c1c-4886-8874-1170e8e694d6&Authorization=MTIyOTo3YjljODA1YmQzMzc3N2I0MjcxZGVkNTZiYjRhYTgyYQ==&userId=40b321dd-ffa5-4be2-bbe8-f2880bb94b52
				//图片新闻 newsId 0d73f691-7c1c-4886-8874-1170e8e694d6
				//视频新闻                   ad5e6fee-fb7c-4dbe-8bdb-b18241c492a8 
				//文化新闻                    
				var that=this;
	        	var callback = {
	                success:function(response){
//			                   	console.log("查询 宗亲新闻 返回："+JSON.stringify(response.data.data));
	                   	that.newsInfo=response.data.data;
	                   	//图片新闻
                   		that.isImg=true;
                   		that.isNews=false;
                   		that.newImg=that.newsInfo.additionalInfo;
                   		var reg = /style=\"(.*)\"/g,
                   		reg_img = /<img[^<]+\/>/g;
//	   							 	that.newsInfo.newsContent=that.newsInfo.newsContent.replace(reg,'');
					 	that.ImgList=that.newsInfo.newsContent.match(reg_img);
	                }
	            }
	            http_site_app(url,'get','',callback);
			},
			blogList:function(){
				this.param.type="003";
				this.param.targetId=this.param.newsId;
				var url ="/reply-prise"+"?type="+this.param.type+"&targetId="+this.param.targetId+"&currPage="+this.currPage+"&pageSize="+this.pageSize;
				var that=this;
	        	var callback = {
	                success:function(response){
	                	console.log(that.currPage)
	                	loading = false;
//			                   	console.log("查询 新闻评论 返回："+JSON.stringify(response.data.data));
	                   	that.replyInfo=response.data.data;
	                }
	           }
	            http_site_app(url,'get','',callback);
			},
			//喜欢
//					liked:function(){
//						if(this.isHeart==true){
//							this.isHeart=false;
//						}else{
//							this.isHeart=true;
//						}
//					},
			//发送评论
			send_comment:function(obj){
				var that = this;
				if(that.commentContent==""){$("#replyComment").hide();return;}
				that.param.content =that.commentContent;
				var url = "/reply-prise/"+that.param.targetId;
//						var url = "http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/reply-prise/"+that.param.targetId;
	        	var callback = {
	                success:function(response){
//			                   	console.log("提交评论返回：");console.log(response);
	                   	clan_news.replyList=[];
	                   	clan_news.HotReplyList=[];
	                   	if(response.data.code == 200){
	                   		$("textarea").val("");
							$("#replyComment").hide();
							toast.show(true);
							user_authorId=sessionStorage.getItem("user_author").slice(6);
							window.location.href="clanNews_imgReply.html?newsId="+obj+"&Authorization="+user_authorId+"&userId="+that.param.userId;
							
	                   	}
	                   	clan_news.load();
	                   	myApp.detachInfiniteScroll($$('.infinite-scroll'));
	                   	that.currPage=1;
						clan_news.blogList();
	                }
	            }
	            http_site_app(url,'post',that.param,callback);
			},
			//取消评论
			cancel:function(){
				$("#replyComment").hide();
				$("textarea#textarea").val("");
			},
			//点击评论跳转到 最新评论
			go_comment (obj){
				var that=this;
////						判断ios android机型
				if(that.browser.versions.ios){
					window.location.href="objc://:~"+"clanNews_imgReply"+":~"+obj;
				}else if(that.browser.versions.android){
//							window.player.playOk("clanNews_imgReply.html"+obj);
					window.player.playOk(obj);
				}else{
					return;
				}
				
////						console.log(obj)
//						let user_authorId=sessionStorage.getItem("user_author").slice(6);
//						
//						window.location.href="clanNews_imgReply.html?newsId="+obj+"&Authorization="+user_authorId+"&userId="+that.param.userId;
//				that.$router.push({
//					path: 'clanNewsimgReply',
//					query: {
//						newsId: obj,
//						Authorization: user_authorId,
//						userId: that.param.userId
//					}
//				})
			},
			//手机键盘发送事件
			input:function(event){
				event = event || window.event;
				var key = event.keyCode;
				if(key == 13){
					this.send_comment(obj);
				}
			},
			//回复评论
			reply_comment:function(){
				$("#replyComment").show();
				$("textarea#textarea").focus();
				$("textarea#textarea").blur(function(){
					$("#replyComment").hide();
				});
				document.addEventListener('touchmove',this.touch, false);
			},
			touch: function(){
				$("textarea#textarea").blur();
				$("#replyComment").hide();
			}
		}	
	}
	var myApp = new Framework7(); 
	var $$ = Dom7;
	//点击写评论 出现输入框
	function blogMsg(){
		$$("#blog-msg").show();
	}	
	var toast = myApp.toast('发送成功', '<div><img src="../../img/right.png"/></div>', {});
	var mySwiper = new Swiper('.swiper-container', {
	    spaceBetween: 100,
	    observer:true,//修改swiper自己或子元素时，自动初始化swiper
	    observeParents:true,//修改swiper的父元素时，自动初始化swiper
	    pagination: '.swiper-pagination',
    	paginationType: 'fraction'
	  });
	
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #000000;
		/*font-family: "苹方";*/
		color: #FFFFFF;
		font-size: 0.9rem;
		position: relative;
	}
	.page-content{
		background: #000000;
	}
	/*新闻详情*/
	#clanNews .news-info{
		padding:0.9rem;
		padding-top:0;
		background: #000000;
		color: #ffffff;
		padding-bottom: 4px;
	}
	#clanNews .news-info p{
		margin: 0.5rem 0;
	}
	#clanNews .news-info p.title{
		font-size: 1.2rem;
		font-weight: bold;
		color:#FFFFFF;
	}
	#clanNews .news-info p.news-from{
		font-size: 0.7rem;
		color:#FFFFFF;
	}
	/***覆盖录入时自带的样式****/
	#clanNews .news-info div.news-contain img{
		width: 100% !important;
		height: auto !important;
		padding: 3px 0 !important;
	}
	#clanNews .news-info div.news-contain p,#clanNews .video-info div.news-contain p{
		line-height: 1.5rem!important;
		font-size: 1.1rem!important;
		text-align: justify;
		/*text-indent: 20px;*/
		letter-spacing: 1px;
	}
	
	/**************************************/
	#clanNews .toolbar-inner a {
	    color: #666666;
	    font-size: 0.9rem;
	}
	/*写评论*/
	#blog-msg{
		display: none;
	}
	#blog-msg textarea{
		font-size: 0.9rem;
		overflow: hidden;
	}
	#clanNews .toolbar-inner .m-count{
		position: relative;
	}
	span.msg-count{
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	        -ms-flex-align: center;
	            align-items: center;
	    width: 17px;
	    height: 17px;
	    border-radius: 50%;
	    background: #E4393C;
	    color: #FFFFFF;
	    -webkit-box-pack: center;
	        -ms-flex-pack: center;
	            justify-content: center;
	    position: absolute;
	    top: 4px;
	    left: 12px;
	    z-index: 2;
	    font-size: 9px;
	}
	#clanNews .toolbar{
		background:#FFFFFF;
	}
	/**/
	[v-cloak] {
	  display: none;
	}
	/*******按钮图标************/
	#clanNews .like,#clanNews .reply{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		color:#00a7ff;
	}
	#clanNews .like span.likes{
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -128px -7px;
		background-size: 195px;
	}
	#clanNews .like span.likes_ed{
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -148px -7px;
		background-size: 195px;
	}
	#clanNews .reply span.replys{
		display: inline-block;
		width: 20px;
		height: 20px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -210px -10px;
		background-size: 237px;
	}
	#clanNews i.comment-icon{
	    display: inline-block;
		width: 83px;
		height: 34px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -43px -9px;
		background-size: 328px;
	}
	#clanNews i.msg-icon {
	    display: inline-block;
	    width: 43px;
	    height: 34px;
	    background: url(../assets/images/img/btn_icon.png) no-repeat -50px -9px;
	    background-size: 321px;
	}
	#clanNews i.heart-icon {
	   	display: inline-block;
	    width: 52px;
	    height: 34px;
	    background: url(../assets/images/img/btn_icon.png) no-repeat -81px -8px;
	    background-size: 321px;
	}
	#clanNews i.hearted-icon {
	   	display: inline-block;
	    width: 52px;
	    height: 34px;
	    background: url(../assets/images/img/btn_icon.png) no-repeat -120px -8px;
		background-size: 321px;
	}
	#clanNews i.share-icon {
	   	display: inline-block;
	    width: 45px;
	    height: 34px;
	    background: url(../assets/images/img/btn_icon.png) no-repeat -157px -7px;
	    background-size: 314px;
	}
	/*分享*/
	#shares{
		margin: 50px;
		text-align: center;
	}
	.screenW{
		width: 100%;
		height: 100%; 
		position: fixed; 
		left: 0; 
		top: 0; 
		background-color: rgba(0,0,0,0.5); 
		z-index: 999; 
		display: none;
	}
	.subW{
		width: 100%; 
		height: 260px; 
		position: absolute; 
		left: 0; 
		bottom: -260px; 
		background-color: #FFF; 
		z-index: 999;
	}
	.subW.move{
	    animation:sidebar-move .5s ease;
	    -webkit-animation:sidebar-move .5s ease;
	    bottom:0px;
	}
	.subW.back{
	    animation:sidebar-back .5s ease;
	    -webkit-animation:sidebar-back .5s ease;
	    bottom:-260px;
	}
	.subW .title{
		width: 100%; 
		height: 40px; 
		line-height: 40px; 
		text-align: center; 
		font-size: .4rem;
	}
	.shareBox .bdshare-button-style0-16{
	    background-image: -webkit-linear-gradient(bottom,rgba(0,0,0,.1) 50%,transparent 50%);
	    background-image: linear-gradient(bottom,rgba(0,0,0,.1) 50%,transparent 50%);
	    background-size:  100% 1px;
	    background-repeat: no-repeat;
	    background-position: left bottom;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	}
	.shareBox .bdshare-button-style0-16:last-child{background: none;}
	.shareBox .bdshare-button-style0-16:after{
	    content: "";
	    visibility: hidden;
	    display: none;
	    height: 0;
	    clear: both;
	}
	.shareBox .bdshare-button-style0-16 a{
	    text-align: center;
	    float: none;
	    font-size: 12px;
	    padding: 35px 0 0 0;
	    line-height: normal;
	    height: auto;
	    cursor: pointer;
	    margin: 10px 0;
	    position: relative;
	    background: none;
	    -webkit-box-flex:1;
	    -ms-flex:1;
	        flex:1;
	}
	.shareBox .bdshare-button-style0-16 a:after{
	    content: " ";
	    width:30px;
	    height:30px;
	    position: absolute;
	    left: 50%;
	    top: 0px;
	    -webkit-transform: translate(-50%,0);
	    transform: translate(-50%,0);
	}
	.shareBox .bdshare-button-style0-16 a.bds_qzone:after{
	    background: url(../assets/images/img/icon_qqkongjian_yellow.png) no-repeat; background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_tsina:after{
	    background: url("../assets/images/img/icon_xinlangweibo_red.png") no-repeat; background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_sqq:after{
	    background: url("../assets/images/img/icon_qqhaoyou_blue.png") no-repeat; background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_tqq:after{
	    background: url("../assets/images/img/icon_qqweibo_green.png") no-repeat; background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_weixin:after{
	    background: url("../assets/images/img/icon_weixin_green.png") no-repeat; background-size: 100%;
	}
	/*动画*/
	@keyframes sidebar-move {
	    0% {
	        bottom:-260px;
	    }
	    100% {
	        bottom:0px;
	    }
	}
	@keyframes sidebar-back {
	    0% {
	        bottom:0px;
	    }
	    100% {
	        bottom:-260px;
	    }
	}
	@-webkit-keyframes sidebar-move {
	    0% {
	        bottom:-260px;
	    }
	    100% {
	        bottom:0px;
	    }
	}
	@-webkit-keyframes sidebar-back {
	    0% {
	        bottom:0px;
	    }
	    100% {
	        bottom:-260px;
	    }
	}
	/*分享功能样式 覆盖*/
	.shareBox .bdshare-button-style0-16 a.bds_qzone:after {
	    background: url(../assets/images/img/icon_qqkongjian_yellow.png) no-repeat;
	    background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_tsina:after {
	    background: url(../assets/images/img/icon_xinlangweibo_red.png) no-repeat;
	    background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_sqq:after {
	    background: url(../assets/images/img/icon_qqhaoyou_blue.png) no-repeat;
	    background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_tqq:after {
	    background: url(../assets/images/img/icon_qqweibo_green.png) no-repeat;
	    background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.bds_weixin:after {
	    background: url(../assets/images/img/icon_weixin_green.png) no-repeat;
	    background-size: 100%;
	}
	.shareBox .bdshare-button-style0-16 a.popup_more:after {
	    width: 40px;
	    height: 40px;
	    position: absolute;
	    left: 50%;
	    top: 0px;
	    background: url(../assets/images/img/icon_more_orange.png) no-repeat;
	    background-size: 88%;
	}
	.subW .info {
	    width: 100%;
	    height: 90px;
	    padding: 0 10px;
	}
	.subW {
	    width: 100%;
	    height: 130px;
	    position: absolute;
	    padding-top: 15px;
	    left: 0;
	    bottom: -260px;
	    background-color: #FFF;
	    z-index: 999;
	}
	.subW .close {
	    width: 100%;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    font-size: .9rem;
	    color: #0b0b0b;
	    background: #fefbfb;
	}
	.shareBox .bdshare-button-style0-16:last-child {
	    background: none;
	    padding-right: 18px;
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
	
	 .swiper-container {
	    width: 100%;
	    height: 100%;
	}
	.swiper-slide {
		text-align: center;
	}
	.swiper-slide span {
	  text-align:center;
	  display:block;
	  margin:10px;
	  font-size:21px;
	}
	.swiper-slide img{
		width: 100%;
		margin: 100px 0 50px 0;
	}
	/*修改评论*/
	   span.noTextArea{
			display: inline-block;
		    /*width: 50%;
	    margin-right: 6%;*/
	    width: 78%;
	    margin-right: 0%;
	    padding: 4px 10px;
	    font-size: 0.8rem;
	    color: #cccccc;
	    border: 1px solid #cccccc;
	    border-radius: 21px;
	}
	.toolbar{
		height: 2.6rem;
	}
	/*评论弹出框*/
	#replyComment{
		display: none;
	}
	#replyComment,#replyComment .toolbar{
		height: 128px;
		border-top: 0.6px solid #DDDDDD;
	}
	
	#replyComment .toolbar-inner{
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		padding: 0 8px;
		padding-bottom: 5px;
		-webkit-box-pack: start;
		    -ms-flex-pack: start;
		        justify-content: flex-start;
	}
	#replyComment .toolbar-inner .submit{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		 width: 100%;
		 height: auto;
	}
	#replyComment .toolbar-inner .submit a{
		 color: #666666;
		 font-size: 0.9rem;
		 padding: 0.5rem 2rem;
	}
	#replyComment .toolbar-inner .submit a:first-of-type{
		padding-left: 0;
	}
	#replyComment .toolbar-inner .submit a:last-of-type{
		padding-right:0;
	}
	#replyComment textarea{
		width: 100%;
	    height: 5rem;
	    border-radius: 4px;
	    font-size: 0.8rem;
	    border-color: #DDDDDD;
	}
	#replyComment .messagebar textarea{
		padding:6px 8px;
	}
	</style>