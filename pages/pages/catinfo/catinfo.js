const app = getApp()

let swiperImgPage = 1
let id = 0
let currentIndex = 0
let currentDate = ''
let lastDate = ''
let imgsPage = 1
const globalData = app.globalData;

let inputDesc = ''
let recordPage = 1
const nickname = app.globalData.userInfo.nickName
const avatar = app.globalData.userInfo.avatarUrl




Page({
  data: {
    test: "helloworld",
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
    nickname: '刘老师',
    date: '2020-04-23',
    uploadContainerDisplay: 'none',
    infoDisplay: 'block',
    bigImgDisplay: 'none',
    indexPhoto: '',
    thumbUpNum: 0,
    thumbUp: 1,
    imgs: [],
    swiperDisplay: 'none',
    itemid: 0,
    index: 0,
    uploadBtn: 1,
    upload: 0,
    nickName: '',
    avatarUrl: ''
  },




  onLoad: function (option) {


    // console.log(option.query)
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', {thumbUp:this.data.thumbUp});
    // eventChannel.emit('someEvent', {thumbupnum:this.data.thumbUpNum});
    // // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
        catid: id,
        page: 1,

      },
      success(res) {
        self.setData({
          catSwiperImgs: res.data
        })
        console.log(res.data)
      },
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatPhotoNumById',
      data: {
        catid: id,
      },

      success(res) {
        self.setData({
          photoNum: res.data,
        })
      }

    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatInfoById',
      data: {
        catid: option.id,
        openid: globalData.openid
      },
      success(res) {
        self.setData({
          catInfo: res.data,
          thumbUpNum: res.data.thumbupnum,
          thumbUp: res.data.thumbup
        })
        console.log(res.data)

      }

    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatPhotosById',
      data: {
        catid: option.id,
        page: 1
      },
      success(res) {
          console.log(res.data)
        self.setData({
          catImgs: res.data,
          date: res.data.date,
          nickname: res.data.nickname,
        })
        let catImgs = res.data
        console.log(catImgs)
        
        for (let i = 0; i < res.data.length; i++) {
         
          if (catImgs[i].date != null) {

            catImgs[i].date = catImgs[i].date.slice(0, 10)
          }
        }
        console.log(catImgs)
        self.setData({
          catImgs: catImgs
        })
      }

    })
    // wx.request({
    //   url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatRecordNumById',
    //   data: {
    //     catid: id,
    //   },
    //   success(res) {
    //     self.setData({
    //       recordNum: res.data
    //     })
    //   }
    // })
    // wx.request({
    //   url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatRecordsById',
    //   data: {
    //     catid: id,
    //     page: recordPage
    //   },
    //   success(res) {
    //     self.setData({
    //       records: res.data
    //     })
    //   }
    // })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getIndexPhotoById',
      data: {
        catid: id,

      },
      success: (res) => {
        this.setData({
          indexPhoto: res.data.img,

        })
        console.log(res.data)
      }
    })


  },


  previewImg: function(e){
    wx.previewImage({
      urls: [this.data.catImgs[e.currentTarget.dataset.index].img],
      current: this.data.catImgs[e.currentTarget.dataset.index].img,
    })
  },
  bindGetUserInfo(e) {
 
    wx.request({
      url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
      
      data:{
        avatar:e.detail.userInfo.avatarUrl,
        nickname:e.detail.userInfo.nickName,
        gender:e.detail.userInfo.gender,
        openid:globalData.openid
      },
      success:res=>{
        console.log(res.data)
        console.log('getUserInfoSuccess')
      }
    })
    console.log(e.detail.userInfo)
  },
  closeSwiper: function () {

    this.setData({
      swiperDisplay: "none"
    })
  },

  bigImg: function (e) {
    let self = this
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    console.log(self.data)
    self.setData({
        swiperDisplay: '',
        itemid: e.currentTarget.dataset.id,
        index: e.currentTarget.dataset.id,
      }

    )
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
  recordBigImg: function (e) {
    let self = this
    console.log(e.currentTarget.dataset.id)
    console.log(self.data)
    wx.previewImage({
      current: self.data.records[e.currentTarget.dataset.id].img,
      urls: [self.data.records[e.currentTarget.dataset.id].img],
    })
  },
  loadNew: function (e) {
    let self = this
    let imgsLen = jsonLength(self.data.catSwiperImgs)
    if (e.detail.current == (imgsLen - 1)) {
      swiperImgPage++
      wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatSwiperImgsById',
        data: {
          catid: id,
          page: swiperImgPage
        },
        success(res) {
          if (res.data) {
            self.setData({
              catSwiperImgs: self.data.catSwiperImgs.concat(res.data)
            })
          }
        }
      })
    }
  },
  onReachBottom: function (e) {
    let self = this
    if (this.data.tab == 'album') {
      imgsPage++
      wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatPhotosById',
        data: {
          catid: id,
          page: imgsPage
        },
        success(res) {
          if (res.data) {
            self.setData({
              catImgs: self.data.catImgs.concat(res.data)
            })
          }
          let catImgs = self.data.catImgs
          console.log(catImgs)
          for(let i=0;i<catImgs.length;i++)
        {
          
          if(catImgs[i].date!=null){
          catImgs[i].date = catImgs[i].date.slice(0,10)
          }
          }
        console.log(catImgs)
        self.setData({
          catImgs:catImgs
        })
     
        },
      })
    } else {
      recordPage++
      wx.request({
        url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatRecordsById',
        data: {
          catid: id,
          page: recordPage
        },
        success(res) {
          if (res.data) {
            self.setData({
              records: self.data.records.concat(res.data)
            })
          }
        },
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      uploadContainerDisplay: 'block',
    })
  },
  changeTab: function (e) {
    let thatTab = e.currentTarget.dataset.tab
    if (this.data.tab == thatTab)
      return
    this.setData({
      tab: thatTab
    })

  },


  updateInput: function (e) {
    inputDesc = e.detail.value
  },
  // uploadImg: function () {
  //   let self = this
  //   if (this.data.uploadImgUrl == '/img/add.png') {
  //     wx.showToast({
  //       title: '还没选择图片！',
  //       image: '/img/cross.png',
  //       duration: 2000,
  //     })
  //     return
  //   }
  //   if (!openID) {
  //     wx.login({
  //       success(res) {
  //         console.log(self.data)
  //         wx.request({
  //           url: 'https://wxapi.ufatfat.com/hustcats/user/getOpenID',
  //           data: {
  //             jscode: res.code
  //           },
  //           success(res) {
  //             if (res.data)
  //               openID = res.data
  //             console.log(res.data)
  //             wx.uploadFile({
  //               filePath: self.data.uploadImgUrl,
  //               name: 'uploadImg',
  //               url: 'https://wxapi.ufatfat.com/hustcats/user/uploadRecord',
  //               formData: {
  //                 'desc': inputDesc,
  //                 'openID': openID,
  //                 'catid': id,
  //                 'avatar': self.data.userInfo.avatarUrl,
  //                 'nickname': self.data.userInfo.nickName,
  //               },
  //               success(res) {
  //                 console.log(res.data)
  //                 if (res.data == 1) {
  //                   wx.showToast({
  //                     title: '提交成功',
  //                     icon: 'success',
  //                     duration: 2000
  //                   })
  //                   self.setData({
  //                     uploadContainerDisplay: 'none'
  //                   })
  //                 } else {
  //                   console.log(res.data)
  //                   wx.showToast({
  //                     title: res.data,
  //                     image: '/img/cross.png',
  //                     duration: 2000
  //                   })
  //                 }
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     wx.login({
  //       success(res) {
  //         console.log(self.data)
  //         wx.request({
  //           url: 'https://wxapi.ufatfat.com/hustcats/user/getOpenID',
  //           data: {
  //             jscode: res.code
  //           },
  //           success(res) {
  //             if (res.data)
  //               openID = res.data
  //             console.log(res.data)
  //             wx.uploadFile({
  //               filePath: self.data.uploadImgUrl,
  //               name: 'uploadImg',
  //               url: 'https://wxapi.ufatfat.com/hustcats/user/uploadRecord',
  //               formData: {
  //                 'desc': inputDesc,
  //                 'openID': openID,
  //                 'catid': id,
  //                 'avatar': self.data.userInfo.avatarUrl,
  //                 'nickname': self.data.userInfo.nickName,
  //               },
  //               success(res) {
  //                 console.log(res.data)
  //                 if (res.data == 1) {
  //                   wx.showToast({
  //                     title: '提交成功',
  //                     icon: 'success',
  //                     duration: 2000
  //                   })
  //                   self.setData({
  //                     uploadContainerDisplay: 'none'
  //                   })
  //                 } else {
  //                   console.log(res.data)
  //                   wx.showToast({
  //                     title: res.data,
  //                     image: '/img/cross.png',
  //                     duration: 2000
  //                   })
  //                 }
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  chooseImg: function () {
    wx.chooseImage({
      success: (res) => {
        let temp = res.tempFilePaths
        let imgs = []
        for (let i = 0; i < temp.length; i++) {
          imgs[i] = {
            img: temp[i],
            ph: '输入照片描述',
            desc: ''
          }
        }
        let len1 = temp.length
        let len2 = this.data.imgs.length
        if (len1 + len2 > 9)
          wx.showToast({
            icon: 'none',
            title: '最多选九张照片！',
          })
        else {
          this.setData({
            imgs: this.data.imgs.concat(imgs),
            uploadBtn: temp.length,
            upload: 1,
          })
        }
        wx.pageScrollTo({
          scrollTop: 5000,
          duration: 300
        })
      }
    })
    console.log(this.data)
  },
  uploadImg: function () {
    let that = this
    let imgs = this.data.imgs
    wx.getSetting({
      success(res) {
        console.log("getsetting")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
    console.log(globalData.openid)
    for (let i = 0; i < imgs.length; i++) {

      wx.uploadFile({
        url: 'https://api2.ufatfat.com/ai/checkUploadImg', 
        filePath: imgs[i].img,
        name: 'uploadImg',
        success:res=>{
          console.log(res.data)
          if(res.data==1){
      wx.uploadFile({
        filePath: imgs[i].img,
        name: 'uploadImg',
        formData: {
          desc: imgs[i].desc,
          openid: globalData.openid,
          catid: id,
          index: i,
          isIndex: 0,
          verified:1,
        },
        url: 'https://wxapi.ufatfat.com/hustcats/cat/uploadCatPhotos',
        success: res => {
          console.log(res.data)
          let data = JSON.parse(res.data)
          wx.showToast({
            title: data.errmsg,
            icon: (data.errcode == -1 ? 'none' : 'success'),
            duration: 2000,
          })
          if (data.errcode != -1) {
            this.setData({
              imgs: [],
              upload: 0,
              uploadBtn: 1,
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title: `第${i+1}张不是猫图`,
        duration:1000,
        image:'/img/errRemind.png',
      })
    }
    }
      })
    }
  },
  addph: function (e) {
    if (e.detail.value == '') {
      let imgs = this.data.imgs
      let index = e.currentTarget.dataset.id
      imgs[index].ph = '添加照片描述'
      this.setData({
        imgs: imgs
      })
    } else {
      let imgs = this.data.imgs
      let index = e.currentTarget.dataset.id
      let val = e.detail.value
      imgs[index].desc = val
      this.setData({
        imgs: imgs
      })
      console.log(this.data)
    }
  },
  clearph: function (e) {
    let index = e.currentTarget.dataset.id
    let imgs = this.data.imgs
    imgs[index].ph = ''
    this.setData({
      imgs: imgs
    })
  },
  toggleDisplay: function () {

    if (this.data.uploadContainerDisplay == 'none')
      this.setData({
        uploadContainerDisplay: 'block'
      })
    else
      this.setData({
        uploadContainerDisplay: 'none'
      })
  },
  swiperChange: function (e) {
    let index = e.detail.current
    this.setData({
      index: index
    })
  },
  toggleThumbUp: function () {
    var that = this
    console.log("toggle")
    wx.getSetting({
      success(res) {
        console.log("getsetting")
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
            
                    console.log(res.userInfo)
                   
      
      
                  
                 
                
              
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              })
            }
          })
        }
      }
    })
    wx.request({
      url: "https://wxapi.ufatfat.com/hustcats/cat/toggleThumbUp",
      data: {
        openid: globalData.openid,
        catid: id,
      },
      success: res => {
        console.log(res.data)
        this.setData({
          thumbUp: res.data.thumbUp,
          thumbUpNum: res.data.thumbUpNum,
        })
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.emit('toggleThumbUp', {
          thumbUp: res.data.thumbUp,
          thumbUpNum: res.data.thumbUpNum
        })
      }
    })
    // wx.request({
    //   url:"https://wxapi.ufatfat.com/hustcats/cat/getCatInfoById",
    //   data:{
    //     openid:openid,
    //     catid:id
    //   },
    //   success:res=>{
    //       console.log(res.data)
    //   }
    // })
  },
  deleteChosenImg: function (e) {
    let imgs = this.data.imgs
    let index = e.currentTarget.dataset.index
    imgs.splice(index, 1)
    this.setData({
      imgs: imgs,
      uploadBtn: imgs.length,
      upload: imgs.length ? 1 : 0,
    })
  }



})

function jsonLength(o) {
  let len = 0;
  for (let p in o) {
    len++
  }
  return len
}

function upload() {

}