
//入口函数
$(function(){

    var productList = new ProductList();

        // 搜索页面点击跳转//搜索按钮点击事件//切换分类升降排序//上拉下拉页面 //跳转商品详情
    productList.searchLoca().getSearchData().productArraoge().pullPage().goProductDetail();
    

})


var ProductList = function(){

}
ProductList.prototype = {

    searchText: null,
    page: 1,
    pageSize: 2,

    //获取url的参数
    getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    },

    //商品列表的搜索框
    getSearchData: function  (){
        var that = this;
        $('#btnSearch').on('tap',function(){
            that.searchText = $('#userText').val().trim();
            that.searchData({
                proName: that.searchText,
                pageSize: that.pageSize
            });
        })
        return this;
    },

    //搜索页面跳转
    searchLoca: function  (){
        this.searchText = this.getQueryString('search');
        this.searchData({
            proName:this.searchText,
            pageSize:this.pageSize
        });
        return this;
    },

    //商品升降排列,分类
    productArraoge: function  (){
        var that = this;
        $('.listTop span').on('tap',function(){
            
            var type =$(this).data('type');
            var ify = $(this).data('ify');

            if(ify==1){
                ify=2;
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                ify=1;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            $(this).data('ify',ify);
            $(this).addClass('active').siblings().removeClass('active');

            var obj = {
                proName: that.searchText,
                pageSize: that.pageSize,
            }
            obj[type] = ify;
            that.searchData(obj);
        })
        return this;
    },


    //请求函数
    searchData: function  (par){
        var that = this;
        par.page = par.page||1;
        par.pageSize = par.pageSize||2;
        par.proName = par.proName || '鞋';
        $.ajax({
            url: '/product/queryProduct',
            data: par,
            success:function(data){
                var html = template('produstTpl',{list:data.data});
                $('.listCenter>div').html(html);

                //重置下拉加载
                mui('#refreshContainer').pullRefresh().refresh(true);
                that.page =1;
                that.pageSize = 2;
            }
        })
        return this;
    },

     //上拉加载下拉刷新
    pullPage: function () {
        var that = this;
        mui.init({
            // 初始化下拉刷新
            pullRefresh: {
                // 下拉刷新的容器 区域滚动的容器 选择器
                container: '.mui-scroll-wrapper',
                // 表示初始化下拉刷新
                down: {
                    contentdown: "你正在下拉", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "可以松手了", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "玩命刷新中...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    // 下拉刷新的回调函数 触发了下拉刷新就执行回调
                    callback: pulldownRefresh
                },
                // 表示初始化上拉加载
                up: {

                    contentrefresh: '玩命加载中...',
                    // 上拉加载的回调函数 触发上拉加载会执行回调函数
                    callback: pullupRefresh
                }
            }
        });
    
        function pulldownRefresh() {
            setTimeout(function () {
                that.searchData({
                    proName: that.searchText,
                    pageSize: that.pageSize
                });
                // 当数据刷新完毕要结束下拉刷新 不结束会一直转圈圈下次也拉不了
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500);
        }
     
        function pullupRefresh() {
            that.page++;
            setTimeout(function () {
                var obj = {
                    page:that.page,
                    pageSize:2,
                    proName: that.searchText
                }

                $.ajax({
                    url: '/product/queryProduct',
                    data: obj,
                    success:function(data){
                        that.pageSize+=data.data.length;//确保切换分类和升降序的时候还是那么多商品
                        if(data.data.length>0){
                            var html = template('produstTpl',{list:data.data});
                            $('.listCenter>div').append(html);
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                        }else{
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    }
                })
            }, 1500);
        }
        return this;
    },

    //跳转商品详情
    goProductDetail:  function  (){
        $('.listCenter').on('tap','.productDetail',function(e){
            e.preventDefault();
            var productId = $(this).data('id')
            location = './productDetail.html?productId='+productId;
        })
        return this;
    }
}

   


    
    
    

    
    
    
    

    

    

    
    
    

   

    


    
   



