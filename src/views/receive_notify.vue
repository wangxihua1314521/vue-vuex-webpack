<template>
	<div id="zhifubao">
			
	</div>
</template>
<script type="text/javascript">
	export default {
		ready:function(){
			var url=window.location.search.substr(1).split("&");
			for(item in url){
				if(url[item].indexOf("total_amount")>-1){
					this.param.total_amount=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("buyer_id")>-1){
					this.param.buyer_id=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("body")>-1){
					this.param.body=url[item].split("=")[1];
				}
				if(url[item].indexOf("trade_no")>-1){
					this.param.trade_no=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("refund_fee")>-1){
					this.param.refund_fee=url[item].split("=")[1];
				}
				if(url[item].indexOf("notify_time")>-1){
					this.param.notify_time=url[item].split("=")[1];
				}
				if(url[item].indexOf("subject")>-1){
					this.param.subject=url[item].split("=")[1];
				}
				if(url[item].indexOf("sign_type")>-1){
					this.sign_type = url[item].split("=")[1];
				}
				if(url[item].indexOf("charset")>-1){
					this.param.charset=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("notify_type")>-1){
					this.param.notify_type=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("out_trade_no")>-1){
					this.param.out_trade_no=url[item].split("=")[1];
				}
				if(url[item].indexOf("gmt_close")>-1){
					this.param.gmt_close=url[item].split("=")[1];                                                                  
				}
				if(url[item].indexOf("gmt_payment")>-1){
					this.param.gmt_payment=url[item].split("=")[1];
				}
				if(url[item].indexOf("trade_status")>-1){
					this.param.trade_status=url[item].split("=")[1];
				}
				if(url[item].indexOf("version")>-1){
					this.param.version=url[item].split("=")[1];
				}
				if(url[item].indexOf("sign")>-1){
					this.sign = url[item].split("=")[1];
				}
				if(url[item].indexOf("gmt_create")>-1){
					this.param.gmt_create=url[item].split("=")[1];
				}
				if(url[item].indexOf("app_id")>-1){
					this.param.app_id=url[item].split("=")[1];
				}
				if(url[item].indexOf("seller_id")>-1){
					this.param.seller_id=url[item].split("=")[1];
				}
				if(url[item].indexOf("notify_id")>-1){
					this.notify_id = url[item].split("=")[1];
				}if(url[item].indexOf("out_biz_no")>-1){
					this.out_biz_no = url[item].split("=")[1];
				}if(url[item].indexOf("buyer_logon_id")>-1){
					this.buyer_logon_id = url[item].split("=")[1];
				}if(url[item].indexOf("seller_email")>-1){
					this.seller_email = url[item].split("=")[1];
				}
				if(url[item].indexOf("receipt_amount")>-1){
					this.receipt_amount = url[item].split("=")[1];
				}if(url[item].indexOf("invoice_amount")>-1){
					this.invoice_amount = url[item].split("=")[1];
				}if(url[item].indexOf("buyer_pay_amount")>-1){
					this.buyer_pay_amount = url[item].split("=")[1];
				}
				if(url[item].indexOf("point_amount")>-1){
					this.point_amount = url[item].split("=")[1];
				}
				if(url[item].indexOf("gmt_refund")>-1){
					this.gmt_refund = url[item].split("=")[1];
				}
				if(url[item].indexOf("fund_bill_list")>-1){
					this.fund_bill_list = url[item].split("=")[1];
				}
				if(url[item].indexOf("passback_params")>-1){
					this.passback_params = url[item].split("=")[1];
				}
				if(url[item].indexOf("voucher_detail_list")>-1){
					this.voucher_detail_list = url[item].split("=")[1];
				}
			}
			this.load();
		},
		data(){
			return {
				param:{
					total_amount:'',
					buyer_id:'',
					body:'',
					trade_no:'',
					refund_fee:'',
					notify_time:'',
					subject:'',
					sign_type:'',
					charset:'',
					notify_type:'',
					out_trade_no:'',
					gmt_close:'',
					gmt_payment:'',
					trade_status:'',
					version:'',
					sign:'',
					gmt_create:'',
					app_id:'',
					seller_id:'',
					notify_id:'',
					out_biz_no:'',
					buyer_logon_id:'',
					seller_email:'',
					receipt_amount:'',
					invoice_amount:'',
					buyer_pay_amount:'',
					point_amount:'',
					gmt_refund:'',
					fund_bill_list:'',
					passback_params:'',
					voucher_detail_list:'',
				}
			}
		},
		methods:{
			load:function(){
				var url="/alipay/notify";
				var that=this;
		        var callback = {
		          	success:function(response){
		                console.log("notify成功返回："+JSON.stringify(response.data.data));
		                document.write('success');
		            }
		        }
		        http_mall(url,'post',that.param,callback);
			}
		}
	}
</script>