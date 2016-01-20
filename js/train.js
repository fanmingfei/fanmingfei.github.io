
var watchArr = [];


var $tip  = $('<div style="position: fixed; width: 100%;min-height: 100px; background: red; left: 0; bottom: 0; line-height: 2; font-size: 18px; color: #FFF;text-align: center; word-wrap: break-word;"></div>');

$tip.appendTo('body')

$tip.html('<div>请点击你要抢票的余票方格！选完后点下面的按钮<br/>刷票间隔时间（默认两秒，最快0.5秒，小心被封）：<input type="text" value="2" id="freshTime" style="width: 30px;height: 20px; line-height:20px;" /><br><button id="startBtn" style="width: 100px; height: 40px">开始刷票</button></div> 温馨提示：请先登录你的12306，并且每隔1小时检查一下登陆状态，点击开始按钮以后，如果有符合要求票的话系统将会弹窗提醒，然后自动跳转到买票窗口（然后瞬间选好你的乘客，要自己手动输入验证码），一般工作状态下都可以看到弹窗。');

$('body').css('padding-bottom', $tip.height());


var clickDom =  $('[width="46"]');


setTimeout(function () {
    clickDom.css('background', '#ddd');
}, 500)
setTimeout(function () {
    clickDom.css('background', '');
}, 800)
setTimeout(function () {
    clickDom.css('background', '#ddd');
}, 1000)

setTimeout(function () {
    clickDom.css('background', '');
}, 1200)
setTimeout(function () {
    clickDom.css('background', '#ddd');
}, 1500)

setTimeout(function () {
    clickDom.css('background', '');
}, 1700)
setTimeout(function () {
    clickDom.css('background', '#ddd');
}, 2000)

clickDom.on('click', function (e) {
    if (($(this).text() == '--') || ($(this).text() == '有') || ($(this).text() == '')) {
        return;
    }
    var sl = $(this).attr('isSelect');
    if (sl == '1') {
        $(this).css('background-color', '#ddd');
        $(this).attr('isSelect', '0')
    } else {
        $(this).css('background-color', 'rgb(0, 128, 0)');
        $(this).attr('isSelect', '1')
    }
})

$('#startBtn').on('click', function () {
    $.each(clickDom, function(i, d) {
        if ($(d).attr('isSelect') == '1') {
            watchArr.push($(d).attr('id'));
        }
    })
    if (watchArr.length = 0){
	alert('请重新选择车次信息')
	return;
    }
    var time = parseInt($('#freshTime').val()) * 1000;
    start(time);
    $(this).text('正在刷票！')
    $('#startBtn').unbind('click');
    console.log('start');
});

var lock = false;

function start (time) {
    var autoFreshTime = setInterval(function () {
        query_ticket.click();
    }, time);

    var autoCheckTime = setInterval(function () {

        var ticket = {};

        watchArr.forEach(function (x) {

	    if (lock) {
		return;
	    }
            var flag = ($('#'+x).text() != '无' && $('#'+x).text() != '*' &&$('#'+x).text() != '');

            if (flag) {
                clearInterval(autoFreshTime);
                clearInterval(autoCheckTime);
                alert('有票！！！！');
                $('#'+x).closest('tr').find('.btn72').click();
		lock = true;
                return;
            }
        })

    },500)

}
