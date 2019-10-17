// ajax数据
$.ajax({
  type: "get",
  url: "/users",
  success: function(res) {
    var html = template("usersTpl", { data: res });
    console.log(res);
    $("#usersBox").html(html);
  }
});

$("#userForm").on("submit", function() {
  var formData = $(this).serialize();
  $.ajax({
    type: "post",
    url: "/users",
    data: formData,
    success: function() {
      location.reload();
    },
    error: function() {
      alert("用户添加失败");
    }
  });
});

$("#modifyBox").on("change", "#avatar", function() {
  var formData = new FormData();
  formData.append("avatar", this.files[0]);
  $.ajax({
    type: "post",
    url: "/upload",
    // jq默认我们传的是一个对象 会帮我们转换成key-value&key-value的形式
    // 但是我们现在数据文件上传 multipart/form-data 数据分开传
    processData: false,
    // jq默认会添加一行代码 xhr.setRequestHeader('content-type',')
    contentType: false,
    data: formData,
    success: function(response) {
      // 实现头像预览功能
      $("#preview").attr("src", response[0].avatar);
      // 这一行的作用是后面我们提交表单的时候，保证上传头像
      $("#hiddenAvatar").val(response[0].avatar);
    }
  });
});

// 通过事件委托的方式为编辑按钮添加点击事件
$("#usersBox").on("click", ".edit", function() {
  // 获取被点击用户的id值
  var id = $(this).attr("data-id");
  // 根据id获取用户详情信息
  $.ajax({
    type: "get",
    url: "/users/" + id,
    success: function(response) {
      var html = template("modifyTpl", response);
      $("#modifyBox").html(html);
    }
  });
});

// 用事件委托为修改表单添加表单提交事件
$("#modifyBox").on("submit", "#modifyForm", function() {
  // 获取用户在表单中输入的内容
  var formData = $(this).serialize();
  var id = $(this).attr("data-id");
  $.ajax({
    type: "put",
    url: "/users/" + id,
    data: formData,
    success: function() {
      location.reload();
    }
  });
  return false;
});

// 删除功能 事件委托
$("#usersBox").on("click", ".del", function() {
  if (confirm("确定要删除吗？")) {
    // id值
    var id = $(this).attr("data-id");
    $.ajax({
      type: "delete",
      url: "/users/" + id,
      success: function() {
        location.reload();
      }
    });
  }
});

// 批量删除功能的实现
$("#checkAll").on("change", function() {
  var bool = $(this).prop("checked");
  // 找到tbody下面所有的checkbox，给她们添加checked效果
  var checkList = $('#usersBox input[type = "checkbox"]');
  // attr,prop,css 如果只有一个参数，就是获取，如果有两个参数，就是在设置
  checkList.prop("checked", bool);
  if (bool == true) {
    $("#deleteAll").css("visibility", "visible");
  } else {
    $("#deleteAll").css("visibility", "hidden");
  }
});

// 全选效果的切换
$("#usersBox").on("change", 'input[type="checkbox"]', function() {
  // 只有当tbody中多有的checkbox的数量和所有的大姑的checkbox数量一样的 说明全选
  if (
    $('#usersBox input[type = "checkbox"]').length ==
    $('#usersBox input[type = "checkbox"]:checked').length
  ) {
    $("#checkAll").prop("checked", true);
  } else {
    $("#checkAll").prop("checked", false);
  }
  if ($('#usersBox input[type="checkbox"]:checked').length > 0) {
    $("#deleteAll").css("visibility", "visible");
  } else {
    $("#deleteAll").css("visibility", "hidden");
  }
});

$("#deleteAll").on("click", function() {
  if (confirm("确定要删除吗？")) {
    var checkList = $('#usersBox input[type="checkbox"]:checked');
    var str = "";
    checkList.each(function(index, item) {
      str += $(item).attr("data-id") + "-";
    });
    str = str.substr(0, str.length - 1);
    $.ajax({
      type: "delete",
      url: "/users/" + str,
      success: function() {
        location.reload();
      }
    });
  }
});
