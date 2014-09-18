(function($){
var global={};
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
			$('.fade'+i).addClass(name);
			i++;
		},80);
}
global.navFade(1,4)


})(jQuery);
