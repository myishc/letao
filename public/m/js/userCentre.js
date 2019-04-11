

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
            url: '/user/queryUserMessage',
            success: function(row){
                console.log(row);
                $('.userName').html(row.username);
                $('.mobile').html(row.mobile);
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
