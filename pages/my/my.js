// pages/my/my.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this
    console.log(app.globalData.openid)
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
        that.setData({
          time:res.data.days
        })
      }
    })
  },
  bindGetUserInfo(e) {
 
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
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
      },
      success:res=>{
       
      }
    })
  
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