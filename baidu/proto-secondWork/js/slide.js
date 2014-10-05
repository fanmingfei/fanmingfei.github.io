function Slide(imgSrc,cls,time){
	this.time=5000;
	this.num=imgSrc.length;
	this.imgSrc=imgSrc;
	if(time) {
	this.time=time;
	}
	this.cls=document.getElementById(cls);	//获取box
	this.canSlide=true;
	this.thisImg=0;
	this.run='';
}
	Slide.prototype.slideInit=function(){
		var text='',x;
		for(x in this.imgSrc){				//将所有的图片写入字符串
				text+='<li class="case" style="background-image:url('+this.imgSrc[x]+')"><a href=""></a></li>';
			}
		this.cls.innerHTML=text;			//将整理好的字符串变成对象写入DOM
			
		this.img=this.cls.getElementsByClassName('case');	//获取轮播单位			
		this.cls.appendChild(this.img[0].cloneNode(true));	//将第一个单位复制并放到最后，为了实现连续轮播
		var BoxWidth=(this.imgSrc.length+1)*100+'%';		//计算存放图片的盒子宽度
		this.cls.style.width=BoxWidth						//设置存放图片的盒子宽度
		this.cls.style.left=0;								//设置存放图片盒子的left，以便使用jquery对其进行检测与操作
		var caseWidth2=100/(this.imgSrc.length+1)+'%';		//计算轮播单位的宽度
		for(var i=0;i<this.img.length;i++){
			this.img[i].style.width=caseWidth2;				//设置轮播单位的宽度
		}
		this.run=this.slideTimeRun();
	}
	Slide.prototype.slideNext=function(){
		 if(this.canSlide==true){					//判断是否可以执行轮播
				 if(this.thisImg==this.num) {		//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					this.cls.style.left=0;
					this.thisImg=0;
				 }
				this.canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(this.run);				//停止时间间隔事件，防止下次轮播提前x
				var clsLeft=parseInt(ts.cls.style.left);
				var b=0;
				ts=this;
				var t=setInterval(function(){
					b=b+5;
					clsLeft=clsLeft-5;
					ts.cls.style.left=clsLeft+'%';
					if(b==100){
						clearInterval(t);
						b=0;
						ts.canSlide=true;
						ts.thisImg++;
						ts.run=ts.slideTimeRun();
					}
				},5);
			 }
	}
	Slide.prototype.slidePrev=function(){
		 if(this.canSlide==true){					//判断是否可以执行轮播
				 if(this.thisImg==0) {				//判断是否是最后一个轮播单位，如果是变为第一个轮播单位
					this.cls.style.left=-this.num*100+'%';
					this.thisImg=this.num;
				 }
				this.canSlide=false;					//准备轮播，禁止重复轮播事件发生
				clearInterval(this.run);				//停止时间间隔事件，防止下次轮播提前x
				var clsLeft=parseInt(ts.cls.style.left);
				var b=0;
				ts=this;
				var t=setInterval(function(){
					b=b+5;
					clsLeft=clsLeft+5;
					ts.cls.style.left=clsLeft+'%';
					if(b==100){
						clearInterval(t);
						b=0;
						ts.canSlide=true;
						ts.thisImg++;
						ts.run=ts.slideTimeRun();
					}
				},5);	
			 }
	};
	Slide.prototype.slideTimeRun=function(){
		ts=this;
		return setInterval(function(){
			ts.slideNext();
				},this.time);
	}
