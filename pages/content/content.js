// pages/content/content.js
var app = getApp()

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    item:undefined,
    likeStatus:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var obj = JSON.parse(options.item);
    if(options.item != null) {
      that.setData({
        item : obj
      });
      console.log(that.data.item);
      wx.setNavigationBarTitle({
        title: that.data.item.nickname,
      })
    }
    console.log(app.globalData.HOST + app.globalData.IS_LIKE);
    var user = wx.getStorageSync("userInfo")
    console.log('uid---' + user.uid +'lid---' + obj.lid);
    wx.request({
      url: app.globalData.HOST + app.globalData.IS_LIKE,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { "uid": user.uid, "lid": obj.lid},
      success: function (e) {
          if (e.data.status == 0) {
            that.data.item.status = e.data.response.islike;
            that.setData({
              likeStatus: e.data.response.islike,
            });
          }else {
            wx.showToast({
              title: e.data.errMes,
              duration:2000
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
    var that = this;
    var user = wx.getStorageSync("userInfo")
    console.log(user.uid + that.data.likeStatus)
    if (that.data.item.status != that.data.likeStatus) {
      if (that.data.likeStatus == 0) {
        wx.request({
          url: app.globalData.HOST + app.globalData.DELETE_LIKE,
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: { "uid": user.uid, "lid": that.data.item.lid},
          success :function(e) {
            console.log("delete success");
          }
        })
      }else {
        wx.request({
          url: app.globalData.HOST +  app.globalData.ADD_LIKE,
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: { "uid": user.uid, "lid": that.data.item.lid },
          success: function (e) {
            console.log("add success");
          }
        })
      }
    }
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

  },

  likeClick: function () {
    // 如果是已经点赞的状态则取消点赞， 如果是没有点赞的状态则点赞
    var that = this;
    var status;
    if (that.data.likeStatus == 0) {
      status = 1;
    }else {
      status = 0;
    }
    that.setData({
      likeStatus:status,
    })
  },
})