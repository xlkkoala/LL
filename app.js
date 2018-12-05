//app.js
App({
  

  onLaunch: function () {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      
    }
  },
  globalData: {

    HOST: 'http://localhost:8082',

    userInfo: null,
    appid:'wx2b529ddcbdeb8224',
    appsecret:'35094b87eb2cdcc65d8846be48936e43',
    //url
    USER_OPENID:  'https://api.weixin.qq.com/sns/jscode2session',
    USER_LOGIN: '/Application/login',
    GET_LLLIST: '/Application/queryListByPage',
    IS_LIKE: '/Application/isLike',
    ADD_LIKE: '/Application/addLike',
    DELETE_LIKE: '/Application/deleteLike',
    RANK_MSG: '/Application/queryRankMsg',
    LIKE_LIST: '/Application/queryLikeList',
    UPDATE_RANKMSG: '/Application/updataRankMsg',
    AUDIT_CONTENT: '/Application/insertAuditContent',
    QUERY_AUDIT: '/Application/queryAudit',
    UPDATE_AUDIT_STATUS: '/Application/updateAuditStatus',
    INSER_SUCCESS_AUDIT: '/Application/insertSuccessAudit',
  }



})