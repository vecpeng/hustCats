const app = getApp()

let swiperImgPage = 1
let id = 0
let currentIndex = 0
let currentDate = ''
let lastDate = ''
let imgsPage = 1
let openID = ''
let inputDesc = ''
let recordPage = 1

Page({
  data: {
    catSwiperImgs: [],
    catInfo: {},
    catImgs: [],
    photoNum: 0,
    records: [],
    recordNum: 0,
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    tab: 'album',
    uploadImgUrl: '/img/add.png',
    uploadContainerDisplay: 'none',
    infoDisplay: 'blcok',
    bigImgDisplay: 'none',
  },
  onLoad: function(option){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    let self = this
    id = option.id
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatSwiperImgsById',
      data: {
        id: option.id,
        page: swiperImgPage
      },
      success(res){
        self.setData({
          catSwiperImgs: res.data
        })
      },      
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getPhotoNum',
      data: {
        id: option.id,
      },
      success(res){
        self.setData({
          photoNum: res.data,
        })
      }
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatInfoById',
      data: {
        id: option.id,
      },
      success(res){
        self.setData({
          catInfo: res.data
        })
      }
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatImgsById',
      data: {
        id: option.id,
        page: imgsPage
      },
      success(res){
        console.log(res.data)
        self.setData({
          catImgs: res.data
        })
      }
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getRecordNum',
      data: {
        id: id,
      },
      success(res){
        self.setData({
          recordNum: res.data
        })
      }
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getRecords',
      data: {
        id: id,
        page: recordPage
      },
      success(res){
        self.setData({
          records: res.data
        })
      }
    })
  },
  bigImg: function(e){
    let self = this
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    console.log(self.data)
    wx.previewImage({
      current: self.data.catImgs[e.currentTarget.dataset.id].img,
      urls: [self.data.catImgs[e.currentTarget.dataset.id].img],
    })
  },
  /*bigImg: function(e){
    let self = this
    console.log(e.currentTarget.dataset.id)
    console.log(self.data)
    wx.previewImage({
      current: self.data.catImgs[e.currentTarget.dataset.id].img,
      urls: [self.data.catImgs[e.currentTarget.dataset.id].img],
    })
  },*/
  recordBigImg: function(e){
    let self = this
    console.log(e.currentTarget.dataset.id)
    console.log(self.data)
    wx.previewImage({
      current: self.data.records[e.currentTarget.dataset.id].img,
      urls: [self.data.records[e.currentTarget.dataset.id].img],
    })
  },
  loadNew: function(e){
    let self = this
    let imgsLen = jsonLength(self.data.catSwiperImgs)
    if(e.detail.current == (imgsLen - 1)){
      swiperImgPage++
      wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatSwiperImgsById',
        data: {
          id: id,
          page: swiperImgPage
        },
        success(res){
          if(res.data){
            self.setData({
              catSwiperImgs: self.data.catSwiperImgs.concat(res.data)
            })
          }
        }
      })
    }
  },
  onReachBottom: function(e){
    let self = this
    if(this.data.tab == 'album'){
      imgsPage++
      wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatImgsById',
        data: {
          id: id,
          page: imgsPage
        },
        success(res){    
          if(res.data){
            self.setData({
              catImgs: self.data.catImgs.concat(res.data)
            })        
          }
        },
      })
    }else{
      recordPage++
      wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/cat/getRecords',
        data: {
          id: id,
          page: recordPage
        },
        success(res){    
          if(res.data){
            self.setData({
              records: self.data.records.concat(res.data)
            })        
          }
        },
      })
    }
  },
  getUserInfo: function(e){
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      uploadContainerDisplay: 'block',
    })
  },
  changeTab: function(e){
    let thatTab = e.currentTarget.dataset.tab
    if(this.data.tab == thatTab)
      return
    this.setData({
      tab: thatTab
    })
    console.log(this.data)
  },
  chooseImg: function(){
    let self = this
    wx.chooseImage({
      count: 1,
      success(res){
        let tempPaths = res.tempFilePaths
        self.setData({
          uploadImgUrl: res.tempFilePaths[0]
        })
      }
    })
  },
  updateInput: function(e){
    inputDesc = e.detail.value
  },
  uploadImg: function(){
    let self = this
    if(this.data.uploadImgUrl == '/img/add.png'){
      wx.showToast({
        title: '还没选择图片！',
        image: '/img/cross.png',
        duration: 2000,
      })
      return 
    }
    if(!openID){
      wx.login({
        success(res){
          console.log(self.data)
          wx.request({
            url: 'https://wxapi.ufatfat.com/hustcats/user/getOpenID',
            data: {
              jscode: res.code
            },
            success(res){
              if(res.data)
                openID = res.data
                console.log(res.data)
                wx.uploadFile({
                  filePath: self.data.uploadImgUrl,
                  name: 'uploadImg',url: 'https://wxapi.ufatfat.com/hustcats/user/uploadRecord',
                  formData: {
                    'desc': inputDesc,
                    'openID': openID,
                    'catid': id,
                    'avatar': self.data.userInfo.avatarUrl,
                    'nickname': self.data.userInfo.nickName,
                  },
                  success(res){
                    console.log(res.data)
                    if(res.data == 1){
                      wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                      })
                      self.setData({
                        uploadContainerDisplay: 'none'
                      })
                    }else{
                      console.log(res.data)
                      wx.showToast({
                        title: res.data,
                        image: '/img/cross.png',
                        duration: 2000
                      })
                    }
                  }      
                })     
            }
          })
        }
      })
    }else{
      wx.login({
        success(res){
          console.log(self.data)
          wx.request({
            url: 'https://wxapi.ufatfat.com/hustcats/user/getOpenID',
            data: {
              jscode: res.code
            },
            success(res){
              if(res.data)
                openID = res.data
                console.log(res.data)
                wx.uploadFile({
                  filePath: self.data.uploadImgUrl,
                  name: 'uploadImg',url: 'https://wxapi.ufatfat.com/hustcats/user/uploadRecord',
                  formData: {
                    'desc': inputDesc,
                    'openID': openID,
                    'catid': id,
                    'avatar': self.data.userInfo.avatarUrl,
                    'nickname': self.data.userInfo.nickName,
                  },
                  success(res){
                    console.log(res.data)
                    if(res.data == 1){
                      wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                      })
                      self.setData({
                        uploadContainerDisplay: 'none'
                      })
                    }else{
                      console.log(res.data)
                      wx.showToast({
                        title: res.data,
                        image: '/img/cross.png',
                        duration: 2000
                      })
                    }
                  }      
                })     
            }
          })
        }
      })
    }
  },
  toggleDisplay: function(){
    console.log(this.data)
    if(this.data.uploadContainerDisplay == 'none')
      this.setData({
        uploadContainerDisplay: 'block'
      })
    else
      this.setData({
        uploadContainerDisplay: 'none'
      })
  }
})

function jsonLength(o){
  let len = 0;
  for(let p in o){
    len++
  }
  return len
}
function upload(){
  
}