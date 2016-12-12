var app = getApp()
Page({
  data: {
    systemInfo: {},
    _api: {},
    navbar: ['Top250', '北美票房榜'],
    currentNavbar: '0',
    latest_list: [],
    latest_last_id: 0
  },

  onLoad () {
    var that = this
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    })
  },
  /**
   * 切换 navbar
   */
  swichNav (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    if (e.currentTarget.dataset.idx == 1 && this.data.latest_list.length == 0) {
      this.pullUpLoadLatest()
    }
  }
})
