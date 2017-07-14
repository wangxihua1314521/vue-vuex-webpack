<template>
	<div id="paySuc">
		<img src="../assets/images/img/success.png"/> 
		<p><span>恭喜你，购买成功！</span></p>
		<!--<p>开通时间：2017年1月1日——2018年1月1日</p>-->
    </div>
</template>
<script>
	export default {
		ready:function(){
//					var url=window.location.search.substr(1).split("&");
//					for(item in url){
//						if(url[item].indexOf("Authorization")>-1){
//							this.authorization=url[item].split("Authorization=")[1];
//						}
//					}
//					sessionStorage.setItem("user_author",authorization);
		},
		data:{
//					authorization:""
		},
		methods:{
			load:function(){
//						createTime=that.perInfo_devs[i].createTime.split("-");
//						that.perInfo_devs[i].createTime=createTime[0]+"年"+createTime[1]+"月"+createTime[2]+"日";
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
		background: #FFFFFF;
		color: #000000;
		font-size: 0.9rem;
	}
	#paySuc{
		text-align: center;
		padding-top: 5rem;
	}
	#paySuc p:first-of-type{
		padding: 0 1rem;
		margin:0.5rem 0;
		font-size: 1rem;
	}
	/*#paySuc p:last-of-type{
		font-size: 0.8rem;
		padding: 0 1rem;
		margin:0.5rem 0;
		color: #9E9E9E;
	}*/
	#paySuc img{
		width: 3rem;
	}
</style>