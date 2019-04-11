

//入口函数
$(function(){

    var search = new Search();
    // 在页面中加载历史数据//把用户输入的数据保存   //清空删除函数        // 页面滑动
    search.loadHistory().addHistory().clearHistory().deleteHistory().rollPage();
    
})


var Search = function () {

}

Search.prototype = {

    //获取历史记录数据函数
    getHistoryData: function () {
        var arr = localStorage.getItem('historyArr');
        if (arr) {
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }
        return arr;
    },

    //将数据重新保存
    setHistoryData: function (arr) {
        localStorage.setItem('historyArr', JSON.stringify(arr));
        return this;
    },

    //搜索框点击事件函数
    addHistory: function () {
        var that = this;
        $('#main #btnSearch').on('tap', function (e) {
            e.preventDefault();
            var userText = $('#userText').val().trim();
            if (userText == '') {
                return;
            }
            var arr = that.getHistoryData();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == userText) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            arr.unshift(userText);
            that.setHistoryData(arr);
            $('#userText').val('');
            that.loadHistory();
            location.href = 'productList.html?search=' + userText;
        })
        return this;
    },

    //   将搜索历史数据存入loca中
    loadHistory: function () {
        var arr = this.getHistoryData();
        var html = template('centerTel', {
            list: arr
        })
        $('#main .hisCenter ul').html(html)
        return this;
    },

    //单个删除历史记录函数
    deleteHistory: function () {
        var that = this;
        $('#main .hisCenter ul').on('tap', '.btnDelete', function () {
            var index = $(this).data('index');
            var arr = that.getHistoryData();
            arr.splice(index, 1);
            $('#main .hisCenter li').eq(index).remove();
            that.setHistoryData(arr);
            that.loadHistory();
        })
        return this;
    },

    //清空历史记录函数
    clearHistory: function () {
        var that = this;
        $('#main .btnClear').on('tap', function () {
            if (confirm('确定清空吗?')) {
                localStorage.removeItem('historyArr');
                that.loadHistory();
            }
        })
        return this;
    },

    rollPage: function () {
        mui('#main .history .mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false
        })
        return this;
    }
}




    


    
    

    
