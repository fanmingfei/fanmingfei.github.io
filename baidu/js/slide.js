$(function(){
	Slide={
		num:4,			//图片数
		time:2000,			//自动轮播时间间隔
		imgSrc:['./images/banner1.jpg','./images/banner2.jpg','./images/banner3.jpg','./images/banner4.jpg'],//存放图片的数组
		text:null,				//用来存放添加到dom的字符串
		canSlide:true,			//是否能够轮播，防止多次轮播
		CaseWidth:'100%',		//盒子宽度，不需要修改
		thisImg:0
	}
		/*
		 *	页面初始化
		 */
		Slide.start=function(){
			for(var x in Slide.imgSrc){				//将所有的图片写入字符串
				Slide.text+='<li class="case" style="background-image:url('+Slide.imgSrc[x]+')"><a href=""></a></li>';
			}
			$(Slide.text).appendTo('.Box');			//将整理好的字符串变成对象写入DOM
			var img=$('.case');						//获取轮播单位
			$(img[0]).clone(true).appendTo('.Box');	//将第一个单位复制并放到最后，为了实现连续轮播
			var BoxWidth=(Slide.num+1)*100+'%';	//计算存放图片的盒子宽度
			$('.Box').css('width',BoxWidth);		//设置存放图片的盒子宽度
			$('.Box').css('left','0');				//设置存放图片盒子的left，以便使用jquery对其进行检测与操作
			var CaseWidth2=100/(Slide.num+1)+'%';//计算轮播单位的宽度
			$('.case').css('width',CaseWidth2);		//设置轮播单位的宽度
		};
		/*
		 *	下一张轮播图片
		 */
		Slide.next=function(){
			if(Slide.canSlide==true){					//判断是否可以执行轮播
				if(Slide.thisImg==Slide.num) {	//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					$('.Box').css('left','0');
					Slide.thisImg=0;
				}
				Slide.canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(t);						//停止时间间隔事件，防止下次轮播提前
				$('.Box').animate({'left':"-="+Slide.CaseWidth},function(){
					Slide.canSlide=true;				//轮播完毕，可以进行下一次轮播
					Slide.thisImg++;					//改变当前图片记录
					t=Slide.run()						//开始时间间隔事件
					});
			}
		};
		/*
		 *	上一张轮播图片
		 */
		Slide.prev=function(){
			if(Slide.canSlide==true){					//判断是否可以执行轮播
				if(Slide.thisImg==0) return false;		//判断是否是第一张，如果是停止该动作
				Slide.canSlide=false;					//停止时间间隔事件，防止下次轮播提前
				clearInterval(t);						//停止时间间隔事件，防止下次轮播提前
				$('.Box').animate({'left':"+="+Slide.CaseWidth},function(){
					Slide.canSlide=true;				//轮播完毕，可以进行下一次轮播
					Slide.thisImg--;					//改变当前图片记录
					t=Slide.run()						//开始时间间隔事件
					});	
			}
		}
		/*
		 *	设置一个时间间隔，自动轮播
		 */
		Slide.run=function(){
			return setInterval(function(){
				if(Slide.canSlide==true){					//判断是否可以执行轮播
					if(Slide.thisImg==Slide.num) { //判断是否是最后一个轮播单位，如果是变为第一个轮播单位
						$('.Box').css('left','0');
						Slide.thisImg=0;
					}
					Slide.canSlide=false;					//停止时间间隔事件，防止下次轮播提前
					clearInterval(t);						//停止时间间隔事件，防止下次轮播提前
					$('.Box').animate({'left':"-="+Slide.CaseWidth},function(){
						Slide.canSlide=true;				//轮播完毕，可以进行下一次轮播
						Slide.thisImg++;					//改变当前图片记录
						t=Slide.run()						//开始时间间隔事件
						});
				}
				},Slide.time);
		}
	
	
	
	Slide.start();											//初始化
	var t=Slide.run();										//开始轮播
	$('.nextpage').click(function(){Slide.next();});		//鼠标点击下一张事件
	$('.prevpage').click(function(){Slide.prev();});		//鼠标点击上一张事件

})