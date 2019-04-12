


$(function(){

    var index = new Index();

        //渲染用户列表    //用户退出登录 //修改用户状态
    index.getUserData(1,function(){
        createPaging({
            currentPage: index.currentPage,
            atPaging: index.atPaging,
            totalPages: index.totalPages,
            callback: index.getUserData
        });

        //改变用户名状态
    }).changeUserStatus();

})



function Index (){
   

};



Index.prototype = {
     
    currentPage: 1,
    atPaging: 5,
    //渲染页面
    getUserData: function(page,callback){
        var that = this;
        $.ajax({
            url: '/user/queryUser',
            data:{
                page: page,
                pageSize: 5
            },
            success:function(data){
                that.totalPages =Math.ceil(data.total/that.atPaging);
                var html = template('userListTpl',data);
                $('tbody').html(html);
                callback && callback();
                
            }           
        })

        return this;
    },


    //修改用户状态
    changeUserStatus: function(){
        var that = this;
        $('tbody').on('click','.btnStatus',function(){
            var userId = $(this).data('id'),
                isDelete = $(this).data('is-delete');

            isDelete = isDelete? 0 : 1;

            $.ajax({
                url: '/user/updateUser',
                data: {
                    id: userId,
                    isDelete: isDelete
                },
                type: 'post',
                success: function(row){
                    if(row.success){
                        // atPage =  atPage || 1;
                        that.getUserData(1);
                
                    }else{
                        alert('修改失败');
                    }
                }
            })
        })
        return this;
    },
}




    