



//分页函数
function createPaging (par) {
    // 3. 使用js去初始化分页插件
    // 当前显示默认第几页
    // 总页数 默认写死25
    $("#page").bootstrapPaginator({
        bootstrapMajorVersion: 3, //对应的bootstrap版本
        currentPage: par.currentPage, //当前页数 当前显示第几页
        numberOfPages: par.atPaging, //每次显示页数 每次显示多少个按钮
        totalPages: par.totalPages, //总页数  总共有多少页
        shouldShowPage: true, //是否显示该按钮 是否显示分页按钮
        useBootstrapTooltip: true, // 使用bootstrap 工具提示
        //点击事件 当点击了每一个按钮都会会触发事件
        onPageClicked: function (event, originalEvent, type, page) {
            // page 表示你点击的每一页
            par.callback(page);
        }
    });
}

//单选多选点击事件
function clickOnlySelect (){

    $('#allSelect').on('click',function(){
        $('.onlySelect').prop('checked',$(this).prop('checked'));
    });

    $('tbody').on('click','.onlySelect',function(){
        $('#allSelect').prop('checked',$('.onlySelect').length==$('.onlySelect:checked').length);
    })
}


 //点击退出登录
 function clickLogout(){
    $('#btnLogout').on('click',function(){
        $.ajax({
            url: '/employee/employeeLogout',
            success: function(row){
                if(row.success){
                    location = 'login.html';
                }else{
                    alert('退出失败');
                }
            }
        })
    })
}

