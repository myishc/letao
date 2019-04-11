



$(function(){

    var cart = new Cart();
        //加载购物车数据  //返回上一页  // 刷新当前页面 //跳转商品详情页    //删除购物车商品 //编辑购物车商品
    cart.loadCartData().refreshPage().goProductDeatils().cartProDelete().editCartData();


})


var Cart = function(){

}

Cart.prototype = {

    //初始化
    startSlide: function (){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        return this;
    },

    messageHint: function  (text){
        mui.toast(text,{ duration:'long', type:'div' });
        return this;
    },

    //加载购物车数据
    loadCartData: function (){
        var that = this;
        $.ajax({
            url: "/cart/queryCart",
            success: function (data) {
                if (data.error) {
                    that.messageHint('请登录,再开始购物');
                    location = './login.html?returnUrl='+location.href;
                }else{
                    var html = template('cartTpl',{list:data});
                    $('.productList>ul').html(html);
                    that.startSlide();
                    that.priceTotal();
                    that.checkboxChange();
                }
            }
        });
        return this;
    
    },

    //获取url
    getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    },

    //刷新当前页面
    refreshPage: function(){

        $('.fa-refresh').on('tap',function(){
            location.reload();
        })
        return this;  
    },

    //点击跳转商品详情页
    goProductDeatils: function(){
        var that = this;

        $('.productList').on('tap','.goProDeta',function(){
            
            var proId = $(this).data('id');
            location = 'productDetail.html?productId='+proId;
        })
        return this;  
    },

    //消息提示
    messageHint: function  (text){
        mui.toast(text,{ duration:'long', type:'div' });
        return this;
    },

    //购物车商品删除
    cartProDelete: function(){
        var that = this;
        $('.productList').on('tap','.btnDelete',function(){
            var proId = $(this).data('id');
            var li = $(this).parent().parent();
            mui.confirm('亲,确认要删除吗？', '提示', ['确定','取消'], function(e) {
                if (e.index == 0) {
                   $.ajax({
                       url: '/cart/deleteCart',
                       data:{
                           id: proId
                       },
                       success: function(data){
                            if(data.success){
                                that.loadCartData();
                            }else{
                                that.messageHint('删除失败');
                            }
                       }
                   })
                } else {
                    mui.swipeoutClose(li[0]);
                }
            });
        })
        return this;
    },

    //编辑购物车商品
    editCartData: function(){
        var that = this;
        $('.productList').on('tap','.btnEdit',function(){
            var proData = $(this).data('prodata');
            var li = $(this).parent().parent();

            var minSize = +proData.productSize.split('-')[0];
            var maxSize = +proData.productSize.split('-')[1];
            var arr= [];
            for (var i = minSize;i <=maxSize ; i++){
                arr.push(i);
            }
            proData.productSize = arr;
            console.log(proData);
            var html = template('cartEditTpl',proData);
            html = html.replace(/[\r\n]/g,"");
            
            mui.confirm(html, '编辑商品', ['确定','取消'], function(e) {
                 //重新启用控件
                if (e.index == 0) {
                    that.size = $('.btnSize.mui-btn-danger').data('size');
                    that.num = mui('.mui-numbox').numbox().getValue();
                   $.ajax({
                       url: '/cart/updateCart',
                       type: 'post',
                       data:{
                           id: proData.id,
                           size: that.size,
                           num: that.num
                       },
                       success: function(data){
                            if(data.success){
                                that.loadCartData();
                            }else{
                                that.messageHint('编辑失败');
                            }
                       }
                   })
                } else {
                    mui.swipeoutClose(li[0]);
                }
            });
            //初始化控件
            mui('.mui-numbox').numbox();
            that.selectSize();
        })
        return this;
    },

    // 页码点击
    selectSize: function (){
        $('.btnSize').on('tap',function(){
            $(this).addClass('mui-btn-danger').siblings().removeClass('mui-btn-danger');
        })
        return this;
    },

    // 总价合计
    priceTotal: function(){

        var checked = $('input:checked');
        var numPrice =0;
        checked.each(function(index,ele){
            numPrice+=$(ele).data('price')*$(ele).data('num');
        })
         numPrice=numPrice.toFixed(2);
       
        $('#submitOrder span').html(numPrice);
        return this;
    },

    //多选框选择取消事件
    checkboxChange: function(){
        var that = this;
        $('.mui-checkbox input').on('change',function(){
            that.priceTotal();
        })
    }
}











