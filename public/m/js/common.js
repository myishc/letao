

$(function(){

    var common = new Common();

    common.goHistoryPage();
})



function Common(){

}

Common.prototype = {

    //返回上一页
    goHistoryPage: function(){

        $('.fa-arrow-left').attr('href','javascript:history.back(-1)');
        
    }

}