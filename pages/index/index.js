//index.js
//获取应用实例
const app = getApp()
let page = 1

Page({
  data: {
    catsInfo: {}
  },
  searchSubmit: function(e){
    let self = this
    wx.request({
      url: 'https://wxapi.ufatfat.com/cat/searchCats',
      data: {
        name: e.detail.value
      },
      success(res){
        self.setData({
          catsInfo: res.data
        })
      }
    })
  },
  jumpto: function(e){
    wx.redirectTo({
      url: '/pages/catinfo/catinfo?id=' + e.currentTarget.dataset.id,
    })
    console.log(e)
  },
  onLoad: function(){
    let self = this
    console.log(self.data)
    wx.request({
      url: 'https://wxapi.ufatfat.com/cat/getCatsInfo',
      data: {
        page: page
      },
      success(res){        
        self.setData({
          catsInfo: res.data
        })        
        console.log(self.data)
      },
    })
  },
  onReachBottom: function(e){
    page++
    let self = this
    wx.request({
      url: 'https://wxapi.ufatfat.com/cat/getCatsInfo',
      data: {
        page: page
      },
      success(res){    
        self.setData({
          catsInfo: self.data.catsInfo.concat(res.data)
        })        
        console.log(self.data)
      },
    })
  }
})

function jsonAdd(d, s){
  for(var p in s){
    d[p] = s[p]
  }
  return d 
}