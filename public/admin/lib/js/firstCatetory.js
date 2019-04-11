


$(function(){

    var firstCatetory = new FirstCatetory();

            //获取一级分类数据,调用分页函数
    firstCatetory.getFirstCatetory(1,function(){
        createPaging({
            currentPage: firstCatetory.currentPage,
            atPaging: firstCatetory.atPaging,
            totalPages: firstCatetory.totalPages,
            callback: firstCatetory.getFirstCatetory
        });

     //添加分类   
    }).addCategoryData()


    //单选多选;           //退出登录
    clickOnlySelect();  clickLogout();
})  


function FirstCatetory () {


    
   
}

FirstCatetory.prototype = {
    //默认
    currentPage: 1,
    //页码数
    atPaging: 5,

    //查询一级分类数据page,callback
    getFirstCatetory: function(page,callback){
        var that = this;
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: 5
            },
            success: function(data){
                console.log(data);
                that.totalPages = Math.ceil(data.total/that.atPaging);
                var html = template('firstCateListTpl',data);
                $('tbody').html(html);
                callback && callback();
            }
        })
        return this;
    },

    //添加分类
    addCategoryData: function(){
        var that = this;
        $('.btnSave').on('click',function(){

            var categoryName =  $('.inputCategory').val().trim();
            if(!categoryName){
                alert('请输入新分类');
                return false;
            }

            $.ajax({
                type:'post',
                url: '/category/addTopCategory',
                data: {
                    categoryName: categoryName
                },
                success: function(row){
                    if(row.success){
                        that.getFirstCatetory(1);
                        $('.inputCategory').val('');
                    }else{
                        alert('新增失败');
                    }
                }
            })
        })
    },

    
}
