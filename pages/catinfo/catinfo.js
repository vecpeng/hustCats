const app = getApp()

let swiperImgPage = 1
let id = 0
let currentIndex = 0
let currentDate = ''
let lastDate = ''
let imgsPage = 1
const globalData = app.globalData;
const beta = app.globalData.beta

let inputDesc = ''
let recordPage = 1
const nickname = app.globalData.userInfo.nickName
const avatar = app.globalData.userInfo.avatarUrl




Page({
  data: {
    tags: [],
    albumChoose: "choosed",
    commentChoose: "noChoose",
    albumDisplay: "",
    commentDisplay: "none",
    a: 'block',
    newComment: '',
    test: "helloworld",
    catSwiperImgs: [],
    catInfo: {},
    catImgs: [],
    photoNum: 0,
    records: [],
    recordNum: 0,
    userInfo: null,
    gender: '',
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
    avatarUrl: '',
    newReply: '',
    atNickname: 0,
    replyNickname: [],
    replyNameid: []
  },




  onLoad: function (option) {

    imgsPage = 1
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
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        catid: id,
        page: 1,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid

      },
      success(res) {
        let cat = res.data

        for (let i = 0; i < cat.length; i++) {

          cat[i].img = cat[i].img.slice(0, 52) + 'compressed_' + cat[i].img.slice(52)
        }

        self.setData({
          catSwiperImgs: cat
        })

      },
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatPhotoNumById',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        catid: id,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid
      },

      success(res) {
        self.setData({
          photoNum: res.data,
        })
      }

    })
    // wx.request({
    //   url:"https://wxapi.ufatfat.com/hustcats/cat/getB",
    //   method:"POST",
    //   header:{
    //     'content-type':'application/x-www-form-urlencoded'
    //   },
    //   data: {

    //     tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
    //   },
    //   success:res=>{
    //     console.log(res.data)
    //     let a=(res.data==0?"none":"block")
    //     console.log(a)
    //     this.setData({
    //       a:a
    //     })

    //   }
    // })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatInfoById',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        catid: option.id,
        openid: globalData.openid,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid

      },
      success(res) {
        console.log(res.data)
        self.setData({
          catInfo: res.data,
          thumbUpNum: res.data.thumbupnum,
          thumbUp: res.data.thumbup,
          nickname: res.data.nickname == null ? "刘老师" : res.data.nickname,
          date: res.data.date == null ? "2020-05-05" : res.data.date,

        })
        let tags = res.data.tags
        console.log(tags)
        for (let i = 0; i < tags.length; i++) {
          if (tags[i] == "已绝育") {
            tags[i] = 0
          } else if (tags[i] == "已领养") {
            tags[i] = 1
          } else if (tags[i] == "未领养") {
            tags[i] = 2
          } else if (tags[i] == "未绝育") {
            tags[i] = 3
          }

        }
        console.log(tags)
        self.setData({
          tags: tags
        })
        console.log(res.data)


      }

    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatPhotosById',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        catid: option.id,
        page: 1,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid
      },
      success(res) {

        let catImgs = res.data
      console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {

          catImgs[i].img = catImgs[i].img.slice(0, 52) + 'compressed_' + catImgs[i].img.slice(52)
          if (catImgs[i].date != null) {

            catImgs[i].date = catImgs[i].date.slice(0, 10)
          }
        }

        self.setData({
          catImgs: catImgs,
        })
      }

    })

    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getIndexPhotoById',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        
      },
      data: {
        catid: id,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid
      },
      success: (res) => {

        this.setData({
          indexPhoto:  res.data.img.slice(0, 52) + 'compressed_' + res.data.img.slice(52)

        })

      }
    })


    // 获取评论
    wx.request({
      url: "https://wxapi.ufatfat.com/hustcats/comment/getCommentsById",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        catid: id,
        order: '',
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res.data)
        this.setData({
          comments: res.data,

        })
      }
    })

  },
  chooseReply: function (e) {
    // let that = this
    // let comments = that.data.comments
    // console.log(e.target.dataset)

    // comments[e.target.dataset.index].userInfo.name = e.target.dataset.name
    // that.setData({
    //   comments:comments
    // })
    // console.log(that.data.comments)
    let that = this
    console.log(e.currentTarget.dataset)
    var replyNickname = that.data.replyNickname
    var replyNameid = that.data.replyNameid
    replyNameid[e.currentTarget.dataset.index] = e.currentTarget.dataset.nameid
    replyNickname[e.currentTarget.dataset.index] = e.currentTarget.dataset.name
    this.setData({
      replyNickname: replyNickname,
      replyNameid: replyNameid
    })
  },
  // 发送评论
  commentSubmit: function (e) {
    let that = this
    console.log(e)
    console.log(e.target.dataset)
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              let userInfo=res.userInfo
              wx.request({
                url: 'https://wxapi.ufatfat.com/hustcats/user/userInfo',
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  avatar: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName,
                  gender:res.userInfo.gender,
                  tsvc: app.getCode(),
                  beta: beta,
                  openid: app.globalData.openid,
        
                },
                success: res => {
                  
                  that.setData({
                    avatarUrl: userInfo.avatarUrl,
                    nickname: userInfo.nickName,
                    gender: userInfo.gender,
                  })
                }
              })



              if (e.detail.value.comment.replace(/\s+/g, "").length == 0) {
                wx.showToast({
                  title: '评论不能为空',
                  image: '/img/cross.png',
                })
              } else {
                wx.request({
                  url: "https://wxapi.ufatfat.com/hustcats/comment/writeComment",
                  method: "POST",
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    catid: id,

                    content: e.detail.value.comment,
                    replyTo: e.target.dataset.replyto ? e.target.dataset.replyto : 0,
                    tsvc: app.getCode(),
                    beta: beta,
                    openid: app.globalData.openid,
                    at: e.target.dataset.nameid ? e.target.dataset.nameid : 0
                  },
                  success: res => {
                    console.log(res.data)
                    wx.showToast({
                      title: '发送成功',
                      icon: 'success',
                    })
                    wx.request({
                      url: "https://wxapi.ufatfat.com/hustcats/comment/getCommentsById",
                      method: "POST",
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        catid: id,
                        order: '',
                        tsvc: app.getCode(),
                        beta: beta,
                        openid: app.globalData.openid
                      },
                      success: res => {
                        console.log(res.data)
                        that.setData({
                          comments: res.data,
                          newComment: '',
                          newReply: ''
                        })
                      }
                    })

                  }
                })
              }

            }
          })
        } else {
          wx.showToast({
            title: '用户信息未获取',
            image: '/img/cross.png',
          })
        }
      }
    })


  },
  // 点击地图
  mapButton: function () {
    wx.navigateTo({
      url: '/pages/map/map?id=' + id,
    })
  },
  chooseAlbum: function () {
    this.setData({
      albumChoose: "choosed",
      albumDisplay: "",
      commentDisplay: "none",
      commentChoose: "noChoose"
    })
  },
  chooseComment: function () {
    this.setData({
      commentChoose: "choosed",
      albumChoose: "noChoose",
      albumDisplay: "none",
      commentDisplay: ""
    })

  },
  previewImg: function (e) {
    wx.previewImage({
      urls: [this.data.catImgs[e.currentTarget.dataset.index].img],
      current: this.data.catImgs[e.currentTarget.dataset.index].img,
    })
  },
  bindGetUserInfo(e) {
    console.log('a')
    let that = this
    console.log(e.detail.userInfo)
  
  },
  closeSwiper: function () {

    this.setData({
      swiperDisplay: "none"
    })
  },

  bigImg: function (e) {
    let self = this



    self.setData({
        swiperDisplay: '',
        itemid: e.currentTarget.dataset.id,
        index: e.currentTarget.dataset.id,
      }

    )
  },
  /*bigImg: function(e){
    let self = this
    
    wx.previewImage({
      current: self.data.catImgs[e.currentTarget.dataset.id].img,
      urls: [self.data.catImgs[e.currentTarget.dataset.id].img],
    })
  },*/
  recordBigImg: function (e) {
    let self = this

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
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          catid: id,
          page: swiperImgPage,

          tsvc: app.getCode(),
          beta: beta,
          openid: app.globalData.openid
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
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          catid: id,
          page: imgsPage,

          tsvc: app.getCode(),
          beta: beta,
          openid: app.globalData.openid
        },
        success(res) {
          if (res.data) {
            let i = self.data.catImgs.length
            let catImgs = self.data.catImgs.concat(res.data)

            for (i; i < catImgs.length; i++) {
              catImgs[i].img = catImgs[i].img.slice(0, 52) + 'compressed_' + catImgs[i].img.slice(52)
              if (catImgs[i].date != null) {
                catImgs[i].date = catImgs[i].date.slice(0, 10)
              }
            }

            self.setData({
              catImgs: catImgs
            })
          }

        },
      })
    }
    // } else {
    //   recordPage++
    //   wx.request({
    //     url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatRecordsById',
    //     data: {
    //       catid: id,
    //       page: recordPage
    //     },
    //     success(res) {
    //       if (res.data) {
    //         self.setData({
    //           records: self.data.records.concat(res.data)
    //         })
    //       }
    //     },
    //   })
    // }
  },
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      uploadContainerDisplay: 'block',
    })
  },
  // changeTab: function (e) {
  //   let thatTab = e.currentTarget.dataset.tab
  //   if (this.data.tab == thatTab)
  //     return
  //   this.setData({
  //     tab: thatTab
  //   })

  // },


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

  },
  uploadImg: function () {
    let that = this
    let imgs = this.data.imgs
    wx.getSetting({
      success(res) {

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
                tsvc: app.getCode(),
                beta: beta,
                openid: app.globalData.openid
              })
            }
          })
        }
      }
    })

    for (let i = 0; i < imgs.length; i++) {

      wx.uploadFile({
        url: 'https://api2.ufatfat.com/ai/checkUploadImg',
        filePath: imgs[i].img,
        name: 'uploadImg',
        success: res => {

          if (res.data == 1) {
            wx.uploadFile({
              filePath: imgs[i].img,
              name: 'uploadImg',
              formData: {
                desc: imgs[i].desc,

                catid: id,
                index: i,
                isIndex: 0,
                verified: 1,
                tsvc: app.getCode(),
                beta: beta,
                openid: app.globalData.openid
              },
              url: 'https://wxapi.ufatfat.com/hustcats/cat/uploadCatPhotos',
              success: res => {

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
          } else {
            wx.uploadFile({
              filePath: imgs[i].img,
              name: 'uploadImg',
              formData: {
                desc: imgs[i].desc,
                openid: globalData.openid,
                catid: id,
                index: i,
                isIndex: 0,
                verified: 0,
              },
              url: 'https://wxapi.ufatfat.com/hustcats/cat/uploadCatPhotos',
              success: res => {

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

    wx.getSetting({
      success(res) {

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

    wx.request({
      url: "https://wxapi.ufatfat.com/hustcats/cat/toggleThumbUp",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {

        catid: id,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid,
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