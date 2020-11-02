// pages/random/random.js
let save = false;
let randomId = 0;
const app = getApp();
const { beta } = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0,
    hide: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/random/randomCatPhoto',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        tsvc: app.getCode(), beta,
      },
      success: (res) => {
        const ImgSrc = `${res.data.img.slice(0, 52)}compressed_${res.data.img.slice(52)}`;
        randomId = res.data.id,
        this.setData({
          ImgSrc,
          hide: '/img/hide.png',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  bindload() {
    wx.hideLoading({
      complete: (res) => {},
    });
    this.setData({
      opacity: 1,
    });
  },
  navigateToCat() {
    wx.navigateTo({
      url: `/pages/catinfo/catinfo?id=${randomId}`,
    });
  },

  changeCatImg() {
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.hide == 0) {
      this.setData({
        hide: 1,
      });
    } else {
      this.setData({
        hide: 0,
      });
    }
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    if (save) {
      innerAudioContext.src = 'https://static.ufatfat.com/wxapi/cat/src/happy.mp3';
      save = false;
    } else { innerAudioContext.src = 'http://static.ufatfat.com/wxapi/cat/src/poor.mp3'; }
    innerAudioContext.onPlay(() => {

    });
    innerAudioContext.onError((res) => {

    });
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/random/randomCatPhoto',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'max-age=60', // 60秒
      },

      data: {
        tsvc: app.getCode(), beta,
      },
      success: (res) => {
        //  console.log(res.data)
        const ImgSrc = `${res.data.img.slice(0, 52)}compressed_${res.data.img.slice(52)}`;
        randomId = res.data.id,
        this.setData({

          ImgSrc,
        });
      },
    });
  },

  saveImg() {
    const that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {

            },
          });
        }
        if (res.authSetting['scope.writePhotosAlbum']) {
          wx.downloadFile({
            url: that.data.ImgSrc,
            success(res) {
              // 图片保存到本地
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(data) {
                  const innerAudioContext = wx.createInnerAudioContext();
                  innerAudioContext.autoplay = true;
                  innerAudioContext.src = 'https://static.ufatfat.com/wxapi/cat/src/happy.mp3';
                  innerAudioContext.onPlay(() => {
                    save = true;
                  });
                  innerAudioContext.onError((res) => {

                  });
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                  });
                },
              });
            },
          });
        }
      },
    });
  },

});
