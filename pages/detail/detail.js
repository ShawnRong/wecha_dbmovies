Page({
  data:{
    film:[],
    title:''
  },
  onReady:function(){
    // 页面渲染完成
    var page = this
    
    wx.setNavigationBarTitle({
      title: page.data.title
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var page = this

    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/'+options.movieID,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          'Content-Type': 'application/json'
      }, // 设置请求的 header      
      success: function(res){
        // success
        console.log(res)
        page.setData({
          film:res,
          title:options.title
        })
      }
    })
  }
})