// pages/my/my.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    userInfoDisplay:""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this
    // console.log(app.globalData.openid)
    
        // 获取用户信息
        wx.getSetting({
          success: res => {
         
     
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
             that.setData({
               userInfoDisplay:"block"
             })
                  // 可以将 res 发送给后台解码出 unionId
                 app.globalData.userInfo = res.userInfo
                //  console.log(res.userInfo)
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
            
                  wx.request({
                    url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
                    method:'POST',
                    header:{
                      'content-type':'application/x-www-form-urlencoded'
                    },
                    data:{
                      avatar:res.userInfo.avatarUrl,
                      nickname:res.userInfo.nickName,
                      gender:res.userInfo.gender,
                     
                      beta:app.globalData.beta, tsvc:app.getCode(),openid:app.globalData.openid
                    },
                    success:function(){
                      wx.request({
                        url: 'https://wxapi.ufatfat.com/hustcats/user/getDays',
                        method: "POST",
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                          openid: app.globalData.openid
                        },
                        success:function(res){
                          // console.log(res.data)
                          that.setData({
                            time:res.data.days
                          })
                        }
                      })
                    }
                  })
                }
                
           })
          }else{
            that.setData({
              userInfoDisplay:"none"
            })
          }
        }
           
          
        })
  },
  bindGetUserInfo(e) {
    let that = this
  if(e.detail.userInfo){
    wx.request({
      url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        avatar:e.detail.userInfo.avatarUrl,
        nickname:e.detail.userInfo.nickName,
        gender:e.detail.userInfo.gender,
        tsvc: app.getCode(),beta:app.globalData.beta,openid:app.globalData.openid
      },
      success:res=>{
       that.setData({
         userInfoDisplay:"block"
       })
       wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/user/getDays',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openid: app.globalData.openid
        },
        success:function(res){
          // console.log(res.data)
          that.setData({
            time:res.data.days
          })
        }
      })
      }
    })
  }
  },
  navigateMylike: function () {
    wx.navigateTo({
      url: '/pages/mylike/mylike',
    })
  },
  navigateMyadd: function () {
    wx.navigateTo({
      url: '/pages/myadd/myadd',
    })
  },
  navigateMycomment: function () {
    wx.navigateTo({
      url: '/pages/mycomment/mycomment',
    })
  },
  navigateAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  navigateFeedback: function () {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
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