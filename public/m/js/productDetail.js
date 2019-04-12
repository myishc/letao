
//入口函数
$(function(){
    
    var productDetail = new ProductDetail();
            // 自动轮播图  //获取商品数据// 获取用户选择数据 //添加到购物车 //跳转到购物车
    productDetail.autoSlide().getProductData().selectSize().addCart().goCartPage();

})

var ProductDetail = function(){

};

ProductDetail.prototype ={
    
    //自动轮播图
    autoSlide: function(){
        var gallery = mui('#main #slide');
            gallery.slider({
            interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        return this;
    },

    //获取商品数据渲染页面
    getProductData: function (){
        var that = this
        that.id =that.getQueryString('productId');
    
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
            url: '/product/queryProductDetail',
            data:{
                id:that.id
            },
            success: function(data){
                
                var minSize = +data.size.split('-')[0];
                var maxSize = +data.size.split('-')[1];
                var arr= [];
                for (var i = minSize;i <=maxSize ; i++){
                    arr.push(i);
                }
                data.size = arr;
                console.log(data);
                var html = template('mainTpl',data);
                $('#pageRoll').html(html);
    
                //重新调用组件
                mui('.mui-numbox').numbox();
                //轮播图
                that.autoSlide();
                //滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
                
            }
        })
        return this;
    },

    //获取url的参数
    getQueryString: function (name) { 
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
      var r = window.location.search.substr(1).match(reg); 
      if (r != null) return decodeURI(r[2]); 
      return null; 
    },

    //页码点击
    selectSize: function (){
        $('#pageRoll').on('tap','.btnSize',function(){
            $(this).addClass('mui-btn-danger').siblings().removeClass('mui-btn-danger');
        })
        return this;
    },

    //消息提示
    messageHint: function  (text){
        mui.toast(text,{ duration:'long', type:'div' });
        return this;
    },

    //加入购物车
    addCart: function (){
        var that = this
        $('#addCart').on('tap',function(){
            that.size = $('.btnSize.mui-btn-danger').data('size');
            that.num = mui('.mui-numbox').numbox().getValue();

            //判断是否登录
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
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: that.id,
                    size: that.size,
                    num: that.num
                },
                success: function (row) {
                    if (row.error) {
                        that.messageHint('请登录,再开始购物');
                        location = './login.html?returnUrl='+location.href;
                    }else{
                        that.messageHint('已加入购物车');
                    }
                }
            })
        })
        return this;
    },


    //跳转到购物车
    goCartPage: function(){
        var that = this
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









  