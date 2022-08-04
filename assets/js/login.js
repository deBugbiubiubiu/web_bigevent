$(function() {
    // 从注册账号页面跳转到登录页面
    $('#link_reg').on('click', function() {
            $('.login').hide();
            $('.registry').show();
        })
        // 从登录页面跳转到注册页面
    $('#link_login').on('click', function() {
        $('.login').show();
        $('.registry').hide();
    })

    // 从layui中获取form对象
    // 只要导入layui的脚本文件，就可以使用layui这个对象，相当于jQuery中的$
    var form = layui.form;
    // 利用form.verify()函数，自定义表单验证规则
    form.verify({
        // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // value表示第二个密码框的值
            // 获取第一个密码框的值
            var val = $('.registry [name=password]').val();

            // 判断两次输入密码是否相同
            if (value !== val) {
                return '两次输入密码不一致'
            }
        }
    })

    // 获取layui中的layer对象，从而使用layer中的弹框方法
    var layer = layui.layer;
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message + '，请登录');

            // 跳转到登录页面
            $('#link_login').click();
        })
    });

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        // serialize()方法可以快速获取表单数据
        var data = $(this).serialize();

        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }

            layer.msg(res.message);
            // 将登录成功后得到的token字符串，保存到localStorage中
            localStorage.setItem('token', res.token);
            // 跳转到后台主页
            location.href = '/index.html';
        })
    })
})