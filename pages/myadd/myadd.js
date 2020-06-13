// pages/myadd/myadd.js
const app = getApp()
let page = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cats:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = 1
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/user/myThumbUpCats',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: page,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          cats:res.data
        })
      }
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
    page++
    let that=this
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/user/myThumbUpCats',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: page,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res.data)
        if(res.data)
        {
          that.setData({
            cats:that.data.cats.concat(res.data)
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})