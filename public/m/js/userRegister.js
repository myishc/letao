



$(function(){

    var userRegister = new UserRegister();

        //调用注册逻辑方法
    userRegister.inputNoNll();

})



function UserRegister(){
    

 
};


UserRegister.prototype = {

    code: null,

      //消息提示
    messageHint: function  (text){
        mui.toast(text,{ duration:'long', type:'div' });
        return this;
    },

    getCode: function(){
        var that = this
        $.ajax({
            url: '/user/vCode',
            success: function(row){
                that.code = row.vCode;
                $('.code').val(that.code);
                console.log(that.code);
            }
        })
        return this;
    },

    //表单非空逻辑
    inputNoNll: function(){
        var that = this;
        $('.getCode').on('tap',function(){
            that.code = that.getCode();
        })
        $('.btnRegister').on('tap',function(){
            var check = true;
            mui("#main input").each(function () {
                //若当前input为空，则alert提醒 
                if (!this.value || this.value.trim() == "") {
                    var label = this.previousElementSibling;
                    mui.alert(label.innerText + "不允许为空");
                    check = false;
                    return false;
                }
            }); //校验通过，继续执行业务逻辑 
            if (check) {
                
                var userName= $('.userName').val(),
                    userPass =  $('.userPass1').val(),
                    userMobile = $('.userMobile').val(),
                    userCode = $('.code').val();



                if(userName.length<=1){
                    that.messageHint('用户名不能小于1位');
                    return;
                }else if(userPass!=$('.userPass2').val()){
                    that.messageHint('两次密码输入不一致');
                    return;
                }else if(!(/^1[34578]\d{9}$/.test(userMobile))){
                    that.messageHint('请输入正确手机号码');
                    return;
                }else if(userCode!=that.code){
                    console.log(that.code);
                    that.messageHint('验证码输入错误');
                    return;
                }

                $.ajax({
                    url: '/user/register',
                    type: 'post',
                    data: {
                        username: userName,
                        password: userPass,
                        mobile: userMobile,
                        vCode :userCode
                    },
                    success: function(row){
                        if(row.error){
                            that.messageHint(row.message);
                        }else{
                            location = 'login.html?returnUrl=index.html';
                        }
                    }
                })
            }
        })
        return this;
    },


}

