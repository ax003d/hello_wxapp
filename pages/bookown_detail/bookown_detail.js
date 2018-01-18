// pages/bookown_detail/bookown_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookown: null,
    status: ["可借", "不可借", "借出", "丢失"]
  },

  on_save: function(e) {
    console.log(e.detail.value);
  },

  on_delete: function() {
    console.log("on delete");
  },

  on_status: function(e) {
    this.setData({
      "bookown.status": e.detail.value
    })
    console.log(e.detail);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var self = this;
    var url = app.globalData.api_url + "/v1/bookown/?id__exact=" + options.id;
    wx.request({
      url: url,
      header: {
        "Authorization": "Bearer " + app.globalData.sichu_user.token
      },
      method: 'GET',
      success: function (res) {
        var data = res.data;
        if (data && 'objects' in data) {
          self.setData({
            bookown: data.objects[0]
          })
        } else {
          wx.removeStorageSync("sichu_user")
          wx.redirectTo({
            url: '/pages/login/login.js',
          })
        }
      },
      fail: function (res) {
        wx.clearStorageSync();
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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