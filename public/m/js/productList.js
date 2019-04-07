

$(function(){

    var searchText,page=1,pageSize=2;

    // 搜索页面点击跳转
    searchLoca();
    //搜索按钮点击事件
    getSearchData();
    //切换分类升降排序
    productArraoge();
    //上拉下拉页面
    pullPage();

    //搜索页面跳转
    function searchLoca (){
        searchText = getQueryString('search');
        searchData({
            proName:searchText,
            pageSize:pageSize
        });
    }

    

    //获取url的参数
    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
    } 

    //商品列表的搜索框
    function getSearchData (){
        $('#btnSearch').on('tap',function(){
            searchText = $('#userText').val().trim();
            searchData({
                proName:searchText,
                pageSize:pageSize
            });
        })
    }

    //商品升降排列,分类

    function productArraoge (){

        $('.listTop span').on('tap',function(){
            
            var type =$(this).data('type');
            var ify = $(this).data('ify');
            // console.log(type,ify);

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
                proName: searchText,
                pageSize:pageSize,
            }
            obj[type] = ify;
            searchData(obj);
        })
    }

    
    //请求函数
    function searchData (par){
        par.page = par.page||1;
        par.pageSize = par.pageSize||2;
        par.proName = par.proName || '鞋';
        $.ajax({
            url: '/product/queryProduct',
            data: par,
            success:function(data){
                var html = template('produstTpl',{list:data.data});
                $('.listCenter>div').html(html);
            }
        })
    }

    //上拉加载下拉刷新

    function pullPage() {
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
                searchData({
                    proName: searchText,
                    pageSize: pageSize
                });
                // 当数据刷新完毕要结束下拉刷新 不结束会一直转圈圈下次也拉不了
                mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500);
        }
     
        function pullupRefresh() {
            page++;
            setTimeout(function () {
                var obj = {
                    page:page,
                    pageSize:pageSize,
                    proName: searchText
                }

                $.ajax({
                    url: '/product/queryProduct',
                    data: obj,
                    success:function(data){
                        pageSize+=data.data.length;//确保切换分类和升降序的时候还是那么多商品
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

    }


    //加入购物车
    // function proAddCart(){
    //     $('.addCart').on('tap',function(){
            
    //     })
    // }
})


