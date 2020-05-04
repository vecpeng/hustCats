// pages/random/random.js
let save = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    randomId:'',
    hide:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:"https://wxapi.ufatfat.com/hustcats/random/randomCatPhoto",
      success:res=>{
         console.log(res.data)
         this.setData({
           randomId:res.data.id,
           ImgSrc:res.data.img,
           hide:"/img/hide.png",
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  navigateToCat:function(){
    wx.navigateTo({
      url: '/pages/catinfo/catinfo?id=' + this.data.randomId,
    })
  },

  changeCatImg:function(){

    if(this.data.hide==0)
    {
      this.setData({
        hide:1
      })
    }else{
      this.setData({
        hide:0
      })
    }
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    if(save)
   {innerAudioContext.src = 'https://static.ufatfat.com/wxapi/cat/src/happy.mp3'
    save = false
  }
   else{innerAudioContext.src = 'http://static.ufatfat.com/wxapi/cat/src/poor.mp3'}
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
        wx.request({
          url:"https://wxapi.ufatfat.com/hustcats/random/randomCatPhoto",
          success:res=>{
             console.log(res.data)
             this.setData({
               randomId:res.data.id,
               ImgSrc:res.data.img
             })
          }
        })
  },

 
  saveImg: function () {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功')
            }
          })
        }
        if (res.authSetting['scope.writePhotosAlbum']) {
          wx.downloadFile({
            url: "https://static.ufatfat.com/wxapi/cat/upload/2020/04/20200419184537133512.jpg",
            success: function (res) {
              console.log(res);
              //图片保存到本地



              
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (data) {
                  const innerAudioContext = wx.createInnerAudioContext()
                  innerAudioContext.autoplay = true
                  innerAudioContext.src = 'https://static.ufatfat.com/wxapi/cat/src/happy.mp3'
                  innerAudioContext.onPlay(() => {
                  save = true
                  console.log(save)
                  })
                  innerAudioContext.onError((res) => {
                    console.log(res.errMsg)
                    console.log(res.errCode)
                  })
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  })

                },
              })

            }
          })

        }
      }
    })
  }


})