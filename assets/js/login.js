$(function(){
  // 点击“去注册账号”的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  // 通过 form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: 
    [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验两次是否一致的规则
    repwd : function(value){
      let pwd = $('.reg-box [name=password]').val()
      if(pwd !== value){
        return '两次密码不一致！'
      }
    }
  })
  
  // 监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: function(res){
        if(res.status !== 0) {
          $('#form_reg [name=username]').val('')
          $('#form_reg [name=password]').val('')
          $('#form_reg [name=repassword]').val('')
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为
        $('#link_login').click()
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0) {
          $('#form_login [name=username]').val('')
          $('#form_login [name=password]').val('')
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // console.log(res.token)
        // 将登录成功得到的token字符串，保存到localStorage中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})