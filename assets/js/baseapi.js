// 每次调用$.ajax()/$.get()/$.post()函数
// 都会先调用$.ajaxProfilter()这个函数
// 在这个函数中，可以通过option参数拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
})