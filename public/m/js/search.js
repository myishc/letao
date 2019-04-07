

//入口函数
$(function(){

    // 在页面中加载历史数据
    loadHistory();
    //把用户输入的数据保存
    addHistory();
    //清空删除函数
    clearHistory();
    deleteHistory();
    // 页面滑动
    rollPage();


    //获取历史记录数据函数
    function getHistoryData(){
        var arr =  localStorage.getItem('historyArr');
        if(arr){
            arr = JSON.parse(arr);
        }else{
            arr = [];
        }
        return arr;
    }
    
    //将数据重新保存
    function setHistoryData (arr){
        localStorage.setItem('historyArr',JSON.stringify(arr));
    }

   //搜索框点击事件函数
    function addHistory(){
        
        $('#main #btnSearch').on('tap',function(e){
            e.preventDefault();
            var userText = $('#userText').val().trim();
            if(userText==''){
                return;
            }
            var arr = getHistoryData();
            for (var i = 0;i < arr.length; i++){
                if(arr[i]==userText){
                    arr.splice(i,1);
                    i--;
                }
            }
            arr.unshift(userText);
            setHistoryData(arr);
            $('#userText').val('');
            loadHistory();
            location.href = 'productList.html?search='+userText;
        })
    }

    //   将搜索历史数据存入loca中
    function loadHistory (){
        var arr = getHistoryData();
        var html = template('centerTel',{list:arr})
        $('#main .hisCenter ul').html(html)
    }

        //单个删除历史记录函数
    function deleteHistory(){ 
        $('#main .hisCenter ul').on('tap','.btnDelete',function(){
            var index = $(this).data('index');
            var arr = getHistoryData();
            arr.splice(index,1);
            $('#main .hisCenter li').eq(index).remove();
            setHistoryData(arr);
            loadHistory();
        })
    }

    //清空历史记录函数
    function clearHistory(){
        $('#main .btnClear').on('tap',function(){
            if(confirm('确定清空吗?')){
                localStorage.removeItem('historyArr');
                loadHistory();
            }
        })
    }

    function rollPage(){
        mui('#main .history .mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false 
        })
    } 
})