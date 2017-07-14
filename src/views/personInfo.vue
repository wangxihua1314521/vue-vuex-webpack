<template>
	<div id="personInfo" v-cloak>
		<!--进度条-->
		<div id="prebar"></div>
		<!--人物介绍-->
		<div class="header">
			<div class="head">
				<img class="bg-one" src="../assets/images/img/wuyan.png" alt="" />
				<img class="bg-two" src="images/img/org.png" alt="" />
			</div>
			<div class="personInfo">
				<div class="headImg">
					<img :src="perInfo.url"/>
				</div>
				<p class="flex">
					<span class="person-name">{{perInfo.memberName}}</span>
					<span class="person-boy" v-show="perInfo.gender=='1'">男</span>
					<span class="person-girl" v-show="perInfo.gender=='0'">女</span>
				</p>
				<div class="info margin-t-1">
					<div v-show="perInfo.position" class="vol">
						<img src="../assets/images/img/position.png"/>
						<span class="margin-m">{{perInfo.position}}</span>
					</div>
					<div v-show="perInfo.companyAddress" class="home">
						<img src="../assets/images/img/homeland.png"/>
						<span class="margin-m">{{perInfo.companyAddress}}</span>
					</div>
				</div>
			</div>
		</div>
		<!--简介内容-->
		<div class="section">
			<div class="selfInfo"></div>
			<div class="content">
				<p>{{perInfo.description}}</p>
			</div>
		</div>
	  </div>
	</div>
</template>

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
	img.bg-one{
		position: absolute;
	    top: 0;
	    left: 0;
	    width: 12rem;
	}
	img.bg-two{
		position: absolute;
	    bottom: 5px;
	    right: 0;
	    width: 5rem;
	}
</style>