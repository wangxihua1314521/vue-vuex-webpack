<template>
	<div id="commentDetail" class="view view-main" v-cloak>
	        <!--页面主体内容-->
	        <div class="pages toolbar-through">
	          	<div class="page">
	          		<!--进度条-->
	            	<div id="prebar"></div>
	            	<div id="bar" style="width:0%;"></div>
	            	<div class="page-content  hide-bars-on-scroll infinite-scroll" v-if="commentInfo.replyPersonName">
	            		<!--被评论的内容-->
		              	<div class="comment">
		              		<div class="comment-head">
								<img :src="commentInfo.replyPersonUrl"  @click="go_person(commentInfo.replyPersonCode)"/>
							</div>
							<div class="comment-content">
								<div class="comment-up">
									<span class="comment-name">{{commentInfo.replyPersonName}}</span>
									<span class="comment-time">{{commentInfo.createTime}}</span>
								</div>
								<div class="comment-mid">{{commentInfo.replyContent}}</div>
							</div>
		              	</div>
		              	<!--赞过的人-->
		              	<div class="commentImg">
		              		
		              		<ul>
		              			<img src="../assets/images/img/liked_icon.png"/>
		              			<li v-for="item in praiseList"> 
		              				<span class="comment-name" @click="go_person(item.personCode)">{{item.personName}}</span><i>、</i>
		              				<!--<img :src="item.additionalInfo" @click="go_person(item.personCode)"/>-->
		              			</li>
		              			<b v-show="praiseLength > 3"> ...</b>
		              		</ul>
		              		<span class="haslike" @click="praisePerson(commentInfo.replyId)">{{smallInfo.praiseCount?smallInfo.praiseCount+"个人赞过 > ":'0'+"个人赞过 > "}}</span>
		              	</div>
						<div class="comment-list" v-if="isComment">
							<!--评论列表-->
							<div id="jump" class="title">
								<span>全部回复</span>
							</div>
							<ul class="blog_list">
								<li v-for="item in replyList">
									<div class="comment-head">
										<img :src="item.replyPersonUrl" @click="go_person(item.replyPersonCode)"/>
									</div>
									<div class="comment-content">
										<div class="comment-up">
											<div>
												<span class="comment-name">{{item.replyPersonName}}</span>
												<span>回复</span>
												<span class="comment-name">{{item.sendeePersonName}}</span>
											</div>
											<span class="comment-time">{{item.createTime}}</span>
										</div>
										<div class="comment-mid">{{item.replyContent}}</div>
										<div class="comment-down">
											<div class="del" @click="Delete(item)" v-if="item.isDel"><span>删除</span></div>
											<div class="like" @click="prise(item)">
												<span v-if="item.islikes" class="likes"></span>
												<span v-if="!item.islikes" class="likes_ed"></span>
												<span>{{item.praiseCount ? item.praiseCount : '0'}}</span>
											</div>
											<div class="reply" @click="reply(item)">
												<span class="replys"></span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="comment-list isComment" v-if="!isComment">
							<span>还没有回复，快来抢沙发吧~</span>
						</div>
	            	</div>
	         	</div>
	        </div>
	        <!-- 底部-->
	        <div class="toolbar" id="toolbars">
	          	<div class="toolbar-inner">
		           <div id="blog-msg" class="toolbar messagebar">
		              <div class="toolbar-inner">
		                <span class="noTextArea" @click="reply_comment"> 发表回复</span>
		                <a href="#" class="link" @click="comment_prise">
		                	<i v-if="islikes" class="likes-icon"></i>
		                	<i v-if="!islikes" class="liked-icon"></i>
		                </a>
		              </div>
		            </div>
	          	</div>
	        </div>
          	<div class="toolbar" id="replyComment">
	          	<div class="toolbar-inner">
		           <div class="toolbar messagebar">
		              <div class="toolbar-inner">
		              	<div class="submit">
		              		<a href="#" @click="cancel">取消</a>
		              		<a href="#">回复</a>
		                	<a href="#" @click="send_reply">发送</a>
		                </div>
		                <textarea id="textarea" v-model="reply_msg" placeholder="回复内容" @keyup="input($event)"></textarea>
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
	import '@/assets/css/toast.css'
	import '@/assets/libs/toast.js'
	export default { 
			data(){
				return {
					isComment:false,
					isDel:true,
					islikes:true,
					isHeart:true,
					commentInfo:{},
					smallInfo:{},
					authorization:"",
					param:{
						replyId:"",
						currPage:1,
						parentId:'',
						userId:''
					},
					replyList:[],
					reply_msg:'',
					sendeeUserId:'',
					praiseList:[],
					praiseLength:1
				}
			},
			mounted (){
				//获取url的参数
				var url=window.location.search.substr(1).split("&");
				for(let item of url){
					if(item.indexOf("replyId")>-1){
						var replyId=item.split("=")[1];     
//						console.log(replyId)
					}
					if(item.indexOf("Authorization")>-1){
						var authorization="Basic "+(item.split("Authorization=")[1]);	
					}
					if(item.indexOf("userId")>-1){
						var userId=item.split("=")[1];	
					}
				}
				sessionStorage.setItem("user_author",authorization);
				this.param.replyId = replyId;
				this.param.userId = userId;
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
			
			methods:{
				//加载页面内容
				load (){
					console.log(this.param);
					var url="/reply-prise/"+this.param.replyId;
//						var url ="http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/reply-prise/"+this.param.replyId+"?currPage="+this.param.currPage;
					var that=this;
					var param = {
						currPage: this.param.currPage
					}
					that.http('site',url,'get',param, res => {
						console.log("评论详情");
						console.log(res);
						that.commentInfo=res.data.data.review;
	                   	that.smallInfo=res.data.data;
	                   	that.praiseLength=res.data.data.praiseList.length;
	                   	that.praiseList=res.data.data.praiseList.slice(0,3);
	                   	
	                   	//被评论人的头像判断
	                   	if(res.data.data.review.replyPersonUrl.length == 0){
                   			res.data.data.review.replyPersonUrl.push("../assets/images/img/headImg.png");
           				}else{
           					res.data.data.review.replyPersonUrl=res.data.data.review.replyPersonUrl[0].thumbnailUrlSmall;
           				}
                   		//点赞列表头像
                   		for(var i=0;i<that.praiseList.length;i++){
               				//判断是否有头像
               				if(that.praiseList[i].additionalInfo.length == 0){
               					that.praiseList[i].additionalInfo="../assets/images/img/headImg.png";
               				}else{
								that.praiseList[i].additionalInfo=that.praiseList[i].additionalInfo[0].thumbnailUrlSmall;
               				}
               			}
	                   	//评论列表
	                   	that.replyList=res.data.data.replyList;
	                   	if(that.commentInfo.isPraise=="0"){
	                   		that.islikes=true;
	                   	}else{
	                   		that.islikes=false;
	                   	}
	                   	if(!that.replyList || that.replyList.length==0){
	                   		return;
	                   	}else{
	                   		that.isComment=true;
                   			for(var i=0;i<that.replyList.length;i++){
                   				//判断是否有头像
                   				if(res.data.data.replyList[i].replyPersonUrl.length == 0){
                   					res.data.data.replyList[i].replyPersonUrl.push("../assets/images/img/headImg.png");
                   				}else{
                   					res.data.data.replyList[i].replyPersonUrl=res.data.data.replyList[i].replyPersonUrl[0].thumbnailUrlSmall;
                   				}
                   				//判断是否点赞
                   				if(that.replyList[i].praiseCount==0){
                   					that.replyList[i].islikes=true;
                   				}else{
                   					that.replyList[i].islikes=false;
                   				}
                   				//判断是否是自己发的评论
		                   		if(that.replyList[i].replyPersonCode == that.param.userId){
		                   			that.replyList[i].isDel = true;
		                   		}
		                   		if(that.replyList[i].replyPersonCode != that.param.userId){
		                   			that.replyList[i].isDel = false;
		                   		}
                   				//格式化时间
                   				that.timeData(that.replyList[i])
                   			}
                   		}
	                   	that.timeData(that.commentInfo);
					})
				},
				//回复评论
				reply_comment (){
					$("#replyComment").show();
					$("textarea#textarea").focus();
					$("textarea#textarea").blur(function(){
						$("#replyComment").hide();
					});
					
				},
				//回复
				reply (item){
					this.reply_comment()
				},
				//取消评论
				cancel (){
					$("#replyComment").hide();
					$("textarea#textarea").val("");
				},
				//回复 提交
				send_reply (){
					var that=this;
					that.param.type='009';
					that.param.parentId=that.param.replyId;
					if(that.reply_msg==""){
						$("#replyComment").hide();
						return;
					}
					that.param.content = that.reply_msg;
					if(item){
						that.param.sendeeUserId =  that.commentInfo.createUserId;
					}
//						var url = "http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/reply-prise/"+this.param.replyId;
					var url = "/reply-prise/"+this.param.replyId;
					let param = {
						replyId: that.param.replyId,
						currPage:1,
						parentId:that.param.parentId,
						userId:that.param.userId
					}
					that.http('site',url,'post',param, res => {
						console.log("提交回复");
						console.log(res);
						if(response.data.code == 200){
	                   		$("textarea").val("");
	                   		$("#replyComment").hide();
							toast.show(true);
							that.load();
	                   	}
					})
				},
				//点赞
				prise (item){
					var param = {type:'009'};
					var url = '/reply-prise/prise/'+item.replyId;
					this.http('site',url,'post',param, res => {
						console.log("评论点赞");
						console.log(res);
						for(var i=0;i<comDetail.replyList.length;i++){
							if(comDetail.replyList[i]==item){
								if(item.islikes){
									comDetail.replyList.$set(i, Object.assign({},comDetail.replyList[i],{islikes:!item.islikes,priseCount:++item.praiseCount}));
								}else {
									comDetail.replyList.$set(i, Object.assign({},comDetail.replyList[i],{islikes:!item.islikes,priseCount:--item.praiseCount}));
								}
							}
						}
					})
				},
				//对评论点赞
				comment_prise (){
					var param = {type:'009'};
					var that=this;
					var url = '/reply-prise/prise/'+this.param.replyId;
//						var url = "http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/reply-prise/"+this.param.replyId;
					that.http('site',url,'post',param, res => {
						console.log("评论点赞");
						console.log(res);
						if(that.islikes){
							++comDetail.smallInfo.praiseCount;
							that.islikes=false;
						}else{
							--comDetail.smallInfo.praiseCount;
							that.islikes=true;
						}
						comDetail.load();
					})
				},
				//删除自己的评论
				Delete (item){
					var url = '/reply-prise/'+item.replyId;
					var that=this;
					that.http('site',url,'DELETE',param, res => {
						console.log("删除自己的评论");
						console.log(res);
						comDetail.load();
					})
				},
				//转换时间格式
				timeData (obj){
					var that=this;
					var timeShow = "",
					dymTime=obj.createTime;
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
		            obj.createTime = timeShow;
				},
				//手机键盘发送事件
				input (event){
					event = event || window.event;
					var key = event.keyCode;
					if(key == 13){
						this.send_reply();
					}
				},
				go_person (gn){
					var that=this;
					//判断ios android机型
					if(that.browser.versions.ios){
						window.location.href="objc://:~"+gn;
					}else if(that.browser.versions.android){
						window.player.playOk(gn);
					}else{
						return;
					}
				},
				praisePerson (obj){
					var that=this;
					//判断ios android机型
					if(that.browser.versions.ios){
						window.location.href="objc://:~"+"praisePerson.html"+":~"+obj;
					}else if(that.browser.versions.android){
						window.player.playOk(obj);
					}else{
						return;
					}
					let user_authorId=sessionStorage.getItem("user_author").slice(6);
//						window.location.href="praisePerson.html?replyId="+obj+"&Authorization="+user_authorId;
					that.$router.push({
						path: 'praisePerson',
						query: {
							replyId: obj,
							Authorization: user_authorId
						}
					})
				}
			}
		}
	var myApp = new Framework7(); 
	var $$ = Dom7;
	//点击写评论 出现输入框
	var toast = myApp.toast('发送成功', '<div><img src="../../img/right.png"/></div>', {})
</script>
<style type="text/css">
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
	#commentDetail .comment{
		padding:0.9rem;
		background: #FFFFFF;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	/*评论列表*/
	#commentDetail .comment-list{
		background: #FFFFFF;
		margin-top: 0.5rem;
	}
	#commentDetail .comment-list .title{
	    background-size: 11rem;
	    padding: 0.5rem 0.9rem 0 0.9rem;
	    width:100%;
	    height: 2rem;
	}
	#commentDetail .comment-list .title span{
		color:#000000;
		font-size: 0.9rem;
	}
	#commentDetail .blog_list{
		padding: 0 0.9rem;
		background: #FFFFFF;
	}
	#commentDetail .blog_list > li{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		border-top:1px solid #E5E5E5;
		padding:0.5rem 0;
	}
	#commentDetail .blog_list > li:first-of-type{
		border: 0;
	}
	#commentDetail .blog_list > li .comment-head,.comment .comment-head{
		width: 1.9rem;
		height: 1.9rem;
		border-radius: 50%;
		background: #FFFFFF;
		position: relative;
		overflow: hidden;
		-ms-flex-negative: 0;
		    flex-shrink: 0;
	}
	#commentDetail .blog_list > li .comment-head img,.comment .comment-head img{
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
	#commentDetail .blog_list > li .comment-content,.comment .comment-content{
		-webkit-box-flex: 1;
		    -ms-flex-positive: 1;
		        flex-grow: 1;
		margin-left: 0.5rem;
	}
	#commentDetail .blog_list > li .comment-content .comment-up,.comment .comment-content .comment-up{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		margin:0.4rem 0;
	}
	#commentDetail .blog_list > li .comment-content .comment-mid,.comment .comment-content .comment-mid{
		text-align: justify;
	    padding-right: 10px;
	    letter-spacing: 1px;
	    word-break: break-all;
	}
	#commentDetail .blog_list > li .comment-content .comment-up .comment-name,.comment .comment-content .comment-up .comment-name{
		font-size: 0.8rem;
		color:#3879D9;
	}
	#commentDetail .blog_list > li .comment-content .comment-up .comment-time,.comment .comment-content .comment-up .comment-time{
		font-size: 0.8rem;
		color:#666666;
	}
	#commentDetail .blog_list > li .comment-content .comment-down,.comment .comment-content .comment-down{
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    padding: 0.3rem 0 0.3rem 0;
	    float: right;
	    font-size: 0.8rem;
	}
	#commentDetail .blog_list > li .comment-content .comment-down .like,.comment .comment-content .comment-down .like
	,.comment-content .comment-down .reply{
		margin-left: 0.7rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	.comment-content .comment-down .reply span.replys{
		display: inline-block;
		width: 20px;
		height: 17px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -210px -12px;
		background-size: 237px;
	}
	.commentImg{
		padding:0.9rem;
		background: #FFFFFF;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	.commentImg > ul{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		overflow: hidden;
		/*width: 50%;*/
		list-style: none;
	}
	.commentImg span.haslike{
		letter-spacing: 0.1rem;
		color: #666666;
		font-size: 0.8rem;
	}
	.commentImg > ul li{
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		/*margin-right: 0.4rem;*/
		/*width: 1.9rem;
		height: 1.9rem;
		border-radius: 50%;*/
		-ms-flex-negative: 0;
		    flex-shrink: 0;
		
		/*overflow: hidden;*/
	}
	.commentImg > ul li:last-of-type i{
		display: none;
	}
	.commentImg > ul li img{
	    width: 1.9rem;
	    height: 1.9rem;
		border-radius: 50%;
	}
	/**************************************/
	#commentDetail .toolbar-inner a {
	    color: #666666;
	    font-size: 0.9rem;
	}
	/*写评论*/
	
	#blog-msg textarea{
		font-size: 0.5rem;
	    line-height: 13px;
	    overflow: hidden;
	    height: 27px;
	}
	#commentDetail .toolbar-inner .m-count{
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
	    left: 30px;
	    z-index: 2;
	    font-size: 12px;
	}
	#commentDetail .toolbar{
		background:#FFFFFF;
	}
	/**/
	[v-cloak] {
	  display: none;
	}
	/*******按钮图标************/
	#commentDetail .like span.likes{
		display: inline-block;
		width: 20px;
		height: 17px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -128px -9px;
		background-size: 195px;
	}
	#commentDetail .like span.likes_ed{
		display: inline-block;
		width: 20px;
		height: 17px;
		background: url(../assets/images/img/btn_icon.png) no-repeat -150px -8px;
		background-size: 195px;
	}
	#commentDetail i.share-icon {
   	    display: inline-block;
	    width: 25px;
	    height: 34px;
	    background: url(../assets/images/img/btn_icon.png) no-repeat -139px -2px;
	    background-size: 259px;
	}
	#commentDetail i.likes-icon{
		display: inline-block;
	    width: 28px;
	    height: 38px;
	    background: url(../assets/images/img/haslikes.png) no-repeat 6px 8px;
	    background-size: 21px;
	}
	#commentDetail i.liked-icon{
		display: inline-block;
	    width: 28px;
	    height: 40px;
	    background: url(../assets/images/img/btn_icon.png) no-repeat -234px -4px;
		background-size: 309px;
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
	/*回复*/
	.answer{
		margin-top: 30px;
	    padding: 0.9rem 0.3rem;
	    font-size: 0.8rem;
	    background: #f3f3f3;
	}
	.answer div{
		margin: 0.2rem 0;
	}
	.answer .answer-name,.answer .reply-name{
		color:#3c7cd9;
	}
	/*评论弹出框*/
	#replyComment{
		display: none;
	}
	#replyComment,#replyComment .toolbar{
		height: 128px;
	}
	
	#replyComment .toolbar-inner{
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		padding: 5px 8px;
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
	span.noTextArea{
		display: inline-block;
	    width: 85%;
	    padding: 4px 10px;
	    font-size: 0.8rem;
	    color: #cccccc;
	    border: 1px solid #cccccc;
	    border-radius: 21px;
	}
	/*删除自己的评论*/
	.del span{
		font-size: 0.8rem;
		color: #E4393C;
	}
	.isComment{
		padding: 2rem 1rem;
	}
	/*.commentImg ul span.likes_ed {
	    display: inline-block;
	    width: 20px;
	    height: 17px;
	    background: url(images/img/btn_icon.png) no-repeat -150px -6px;
	    background-size: 195px;
	}*/
	.commentImg ul > img{
		width: 1.8rem;
	}
</style>