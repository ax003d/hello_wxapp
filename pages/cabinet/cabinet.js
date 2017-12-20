// pages/cabinet/cabinet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sichu_user: null,
    bookowns: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var self = this;
    this.setData({
      sichu_user: app.globalData.sichu_user
    })

    var url = app.globalData.api_url + "/v1/bookown/";
    wx.request({
      url: url,
      data: {
        uid: this.data.sichu_user.uid,
        trim_owner: 1
      },
      header: {
        "Authorization": "Bearer " + this.data.sichu_user.token
      },
      method: 'GET',
      success: function (res) {
        var data = res.data;
        if (data && 'objects' in data) {
          self.setData({
            bookowns: data.objects
          })
        } else {
          wx.removeStorageSync("sichu_user")
          wx.redirectTo({
            url: '/pages/login/login.js',
          })
        }
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