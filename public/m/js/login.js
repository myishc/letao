




$(function(){

    var login = new Login();

    //调用用户登录函数
    login.userLogin();


})


var Login = function(){

}

Login.prototype = {

    //用户登录函数
    userLogin: function (){
        var that = this;
        $('#userLogin').on('tap',function(){

            var userName = $('.userName').val().trim();
            var userPass = $('.userPass').val().trim();
            console.log(userName,userPass);
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
                url: '/user/login',
                type: 'post',
                data:{
                    username: userName,
                    password: userPass
                },
                success: function(row){
                    console.log(row);
                    if(row.error){
                        that.messageHint(row.message);
                    }else{
                        var userUrl = that.getQueryString('returnUrl');
                        location = userUrl;
                    }
                }
            })
        })
        return this;
    },

    //消息提示
    messageHint: function  (text){
        mui.toast(text,{ duration:'long', type:'div' });
    },

    //获取url的参数
    getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); 
        return null; 
      },

}
