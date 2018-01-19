// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  show_numbers: function(e) {
    var app = getApp();
    var url = app.globalData.api_url + "/v1/account/numbers/";
    wx.request({
      url: url,
      data: {
        uid: app.globalData.sichu_user.uid
      },
      header: {
        "Authorization": "Bearer " + app.globalData.sichu_user.token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        if ('total' in res.data) {
          wx.redirectTo({
            url: '/pages/cabinet/cabinet',
          })
        } else {
          app.globalData.sichu_user = null;
          wx.clearStorageSync();
        }
      }
    })
  },

  login: function (e) {
    var app = getApp();
    var url = app.globalData.api_url + "/v1/account/login/";
    wx.request({
      url: url,
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password,
        apikey: app.globalData.apikey
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        var data = res.data;
        if ('token' in data) {
          app.globalData.sichu_user = data;
          wx.setStorageSync("sichu_user", data)
          wx.redirectTo({
            url: '/pages/cabinet/cabinet',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    if (app.globalData.sichu_user) {
      this.show_numbers()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '登录私橱'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})