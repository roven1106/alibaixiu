$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html = template('categoriesTpl',{data:res});
        $('#categoryBox').html(html);
    }
});

// 实现添加功能
$('#addCategory').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/categories',
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    });
    return false;
});

// 编辑功能
$('#categoryBox').on('click','.edit',function(){
    // 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // 根据id获取根类的详情信息
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            var html = template('modifyCategoryTpl',res);
            $('#modifyBox').html(html);
            // console.log(html);            
        }
    });
});

$('modifyBox').on('submit','#modifyCategory',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:$(this).serialize(),
        success:function(){
            location.reload();
        }
    });
    return false;
});