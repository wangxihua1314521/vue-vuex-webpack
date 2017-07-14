<template>
	<div  id="clanHelp" class="view view-main" v-cloak>
        <!--页面主体内容-->
        <div class="pages toolbar-through">
          	<div class="page">
          		<!--进度条-->
            	<div id="prebar"></div>
            	<div id="bar" style="width:0%;"></div>
            	<div class="page-content  hide-bars-on-scroll" v-if="helpnfo.releasePersonName">
	              	<div class="content-info">
						<!--图文混排-->
						<div class="head-address">
							<!--头像、名字、时间-->
							<div class="head-name">
								<div class="head-image">
									<img :src="releasePersonUrl" @click="go_person(helpnfo.releaseGn)"/>
								</div>
								<div class="name-time">
									<span>{{helpnfo.releasePersonName}}</span>
									<span>{{helpnfo.createTime}}</span>
								</div>
							</div>
							<!--地址、电话-->
							<div class="address">
								<div class="add">
									<span class="addr-icon"></span>
									<span>{{helpnfo.nativePlace}}</span>
								</div>
								<div class="tel">
									<span class="tel-icon"></span>
									<span>{{helpnfo.contactsPhone}}</span>
								</div>
							</div>
						</div>
						<!--捐款数据-->
						<div class="donate-data" v-if="isTypeOne">
							<ul>
								<li>
									<i class="biaoqian-icon"><img src="../assets/images/img/biaoqian.png" alt="" /></i>
									<span>目标金额</span>
									<span>{{helpnfo.targetMoney+"元"}}</span>
								</li>
								<li>
									<i class="qian-icon"><img src="../assets/images/img/qian.png" alt="" /></i>
									<span>已筹金额</span>
									<span>{{helpnfo.currentMoney+"元"}}</span>
								</li>
								<li>
									<i class="xiaolian-icon"><img src="../assets/images/img/xiaolian.png" alt="" /></i>
									<span>已获支持</span>
									<span>{{helpnfo.contributionPersonCount+"次"}}</span>
								</li>
							</ul>
						</div>
						<!--正文内容-->
						<p>{{helpnfo.title}}</p>
						<div class="help_content">
							{{text}}
						</div>
						<div class="btn_b" @click="readMore" v-if="islookMore">查看全文</div>
						<!--图片展示-->
						<div class="imgs-show">
							<ul>
								<li v-for="item in imgList" track-by="$index"><img :src="item" onclick="openPhotoBrowser(${index})"/></li>
							</ul>
							<div class="view-main"></div>
						</div>
					</div>
					<div class="comment-list">
						<!--评论列表-->
						<div class="title">
							<!--<span>评论</span>-->
							<span>爱心留言</span>
						</div>
						<ul class="blog_list">
							<li v-for="item in replyList">
								<div class="head-image">
									<img :src="item.replyPersonUrl" @click="go_person(item.replyPersonCode)" />
								</div>
								<div class="name-time">
									<span>{{item.replyPersonName}}</span>
									<span>{{item.replyContent}}</span>
								</div>
							</li>
						</ul>
						<!--加载提示-->
						<p class="loadings"  v-if="isLoad" @click="lookMore">加载更多...</p>
						<p class="loadings delay" v-if="isLoading"><span class="preloader"></span><span>加载中...</span></p>
						<p class="loadings" v-if="isData">没有更多留言了...</p>
					</div>
            	</div>
         	</div>
        </div>
        <!-- 底部-->
        <div class="toolbar">
          	<div class="toolbar-inner">
          		<span class="noTextArea" onclick="message()"> 发表留言...</span>
	            <!--<a href="#" class="link" onclick="message()">
		            <i class="msg-icon"></i>留言
		        </a>-->
		        <!--<a href="#" id="share" class="link">
		            <i class="share-icon"></i>分享
		        </a>-->
		        <a href="#" class="link" @click="call_him">
		            <i class="call-icon"></i>联系他
		        </a>
          	</div>
          	<!--留言框-->
          	<!--<div id="message" class="toolbar messagebar">
              <div class="toolbar-inner">
                <textarea placeholder="说点什么..." v-model="msg" @keyup="input($event)"></textarea><a href="#" class="link" @click="send_msg">发送</a>
              </div>
            </div>-->
           <!--分享窗口-->
          	<!--<section class="screenW">
		        <div class="subW">
		            <div class="info">
		                <div class="shareBox">
		                    <h5>请选择您的分享方式：</h5>
		                    <div class="bdsharebuttonbox">
		                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a>
		                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a>
		                        <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ</a>
		                        <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a>
		                        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a>
		                    </div>
		                </div>
		            </div>
		            <div class="close">取消</div>
		        </div>
		    </section>-->
        </div>
        <div class="toolbar" id="replyComment">
          	<div class="toolbar-inner">
	           <div class="toolbar messagebar">
	              <div class="toolbar-inner">
	              	<div class="submit">
	              		<a href="#" @click="cancel">取消</a>
	              		<a href="#">留言</a>
	                	<a href="#" @click="send_msg">发送</a>
	                </div>
	                <textarea id="textarea" v-model="msg" placeholder="说点什么..." @keyup="input($event)"></textarea>
	                
	              </div>
	           </div>
          	</div>
        </div>
   </div>
