// pages/cabinet/cabinet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sichu_user: null,
    bookowns: []
  },

  on_add: function () {
    var app = getApp();
    var self = this;
    var url = app.globalData.api_url + "/v1/bookown/add/";

    wx.scanCode({
      success: function (e) {
        var isbn = e.result;
        wx.request({
          url: url,
          data: {
            isbn: isbn,
            status: '1'
          },
          header: {
            "Authorization": "Bearer " + self.data.sichu_user.token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data);
            if (res.statusCode == 200 && 'book' in res.data) {
              var bookowns = [res.data, ...self.data.bookowns];
              self.setData({
                bookowns: bookowns
              })
            }
          }
        })
      }
    })
  },

  load_bookown: function () {
    var app = getApp();
    var self = this;
    var url = app.globalData.api_url + "/v1/bookown/";
    wx.request({
      url: url,
      data: {
        uid: this.data.sichu_user.uid,
        trim_owner: 1,
        offset: this.data.bookowns.length
      },
      header: {
        "Authorization": "Bearer " + this.data.sichu_user.token
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode != 200) {
          wx.clearStorageSync();
          wx.redirectTo({
            url: '/pages/login/login.js',
          })
          return
        }
        var data = res.data;
        if (data && 'objects' in data) {
          var bookowns = [...self.data.bookowns, ...data.objects];
          self.setData({
            bookowns: bookowns
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

  on_detail: function (e) {
    wx.navigateTo({
      url: '/pages/bookown_detail/bookown_detail?id=' + e.target.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      sichu_user: app.globalData.sichu_user
    })
    this.load_bookown()   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的书橱'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp();
    var del_id = app.globalData.book_del_id;
    if (del_id) {
      var bookowns = this.data.bookowns;
      for (var i=0; i < bookowns.length; i++ ) {
        if (bookowns[i].id == del_id) {
          bookowns.splice(i, 1);
          this.setData({
            bookowns: bookowns
          })
          break;
        }
      }
      app.globalData.book_del_id = null;
    }
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
    this.load_bookown()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})