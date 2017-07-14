(function($) {

    var bvd = function(dom) {
    	var that = this;
		$.ready(function() {
			//获取视频元素
			that.video = document.querySelector(dom || 'video');
			//获取进度条
			that.timeBar = document.getElementsByClassName('.timeBar')[0];
			//获取视频父元素
			that.vRoom = that.video.parentNode;
			//元素初始化
			that.initEm();
			//事件初始化
			that.initEvent();
			//记录信息
			that.initInfo();
			//当前播放模式 false 为 mini播放
			that.isMax = false;
		})
	}

	var pro = bvd.prototype;

	//记录信息
	pro.initInfo = function() {
		var that = this;
		//在onload状态下，offsetHeight才会获取到正确的值
		window.onload = function(){
			that.miniInfo = {//mini状态时的样式
				width: that.video.offsetWidth + 'px',
				height: that.video.offsetHeight + 'px',
				position: that.vRoom.style.position,
				transform: 'translate(0,0) rotate(0deg)'
			}
	
			var info = [
					document.documentElement.clientWidth || document.body.clientWidth,
					document.documentElement.clientHeight || document.body.clientHeigth
				],
				w = info[0],
				h = info[1],
				cha = Math.abs(h - w) / 2;
				
			that.maxInfo = {//max状态时的样式
				zIndex:99999,
				width: h + 'px',
				height: w + 'px',
				position: 'fixed',
				transform: 'translate(-' + cha + 'px,' + cha + 'px) rotate(90deg)'
			}
			
		}
		
		
	}

	pro.initEm = function() {
		
		//先添加播放按钮
		this.vimg = document.createElement("img");
		this.pimg = document.createElement("img");
		this.vimg.src='images/img/pause.png';
		this.pimg.src='images/img/play.png';
		this.vimg.className = 'vplay';
		
		this.vRoom.appendChild(this.vimg);
		this.vRoom.appendChild(this.pimg);
		this.pimg.style.display = 'none';

		//添加控制条
		this.vC = document.createElement("div");
		this.vC.classList.add('controls');
//		this.vC.innerHTML = '<div><div class="progressBar"><div class="timeBar"></div></div></div><div><span class="current">00:00</span> / <span class="duration">00:00</span></div><div><span class="fill">全屏</span></div>';
		this.vC.innerHTML = '<div><div class="progressBar"><div class="timeBar"></div></div></div><div><span class="current">00:00</span> / <span class="duration">00:00</span></div>';
		this.vRoom.appendChild(this.vC);

	}

	//跳转视频进度 单位 秒
	pro.setCurrentTime = function(t){
		this.video.currentTime += t;
	}
	//设置音量大小 单位 百分比 如 0.1
	pro.setVolume = function(v){
		this.video.volume += v;
	}
	//切换播放地址
	pro.setUrl = function(nUrl){
		var v = this.video;
		var source = v.querySelector('source');
		source.src = v.src = nUrl;
		source.type = 'video/'+nUrl.split('.').pop();
		v.play();
	}
	
	var events = {};
	
	//增加 或者删除事件    isBack 是否返回  这次添加事件时 被删除 的上一个 事件
	pro.eve = function(ename, callback, isBack) {
		var fn;
		if(callback && typeof(callback) == 'function') {
			isBack &&(fn = arguments.callee(ename));
			events[ename] = callback;
			this.video.addEventListener(ename, events[ename]);
			console.log('添加事件：' + ename);
		}else{
			fn = events[ename];
			fn && this.video.removeEventListener(ename, fn);
			console.log('删除事件：' + ename);
		}
		
		return fn;
	}

	function stom(t) {
		var m = Math.floor(t / 60);
		m < 10 && (m = '0' + m);
		return m + ":" + (t % 60 / 100).toFixed(2).slice(-2);
	}

	var nv = null;
	$.bvd = function(dom) {
		return nv || (nv = new bvd(dom));
	}

	pro.initEvent = function() {
		var that = this;
		//给播放按钮图片添加事件
		this.vimg.addEventListener('click', function() {
//			that.video.play();
			if(that.video.paused || that.video.ended) {
				//暂停时点击就播放
				if(that.video.ended) { //如果播放完毕，就重头开始播放
					that.video.currentTime = 0;
				}
				that.video.play();
			} else {
				//播放时点击就暂停
				that.video.pause();
			}
		})
		this.pimg.addEventListener('click', function() {
//			//播放时点击就暂停
			that.vimg.style.display = 'block';
			that.pimg.style.display = 'none';
			that.pimg.className = 'vplay';
			that.video.pause();
				
		})

		//获取到元数据
		this.video.addEventListener('loadedmetadata', function() {
			that.vDuration = this.duration;
			that.vC.querySelector('.duration').innerHTML = stom(that.vDuration);
		});

		//视频播放事件
		this.video.addEventListener('play', function() {
			that.vimg.style.display = 'none';
//			that.vC.classList.add('vhidden');
			that.vCt = setTimeout(function() {
				that.vC.style.visibility = 'hidden';
			}, 4000);
		})

		//视频播放中事件
		this.video.addEventListener('timeupdate', function() {
			var currentPos = this.currentTime; //获取当前播放的位置
			//更新进度条
			var percentage = 100 * currentPos / that.vDuration;
			that.vC.querySelector('.timeBar').style.width = percentage + '%';
			//更新当前播放时间
			that.vC.querySelector('.current').innerHTML = stom(currentPos);
		});

		//视频点击暂停或播放事件
		this.video.addEventListener('click', function() {
			that.pimg.style.display = 'block';
			that.vC.classList.remove('vhidden');
			that.vC.style.visibility = 'visible';
			that.pimg.className = 'vplay';
			var t =setTimeout(function(){
				that.pimg.style.display = 'none';
//				that.vC.classList.add('vhidden');
				clearTimeout(t);
			},2000)
			
			if(this.ended){
				that.pimg.style.display ="none";
			}
		})

		//暂停or停止
		this.video.addEventListener('pause', function() {
			that.vimg.style.display = 'block';
			that.vC.classList.remove('vhidden');
			that.vC.style.visibility = 'visible';
			that.vCt && clearTimeout(that.vCt);
		});

		//视频手势右滑动事件
		this.eve('swiperight',function(){
			if(that.isMax){
				return that.setVolume(0.2);
			}
			that.setCurrentTime(2);
		});
		
		//视频手势左滑动事件
		this.eve('swipeleft', function() {
			if(that.isMax){
				return that.setVolume(-0.2);
			}
			that.setCurrentTime(-2);
		});
//		this.vC.querySelector('.fill').addEventListener('click', function() {
//			//全屏显示
////			window.player.playOk("99999");
//			that.nativeMax();
//			that.switch();
//		});

	}

//	//全屏 mini 两种模式切换
//	pro.switch = function() {
//		var vR = this.vRoom;
//		//获取需要转换的样式信息
//		var info = this.isMax ? this.miniInfo : this.maxInfo;
//		for(var i in info) {
//			vR.style[i] = info[i];
//		}
//		if(info.zIndex == 99999){
//			$('.toolbar')[0].style.display="none";
//			this.vC.classList.add('vhidden');
//		}else{
//			//退出全屏
////			window.player.playOk("00000");
//			this.vC.classList.add('vhidden');
//			$('.toolbar')[0].style.display="block";
//		}
//		this.isMax = !this.isMax;
//	}
//	
	

	//使用原生支持的方式播放
	pro.nativeMax = function() {
		if(!window.plus) {
			//非html5+环境
			return;
		}
		if($.os.ios) {
			console.log('ios')
			this.video.removeAttribute('webkit-playsinline');
		} else if($.os.android) {
            var url = this.video.querySelector('source').src;
			var Intent = plus.android.importClass("android.content.Intent");
			var Uri = plus.android.importClass("android.net.Uri");
			var main = plus.android.runtimeMainActivity();
			var intent = new Intent(Intent.ACTION_VIEW);
			var uri = Uri.parse(url);
			intent.setDataAndType(uri, "video/*");
			main.startActivity(intent);
		}
	}
}(mui))