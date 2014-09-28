$(function(){
	Json={
		thisPage:0,	//当前页
		allPage:0,	//全部页面
	};
	/*
	 *	页面初始化
	 * 	给json分页，并设置分页列表
	 */
	Json.start=function(){
		$.ajax({
			 url:'http://mwebtest.duapp.com/',
			 dataType:"jsonp",
			 jsonp:"callback",
			 success:function(data){
				if(data.errno!=0){
					$('.i_list').empty().append('数据获取失败！');
					return;
				}
			 //将获取的数据分页
				var datas=data.list;
				var page=0;
				var i=0;
				var j=0;
				newdata=[];
				newdata[0]=[];
				for(var u in datas){
					if(u%9==0 && u!=0) {
						page++;
						newdata[page]=[];
						j=0;
					}
					newdata[page][j]=datas[u];
					j++;
				}
				Json.allPage=newdata.length;	//获取总页数
				
				//初始化分页
				var pageText=null;
				if(Json.allPage<=6){			//如果小于6页，正常显示
					for(var p=1;p<=Json.allPage;p++){
						pageText=pageText+'<li class="topage"><a href="javascript:;">'+p+'</a></li>';
					}
				}else{							//当大于6页，会添加省略号，和最后一页的页码
					for(var p=1;p<=6;p++){
						pageText=pageText+'<li class="topage"><a href="javascript:;">'+p+'</a></li>';
					}
					pageText=pageText+'<li>...</li><li class="lastpage"><a href="javascript:;">'+Json.allPage+'</a></li>'
				}
				$(pageText).appendTo('.i_page');	//将分页的list插入页面中
				Json.toPage(newdata,0);	//开始展示第一页
			 }
		});
	}
	/*
	 *	跳转到某页面
	 *	@newdata 所需要的数据
	 *	@page	 将要展示的页面Id
	*/
	Json.toPage=function(newdata,page){
			pagenum=page;
			var str='<%_.each(newdata[pagenum], function(item) {%> '+
						'<li>'+
						'<a class="i_a" href=""><img class="i_img" src="./images/item.jpg"></a>'+
						'<a class="i_title" href="" title="<%=item.title%>"><%=item.title%></a>'+
						'<div class="i_info">'+
							'<div class="i_opt fr">'+
								'<a href=""><em class="talk ui"></em><span><%=item.msgcount%></span></a>'+
								'<a href=""><em class="like ui"></em><span><%=item.lovecount%></span></a>'+
								'<a href=""><em class="share ui"></em><span><%=item.sharecount%></span></a>'+
							'</div>'+
							'<a class="i_user">'+
								'<img src="./images/topic.png">'+
								'<span><%=item.username%></span>'+
							'</a>'+
						'</div>'+
					'</li>'+
					'<%});%> ';
			$("#i_list").html( _.template(str, newdata[pagenum])); 
			Json.thisPage=pagenum;
	}
	$(document).on('click','.topage',function(){	//跳页操作
		Json.toPage(newdata,$(this).index());
	});
	$(document).on('click','.lastpage',function(){	//去最后一页操作
		Json.toPage(newdata,Json.allPage-1);
	});
	$('.i_prev').click(function(){					//上一页操作
		if(Json.thisPage==0) return false;			//如果是第一页，操作停止
		Json.toPage(newdata,Json.thisPage-1);		//修改当前页码数
	});
	$('.i_next').click(function(){					//下一页操作
		if(Json.thisPage==Json.allPage-1) return false;//如果是最后一页，停止操作
		Json.toPage(newdata,Json.thisPage+1);		//修改当前页码
	});
	Json.start();									//初始化
})