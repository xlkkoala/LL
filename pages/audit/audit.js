// pages/audit/audit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuditContent();
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

  /**
   * 获取等待审核的内容
   */

  getAuditContent: function () {
    var that = this;
    wx.request({
      url: app.globalData.HOST + app.globalData.QUERY_AUDIT,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {status:"0"},
      success: function (e) {
        console.log(e.data);
        if (e.data.status == 0) {
          that.setData({
            dataArray: e.data.response.list,
          });
        } else {
          wx.showToast({
            title: '暂无审核内容',
            duration:2000
          })
        }
      }
    })
  },

  refuse: function (e) {
    this.changeAuditStatus(2, e.target.dataset.index, e.target.dataset.id);
  },

  pass: function (e) {
    this.changeAuditStatus(1, e.target.dataset.index, e.target.dataset.id);
  },

  changeAuditStatus: function(status,index,id){
    var that = this;
    wx.request({
      url: app.globalData.HOST + app.globalData.UPDATE_AUDIT_STATUS,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { id: id, status: status},
      success: function (e) {
        console.log(e.data);
        if (e.data.status == 0) {
          if(status == 1){
            that.insertSuccessAudit(index);
          }else {
            var newData = that.data.dataArray;
            newData.splice(index, 1);
            console.log(newData);
            that.setData({
              dataArray: newData,
            });
          }
          
        } else {
          wx.showToast({
            title: '审核失败',
            duration: 2000
          })
        }
      }
    })
  },

   insertSuccessAudit: function(index) {
    var that = this;
    var obj = that.data.dataArray[index];
    wx.request({
      url: app.globalData.HOST + app.globalData.INSER_SUCCESS_AUDIT,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { id: obj.id, uid:obj.uid, title:obj.title, descr: obj.descr, content:obj.content},
      success: function (e) {
        console.log(e.data);
        if (e.data.status == 0) {
          var newData = that.data.dataArray;
          newData.splice(index, 1);
          console.log(newData);
          that.setData({
            dataArray: newData,
          });
          
        } else {
          wx.showToast({
            title: '审核失败',
            duration: 2000
          })
        }
      }
    })
  }



})