<template>
	<div id="personInfo" v-cloak> 
		<!--进度条-->
		<div id="prebar"></div>
		<div v-show="perInfo_lon.elderName">
		<!--人物介绍-->
		<div class="header">
			<div class="head">
				<img src="../assets/images/img/flower.png" alt="" />
				<img src="../assets/images/img/older.png" alt="" />
			</div>
			<div class="personInfo">
				<div class="headImg">
					<img :src="perInfo_lon.url"/>
				</div>
				<p class="flex">
					<span class="person-name">{{perInfo_lon.elderName}}</span>
					<span class="person-boy" v-show="perInfo_lon.sex=='1'">男</span>
					<span class="person-girl" v-show="perInfo_lon.sex=='0'">女</span>
				</p>
				<div class="info margin-t-1">
					<div v-show="perInfo_lon.age" class="vol">
						<img src="../assets/images/img/age.png"/>
						<span class="margin-m">{{perInfo_lon.age}}岁</span>
					</div>
					<div v-show="perInfo_lon.nativePlace" class="home">
						<img src="../assets/images/img/homeland.png"/>
						<span class="margin-m">{{perInfo_lon.nativePlace}}</span>
					</div>
				</div>
			</div>
		</div>
		<!--简介内容-->
		<div class="section">
			<div class="selfInfo"></div>
			<div class="content">
				<p>{{perInfo_lon.description}}</p>
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
				this.param.elderId=url[item].split("=")[1];
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
			perInfo_lon:{},
			param:{elderId:""},
			authorization:"",
		}
	},
    methods:{
		load:function(){
//				测试url:  http://127.0.0.1:8020/hxgm-web-rebuild/template/app/honorLon.html?userId=20884d53-7868-40fc-8df7-7641324eaf8d&type=2&Authorization=M2RkNmVhMDEtNTAwYi00OWMyLThiYjItNzA0ZjIxZjc0ZThlQDE6OTA1MTFjOGI3ZjBkNzZkMzY5MzU4NmE5OThhZTQxZjc=
			console.log(this.param)
			var url = "/elders/"+this.param.elderId;
			var that=this;
        	var callback = {
                success:function(response){
                   	console.log("查询 成员介绍 返回："+JSON.stringify(response.data.data));
                   	//获取personDetail数据
                   	that.perInfo_lon=response.data.data;
                   	//显示默认头像
                   if(response.data.data.additionalInfo.length==0){
                   		if(that.perInfo_lon.sex =="0"){
                   			that.perInfo_lon.url="images/img/headImgm.png";
                   		}else{
                   			that.perInfo_lon.url="images/img/headImg.png";
                   		}
                   	}else if(response.data.data.additionalInfo[0].thumbnailUrlSmall){
               			that.perInfo_lon.url=response.data.data.additionalInfo[0].thumbnailUrlSmall;
                   	}else{
                   		that.perInfo_lon.url=response.data.data.additionalInfo[0].thumbnailUrl;
                   	}
                    
                }
            }
            http_agent(url,'get','',callback);
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
				position: relative;
			    /*background:url(images/img/colortape.png) no-repeat 100% 50%;
			    background-size: cover;*/
			}
			.head img:first-of-type{
				position: absolute;
			    width: 7rem;
			    top: 0;
			    left: 0;
			}
			.head img:last-of-type{
				position: absolute;
			    width: 7rem;
			    bottom: 0;
			    right: 0;
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
				width: 6rem;
			    height: 6rem;
			    border-radius: 6rem;
			}
		    .headImg img{
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
			.margin-t-1{
				margin-top:1rem;
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