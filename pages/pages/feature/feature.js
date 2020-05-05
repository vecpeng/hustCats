// pages/feature/feature.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomIcon:'/img/random.png',
    identifyIcon:'/img/identify.png'
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
  randomTap:function(){
    this.setData({
      randomIcon:'/img/random-active.png'
    })
    wx.navigateTo({
      url:"/pages/random/random"
    })
  },
  identifyTap:function(){
    this.setData({
      identifyIcon:'/img/identify-active.png'
    })
    wx.navigateTo({
      url:"/pages/identify/identify"
    })
  }
})