// 每次调用$.ajax()/$.get()/$.post()函数
// 都会先调用$.ajaxProfilter()这个函数
// 在这个函数中，可以通过option参数拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 统一的为有权限的接口配置请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})