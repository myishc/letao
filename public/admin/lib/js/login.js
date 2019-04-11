


$(function(){
    
    var login = new Login();

         //用户登录
    login.userLogin();
})


function Login (){

};


Login.prototype = {

    //登录请求逻辑
    userLogin: function(){
        var that = this;
        $('#userLogin').on('click',function(){
            
            var userName = $('.userName').val().trim();
            var userPass = $('.userPass').val().trim();

            if(!userName){
                alert('用户名不能为空');
                return;
            }else if(!userPass){
                alert('密码不能为空');
                return;
            }

            $.ajax({
                url: '/employee/employeeLogin',
                type: 'post',
                data: {
                    username: userName,
                    password: userPass
                },
                success: function(row){
                    
                    if(row.error){
                        alert(row.message);
                    }else{
                        location = 'index.html';
                    }
                }
            })
        })
    }
}