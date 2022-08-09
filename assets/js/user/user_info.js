$(function () {
  form = layui.form;
  layer = layui.layer;

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在 1 - 6 个字符之间";
      }
    },
  });

  initUserInfo();

  // 初始化用户信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        // console.log(res);
        // 调用 layui.form.val() 快速为表单赋值
        form.val("formUserInfo", res.data);
      },
    });
  }

  // 重置表单数据
  $("#btnReset").on("click", function (e) {
    // 阻止表单的默认重置行为（清空所有表单数据）
    e.preventDefault();
    initUserInfo();
  });

  // 监听表单的提交事件
  $(".layui-form").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    console.log($(".layui-form").serialize(), 11);

    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败！");
        }
        layer.msg(res.message);

        // 调用父页面(index.html)中的方法getUserInfo，重新渲染用户的头像和用户的信息
        // window 表示 iframe
        // parent 表示 iframe 的父级
        window.parent.getUserInfo();
      },
    });
  });
});
