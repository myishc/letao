

$(function () {

    var common = new Common();

            //单选多选点击事件 //点击退出事件
    common.clickOnlySelect().clickLogout();

})

function Common() {

}

//通用对象原型方法
Common.prototype = {

    //单选多选点击事件
    clickOnlySelect: function () {

        $('#allSelect').on('click', function () {
            $('.onlySelect').prop('checked', $(this).prop('checked'));
        });

        $('tbody').on('click', '.onlySelect', function () {
            $('#allSelect').prop('checked', $('.onlySelect').length == $('.onlySelect:checked').length);
        })
        return this;
    },

    //点击退出登录
    clickLogout: function () {
        $('#btnLogout').on('click', function () {
            $.ajax({
                url: '/employee/employeeLogout',
                success: function (row) {
                    if (row.success) {
                        location = 'login.html';
                    } else {
                        alert('退出失败');
                    }
                }
            })
        })
        return this;
    },

}

// var atPage;
//分页函数   
function createPaging(param) {
    // 3. 使用js去初始化分页插件
    $("#page").bootstrapPaginator({
        bootstrapMajorVersion: 3, //对应的bootstrap版本
        currentPage: param.currentPage || 1, //当前页数 当前显示第几页
        numberOfPages: param.atPaging || 5, //每次显示页数 每次显示多少个按钮
        totalPages: param.totalPages, //总页数  总共有多少页
        shouldShowPage: true, //是否显示该按钮 是否显示分页按钮
        useBootstrapTooltip: true, // 使用bootstrap 工具提示
        //点击事件 当点击了每一个按钮都会会触发事件
        onPageClicked: function (event, originalEvent, type, page) {
            // page 表示你点击的每一页
            // atPage = page;
            param.callback(page);
        }
    });
}