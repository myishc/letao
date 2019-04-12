

// 入口函数
window.addEventListener('load',function(){

    var category = new Category();
    //左边列表滚动//右边页面滚动 //搜素框点击事件//左边列表数据异步请求//右边列表数据异步请求
    category.rollLeft().rollRight().searchData().leftAjax().rightAjax(1).goCartPage();

})

// 创建构造函数
var Category = function (){

};

// 把方法函数全部添加到构造函数原型中
Category.prototype = {

    // 左边列表滚动函数
    rollLeft: function (){
        mui('#commList.mui-scroll-wrapper').scroll({
            deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false 
        });
        return this;
    },

    //搜索框点击事件
    searchData: function(){
        $('#header #btnSearch').on('tap', function (e) {
            e.preventDefault();
            var userText = $('#userText').val().trim();
            if (userText == '') {
                return;
            }
            $('#userText').val('');
            location.href = 'productList.html?search=' + userText;
        })
        return this;
    },

    // 右边列表滚动函数
    rollRight: function (){
        mui('#commShow.mui-scroll-wrapper').scroll({
            deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: true 
        });
        return this;
    },

    // 请求左边列表数据函数
    leftAjax: function (){
        var that = this;
        $.ajax({
            beforeSend: function () {
                // console.log('请求之前会调用的回调函数');
                // 发请求之前显示遮罩层
                $('.mask').show();
            },
            complete: function () {
                // console.log('请求之后会调用的回调函数');
                // 请求完成要隐藏遮罩层
                setTimeout(function () {
                    $('.mask').hide();
                }, 3000);
            },
            url: '/category/queryTopCategory',
            success: function(data){
                var html =template('categoryLeftTpl',{list:data.rows});
                $('#commList ul').html(html);
                that.togglePage();
            }
        })
        return this;
    },

    // 请求右边品牌数据
    rightAjax: function (id){
        $.ajax({
            beforeSend: function () {
                // console.log('请求之前会调用的回调函数');
                // 发请求之前显示遮罩层
                $('.mask').show();
            },
            complete: function () {
                // console.log('请求之后会调用的回调函数');
                // 请求完成要隐藏遮罩层
                setTimeout(function () {
                    $('.mask').hide();
                }, 3000);
            },
            url: '/category/querySecondCategory',
            data:{id:id},
            success: function(data){
                var html =template('categoryRightTpl',{list:data.rows});
                $('#commShow .center>div').html(html);
            }
        })
        return this;
    },

    // 切换分类页面
    togglePage: function (){
        var that = this
        $('#commList ul li').on('tap',(function(){
            let id = $(this).data('id');
            that.rightAjax(id);
            $(this).addClass('active').siblings().removeClass('active');
        }))
        return this;
    },

    //跳转到购物车
    goCartPage: function(){
        
        $('#goCart').on('tap',function(){
            $.ajax({
                beforeSend: function () {
                    // console.log('请求之前会调用的回调函数');
                    // 发请求之前显示遮罩层
                    $('.mask').show();
                },
                complete: function () {
                    // console.log('请求之后会调用的回调函数');
                    // 请求完成要隐藏遮罩层
                    setTimeout(function () {
                        $('.mask').hide();
                    }, 3000);
                },
                url: '/cart/queryCart',
                success: function(row){
                    console.log(row);
                    if(row.error){
                        location = './login.html?returnUrl='+location.href;
                    }else{
                        location = 'userCart.html?returnUrl='+location.href;
                    }
                }
            })
        })
        return this;
    }
}









