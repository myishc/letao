


$(function(){

    var twoCatetory = new TwoCatetory();

                //查询二级分类列表,调用分页函数
    twoCatetory.queryTwoCategoryData(1,function(){
        createPaging({
            currentPage: twoCatetory.currentPage,
            atPaging: twoCatetory.atPaging,
            totalPages: twoCatetory.totalPages,
            callback: twoCatetory.queryTwoCategoryData
        });

        //预览图片       //新增二级分类      //查询分类列表
    }).addBrandPreview().addTwoCategory().queryCategoryList();

})



function TwoCatetory (){

}


TwoCatetory.prototype = {
    
    currentPage: 1,
    atPaging: 5,

    //查询二级分类数据
    queryTwoCategoryData: function(page,callback){

        var that = this;

        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: 5
            },
            success: function(data){
                that.totalPages = Math.ceil(data.total/that.atPaging);
                var html = template('twoCateListTpl',data);
                $('tbody').html(html);
                callback && callback();
            }
        })
        return this;
    },

    //预览新增品牌图片
    addBrandPreview: function(){
        var that = this;
        $('.addBrandImg').on('change',function(e){
           
            // var src = URL.createObjectURL(this.files[0]);
            // $('.logo>img').attr('src',src);

            var addImg = new FormData();
            addImg.append('pic1',this.files[0]);


            $.ajax({
                url: '/category/addSecondCategoryPic',
                type: 'post',
                data: addImg,
                processData: false,
                contentType: false,
                success: function(data){
                   
                    that.picAddr = data.picAddr;
                    $('.logo>img').attr('src',that.picAddr);
                }
            })

        })
      
        return this;
    },

    // //查询分类列表
    queryCategoryList: function(){
        $.ajax({
            url: '/category/queryTopCategory',
            success: function(data){
                var html = '';
                for (var i = 0;i < data.rows.length; i++){
                    html+='<option value='+data.rows[i].id+'>'+data.rows[i].categoryName+'</option>';
                }
                $('#categoryList').html(html);
            }
        })
        return this;
    },
    

    //新增二级分类
    addTwoCategory: function(){
        var that = this;

        $('.btnSave').on('click',function(){    
           
            var brandName = $('.addBrandName').val().trim(),
                categoryId = $('#categoryList').val();
            if(!brandName){
                alert('品牌名称不能为空');
                return false;
            }else if(!that.picAddr){
                alert('品牌logo不能为空');
                return false;
            }
            $.ajax({
                url: '/category/addSecondCategory',
                type: 'post',
                data: {
                    brandName: brandName,
                    categoryId: categoryId,
                    hot: 1,
                    brandLogo: that.picAddr
                },
                success: function(row){
                    if(row.success){
                        that.queryTwoCategoryData(1);
                        $('.addBrandName,.addBrandImg').val('');
                        $('.logo>img').attr('src','');
                    }else{
                        alert('新增失败');
                    }
                }
            })
        })
        return this;
    },
   
}