
//入口函数
window.addEventListener('load',function(){
    // 构造函数实例化对象,赋值原型方法
    var index = new Index();
    //自动轮播图  //滚动页面   //跳转到购物车
    index.slide().pageRoll().goCartPage();
    
    
})



var Index = function(){
    
};

Index.prototype = {
    //自动轮播图函数
    slide: function () {
        mui("#slider").slider({
            interval: 2000
        });
        return this;
    },
    // 页面滑动函数
    pageRoll: function () {
        mui('#main.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false
        });
        return this;
    },


     //跳转到购物车
     goCartPage: function(){
        var that = this
        $('#goCart').on('tap',function(){
            $.ajax({
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



			
