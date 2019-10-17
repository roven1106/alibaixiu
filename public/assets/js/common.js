$('#logout').on('click',function(){
    var isConfirm = confirm('您确定要退出吗？');
    if(isConfirm){
      // ajax('用户点击了确认按钮')
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
          // 跳转到登录页面
          location.href = 'login.html';
        }
      })
    }
  })