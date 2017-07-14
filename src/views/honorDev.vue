<template>
	<div id="personInfo" v-cloak>
		<!--进度条-->
		<div id="prebar"></div>
		<!--<div id="bar" style="width:0%;"></div>-->
		<!--人物介绍-->
		<div v-if="perInfo_dev.donorName">
		<div class="header">
			<div class="head"></div>
			<div class="personInfo">
				
				<div class="headImg">
					<img class="mark" src="../assets/images/img/mark.png" alt="" />
					<img class="head-i" :src="perInfo_dev.url"/>
				</div>
				<p class="flex">
					<span class="person-name">{{perInfo_dev.donorName}}</span>
					<span class="person-boy" v-show="perInfo_dev.sex=='1'">男</span>
					<span class="person-girl" v-show="perInfo_dev.sex=='0'">女</span>
				</p>
				<div class="info" v-show="perInfo_dev.nativePlace">
					<div class="home">
						<img src="../assets/images/img/homeland.png"/>
						<span class="margin-m">{{perInfo_dev.nativePlace}}</span>
					</div>
				</div>
			</div>
		</div>
		<!--捐款记录-->
		<div class="devote">
			<div class="title">
				<b></b>
				<span>捐款记录</span>
				<span class="tails">总计：{{perInfo_dev.money}}</span>
			</div>
			<ul class="donate-info">
				<li v-for="dev in perInfo_devs"><span class="tail">{{dev.createTime}}</span><span class="tail">{{dev.money}}</span></li>
			</ul>
		</div>
		<!--简介内容-->
		<div class="section">
			<div class="selfInfo"></div>
			<div class="content">
				<p>{{perInfo_dev.description}}</p>
			</div>
		</div>
	  </div>
	</div>
</template>
<script>
	export default { 
		ready:function(){
			//获取url的参数
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("userId")>-1){
					this.donorId = url[item].split("=")[1];
				}
				if(url[item].indexOf("payeeOrgId")>-1){
					this.param.orgId=url[item].split("=")[1];
				}
				if(url[item].indexOf("Authorization")>-1){
					this.authorization="Basic "+(url[item].split("Authorization=")[1]);
				}
			}
			sessionStorage.setItem("user_author",this.authorization);
			//页面初始化时 执行load方法
			this.load();
		},
		data(){
			return {
				perInfo_dev:{},
				perInfo_devs:[],
				authorization:"",
				donorId:'',
				param:{orgId:""},
			}
		},
		methods:{
			load:function(){
//			测试url:	http://127.0.0.1:8020/hxgm-web-rebuild/template/app/honorDev.html?userId=23618443-f6e5-47d8-aba2-7d40baf3df09&payeeOrgId=99a8114b-99f4-40b7-8efa-c1418a731724&type=0&Authorization=M2RkNmVhMDEtNTAwYi00OWMyLThiYjItNzA0ZjIxZjc0ZThlQDE6OTA1MTFjOGI3ZjBkNzZkMzY5MzU4NmE5OThhZTQxZjc=
				var url = "/donors/"+this.donorId;
				var that=this;
				var param = that.param;
	        	var callback = {
	                success:function(response){
	                   	console.log("查询 成员介绍 返回：");console.log(response);
	                   	console.log("dddd  "+JSON.stringify(response.data.data))
	                   	//获取personDetail信息
	                   	that.perInfo_dev=response.data.data;
	                   	//根据性别判断头像
	                   if(response.data.data.additionalInfo.length==0){
	                   		if(that.perInfo_dev.sex=="0"){
	                   			that.perInfo_dev.url="images/img/headImgm.png";
	                   		}else{
	                   			that.perInfo_dev.url="images/img/headImg.png";
	                   		}
	                   	}else if(response.data.data.additionalInfo[0].thumbnailUrlSmall){
                   			that.perInfo_dev.url=response.data.data.additionalInfo[0].thumbnailUrlSmall;
	                   	}else{
	                   		that.perInfo_dev.url=response.data.data.additionalInfo[0].thumbnailUrl;
	                   	}
                       //获取personDetails信息
                       that.perInfo_devs=response.data.data.contributionList;
                       //将每次捐款金额 叠加
						var tails=0;
						var createTime;
						for(var i=0;i<that.perInfo_devs.length;i++){
							//将每次的捐款金额进行累加
							tails+=parseFloat(that.perInfo_devs[i].money);
							that.perInfo_devs[i].money+="元";
							//将捐款日期进行格式化
							createTime=that.perInfo_devs[i].contributionTime.split("-");
							that.perInfo_devs[i].createTime=createTime[0]+"年"+createTime[1]+"月"+createTime[2]+"日";
						}
						tails =tails.toFixed(2);
						that.perInfo_dev.money=tails+"元";
	                }
	            }
	            http_agent(url,'get',param,callback);
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
		height: 100%;
		width: 100%;
		overflow: hidden;
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
		    background:url(../assets/images/img/rongyu_bg.png) no-repeat 100% 50%;
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
			position: relative;
		}
	    .headImg img.head-i{
			width: 6rem;
		    height: 6rem;
		    border-radius: 6rem;    
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
		.margin-t-2{
			margin-top: 2rem;
		}
		/*主体：简介内容*/
		.section{
			background: #FFFFFF;
			min-height: 24rem;
			margin-top: 0.5rem;
			position: relative;
		}
		.section .title{
			padding: 7px;
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
			position: relative;
		}
		.devote .title span{
			display: inline-block;
			float: left;
			color:#060606;
			font-size: 1.1rem;
			margin-left: 0.5rem;
		}
		.devote .title span.tails{
			display: inline-block;
			float: right;
			margin-top: 0.1rem;
			font-size: 0.9rem;
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
		img.mark{
			position: absolute;
		    top: 3.5rem;
		    left: -4rem;
		    z-index: -1;
		    width: 14rem;
		    height: 3rem;
		}
		.title b{
			position: absolute;
		    top: 0.3rem;
		    /* left: -1px; */
		    z-index: 100;
		    display: inline-block;
		    margin-right: 0.5rem;
		    width: 0.2rem;
		    height: 1rem;
		    background: #57aafe;
		}
	</style>