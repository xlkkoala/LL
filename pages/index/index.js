//index.js
//获取应用实例
const app = getApp()
var Util = require('../..//utils/util.js')
Page({
  data: {
    userInfo: {},
    isShow:true, // 是否显示权限获取
    currentPage:0,
    dataArray:[],
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  enterContent: function (e) {
    wx.navigateTo({
      url: '../content/content?item=' + JSON.stringify(e.currentTarget.dataset.obj),
    })
  },

  onLoad: function () {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.hideTabBar({
        
      })
      that.setData({
        isShow: false
      })
    }
    this.onPullDownRefresh();
  },

  onPullDownRefresh: function () {

    var that = this;
    that.data.currentPage = 0;
    wx.request({
      url: app.globalData.HOST + app.globalData.GET_LLLIST,
      method:'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data:{"page":that.data.currentPage},
      success: function (result){
        if (result.data.status == 0) {
          console.log(result.data);
          that.setData({
            dataArray:result.data.response.list,
            searchLoading: result.data.response.list.length < 10 ? false : true,
            searchLoadingComplete: result.data.response.list.length < 10 ? true : false,
          });
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        } else {
          wx.showToast({
            title: '获取信息失败',
            duration: 2000
          })
        }
      }
    })
  },

  onReachBottom: function () {

    var that = this;
    if (that.data.searchLoadingComplete == true) {
      return;
    }
    that.data.currentPage = that.data.currentPage + 1;
    wx.request({
      url: app.globalData.HOST + app.globalData.GET_LLLIST,
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: { "page": that.data.currentPage },
      success: function (result) {
        if (result.data.status == 0) {
          console.log(result.data);
          that.setData({
            dataArray: that.data.dataArray.concat(result.data.response.list),
            searchLoading: result.data.response.list.length < 10?false:true,
            searchLoadingComplete:result.data.response.list.length < 10?true:false,
          });
        } else {
          wx.showToast({
            title: '获取信息失败',
            duration: 2000
          })
        }
      }
    })

    //如果加载的数据不足10个
    that.setData({
      searchLoadingComplete: false //把“没有数据”设为false，隐藏
    });
  },

  

  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  showDialog: function () {
    this.dialog.showDialog();
  },
  confirmEvent: function () {
    // this.dialog.hideDialog();
  },

//调用login 方法后获取openid 然后从服务器获取用户数据
  bindGetUserInfo: function (e) {
    var that = this;
    // 用户点击授权后，这里可以做一些登陆操作
    console.log(e);
    var obj = app.globalData.userInfo;
    if (obj == null) {
      that.setData({
        isShow: false
      })
      return;
    }
    // this.login();
    wx.login({
        success: function (res) {
          if (res.code) {
            //获取openId
            wx.request({
              url: app.globalData.USER_OPENID,
              data: {
                //小程序唯一标识
                appid: app.globalData.appid,
                //小程序的 app secret
                secret: app.globalData.appsecret,
                grant_type: 'authorization_code',
                js_code: res.code
              },
              method: 'GET',
              header: { 'content-type': 'application/json' },
              success: function (openIdRes) {
                
                // 判断openId是否获取成功
                if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
                  // 将用户信息传到服务器中
                  console.log('根据openID' + openIdRes.data.openid +'从服务器中获取用户信息')
                  obj.openid = openIdRes.data.openid;
                  console.log('obj ====== '+ obj.nickName + obj.openid)
                  wx.request({
                    url: app.globalData.HOST + app.globalData.USER_LOGIN,
                    data: Util.json2Form({ "nickname": obj.nickName, "image": obj.avatarUrl, "gender": obj.gender, "city": obj.city, "country": obj.country, "openid": obj.openid }),
                    method:'POST',
                    header: { "Content-Type": "application/x-www-form-urlencoded"},
                    success:function (result) {
                      if (result.data.response.user != null){
                        wx.showTabBar({
                          
                        });
                        that.setData({
                          isShow: true
                        })
                        console.log('login success');
                        obj = result.data.response.user;
                        wx.setStorageSync('userInfo', obj)
                      }else {
                        that.setData({
                          isShow: false
                        })
                        wx.showToast({
                          title: '获取信息失败',
                          duration:2000
                        })
                      }
                    },
                    fail : function (e) {
                      that.setData({
                        isShow: false
                      })
                      wx.showToast({
                        title: '获取信息失败,请重试',
                        icon: null,
                        duration: 2000
                      })
                    }
                  })
                } else {
                  that.setData({
                    isShow: false
                  })
                  console.info("获取用户openId失败");
                }
              },
              
              fail: function (error) {
                that.setData({
                  isShow: false
                })
                console.info("获取用户openId失败");
                console.info(error);
              }
            })
          }else {
            that.setData({
              isShow: false
            })
          }
        },
        fail: function (error) {
          that.setData({
            isShow: false
          })
          console.info("获取用户openId失败");
          console.info(error);
        }
      

      });
  },
})