</template>
<script>
	import '../assets/libs/toast.js'
    export default { 
		ready:function(){
			//获取url的参数
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("appealId")>-1){
					var appealId=url[item].split("=")[1];
				}
				if(url[item].indexOf("Authorization")>-1){
					var authorization="Basic "+(url[item].split("Authorization=")[1]);
				}
			}
			sessionStorage.setItem("user_author",authorization);
			this.param.appealId=appealId;
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
		},
		data:{
			islookMore:true,
			isLoad:false,
			isData:false,
			isLoading:false,
			isSuc:false,
			releasePersonUrl:'',
			helpnfo:{},
			isTypeOne:false,
			param:{appealId:"",content:"",sendeeUserId:""},
			authorization:"",
			replyList:[],
			imgList:[],
			bigImgList:[],
			text:'',
			msg:'',
			myPhotoBrowser:{},    //图片浏览器
			browser:{},
			lastIndex:5  //初始化时 默认显示5条评论
		},
		methods:{
			load:function(){
				var url ="/appeal/"+this.param.appealId;
	//测试url：http://127.0.0.1:8020/hxgm-web-rebuild/template/app/clanHelp.html?appealId=3b58c18e-be30-45bc-b698-31437a87e7c5&Authorization=M2RkNmVhMDEtNTAwYi00OWMyLThiYjItNzA0ZjIxZjc0ZThlQDE6MzY0ZDQ5ZmZkZTg2YmE1YWM5NWNlZDM4MzZkM2IxOTU=
				//type=1 捐款 type=2 帮助
				var that=this;
		        var callback = {
		          	success:function(response){
		                console.log("查询 互助详情 返回："+JSON.stringify(response.data.data));
		                that.helpnfo=response.data.data;
		                //判断捐助类型
		                if(that.helpnfo.appealType == 1){
		                	that.isTypeOne = true;
		                }
						
		                //头像
	//			                if(response.data.data.releasePersonUrl.length==0){
	//			                   		that.releasePersonUrl="images/img/headImg.png";
	//		                   	}else{
	//		                   		that.releasePersonUrl=response.data.data.releasePersonUrl[0].thumbnailUrlSmall;
	//		                   	}
	                   	if(response.data.data.replyList){
	                   		for(var i=0;i<response.data.data.replyList.length;i++){
			                	if(response.data.data.replyList[i].replyPersonUrl.length==0){
			                   		response.data.data.replyList[i].replyPersonUrl.push("images/img/headImg.png");
			                   	}else{
			                   		response.data.data.replyList[i].replyPersonUrl=response.data.data.replyList[i].replyPersonUrl[0].thumbnailUrlSmall;
			                   	}
			                }
	                   	}
		                
		                if(response.data.data.releasePersonUrl.length==0){
	                   		that.releasePersonUrl="images/img/headImg.png";
	                   	}else if(response.data.data.releasePersonUrl[0].thumbnailUrlSmall){
	               			that.releasePersonUrl=response.data.data.releasePersonUrl[0].thumbnailUrlSmall;
	                   	}else{
	                   		that.releasePersonUrl=response.data.data.releasePersonUrl[0].thumbnailUrl;
	                   	}
		                //去掉文档自带的样式
	//			                var reg = /style=\"(.*)\"/g;
		                var reg =/style="[^"]+"/ig;
						that.helpnfo.content=that.helpnfo.content.replace(reg,'');
		                that.text=that.helpnfo.content;
		                //处理获得的文本
		                if(that.text.length > 100){
		                	that.islookMore = true;
							that.text=that.helpnfo.content.substring(0,100)+"...";
							$(".btn_b").html("查看全文");
						}
		                if(that.text.length <= 100){
		                	that.islookMore = false;
		                }
		                //转换时间格式
		                clan_help.timeData();
		                //地区显示
		                var address=that.helpnfo.nativePlace;
	//			                var pro="",shi="";
	//			                var addressList=address.split(" ");
	//			                for(var i=0;i<addressList.length;i++){
	////			                	if(addressList[i].indexOf("省")>-1){
	////			                		pro=addressList[i];
	////			                	}
	//			                	if(addressList[i].indexOf("市")>-1){
	//			                		shi=addressList[i];
	//			                	}
	//			                	if(address.indexOf("市") < 0){
	//			                		shi=addressList[0];
	//			                	}
	////			                	if(addressList[i].indexOf("市") == -1){
	////			                		shi = addressList[i];
	////			                	}
	//			                	
	//			                }
						if(address.indexOf("市")>-1){
							address = address.match(/(\S*)市/)[1];  
		                	that.helpnfo.nativePlace=address+"市";
						}else{
							that.helpnfo.nativePlace=address;
						}
						
		                //评论列表显示
		                if(that.helpnfo.replyList ){
		                	if(that.helpnfo.replyList.length<1){
			                	that.isLoad=false;
			                	that.isData=true;
			                }else if(that.helpnfo.replyList.length<5&&that.helpnfo.replyList.length>=1){
			                	that.replyList=that.helpnfo.replyList;
			                	that.isLoad=false;
			                	that.isLoading=false;
			                	that.isData=true;
			                }else{
			                	that.replyList=that.helpnfo.replyList.splice(0,that.lastIndex);
			                	that.isLoad=true;
								that.isLoading=false;
			                }
		                }
		                
		                var getImgList=response.data.data.urlList;
		                for(var i=0;i<getImgList.length;i++){
		                	that.imgList.splice(i,i,getImgList[i].thumbnailUrlMedium);
		                	that.bigImgList.splice(i,i,getImgList[i].url);
		                }
		                //点击图片放大
		                that.bigImg();
	               	}	
		        }
		        http_site_app(url,'get','',callback);
			},
			
			//转换时间格式
			timeData:function(){
				var that=this;
				var timeShow = "",
	                dymTime = that.helpnfo.createTime;
		            if(dymTime) {
		                var now = new Date(),
		                    time = new Date(dymTime),
		                    mis = parseInt((now.getTime() - time.getTime())/1000);
		                var ONEHOUR = 3600,
		                    ONEDAY = 86400,
		                    ONEYEAR = 31536000;
		                //如果动态在1小时内，显示多少分钟前
		                if(mis < ONEHOUR) {
		                    timeShow = (parseInt(mis/60) == 0) ? "刚刚" : parseInt(mis/60) + "分钟前";
		                     }
		                //如果动态在1天内，显示时间
		                else if(ONEHOUR < mis && mis < ONEDAY) {
		                    timeShow = dymTime.substring(11, dymTime.length);
		                }
		                //如果动态在1年内，显示日期+时间
		                 else if(ONEDAY < mis && mis < ONEYEAR) {
		                 timeShow = (time.getMonth()+1) + "月" + time.getDate() + "日" + dymTime.substring(10, dymTime.length);
		                       }
		                 //如果动态在1年外，显示完整年月日+时间
		                else {
		                    timeShow = dymTime;
		                }
		            }
		            that.helpnfo.createTime = timeShow;
			},
			//查看全文
			readMore:function(){
				var that=this;
					if($(".btn_b").html()==""){
						return;
					}else if($(".btn_b").html()=="查看全文"){ 
							$(".btn_b").html("收起");
							that.text=clan_help.helpnfo.content;
					}else{
						$(".btn_b").html("查看全文"); 
						that.text=clan_help.helpnfo.content.substring(0,100)+"..."; 
					}
			},
			//评论捐款、帮助
			send_msg:function(){
				var url="/appeal/"+this.param.appealId+"/reply";
				var that=this;
				if (that.msg ==""){$("#replyComment").hide();return;}
				that.param.content=that.msg;
				var callback={
					success:function(response){
						console.log("发送成功返回"+JSON.stringify(response));
						$("textarea").val("");
						$("#replyComment").hide();
	//							that.isSuc=true;
	//							that.isSucc();
						toast.show(true);
						that.load();
					}
				}
				http_site_app(url,"POST",this.param,callback);
			},
			//取消评论
			cancel:function(){
				$("#replyComment").hide();
				$("textarea#textarea").val("");
			},
			//手机键盘发送事件
			input:function(event){
				event = event || window.event;
				var key = event.keyCode;
				if(key == 13){
					this.send_msg();
				}
			},
			//点击加载更多
			lookMore:function(){
				this.isLoad=false;
				this.isLoading=true;
				this.lastIndex+=5;
				clan_help.helpnfo.replyList=clan_help.helpnfo.replyList.splice(0,this.lastIndex);
				//如果没有评论 显示没有更多数据
				if(clan_help.helpnfo.replyList.length==0){
					this.isData=true;
					this.isLoad=false;
					this.isLoading=false;
					return false;
				}
				//重新加载页面
				this.load();
			},
			//页面底部 联系他
			call_him:function(){
				var that=this;
				//判断ios android机型
				if(that.browser.versions.ios){
					window.location.href="objc://:~"+clan_help.helpnfo.releaseGn;
				}else if(that.browser.versions.android){
					window.player.playOk(clan_help.helpnfo.releaseGn);
				}else{
					return;
				}
			},
			//点击图片放大
			bigImg:function(){
				this.myPhotoBrowser = myApp.photoBrowser({
				    theme:"dark",
				    ofText:"/",
				    toolbar:false,
				    backLinkText:"",
				    expositionHideCaptions:true,
				    swipeToClose:false,
				    photos: this.bigImgList
				});
			},
			//点击头像 调到个人主页
			go_person:function(gn){
				var that=this;
				//判断ios android机型
				if(that.browser.versions.ios){
					window.location.href="objc://:~"+gn;
				}else if(that.browser.versions.android){
					window.player.playOk(gn);
				}else{
					return;
				}
			}
		}
	}
	var myApp = new Framework7(); 
	var $$ = Dom7;
	var mainView = myApp.addView('.view-main', {
	  dynamicNavbar: true
	});
	//点击图片放大
	function openPhotoBrowser(index){
		if(clan_help.browser.versions.ios){
			window.location.href="objc://:~"+"1";
		}else if(clan_help.browser.versions.android){
			window.player.playOk("1");
		}else{
			return;
		}
		clan_help.myPhotoBrowser.open(index);
		$$('.navbar-inner').click(function(){
			if(clan_help.browser.versions.ios){
				window.location.href="objc://:~"+"0";
			}else if(clan_help.browser.versions.android){
				window.player.playOk("0");
			}else{
				return;
			}
		})
	}
	//点击留言 出现输入框
	function message(){
		$$("#replyComment").show();
		$$("textarea#textarea").focus();
		$$("textarea#textarea").blur(function(){
			$$("#replyComment").hide();
					});
	}
	var toast = myApp.toast('发送成功', '<div><img src="../../img/right.png"/></div>', {})
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #F3F2F2;
		/*font-family: "苹方";*/
		color: #333333;
		position: relative;
	}
	/*@font-face {
		font-family:"苹方";
		src: url('PINGFANG MEDIUM.TTF');
	}*/
	.content-info,.blog_list{
		padding: 0.9rem;
		background: #FFFFFF;
	}
	.blog_list{
		padding: 0 0.9rem;
	}
	.content-info .head-address{
		font-size: 0.9rem;
		height: 3.3rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	/**/
	.blog_list li{
		height: auto;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		border-top:1px solid #E5E5E5;
		padding:0.5rem 0;
	}
	.content-info .head-address .head-name{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.content-info .head-address .head-name .head-image,.blog_list li .head-image{
		width: 3rem;
		height: 3rem ;
		border-radius: 1.5rem;
		overflow: hidden;
		-webkit-flex-shrink: 0;
	}
	.content-info .head-address .head-name .head-image img,.blog_list li .head-image img{
		display: block;
		width: 3rem;
		height: 3rem;
		-webkit-flex-shrink: 0;
		-ms-flex-negative: 0;
	}
	.content-info .head-address .head-name .name-time,.blog_list li .name-time{
		padding-left:0.5rem;
		padding-top: 3px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	.blog_list li .name-time span{
		font-size: 1rem;
	}
	.blog_list li .name-time span:nth-child(2){
		width: 18rem;
		text-align: justify;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		font-size: 0.8rem;
	}
	.content-info .head-address .head-name .name-time span:nth-child(2){
		margin-top: 5px;
		font-size: 0.8rem;
		color: #666666;
	}
	.content-info .head-address .address{
		font-size: 0.8rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: distribute;
		justify-content: space-around;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		color: #666666;
	}
	.content-info .head-address .address div{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	.content-info > p {
	    padding: 0;
	    font-size: 1rem;
	}
	.content-info .help_content{
		text-indent: 20px;
		color: #000000;
		font-size:0.9rem;
		letter-spacing: 1px;
		text-align: justify;
	}
	/***覆盖录入时自带的样式****/
	.content-info .help_content img{
		width: 100% !important;
		height: auto !important;
	}
	.content-info .help_content div p,.content-info .help_content p{
		line-height: 1.4rem!important;
		font-size: 0.9rem!important;
		text-align: justify;
		text-indent: 20px;
	}
	.content-info .help_content p img{
		margin-left: -20px;
	}
	.content-info .btn_b{
		text-align: right;
		color: #006699;
		font-size: 0.8rem;
	}
	.comment-list{
		margin-top:0.6rem;
	}
	.comment-list .title{
		background: #FFFFFF;
		padding: 0.9rem;
	}
	.comment-list .title span{
		color:#666666;
		font-size: 1rem;
	}
	/*捐款数据*/
	.donate-data{
		margin: 5px 0;
		overflow: hidden;
		padding: 0.2rem 0 0.5rem 0;
		border-radius: 3px;
		background: #80C290;
	}
	.donate-data ul{
		overflow: hidden;
		list-style: none;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		color: #FFFFFF;
		font-size: 0.9rem;
		-ms-flex-pack: distribute;
		justify-content: space-around;
	}
	.donate-data ul li{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		text-align: center;
	}
	.donate-data ul li i{
		margin:0 auto;
		margin-top: 8px;
		display: block;
	}
	.donate-data ul li span{
		display: block;
		margin: 3px;
	}
	/*图片展示*/
	.imgs-show{
		margin: 5px 0;
		overflow: hidden;
	}
	.imgs-show ul{
		list-style: none;
		overflow: hidden;
	}
	.imgs-show ul li{
		float: left;
		width:22vw;
		height:22vw;
		margin:0 4px 4px 0;
	}
	.imgs-show ul li:nth-child(4){
		margin:0 0 5px 0;
	}
	.imgs-show ul li img{
		width: 100%;
		height:100%;
	}
	.swiper-slide{
		margin: auto;
	}
	/*覆盖*/
	#clanHelp .toolbar-inner a{
		color:#666666;
		font-size: 0.8rem;
		margin-right: 17px;
	}
	#clanHelp .toolbar{
		background: #FFFFFF;
	}
	/*留言*/
	/*#message{
		display: none;
	}
	#message textarea{
		font-size: 0.9rem;
		overflow: hidden;
	}*/
	/*评论弹出框*/
	#replyComment{
		display: none;
	}
	#replyComment,#replyComment .toolbar{
		height: 128px;
	}
	
	#replyComment .toolbar-inner{
		flex-direction: column;
		padding: 5px 8px;
		justify-content: flex-start;
	}
	#replyComment .toolbar-inner .submit{
		display: flex;
		justify-content: space-between;
		 width: 100%;
		 height: 30px;
	}
	#replyComment .toolbar-inner .submit a{
		 color: #666666;
		 font-size: 0.9rem;
	}
	#replyComment textarea{
		width: 100%;
	    height: 5rem;
	    border-radius: 4px;
	    font-size: 0.8rem;
	    border-color: #DDDDDD;
	}
	/*页面图标*/
	span.addr-icon,span.tel-icon,i.call-icon,i.share-icon,i.msg-icon{
		display: inline-block;
		background:url(../assets/images/img/icon.png) no-repeat;
	}
	span.addr-icon{
		width: 15px;
		height: 20px;
		background-position:-57px -20px;
	}
	span.tel-icon{
		width: 15px;
		height: 20px;
		background-position: -25px -20px;
	}
	i{
		width: 51px;
		height: 51px;
	}
	i img{
		width: 51px;
		height: 51px;
		text-align: center;
		vertical-align: middle;
	}
	i.biaoqian-icon img{
		width: 40px;
		height: 40px;
		margin-top: 5px;
	}
	i.msg-icon{
		width: 44px;
		height: 44px;
		background-position: -173px -1px;
		background-size: 271px 43px;
	}
	i.share-icon{
		width: 25px;
	    height: 44px;
	    background-position: -213px 0px;
	    background-size: 271px 43px;
	}
	i.call-icon{
		width: 26px;
	    height: 44px;
	    background-position: -235px 0px;
	    background-size: 271px 43px;
	}
	/*加载更多*/
	p.loadings{
		color: #57AAFE;
		display:-webkit-box;
		display:-ms-flexbox;
		display:flex;
		-webkit-box-pack:center;
		-ms-flex-pack:center;
		justify-content:center;
		padding:0 0.9rem;
	}
	p.loadings span.preloader{
		margin-right: 5px;
	}
	[v-cloak] {
	  display: none;
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
	    background: url("../assets/images/img/icon_qqkongjian_yellow.png") no-repeat; background-size: 100%;
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
	.subW .close{
		width: 100%;
	    height: 40px;
	    line-height: 40px;
	    text-align: center;
	    font-size: .9rem;
	    color: #000000;
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
		-webkit-animation:load 500ms ease-in ;
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
	#bar{
		/*width: 100%;*/
		height:2px;
		background:#62b0fe;
		position: absolute;
		top:0;
		left: 80%;
		z-index: 2;
		float:right;
	}
	/*.suc{
		display:none;
	}*/
	span.noTextArea{
		display: inline-block;
	    /*width: 50%;
	    margin-right: 6%;*/
	    width: 65%;
	    margin-right: 0%;
	    padding: 4px 10px;
	    font-size: 0.8rem;
	    color: #cccccc;
	    border: 1px solid #cccccc;
	    border-radius: 21px;
	}
</style>