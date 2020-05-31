// pages/random/random.js
let save = false
let randomId=0
const app = getApp()
const beta = app.globalData.beta

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
   
    hide:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:"https://wxapi.ufatfat.com/hustcats/random/randomCatPhoto",
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
         tsvc: app.getCode(),beta:beta
      },
      success:res=>{
        
         randomId=res.data.id,
         this.setData({
         
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
      url: '/pages/catinfo/catinfo?id=' + randomId,
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
   
    })
    innerAudioContext.onError((res) => {
     
    })
        wx.request({
          url:"https://wxapi.ufatfat.com/hustcats/random/randomCatPhoto",
          method:"POST",
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          data:{
             tsvc: app.getCode(),beta:beta
          },
          success:res=>{
             
             randomId=res.data.id,
             this.setData({
             
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
             
            }
          })
        }
        if (res.authSetting['scope.writePhotosAlbum']) {
          wx.downloadFile({
            url: "https://static.ufatfat.com/wxapi/cat/upload/2020/04/20200419184537133512.jpg",
            success: function (res) {
            
              //图片保存到本地



              
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (data) {
                  const innerAudioContext = wx.createInnerAudioContext()
                  innerAudioContext.autoplay = true
                  innerAudioContext.src = 'https://static.ufatfat.com/wxapi/cat/src/happy.mp3'
                  innerAudioContext.onPlay(() => {
                  save = true
                 
                  })
                  innerAudioContext.onError((res) => {
                   
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