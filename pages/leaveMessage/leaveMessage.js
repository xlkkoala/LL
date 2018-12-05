// pages/leaveMessage/leaveMessage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:null,
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
  commit:function (e) {
    var that = this;
    var obj = wx.getStorageSync("userInfo")
    wx.request({
      url: app.globalData.HOST + app.globalData.UPDATE_RANKMSG,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { "uid": obj.uid, rankmsg: that.data.message},
      success: function (e) {
        console.log(e.data);
        if (e.data.status == 0) {
          wx.showToast({
            title: '提交成功',
            duration: 2000
          })
          setTimeout(function() {
            wx.navigateBack({

            });
          },2000)
          
        } else {
          wx.showToast({
            title: '提交失败',
            duration: 2000
          })
        }
      }
    })
  },
  currentmessage: function (e) {
    var that = this;
    that.data.message = e.detail.value;
  },

})
