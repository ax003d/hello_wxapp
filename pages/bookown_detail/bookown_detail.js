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
    var app = getApp();
    var self = this;
    var url = app.globalData.api_url + "/v1/bookown/" + this.data.bookown.id + "/";
    var status = this.data.bookown.status + 1
    wx.request({
      url: url,
      header: {
        "Authorization": "Bearer " + app.globalData.sichu_user.token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        status: status.toString(),
        remark: this.data.bookown.remark
      },
      method: 'POST',
      success: function (res) {
        var data = res.data;
        if (data && 'status' in data) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },

  on_delete: function() {
    var app = getApp();
    var self = this;
    var url = app.globalData.api_url + "/v1/bookown/delete/" + this.data.bookown.id + "/";
    wx.request({
      url: url,
      header: {
        "Authorization": "Bearer " + app.globalData.sichu_user.token
      },
      method: 'POST',
      success: function (res) {
        var data = res.data;
        if (data && 'status' in data) {
          wx.navigateBack()
        }
      }
    })
  },

  on_status: function(e) {
    this.setData({
      "bookown.status": parseInt(e.detail.value)
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
          var bookown = data.objects[0];
          bookown.status = parseInt(bookown.status) - 1;
          self.setData({
            bookown: bookown
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