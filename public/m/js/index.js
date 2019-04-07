
//入口函数
window.addEventListener('load',function(){
    //自动轮播图
    index.slide();
    //页面滚动
    index.pageRoll();
})

var index = {};

//自动轮播图函数
index.slide = function(){
    mui("#slider").slider({
        interval: 2000
    });
}

// 页面滑动函数
index.pageRoll = function(){
    mui('#main.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false 
    });
}
    
   		
			
