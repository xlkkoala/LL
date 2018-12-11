// pages/own/own.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:wx.getStorageSync("userInfo"),
    isAdmin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var obj = wx.getStorageSync("userInfo");
    if(obj.uid == 1) {
        that.setData({
          user: obj,
          isAdmin:false,
        });
    }

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

  goToLikeList: function () {
    wx.navigateTo({
      url: '../likeList/likeList',
    })
  },
  leaveMessage: function () {
    wx.navigateTo({
      url: '../leaveMessage/leaveMessage',
    })
  },
  contactUs: function () {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  contribute: function () {
    wx.navigateTo({
      url: '../contribute/contribute',
    })
  },

  auditContent:function () {
    wx.navigateTo({
      url: '../audit/audit',
    })
  }

})