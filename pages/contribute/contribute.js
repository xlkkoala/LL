// pages/contribute/contribute.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleMessage:null,
    descMessage:null,
    contentMessage:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  commit:function () {

    var that = this;
    var obj = wx.getStorageSync("userInfo")
    wx.request({
      url: app.globalData.HOST + app.globalData.AUDIT_CONTENT,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { "uid": obj.uid, "title":that.data.titleMessage, "descr": that.data.descMessage, "content":that.data.contentMessage},
      success: function (e) {
        console.log(e.data);
        if (e.data.status == 0) {
          wx.showToast({
            title: '投稿成功',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({

            });
          }, 2000)

        } else {
          wx.showToast({
            title: '提交失败',
            duration: 2000
          })
        }
      }
    })

    wx.showToast({
      title: '已提交',
      duration:2000
    })
  },
  getTitle:function (e) {
    var that = this;
    that.data.titleMessage = e.detail.value;
  },
  getDesc: function (e) {
    var that = this;
    that.data.descMessage = e.detail.value;
  },

  getContent: function (e) {
    var that = this;
    that.data.contentMessage = e.detail.value;
  },



})