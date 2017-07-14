<template>
	<div id="clanVolInfo" v-cloak>
		<!--进度条-->
		<div id="prebar"></div>
		<div id="bar" style="width:0%;"></div>
		<div v-show="clanVol.personName">
		<!--人物介绍-->
		<div class="header">
			<div class="head"></div>
			<div class="personInfo">
				<div class="headImg">
					<img :src="clanVol.url"/>
				</div>
				<p class="flex">
					<span class="person-name">{{clanVol.personName}}</span>
					<span class="person-boy" v-show="clanVol.gender=='1'">男</span>
					<span class="person-girl" v-show="clanVol.gender=='0'">女</span>
				</p>
				<div class="info margin-t-1">
					<div class="vol">
						<img src="../assets/images/img/heart.png"/>
						<span class="margin-m">{{clanVol.contributionValue}}</span>
						<span class="voltext">贡献值</span>
					</div>
					<div class="home" v-show="clanVol.nativePlace">
						<img src="../assets/images/img/homeland.png"/>
						<span class="margin-m">{{clanVol.nativePlace}}</span>
					</div>
				</div>
			</div>
		</div>
		<!--简介内容-->
		<div class="section">
			<div class="selfInfo"></div>
			<div class="content">
				<p>{{clanVol.description}}</p>
			</div>
		</div>
	  </div>
	</div>
</template>
<script>
	import '../assets/libs/sweet-alert/sweet-alert.css'
	import '../assets/libs/sweet-alert/sweet-alert.min.js'
	export default{ 
		ready:function(){
			//获取url的参数
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("clanVolunteerId")>-1){
					var clanVolunteerId=url[item].split("=")[1];
				}
				if(url[item].indexOf("Authorization")>-1){
					var authorization="Basic "+(url[item].split("Authorization=")[1]);
				}
			}
			sessionStorage.setItem("user_author",authorization);
			this.param.clanVolunteerId=clanVolunteerId;
			//页面初始化时 执行load方法
			this.load();
		},
		data (){
			return {
				clanVol:{},
				param:{
					clanVolunteerId:""
				},
				authorization:""
			}
		},
		methods:{
			load:function(){
//			测试url：http://127.0.0.1:8020/hxgm-web-rebuild/template/app/clanVol.html?clanVolunteerId=db7e9470-f28b-4739-a07a-558773a79562&Authorization=MTIyOTowZGU1NmFmZDI0Y2FhYTE2ZTlmYjQxMjA4Zjc2YmM3Yg==
				var url = "/volunteers/"+this.param.clanVolunteerId;
				var that=this;
	        	var callback = {
	                success:function(response){
	                   	console.log("查询 宗亲义工 返回："+JSON.stringify(response.data.data));
	                   	that.clanVol=response.data.data;	
	                   	//根据性别判断头像
	                   if(response.data.data.additionalInfo.length==0){
	                   		if(that.clanVol.gender=="0"){
	                   			that.clanVol.url="../assets/images/img/headImgm.png";
	                   		}else{
	                   			that.clanVol.url="../assets/images/img/headImg.png";
	                   		}
	                   	}else{
	                   		that.clanVol.url=response.data.data.additionalInfo[0].thumbnailUrlSmall;
	                   	}
	                   		
	                }
	            }
	            http_site_app(url,'get','',callback);
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
		font-family: "微软雅黑";
	}
	/*@font-face {
		font-family:"苹方";
		src: url('PINGFANG MEDIUM.TTF');
	}*/
	/*上部：人物介绍*/
	.header{
		height: 17rem;
		width: 100%;
	    background-color: #FFFFFF;
	    margin: 10px 0;
	    position: relative;
	}
	.header .head{
		height: 17rem;
	    background:url(../assets/images/img/colortape.png) no-repeat 100% 50%;
	    background-size: cover;
	}
	.section .selfInfo{
		min-height: 16rem;
		background: url(../assets/images/img/personal-introduction.png) no-repeat 100% 0;
	    background-size: cover;
	}
	.header .personInfo{
		position: absolute;
	    left: 0;
	    top: 0;
	    z-index: 2;
	    width: 100%;
	    height: 17rem;
	    display: flex;
	    justify-content: center;
	    flex-direction: column;
	    align-items: center;
	}
	.header .personInfo .person-boy{
	    padding: 0 0.1rem;
	    margin-left: 0.3rem;
	    font-size: 0.7rem;
	    background: #57aafe;
	    color: #ffffff;
	    border-radius: 0.1rem;
	}
	.header .personInfo .person-girl{
	    padding: 0 0.1rem;
	    margin-left: 0.3rem;
	    font-size: 0.7rem;
	    background: #f36861;
	    color: #ffffff;
	    border-radius: 0.1rem;        
	}
	.header .personInfo .info{
		width: 70%;
		font-size: 0.9rem;
	}
	.vol{
		display: flex;
	    align-items: center;
	}
	 .vol img,.home img{
		width: 1rem;
	}
	.home{
		display: flex;
		align-items: flex-start;
		margin-top: 1rem;
	}
	.home img{
		margin-top: 0.2rem;
	}
	.headImg{
		width: 5rem;
	    height: 5rem;
	    border-radius: 5rem;
	}
    .headImg img{
		width: 5rem;
	    height: 5rem;
	    border-radius: 5rem;    
	}
    .headImg img{
		width:100%;
		height:100%;
	}
	.voltext{
		font-size: 0.7rem;
	    padding: 0 0.2rem;
	    color: #57aafe;
	    border: 1px solid #57aafe;
	    border-radius: 0.1rem;
	}
	.margin-m{
		margin: 0 0.2rem 0 0.7rem;
	}
	.margin-t-1{
		margin-top: 1rem;
	}
	/*主体：简介内容*/
	.section{
		background: #FFFFFF;
		min-height: 24rem;
		margin-top: 0.5rem;
		position: relative;
	}
	.section .title{
		padding: 10px;
		border-bottom:1px solid #D0D6D6;
	}
	.section .title span{
		color:#060606;
		font-size: 1.1rem;
	}
	.section .content{
		padding: 1rem;
	    position: absolute;
	    top: 7rem;
	    left: 0;
	    font-size: 8rem;
	    background: #fff;
	    padding-top: 0;
	}
	.section .content p{
		line-height: 1.4rem;
		color:#060606; 
		font-size: 1rem;
		text-align: justify;
		letter-spacing: 1px;
	}
	/*进度条*/
	#prebar{
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
		width: 100%;
		height:2px;
		background:#62b0fe;
		position: absolute;
		top:0;
		left: 80%;
		z-index: 2;
		float:right;
	}
	/*捐款记录*/
	.devote{
		background:#FFFFFF;
		padding: 0.5rem 1rem 0 1rem;
	}
	.devote ul{
		padding: 0.5rem 0;
		overflow: hidden;
	}
	.devote ul li{
		list-style: none;
		float: left;
		padding: 0.3em 1em 0.3em 0;
	}
	.devote ul li span.tail{
		color: #060606;
		font-size: 1rem;
		margin-right: 15px;
	}
	.devote .title{
		overflow: hidden;
		padding-bottom: 10px;
		border-bottom:1px solid #D0D6D6;
	}
	.devote .title span{
		display: inline-block;
		float: left;
		color:#060606;
		font-size: 1.1rem;
	}
	.devote .title span.tails{
		display: inline-block;
		float: right;
		color: #57aafe;
	}
	[v-cloak]{
		display: none;
	}
	p.flex{
		margin-top: 0.3rem;
	    display: flex;
	    align-items: center;
	}
</style>