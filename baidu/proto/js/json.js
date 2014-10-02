//获取数据
var jsonpData = document.createElement('script');
jsonpData.type="text/javascript";
jsonpData.src="http://mwebtest.duapp.com/?callback=callback";
document.getElementsByTagName('body')[0].appendChild(jsonpData);

function callback(data) {	
//将获取的数据分页
	json= new Json(data);		//实例化
	json.start();				//初始化
	document.getElementsByClassName('i_footer')[0].onclick=function(evt){				//给i_footer委派事件 实现翻页
		var evt=evt || window.event;
		var link=evt.target;
		if(link.className=='tp'){
			json.toPage(json.newdata,link.attributes['index'].value-1);//设置点击页码的事件
		}else if (link.className.indexOf('i_next')>=0){	
			json.toPage(json.newdata,json.allPage-1);
		}else if (link.className.indexOf('i_prev')>=0){
			json.toPage(json.newdata,0);
		}
	}

}

function Json(data){
	this.start=function(){
		var datas=data.list;
		var page=0;
		var j=0;
		var newdata=[]
		newdata[0]=[];
		for(var u in datas){
			if(u%9==0 && u!=0) {
				page++;
				newdata[page]=[];
				j=0;
			}
			//处理超大数值，以便页面显示
			if(datas[u].count>=10000){
				var count=datas[u].msgcount.toString();
				datas[u].msgcount=count.substr(0,count.length-4)+'万';
			}
			if(datas[u].lovecount>=10000){
				var count=datas[u].sharecount.toString();
				datas[u].lovecount=count.substr(0,count.length-4)+'万';
			}
			if(datas[u].sharecount>=10000){
				var count=datas[u].sharecount.toString();
				datas[u].sharecount=count.substr(0,count.length-4)+'万';
			}

			newdata[page][j]=datas[u];
			j++;
		}
		this.newdata=newdata;
		this.allPage=newdata.length;	//获取总页数
		
		//初始化分页
		var pageText='';
		if(this.allPage<=6){			//如果小于6页，正常显示
			for(var p=1;p<=this.allPage;p++){
				pageText=pageText+'<li class="topage"><a href="javascript:;" class="tp" index='+p+'>'+p+'</a></li>';
			}
		}else{							//当大于6页，会添加省略号，和最后一页的页码
			for(var p=1;p<=6;p++){
				pageText=pageText+'<li class="topage"><a href="javascript:;" class="tp" index='+p+'>'+p+'</a></li>';
			}
			pageText=pageText+'<li>...</li><li class="lastpage"><a href="javascript:;" index='+this.allPage+'>'+this.allPage+'</a></li>'
		}
		document.getElementsByClassName('i_page')[0].innerHTML=pageText;	//将分页的list插入页面中
		this.toPage(newdata,0);	//开始展示第一页
	}
	/*
	 *	@param 跳转到某页面
	 *	@argument newdata 所需要的数据
	 *	@argument page	 将要展示的页面Id
	*/
	this.toPage=function(newdata,page){
			var str='';
			for (var x in newdata[page]){
				str=str+'<li>'+
						'<a class="i_a" href=""><img class="i_img" src="./images/item.jpg"></a>'+
						'<a class="i_title" href="" title="'+newdata[page][x].title+'">'+newdata[page][x].title+'</a>'+
						'<div class="i_info">'+
							'<div class="i_opt fr">'+
								'<a href=""><em class="talk ui"></em><span>'+newdata[page][x].msgcount+'</span></a>'+
								'<a href=""><em class="like ui"></em><span>'+newdata[page][x].lovecount+'</span></a>'+
								'<a href=""><em class="share ui"></em><span>'+newdata[page][x].sharecount+'</span></a>'+
							'</div>'+
							'<a class="i_user">'+
								'<img src="./images/topic.png">'+
								'<span>'+newdata[page][x].username+'</span>'+
							'</a>'+
						'</div>'+
					'</li>';
			}
			var i_list=document.getElementById("i_list");
			i_list.innerHTML=str;
			this.thisPage=page;	//记录当前页面
			var toPage=document.getElementsByClassName("topage");
			
			/* 不采用此种方法绑定事件，采用事件委托来绑定
			var ts=this;
			for (var v=0;v<toPage.length;v++){
				toPage[v].onclick=(function(){
					return function (){
						ts.toPage(newdata,this.attributes['index'].value-1);
					}
				})()
			}
			*/
			
			//更换thispage给当前页面
			for(var i=0; i<toPage.length;i++){
				var reg = new RegExp('(\\s|^)thispage(\\s|$)');  
				toPage[i].className = toPage[i].className.replace(reg, ' ');  
			}
			var oldClass=toPage[page].getAttribute('class');
			if(!oldClass){  //如果元素没有CSS类，则直接添加
				toPage[page].className='thispage';
			}
			else{  //如果元素已经有了CSS类，则在原有类名后面再添加类
				oldClass+=' ';
				oldClass+='thispage';
				toPage[page].className=oldClass;
			}
	}
}

