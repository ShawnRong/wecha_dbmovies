var app = getApp()
Page({
  data: {
    systemInfo: {},
    navbar: ['Top250', '北美票房榜'],
    currentNavbar: '0',
    top250_subjects: [],
    top250_count: 0
  },

  onLoad () {
    var that = this
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    })
    
    this.pullUpLoad()
  },
  /**
   * 点击item
   */
  onItemClick(e){
    console.log(e.currentTarget.dataset.movieId)
    var targetUrl = '/pages/detail/detail'
    if(e.currentTarget.dataset.movieId != null)
      targetUrl = targetUrl + '?' + e.currentTarget.dataset.movieId
    wx.navigateTo({
      url: targetUrl
    })
  },

  /**
   * 切换 navbar
   */
  swichNav (e) {
    var page = this
    page.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 1 && page.data.latest_list.length == 0) {
      page.pullUpLoadLatest()
    }
  },
    /**
   * [推荐]上拉刷新
   */
  pullUpLoad () {
    var page = this
    wx.showNavigationBarLoading()

    wx.request({
      url: 'https://api.douban.com/v2/movie/top250',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        page.setData({
          top250_subjects:page.data.top250_subjects.concat(res.data.subjects),
          top250_count:res.data.count
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * [最新]上拉刷新
   */
  pullUpLoadLatest () {
    var page = this
    wx.showNavigationBarLoading()

    wx.request({
      url: 'https://api.douban.com/v2/movie/top250',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data:{
        'start':page.data.top250_count
      },
      header: {
          'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res)
        page.setData({
          top250_subjects:page.data.top250_subjects.concat(res.data.subjects),
          top250_count:page.data.top250_count+res.data.count
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        wx.hideNavigationBarLoading()
      }
    })
  }
})
