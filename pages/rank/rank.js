// pages/rank/rank.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:undefined,
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
    var that = this;
    wx.request({
      url: app.globalData.HOST + app.globalData.RANK_MSG,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {},
      success: function (e) {
        console.log(e.data);
        if (e.data.status == 0) {
          that.setData({
            obj: e.data.response.rankmsg,
          });
        } else {

        }
      }
    })
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