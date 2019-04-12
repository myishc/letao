

$(function(){

    var userCentre = new UserCentre();

            //查询用户信息  //点击退出登录
    userCentre.getUserData().clickLogout();

})


function UserCentre (){

}

UserCentre.prototype = {


    //渲染页面
    getUserData: function(){

        $.ajax({
            beforeSend: function () {
                // console.log('请求之前会调用的回调函数');
                // 发请求之前显示遮罩层
                $('.mask').show();
            },
            complete: function () {
                // console.log('请求之后会调用的回调函数');
                // 请求完成要隐藏遮罩层
                setTimeout(function () {
                    $('.mask').hide();
                }, 3000);
            },
            url: '/user/queryUserMessage',
            success: function(row){
                console.log(row);
                if(row.error){
                    location = 'login.html?returnUrl='+location.href;
                }else{
                    $('.userName').html(row.username);
                    $('.mobile').html(row.mobile);
                }
            }
        })
        return this;
    },

    //点击退出
    clickLogout: function(){
        $('#logout').on('tap',function(){

            $.ajax({
                url: '/user/logout',
                success: function(row){
                    if(row.success){
                        location = './login.html?returnUrl='+location.href;
                    }
                }
            })
        })
    },
}
