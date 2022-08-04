$(function () {
    // 调用getUserInfo， 获取用户信息
    getUserInfo();

    // 为退出按钮绑定点击事件
    $('#btnLogout').on('click', function () {
        layui.layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            // 清除token字段
            localStorage.removeItem('token');
            location.href = '/login.html';

            // 关闭comfirm提示框
            layer.close(index);
        });
    })
})

// 获取用户基本信息
function getUserInfo () {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                layui.layer.msg(res.message);
            }
            rendarAvatar(res.data);
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html'
        //     }
        // }
    })
};

// 渲染用户信息
function rendarAvatar (user) {
    if (!user) {
        return false;
    }
    var name = user.nickname || user.username || '';
    // 渲染用户名字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按条件渲染用户头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}