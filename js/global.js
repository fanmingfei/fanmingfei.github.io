(function($){
var global={
	changePageIng:false,
};
//首页简介翻转显示效果
global.firstDown= function(frnum,lsnum){
		var i=frnum;
		var name=null;
		setInterval(function(){
			if(i==lsnum+1){
				return;
			}
			name='down'+i+'-action';
			$('.down'+i).addClass(name);
			i++;
		},800);
}
global.firstDown(2,4);

//首页 nav 出现效果
global.navFade=function(frnum,lsnum){
		var i=frnum;
		var name=null;
		setInterval(function(){
			if(i==lsnum+1){
				return;
			}
			name='fade'+i+'-action';
			name1='fade'+i+'-normal';
			$('.fade'+i).addClass(name);
			i++;
		},80);
}
global.navFade(1,4);
//返回首页后nav效果
global.backFade=function(frnum,lsnum){
		var i=frnum;
		var name=null;
		setInterval(function(){
			if(i==lsnum+1){
				return;
			}
			name='fade'+i+'-normal';
			$('.fade'+i).removeClass(name);
			i++;
		},80);
}
//移出首页后nav效果
global.outFade=function(frnum,lsnum){
		var i=frnum;
		var name=null;
		setInterval(function(){
			if(i==lsnum+1){
				return;
			}
			name='fade'+i+'-normal';
			$('.fade'+i).addClass(name);
			i++;
		},80);
}
global.navChangePage=function(){
	var section=$('.section');
	if(parseInt(parseInt($(section[0]).css('top')))==0){
		global.backFade(1,4);
	}else{
		global.outFade(1,4);
	}
	global.twoPage();
}
//离开首页后nav效果

//设置单页页面全屏
global.pageMax=function(){
	$('.section').width($(window).width());
	$('.section').height($(window).height());
	var section=$('.section');
	for(var i=0;i<section.length;i++){
		$(section[i]).css('top',$(window).height()*i+'px');
	}
}
global.pageMax();
//滑动到下一页
global.nextPage=function(){
	if(global.changePageIng==true){
		return;
	}
	var section=$('.section');
	if(parseInt($(section[section.length-1]).css('top'))==0){
			return;
	}
	global.changePageIng=true;
	$('.section').animate({top:'-='+$(window).height()+'px'},function(){global.changePageIng=false;global.navChangePage();});
	
}
//滑动到上一页
global.prevPage=function(){
	if(global.changePageIng==true){
		return;
	}
	var section=$('.section');
	if(parseInt($(section[0]).css('top'))==0){
		return;
	}
	global.changePageIng=true;
	$('.section').animate({top:'+='+$(window).height()+'px'},function(){global.changePageIng=false;global.navChangePage();});
	
}
//滑动到指定页面
global.toPage=function(page){
	if(global.changePageIng==true){
		return;
	}
	var section=$('.section');
	pageTop=parseInt($(section[page-1]).css('top'));
	$('.section').animate({top:'-='+pageTop},function(){global.changePageIng=false;global.navChangePage();});
}
//给导航按钮绑定点击事件
global.bindClick=function(){
$('.fade').click(function(){
	global.toPage($(this).index()+2);
})
}
global.bindClick();
//到第二页事件
global.twoPage=function(){
	var section=$('.section');
	if(parseInt($(section[1]).css('top'))==0){
		global.firstDown(5,8);
	}
}
//鼠标移入works item的时候
$('.work-item').on('mouseover',function(){
	$(this).children('img').addClass('action');
	$(this).children('.work-info').addClass('action');
});
$('.work-item').on('mouseout',function(){
	$(this).children('img').removeClass('action');
	$(this).children('.work-info').removeClass('action');
});
//监控按键输入
$(window).keydown(function(event){
	switch(event.keyCode){
		case 38:
			global.prevPage();
			break;
		case 40:
			global.nextPage();
			break;
		default:
			break;
	}
})
//当屏幕变化时
$(window).resize(function(){
global.pageMax();
})
$('.bg-down-arrow').click(function(){
	global.nextPage();
});
$(document).on('mousewheel DOMMouseScroll', function(e){
    var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
	if(delta<0){
		global.nextPage();
	}else if(delta>0){
		global.prevPage();
	}
});


})(jQuery);