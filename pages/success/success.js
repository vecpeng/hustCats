// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navigateToIndex() {
    wx.navigateBack({
      delta: 2,
      complete: (res) => {},
    });
  },

  // seeCats:function(){
  //   wx.getStorage({
  //     key: 'catId',
  //     success:res=>{
  //       wx.navigateTo({
  //         url: '/pages/catinfo/catinfo?id=' + res.data,
  //       })
  //       wx.clearStorage({
  //         complete: (res) => {},
  //       })
  //     }
  //   })

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
});
