const app = getApp()

Page({
  data:{
    catSwiperImgs: {}
  },
  onLoad: function(option){
    let self = this
    wx.request({
      url: 'https://wxapi.ufatfat.com/cat/getCatSwiperImgsById',
      data: {
        id: option.id
      },
      success(res){
        console.log(res.data)
        console.log(res.data[0])
        self.setData({
          catSwiperImgs: res.data
        })
      }
    })
  }
})