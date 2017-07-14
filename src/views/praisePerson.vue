<template>
	<div id="praisePer" v-cloak>
		<!--进度条-->
    	<div id="prebar"></div>
    	<div v-if="praiseList">
    		<ul class="praise_list">
				<li v-for="item in praiseList">
					<div class="praise-head">
						<img :src="item.additionalInfo" @click="go_person(item.personCode)"/>
					</div>
					<div class="praise-name">
						<span>{{item.personName}}</span>
					</div>
				</li>
			</ul>
    	</div>
	</div>
</template>
<script>
	import '@/assets/libs/jquery.min.js'
	export default{
			mounted (){
				//获取url的参数
				var url=window.location.search.substr(1).split("&");
				for(let item of url){
					if(item.indexOf("replyId")>-1){
						var replyId=item.split("=")[1];                                                                  
					}
					if(item.indexOf("Authorization")>-1){
						var authorization="Basic "+(item.split("Authorization=")[1]);
					}
				}
				sessionStorage.setItem("user_author",authorization);
				this.param.replyId=replyId;
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
			data(){
				return {
					authorization:"",
					param:{replyId:"",currPage:1,parentId:''},
					praiseList:[]
				}
			},
			methods:{
				//加载页面内容
				load (){
					var url="/reply-prise/" + this.param.replyId;
//						var url ="http://192.168.18.97:8080/hxgm-site-web/rest/v1.0/reply-prise/"+this.param.replyId+"?currPage="+this.param.currPage;
					var that=this;
					let param = {
						currPage: this.param.currPage
					}
					that.http('site',url,'get',param, res =>{
						console.log("评论详情");
						console.log(res);
						that.praiseList = res.data.data.praiseList;
		                   	//点赞列表头像
	                   		for(var i=0;i<that.praiseList.length;i++){
                   				//判断是否有头像
                   				if(that.praiseList[i].additionalInfo.length == 0){
                   					that.praiseList[i].additionalInfo="../assets/images/img/headImg.png";
                   				}else{
									that.praiseList[i].additionalInfo=that.praiseList[i].additionalInfo[0].thumbnailUrlSmall;
                   				}
                   			}
					})
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
	/*@font-face {
		font-family:"苹方";
		src: url('PINGFANG MEDIUM.TTF');
	}*/
	.praise_list li{
		padding: 0.3rem 0.9rem;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
		height: auto;
		background: #FFFFFF;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	.praise_list li:first-of-type{
		padding-top:0.9rem;
	}
	.praise_list li:last-of-type{
		padding-bottom:0.9rem;
	}
	.praise_list li .praise-head{
		width: 1.9rem;
	    height: 1.9rem;
	    border-radius: 50%;
	    background: #FFFFFF;
	    position: relative;
	    overflow: hidden;
	    -ms-flex-negative: 0;
	        flex-shrink: 0;
	}
	.praise_list li .praise-head img{
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    border-radius: 50%;
	}
	.praise_list li .praise-name{
		padding-left: 0.9rem;
		font-size: 0.9rem;
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
</style>