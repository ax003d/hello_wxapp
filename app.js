//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.globalData.sichu_user = wx.getStorageSync("sichu_user");
  },
  globalData: {
    userInfo: null,
    api_url: 'https://sichu.ax003d.top',
    apikey: 'ec2de0fd0d5279e9a8f82da1430325',
    sichu_user: null,
    book_del_id: null
  }
})