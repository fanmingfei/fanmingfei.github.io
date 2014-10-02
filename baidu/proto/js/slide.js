function slide(num,imgSrc,time,cls){
	this.num=num;
	this.imgSrc=imgSrc;
	this.time=time;
	this.cls=document.getElementsByClassName(cls)[0];	//获取box
	var canSlide=true,thisImg=0,run,ts=this;
	this.slideInit=function(){
		var text='',x;
		for(x in imgSrc){				//将所有的图片写入字符串
				text+='<li class="case" style="background-image:url('+imgSrc[x]+')"><a href=""></a></li>';
			}
		console.log(text);
		this.cls.innerHTML=text;			//将整理好的字符串变成对象写入DOM
			
		this.img=this.cls.getElementsByClassName('case');//获取轮播单位			
		this.cls.appendChild(this.img[0].cloneNode(true));	//将第一个单位复制并放到最后，为了实现连续轮播
		var BoxWidth=(num+1)*100+'%';	//计算存放图片的盒子宽度
		this.cls.style.width=BoxWidth	//设置存放图片的盒子宽度
		this.cls.style.left=0;				//设置存放图片盒子的left，以便使用jquery对其进行检测与操作
		var CaseWidth2=100/(num+1)+'%';//计算轮播单位的宽度
		for(var i=0;i<this.img.length;i++){
			this.img[i].style.width=CaseWidth2;		//设置轮播单位的宽度
		}
		run=this.slideTimeRun();
	}
	this.slideNext=function(){
		 if(canSlide==true){					//判断是否可以执行轮播
				 if(thisImg==this.num) {			//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					this.cls.style.left=0;
					thisImg=0;
				 }
				canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(run);						//停止时间间隔事件，防止下次轮播提前x
				var clsLeft=parseInt(ts.cls.style.left);
				var b=0;
				var t=setInterval(function(){
					b=b+5;
					console.log(b);
					clsLeft=clsLeft-5;
					ts.cls.style.left=clsLeft+'%';
					if(b==100){
						clearInterval(t);
						b=0;
						canSlide=true;
						thisImg++;
						run=ts.slideTimeRun();
					}
				},5);
			 }
	};
	this.slidePrev=function(){
		 if(canSlide==true){					//判断是否可以执行轮播
				 if(thisImg==0) {			//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					this.cls.style.left=-this.num*100+'%';
					thisImg=this.num;
				 }
				canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(run);						//停止时间间隔事件，防止下次轮播提前x
				var clsLeft=parseInt(ts.cls.style.left);
				var b=0;
				var t=setInterval(function(){
					b=b+5;
					console.log(b);
					clsLeft=clsLeft+5;
					ts.cls.style.left=clsLeft+'%';
					if(b==100){
						clearInterval(t);
						b=0;
						canSlide=true;
						thisImg++;
						run=ts.slideTimeRun();
					}
				},5);	
			 }
	};
	this.slideTimeRun=function(){
		return setInterval(function(){
			ts.slideNext();
				},this.time);
	}
}
