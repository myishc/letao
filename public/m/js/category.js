

// 入口函数
window.addEventListener('load',function(){
    //左边列表滚动
    rollLeft();
    //右边页面滚动
    rollRight();
    //左边列表数据异步请求
    leftAjax();
    //右边列表数据异步请求
    rightAjax(1);


})


// 左边列表滚动函数
function rollLeft(){
    mui('#commList.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false 
    });
}
// 右边列表滚动函数
function rollRight(){
    mui('#commShow.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: true 
    });
}
// 请求左边列表数据函数
 function leftAjax(){
    $.ajax({
        url: '/category/queryTopCategory',
        success: function(data){
            var html =template('categoryLeftTpl',{list:data.rows});
            $('#commList ul').html(html);
            togglePage();
        }
    })
}

// 请求右边品牌数据
function rightAjax(id){
    $.ajax({
        url: '/category/querySecondCategory',
        data:{id:id},
        success: function(data){
            var html =template('categoryRightTpl',{list:data.rows});
            $('#commShow .center>div').html(html);
        }
    })
}
// 切换分类页面
function togglePage(){
    $('#commList ul li').on('tap',(function(){
        let id = $(this).data('id');
        rightAjax(id);
        $(this).addClass('active').siblings().removeClass('active');
    }))
}
