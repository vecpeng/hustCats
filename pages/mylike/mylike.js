// pages/mylike/mylike.js
let page = 0;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cats: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    page = 1;
    const that = this;
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/user/myThumbUpCats',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        page,
        openid: app.globalData.openid,
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          cats: res.data,
        });
      },
    });
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
    page++;
    // console.log(page)
    const that = this;
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/user/myThumbUpCats',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'max-age=60', // 60秒
      },

      data: {
        page,
        openid: app.globalData.openid,
      },
      success(res) {
        // console.log(res.data)
        if (res.data) {
          that.setData({
            cats: that.data.cats.concat(res.data),

          });
        }
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  navigateToCat(e) {
    const { id } = e.currentTarget.dataset;

    wx.navigateTo({
      url: `/pages/catinfo/catinfo?id=${id}`,
    });
  },
});
