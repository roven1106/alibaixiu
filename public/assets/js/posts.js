
  $.ajax({
    type: "get",
    url: "/posts",
    success: function(res) {
      var html = template("postsTpl", res);
      $("#postsBox").html(html);
      var page = template("pageTpl", res);
      $("#page").html(page);
    }
  });


function dateFormat(date) {
  date = new Date(date);
  return (
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日"
  );
}

function changePage(page){
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success:function(res){
            var html = template('postsTpl',res);
            $('#postsBox').html(html);
            var page = template("pageTpl", res);
            $("#page").html(page);
        }
    });
}
