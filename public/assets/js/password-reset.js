// 当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function(){
            location.href = '/admin/login.html';
        }
    });
    // 阻止表单默认提交的行为
    return false;
});