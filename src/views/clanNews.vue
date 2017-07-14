<template>
	<div id="clanNews" class="view view-main" v-cloak>
        <!--页面主体内容-->
        <div class="pages toolbar-through">
          	<div class="page">
          		<!--进度条-->
            	<div id="prebar"></div>
            	
            	<!--<div id="bar" style="width:0%;"></div>-->
            	<div class="page-content  hide-bars-on-scroll infinite-scroll">
            		<div v-show="newsInfo.newsTitle">
		              	<div class="news-info" v-show="isNews">
		              		<!--新闻内容-->
		              		<p class="title">{{newsInfo.newsTitle}}</p>
		              		<p class="news-from">{{"新闻来源："+newsInfo.newsSource}}</p>
		              		<div class="news-contain" v-html="newsInfo.newsContent"></div>
		              		<p class="news-from">{{"责任编辑： "+newsInfo.author}}</p>
		              	</div>
		              	<!--视频新闻-->
		              	<div class="news-video" v-show="isVideo">
		              		 <!--*********************************************-->
					        <div class="bad-video" v-show="isAndrid">
				      			<!--<img :src="newsInfo.poster" />-->
				      			<!--<span id="btnPause" class="btn_pause" v-if="pause && !isIos"  @click="play">
				      				<img src="images/img/pause.png" />
				      			</span>-->
				      			<!--<span v-if="isDuration" class="duration">{{newsInfo.duration}}</span>-->
						        <video webkit-playsinline :poster="newsInfo.poster" :src="newsInfo.video"></video>
						        
				      		</div>
				      		<div class="poster" v-show="!isAndrid">
				      			<video :poster="newsInfo.poster" :src="newsInfo.video" width="100%" controls="controls"></video>
				      		</div>
				      		 <!--*********************************************-->
		              		<span class="title">{{newsInfo.newsTitle}}</span>
		              		<div class="video-info">
		              			<div class="playAmount">
		              				<div class="playAmount-left">
			              				<span class="news-from">{{newsInfo.newsSource}}</span>
			              				<span class="look">{{newsInfo.pageView ? newsInfo.pageView+"次播放" : "0次播放"}}</span>
			              			</div>
			              			<div class="detail">
			              				<span class="click" @click="lookContain">详情</span>
			              			</div>	
		              			</div>
		              			<div class="news-contain" v-if="isContain" v-html="newsInfo.newsContent"></div>
		              		</div>
		              	</div>
		              	<div class="comment-hot" v-if="isComment">
							<!--评论列表-->
							<div class="title">
								<span>热门评论</span>
							</div>
							<ul class="blog_list">
								<li v-for="hitem in hotReplyList">
									<div class="comment-head">
										<img :src="hitem.replyPersonUrl" @click="go_person(hitem.replyPersonCode)"/>
									</div>
									<div class="comment-content">
										<div class="comment-up">
											<span class="comment-name">{{hitem.replyPersonName}}</span>
											<span class="comment-time">{{hitem.createTime}}</span>
										</div>
										<div class="comment-mid" v-html="hitem.replyContent"></div>
										<div class="comment-down">
											<div class="del" @click="deleteMyCom(hitem)" v-if="hitem.isDel"><span>删除</span></div>
											<div class="like" @click="hotprised(hitem)">
												<span v-if="hitem.islikes" class="likes"></span>
												<span v-if="!hitem.islikes" class="likes_ed"></span>
												<span>{{hitem.praiseCount ? hitem.praiseCount : '0'}}</span>
											</div>
											<div class="reply" @click="replyDetail(hitem.replyId)">
												<span class="replys"></span>
												<span>{{hitem.childCount ? hitem.childCount : '0'}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="comment-list">
							<!--评论列表-->
							<div id="jump" class="title">
								<span>最新评论</span>
							</div>
							<div class="comment-list isComment" v-if="!isComment">
								<span>还没有评论，快来抢沙发吧~</span>
							</div>
							<ul class="blog_list" v-if="isComment">
								<li v-for="item in replyList">
									<div class="comment-head">
										<img :src="item.replyPersonUrl"  @click="go_person(item.replyPersonCode)"/>
									</div>
									<div class="comment-content">
										<div class="comment-up">
											<span class="comment-name">{{item.replyPersonName}}</span>
											<span class="comment-time">{{item.createTime}}</span>
										</div>
										<div class="comment-mid" v-html="item.replyContent"></div>
										<div class="comment-down">
											<div class="del" @click="deleteMyCom(item)" v-if="item.isDel"><span>删除</span></div>
											<div class="like" @click="prised(item)">
												<span v-if="item.islikes" class="likes"></span>
												<span v-if="!item.islikes" class="likes_ed"></span>
												<span>{{item.praiseCount ? item.praiseCount : '0'}}</span>
											</div>
											<div class="reply" @click="replyDetail(item.replyId)">
												<span class="replys"></span>
												<span>{{item.childCount ? item.childCount : '0'}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<!--加载中-->
						<div class="infinite-scroll-preloader">
						    <div class="preloader"></div>
						</div>
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
		        <a href="#" class="link m-count"  @click="go_comment">
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
	                	<a href="#" @click="send_comment">发送</a>
	                </div>
	                <textarea id="textarea" v-model="commentContent" placeholder="评论内容" @keyup="input($event)"></textarea>
	                
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
	import '@/assets/css/bvd.css'
	import '@/assets/libs/toast.js'
//	import '@/assets/js/mui.min.js'
//	import '@/assets/js/bvd.js'
//	var v = mui.bvd();
//		
//	mui('body').on('tap','button',function(){
//		v.setUrl(this.id);	 
//	});
	var myApp = new Framework7(); 
	var $$ = Dom7;
		export default { 
				mounted  (){
					//获取url的参数
					var url=window.location.search.substr(1).split("&");
					for(let item of url){
						if(item.indexOf("newsId")>-1){
							var newsId=item.split("=")[1];                                                                  
						}
						if(item.indexOf("Authorization")>-1){
							var authorization="Basic "+(item.split("Authorization=")[1]);
							sessionStorage.setItem("user_author",authorization);
						}
						if(item.indexOf("userId")>-1){
							var userId=item.split("=")[1];
						}
					}
					
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
//					this.isAndrid = true;
					if(this.browser.versions.ios){
						this.isAndrid = false;
					}
					//页面初始化时 执行load方法
					this.load();
					this.blogList();
				},
				data (){
					return {
						//判断机型 加载 视频
						isAndrid:true,
						pause:true,
	//					isIos:false,
						isContain:false,
						isVideo:false,
						isNews:true,
						isComment:false,
						isDel:true,
						isHeart:true,
						loading:false,
						isImg:false,
						newsInfo:{},
						replyInfo:{},
						isDuration:true,
						authorization:"",
						param:{newsId:"",targetId:"",type:""},
						replyList:[],
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
					load (){
						const url = '/press/43966e9e-7252-4286-bcf8-4ac85c1d2140';
						//http:127.0.0.1:8020/hxgm-web-rebuild/template/app/clanNews.html?newsId=3a454165-2683-4e6c-8f68-900691cb5091&Authorization=MTIyOTo3YjljODA1YmQzMzc3N2I0MjcxZGVkNTZiYjRhYTgyYQ==&userId=40b321dd-ffa5-4be2-bbe8-f2880bb94b52
						//图片新闻 newsId 43966e9e-7252-4286-bcf8-4ac85c1d2140
						//视频新闻                   ad5e6fee-fb7c-4dbe-8bdb-b18241c492a8 
						//文化新闻                    3a454165-2683-4e6c-8f68-900691cb5091
						let that=this;
						let param = {};
						that.http('site',url,'get',param, res => {
							console.log("宗亲新闻");
							console.log(res);
							that.newsInfo=res.data.data;
			                   	//如果有视频
			                   	var videoList=that.newsInfo.additionalInfo;
			                   	if(that.newsInfo.additionalInfo.length>0 && that.newsInfo.additionalInfo[0].fileType == "2"){
		                   			that.isVideo=true;
		                   			that.isNews=false;
		                   			that.newsInfo.video=that.newsInfo.additionalInfo[0].url;
		                   			that.newsInfo.poster=that.newsInfo.additionalInfo[0].thumbnailUrl;
		                   			that.newsInfo.duration=that.newsInfo.additionalInfo[0].duration;
		                   			var duration= parseInt(that.newsInfo.duration/1000);
		                   			//格式化时间
//		                   			debugger
								    var theTime1 = 0;// 分
								    var theTime2 = 0;// 小时
								    if(duration < 60){
								    	if(duration < 10){
								    		that.newsInfo.duration =  "0:0"+parseInt(duration);
								    	}else{
								    		that.newsInfo.duration = "0:"+parseInt(duration);
								    	}
							        }else{
								        theTime1 = parseInt(duration/60);
								        duration = parseInt(duration%60);
								            if(theTime1 >= 60) {
									            theTime2 = parseInt(theTime1/60);
									            theTime1 = parseInt(theTime1%60);
								            }
								        var result = ""+parseInt(duration);
								        if(duration == 0){result = "00";}
								        if(duration < 10){result = "0"+parseInt(duration);}
								        if(theTime1 > 0) {
								        	if(theTime1 < 10){
								        		result = "0"+parseInt(theTime1)+":"+result;
								        	}else{
								        		result = ""+parseInt(theTime1)+":"+result;
								        	}
								        }
								        else if(theTime1 == 0){
								        	result = ""+"00"+":"+result;
								        }
								        if(theTime2 > 0) {
								        	if(theTime2 < 10){
								        		result = "0"+parseInt(theTime2)+":"+result;
								        	}else{
								        		result = ""+parseInt(theTime2)+":"+result;
								        	}
								        }
//								        
								        that.newsInfo.duration=result;
							    	}
							        
			                   	}
								var reg_img = /<img[^<]+\/>/g;
   							 	that.newsInfo.newsContent=that.newsInfo.newsContent.replace(/style="[^"]+"/ig,"");
   							 	that.bigImgList=that.newsInfo.newsContent.match(reg_img);
   							 	//页面加载1s后 给图片绑定图片放大事件
   							 	setTimeout(function(){
   							 		that.bigImg();
   							 		var imgList = $(".news-contain").find("img");
   							 		for(var i=0;i < imgList.length;i++){
										$(imgList[i]).click((function(j){
											return function(){
												//隐藏原生的标题
												if(that.browser.versions.ios){
													window.location.href="objc://:~"+"1";
												}else if(that.browser.versions.android){
													window.player.playOk("1");
												}else{
													return;
												}
												clan_news.myPhotoBrowser.open(j);
												//点击关闭 显示标题
												$$('.navbar-inner').click(function(){
													if(that.browser.versions.ios){
														window.location.href="objc://:~"+"0";
													}else if(that.browser.versions.android){
														window.player.playOk("0");
													}else{
														return;
													}
												})
	   							 			}
										}(i)));
									}
   							 	},1);
						})
					},
					blogList:function(){
						this.param.type="003";
						this.param.targetId=this.param.newsId;
						var url ="/reply-prise";
						var that=this;
						let param = {
							type: this.param.type,
							targetId: this.param.targetId,
							currPage: this.currPage,
							pageSize: this.pageSize
						};
						that.http('site',url,'get',param, res =>{
							console.log("查看评论");
							console.log(res);
							that.loading = false;
		                   	that.replyInfo = res.data.data;
		                   	that.hotReplyList = res.data.data.HotReplyList;
		                   	var replyLists = that.replyInfo.replyList;
		                   	console.log(replyLists);
		                   	var hotReply = that.hotReplyList;
		                   	//最新评论
		                   	if(!replyLists || replyLists.length==0){
		                   	  myApp.detachInfiniteScroll($$('.infinite-scroll'));
						      // 删除加载提示符
						      $$('.infinite-scroll-preloader').remove();
		                   	}else{
		                   		//评论提示
		                   		that.isComment=true;
		                   		myApp.attachInfiniteScroll($$('.infinite-scroll'));
	                   			for(var i=0;i<replyLists.length;i++){
	                   				//判断是否有头像
	                   				if(res.data.data.replyList[i].replyPersonUrl.length == 0){
	                   					res.data.data.replyList[i].replyPersonUrl.push("assets/images/img/headImg.png");
	                   				}else{
 										res.data.data.replyList[i].replyPersonUrl = res.data.data.replyList[i].replyPersonUrl[0].thumbnailUrlSmall;
	                   				}
	                   				//判断是否被点赞
		                   			if(replyLists[i].isPraise=="0"){
										replyLists[i].islikes=true;
			                   		}else{
										replyLists[i].islikes=false;
			                   		}
			                   		//判断是否是自己发的评论
			                   		if(replyLists[i].replyPersonCode == that.param.userId){
			                   			replyLists[i].isDel=true;
			                   		}
			                   		if(replyLists[i].replyPersonCode != that.param.userId){
			                   			replyLists[i].isDel=false;
			                   		}
			                   		that.replyList.push(replyLists[i]);
			                   		that.timeData(clan_news.replyList);
		                   		}
	                   			that.replyInfo.replyList = replyLists;
	                   			
		                   	}
		                   	//热门评论
		                   	if(!hotReply || hotReply.length==0){
		                   		return;
		                   	}else{
	                   			for(var i=0;i<hotReply.length;i++){
	                   				if(res.data.data.HotReplyList[i].replyPersonUrl.length == 0){
	                   					res.data.data.HotReplyList[i].replyPersonUrl.push("../assets/images/img/headImg.png");
	                   				}else{
	                   					res.data.data.HotReplyList[i].replyPersonUrl=res.data.data.HotReplyList[i].replyPersonUrl[0].thumbnailUrlSmall;
	                   				}
	                   				if(hotReply[i].isPraise=="0"){
	                   					hotReply[i].islikes=true;
	                   				}else{
	                   					hotReply[i].islikes=false;
	                   				}
	                   				//判断是否是自己发的评论
			                   		if(hotReply[i].replyPersonCode == that.param.userId){
			                   			hotReply[i].isDel=true;
			                   		}
			                   		if(hotReply[i].replyPersonCode != that.param.userId){
			                   			hotReply[i].isDel=false;
			                   		}
	                   				that.timeData(clan_news.hotReplyList);
	                   			}
	                   			that.hotReplyList = hotReply;
	                   		}
						})
					},
//					//加载热门评论
					hotblogList (){
						this.param.type="003";
						this.param.targetId=this.param.newsId;
						var url ="/reply-prise"
						let param = {
							type: this.param.type,
							targetId: this.param.targetId,
							currPage: this.currPage,
							pageSize: this.pageSize
						}
						var that=this;
						that.http('site',url,'get',param, res => {
							console.log("新闻评论");
							console.log(res);
							loading = false;
//							console.log(3333);
		                   	that.hotReplyList = res.data.data.HotReplyList;
		                   	var hotReply = that.hotReplyList;
		                   	//热门评论
		                   	if(!hotReply || hotReply.length==0){
		                   		return;
		                   	}else{
	                   			for(var i=0;i<hotReply.length;i++){
	                   				if(res.data.data.HotReplyList[i].replyPersonUrl.length == 0){
	                   					res.data.data.HotReplyList[i].replyPersonUrl.push("../assets/images/img/headImg.png");
	                   				}else{
	                   					res.data.data.HotReplyList[i].replyPersonUrl = res.data.data.HotReplyList[i].replyPersonUrl[0].thumbnailUrlSmall;
	                   				}
	                   				if(hotReply[i].isPraise=="0"){
	                   					hotReply[i].islikes=true;
	                   				}else{
	                   					hotReply[i].islikes=false;
	                   				}
	                   				//判断是否是自己发的评论
			                   		if(hotReply[i].replyPersonCode == that.param.userId){
			                   			hotReply[i].isDel=true;
			                   		}
			                   		if(hotReply[i].replyPersonCode != that.param.userId){
			                   			hotReply[i].isDel=false;
			                   		}
	                   				that.timeData(clan_news.hotReplyList);
	                   			}
	                   			that.hotReplyList = hotReply;
	                   		}
						})
					},
					//热门评论点赞
					hotprised (hitem){
						var param = {type:'009'};
						var url = '/reply-prise/prise/'+hitem.replyId;
						this.http('site',url,'post',param, res => {
							console.log("热门评论点赞");
							console.log(res);
							for(var i=0;i<clan_news.hotReplyList.length;i++){
								if(clan_news.hotReplyList[i]==hitem){
									if(hitem.islikes){
										clan_news.hotReplyList.$set(i, Object.assign({},clan_news.hotReplyList[i],{islikes:!hitem.islikes,praiseCount:++hitem.praiseCount}));
									}else{
										clan_news.hotReplyList.$set(i, Object.assign({},clan_news.hotReplyList[i],{islikes:!hitem.islikes,praiseCount:--hitem.praiseCount}));
									}
								}
							}
						})
					},
					//点赞
					prised:function(item){
						var param = {type:'009'};
						var url = '/reply-prise/prise/'+item.replyId;
						this.http('site',url,'post',param, res =>{
							console.log("评论点赞");
							console.log(res);
							for(var i=0;i<clan_news.replyList.length;i++){
								if(clan_news.replyList[i]==item){
									if(item.islikes){
										clan_news.replyList.$set(i, Object.assign({},clan_news.replyList[i],{islikes:!item.islikes,praiseCount:++item.praiseCount}));
									}else{
										clan_news.replyList.$set(i, Object.assign({},clan_news.replyList[i],{islikes:!item.islikes,praiseCount:--item.praiseCount}));
									}
								}
							}
	                   		clan_news.hotblogList();
						})
					},
					//喜欢
					liked (){
						if(this.isHeart==true){
							this.isHeart=false;
						}else{
							this.isHeart=true;
						}
					},
					//发送评论
					send_comment (){
						var that = this;
						if(that.commentContent==""){
							$("#replyComment").hide();
							return;
						}
						let param = {
							type: "002"
						}
						that.param.content =that.commentContent;
						var url = "/reply-prise/"+that.param.targetId;
//						var url = "http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/reply-prise/"+that.param.targetId;
						
						that.http('site',url,'post',param, res => {
							console.log("提交评论");
							console.log(res);
							clan_news.replyList=[];
		                   	clan_news.HotReplyList=[];
		                   	if(response.data.code == 200){
		                   		$("textarea").val("");
								$("#replyComment").hide();
								toast.show(true);
								that.replyList= [];
								that.HotReplyList=[];
		                   	}
		                   	clan_news.load();
		                   	that.currPage=1;
		                   	myApp.detachInfiniteScroll($$('.infinite-scroll'));
							clan_news.blogList();
						})
					},
					//取消评论
					cancel (){
						$("#replyComment").hide();
						$("textarea#textarea").val("");
					},
					//转换时间格式
					timeData (obj){
						var that=this;
						for(var i=0;i<obj.length;i++){
							var timeShow = "",
							dymTime=obj[i].createTime;
				            if(dymTime!= undefined && dymTime!= "" && dymTime!= null) {
				            	dymTime = dymTime.replace(/\-/g, '/');
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
				            obj[i].createTime = timeShow;
						}
					},
					//点击评论跳转到 最新评论
					go_comment (){
						$('html,.page-content').animate({scrollTop: $("#jump").offset().top },500);
					},
					//手机键盘发送事件
					input:function(event){
						event = event || window.event;
						var key = event.keyCode;
						if(key == 13){
							this.send_comment();
						}
					},
					play:function(){
						var video=document.getElementById("video");
						this.isDuration = false;
						if(video.paused) {
							video.play();
							this.pause = false;
						} else {
							video.pause();
							this.pause = true;
							
							
						}
					},
					pauseV:function(){
						this.pause=true;
						var video=document.getElementById("video");
					},
					//删除自己的评论
					deleteMyCom:function(item){
						var myId=this.param.userId;
						var url = '/reply-prise/'+item.replyId;
						var that=this;
						that.http('site',url,'DELETE',param, res => {
							console.log("删除评论");
							console.log(res);
							clan_news.replyList=[];
							that.currPage = 1;
							myApp.detachInfiniteScroll($$('.infinite-scroll'));
		                   	clan_news.blogList();
						})
					},
					//视频新闻 点击详情
					lookContain (){
						if(this.isContain==true){
							this.isContain=false;
						}else{
							this.isContain=true;
						}
					},
					//回复评论
					reply_comment (){
						$("#replyComment").show();
						$("textarea#textarea").focus();
						$("textarea#textarea").blur(function(){
							$("#replyComment").hide();
						});
						document.addEventListener('touchmove',this.touch, false);
					},
					touch (){
						$("textarea#textarea").blur();
						$("#replyComment").hide();
					},
					go_person (gn){
						var that=this;
//						判断ios android机型
						if(that.browser.versions.ios){
							window.location.href="objc://:~"+gn;
						}else if(that.browser.versions.android){
							window.player.playOk(gn);
						}else{
							return;
						}
					},
					//点击回复跳转
					replyDetail (obj){
						var that=this;
//						判断ios android机型
						if(that.browser.versions.ios){
							$('span#btnPause').html("");
							window.location.href="objc://:~"+"replayDetail.html"+":~"+obj;
						}else if(that.browser.versions.android){
							window.player.playOk(obj);
						}else{
							return;
						}
						
//						console.log(obj)
						let user_authorId = sessionStorage.getItem("user_author").slice(6);
//						
//						window.location.href="replayDetail.html?replyId="+obj+"&Authorization="+user_authorId+"&userId="+that.param.userId;
						this.$router.push({
							path: 'replayDetail',
							query: {
								replyId: obj,
								Authorization: user_authorId,
								userId: that.param.userId
							}
						})
					},
					//点击图片放大
					bigImg (){
						this.myPhotoBrowser = myApp.photoBrowser({
						    theme:"dark",
						    ofText:"/",
						    toolbar:false,
						    backLinkText:"",
						    swipeToClose:false,
						    expositionHideCaptions:true,
						    photos: this.bigImgList
						});
					}
				}	
			}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	body{
		background: #F3F2F2;
		/*font-family: "苹方";*/
		color: #000000;
		font-size: 0.9rem;
		position: relative; 
	}
	/*新闻详情*/
	#clanNews .news-info{
		padding:0.9rem;
		background: #FFFFFF;
		padding-bottom: 4px;
	}
	#clanNews .news-info p{
		margin: 0.5rem 0;
	}
	#clanNews .news-info p.title{
		font-size: 1.2rem;
		font-weight: bold;
		color:#000000;
	}
	#clanNews .news-info p.news-from{
		font-size: 0.7rem;
		color:#666666;
	}
	/***覆盖录入时自带的样式****/
	/*#clanNews  div.news-contain{
		padding: 0.5rem;
	}*/
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
	/*#clanNews .news-info div.news-contain p img{
		margin-left: -20px;
	}*/
	/*评论列表*/
	#clanNews .comment-list{
		background: #FFFFFF;
		margin-top: 0.5rem;
	}
	#clanNews .comment-list .title{
		background: url(../assets/images/img/comment.png) no-repeat -5.4rem 0.45rem;
	    background-size: 11rem;
	    padding: 0.9rem 0.9rem 0 0.9rem;
	    width: 5.5rem;
		height: 3rem;
	}
	#clanNews .comment-list .title span{
		color:#FFFFFF;
		font-size: 0.9rem;
	}
	#clanNews .comment-hot{
		background: #FFFFFF;
		margin-top: 0.5rem;
	}
	#clanNews .comment-hot .title{
		background: url(../assets/images/img/comment.png) no-repeat -0.06rem 0.4rem;
	    background-size: 11rem;
	    padding: 0.9rem 0rem 0 0.9rem;
	    width: 4.5rem;
	    height: 2rem;
	}
	#clanNews .comment-hot .title span{
		color:#FFFFFF;
		font-size: 0.9rem;
	}
	#clanNews .blog_list{
		padding: 0 0.9rem;
		background: #FFFFFF;
	}
	#clanNews .blog_list > li{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		border-top:1px solid #E5E5E5;
		padding:0.5rem 0;
	}
	#clanNews .blog_list > li:first-of-type{
		border: 0;
	}
	#clanNews .blog_list > li .comment-head{
		width: 1.9rem;
		height: 1.9rem;
		border-radius: 50%;
		background: #FFFFFF;
		position: relative;
		overflow: hidden;
		-ms-flex-negative: 0;
		    flex-shrink: 0;
	}
	#clanNews .blog_list > li .comment-head img{
		width: 100%;
		height: 100%;
		position: absolute;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 50%;
	}
	#clanNews .blog_list > li .comment-content{
		-webkit-box-flex: 1;
		    -ms-flex-positive: 1;
		        flex-grow: 1;
		margin-left: 0.5rem;
	}
	#clanNews .blog_list > li .comment-content .comment-up{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		margin:0.4rem 0;
	}
	#clanNews .blog_list > li .comment-content .comment-up .comment-name{
		font-size: 0.8rem;
		color:#3879D9;
	}
	#clanNews .blog_list > li .comment-content .comment-up .comment-time{
		font-size: 0.8rem;
		color:#666666;
	}
	#clanNews .blog_list > li .comment-content .comment-mid{
		text-align: justify;
	    padding-right: 10px;
	    letter-spacing: 1px;
	    word-break: break-all;
	}
	#clanNews .blog_list > li .comment-content .comment-down{
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    float: right;
	    font-size: 0.8rem;
	}
	#clanNews .blog_list > li .comment-content .comment-down .like{
		margin-right: 0.8rem;
	}
	/*加载更多*/
	#clanNews p.loadings{
		color: #57AAFE;
		display:-webkit-box;
		display:-ms-flexbox;
		display:flex;
		-webkit-box-pack:center;
		-ms-flex-pack:center;
		justify-content:center;
		padding:0 0.9rem;
	}
	#clanNews p.loadings span.preloader{
		margin-right: 5px;
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
	/*删除自己的评论*/
	.del{
		padding: 0 0.6rem 0 0;
	}
	.del span{
		font-size: 0.8rem;
		color: #E4393C;
	}
	/**/
	.isComment{
		padding-bottom: 1rem;
		text-align: center;
	}
	.news-video{
		background:#FFFFFF;
		padding-bottom: 0.5rem;
	}
	.news-video p{
		padding: 0 0.7rem;
	}
	.poster{
		position: relative;
	}
	.poster img{
		width: 100%;
	}
	.news-video span.title{
		display: inline-block;
		padding: 0.3rem 0.7rem;
	}
	.poster span.btn_pause{
		width: 3rem;
		height: 3rem;
		position: absolute;
	    left:0;
	    right: 0;
	    top:0;
	    bottom: 0;
	    margin: auto;
	    z-index: 1000;
	}

	/*.duration{
		position: absolute;
	    bottom: 12px;
	    right: 10px;
	    color: #ffffff;
	    z-index: 1000;
	    padding: 2px 10px;
	    background: #000000;
	    border-radius: 12px;
	   opacity: 0.5;
	   background: rgba(0,0,0,0.5);
	   font-size: 0.7rem;
	    font-weight: 600;
	}*/
	.video-info  div.playAmount{
		display: flex;
		justify-content: space-between;
		padding:0.3rem 0.7rem;
	}
	.video-info div.playAmount div.playAmount-left{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	    font-size: 0.7rem;
	    color: #666666;
	    
	}
	.video-info div.playAmount .detail span.click{
		color:#00acee;
		font-size: 0.8rem;
		padding-right: 1rem;
	}
	.video-info .look{
		margin: 0 2rem;
	}
	 .pause{
	 	display: none;
	 }
	/*#video:hover .pause{
		display: block;
	}*/
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
	/*#replyComment .toolbar-inner a{
	    
	    margin-left: 12px;
	    border-radius: 0;
	    color: #ffffff;
	    float: right;
	}*/
	
	
</style>