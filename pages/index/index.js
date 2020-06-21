//index.js
//获取应用实例
const app = getApp()
let page = 1
const globalData = app.globalData
const beta = app.globalData.beta
let locationFilter = ''
let speciesFilter = '' //species的后端所需要的格式
let name = ''
Page({
  data: {
    catsInfo: {},
    locationChosen: '',
    speciesChosen: '',
    locationFilter: [],
    speciesFilter: [],
    locationFilters: [],
    speciesFilters: [],
    locationFiltersChosen: ['', '', '', ''],
    speciesFiltersChosen: [],

    speciesAll: 'filterChosen',
    tab: 'index',
    displaySearchBox: 'none',
    locationDisplay: 'none',
    speciesDisplay: 'none',
    thumbup: 0,
    thumbupnum: 0,
    nowId: 0,
    searchInput: '',
    a: 'block',
    bottomDisplay:'none'

  },
  onShareAppMessage: function () {

  },
  searchSubmit: function (e) {

    console.log(e.detail.value)
    name = e.detail.value
  },
  jumpto: function (e) {

    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/catinfo/catinfo?id=' + id,
      events: {
        toggleThumbUp: data => {
          let catsInfo = this.data.catsInfo
          catsInfo[index].thumbup = data.thumbUp,
            catsInfo[index].thumbupnum = data.thumbUpNum
          this.setData({
            catsInfo: catsInfo
          })

        }
      }
    })
  },

  locationChosen: function () {
    if (!this.data.locationChosen) {
      this.setData({
        locationChosen: 'chosen',
        speciesChosen: '',
        locationDisplay: 'block',
        speciesDisplay: 'none',

      })
    } else {

      this.setData({
        locationChosen: '',
        locationDisplay: 'none',
      })

    }
  },
  jumpToAdd:function(){
      wx.navigateTo({
        url: '/pages/addCats/addCats',
      })
  },
  speciesChosen: function () {
    if (!this.data.speciesChosen)
      this.setData({
        locationChosen: '',
        speciesChosen: 'chosen',
        locationDisplay: 'none',
        speciesDisplay: 'block',

      })
    else {
      this.setData({
        speciesChosen: '',
        speciesDisplay: 'none',
      })
    }
  },
  toggleSearch: function () {
    this.setData({
      displaySearchBox: this.data.displaySearchBox == "none" ? "block" : "none",

    })
    name = ''
  },
  toggleLocationFilter: function (e) {
    let locationFiltersChosen = this.data.locationFiltersChosen //表示地点是否被选中得数组
    var index = e.currentTarget.dataset.id; //被点击的地点的下标
    let filters = this.data.locationFilter
    locationFiltersChosen[index] = locationFiltersChosen[index] ? null : 'filterChosen'


    console.log(index)
    filters[index] = !filters[index] ? this.data.locationFilters[index].id : null
    this.setData({
      locationFilter: filters,
      locationFiltersChosen: locationFiltersChosen
    })

  },
  toggleSpeciesFilter: function (e) {

    let locationFiltersChosen = this.data.speciesFiltersChosen
    var index = e.currentTarget.dataset.id; //被点击的地点的下标

    locationFiltersChosen[index] = locationFiltersChosen[index] ? null : 'filterChosen'

    let filters = this.data.speciesFilter

    filters[index] = !filters[index] ? this.data.speciesFilters[index].id : null
    this.setData({
      speciesFilter: filters,
      speciesFiltersChosen: locationFiltersChosen
    })

  },

  btnReset: function () {
    console.log(this.data.searchInput)
    this.setData({
      locationFiltersChosen: [],
      speciesAll: 'filterChosen',
      speciesFiltersChosen: [],
      locationFilter: [],
      speciesFilter: [],
      locationFiltersChosen: ['', '', '', ''],
      speciesFiltersChosen: [],
      searchInput: ''
    })
  },
  btnDone: function () {

    locationFilter = this.data.locationFilter ? this.data.locationFilter.join(',').replace(/,{2,}/g, ',') : ','
    speciesFilter = this.data.speciesFilter ? this.data.speciesFilter.join(',').replace(/,{2,}/g, ',') : ','
    locationFilter = locationFilter[0] == ',' ? locationFilter.slice(1) : locationFilter,
      speciesFilter = speciesFilter[0] == ',' ? speciesFilter.slice(1) : speciesFilter,

      console.log(locationFilter)
    console.log(speciesFilter)

    console.log(name)
    page = 1
    this.getCatsInfo(name, page, name == '' ? locationFilter : '', name == '' ? speciesFilter : '')
    this.setData({
      displaySearchBox: "none",
      searchInput: ''
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 100
    })

  },
  onLoad: function () {
    // wx.request({
      
    //   url: "https://wxapi.ufatfat.com/hustcats/cat/getB",
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: {
    //     tsvc: app.getCode(),
    //     beta: beta,
    //     openid: app.globalData.openid
    //   },
    //   success: res => {
    //     let a = (res.data == 0 ? "none" : "block")
    //     console.log(a)
    //     this.setData({
    //       a: a
    //     })

    //   }
    // })
    let that = this
    console.log("A")
    console.log(app.globalData.openid)
    if(typeof(app.globalData.openid)!="string"||!app.globalData.openid)
    {
      
      wx.getStorage({
        key:"openid",
        
        success:function(res){
          console.log("success")
          console.log(res.data)
          if(typeof(res.data)=="string")
         { app.globalData.openid=res.data
          that.getCatsInfo('', page, locationFilter, speciesFilter)}
          else{
            console.log("fail")
            that.getOpenid(app)
           

          }
        },
        fail:function(){
          console.log("fail")
          that.getOpenid(app)
          console.log(app.globalData.openid)
          
        }
      })
    }else{ that.getCatsInfo('', page, locationFilter, speciesFilter)}
    console.log(app.globalData.openid)
   
   
   
    // wx.login({

    //   success: function (res) {

    //     if (res.code) {
    //       //发起网络请求
    //       if (globalData.openid == "") {
    //         wx.request({

    //           url: 'https://wxapi.ufatfat.com/hustcats/user/getopenid',
    //           method: "POST",
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           data: {
    //             jscode: res.code,
    //             tsvc: app.getCode(),
    //             beta: beta,
    //             openid: app.globalData.openid
    //           },
    //           success: (res) => {

    //             app.globalData.openid = res.data

               


    //           },
    //           fail: (res) => {


    //           },
    //         }, )
    //       } else {
    //           console.log(app.globalData.openid)
    //       }
    //     }
    //   }
    // });


    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getFilters',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid
      },
      success: res => {
        this.setData({
          locationFilters: res.data.locationFilters,
          speciesFilters: res.data.speciesFilters
        })
        console.log(res.data)
      }

    })
    // wx.getSetting({
    //   success(res) {

    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {

    //           wx.request({
    //             url: 'https://wxapi.ufatfat.com/hustcats/user/userInfo',
    //             method: 'POST',
    //             header: {
    //               'content-type': 'application/x-www-form-urlencoded'
    //             },
    //             data: {
    //               avatar: res.userInfo.avatarUrl,
    //               nickname: res.userInfo.nickName,
    //               gender: res.userInfo.gender,
    //               tsvc: app.getCode(),
    //               beta: beta,
    //               openid: app.globalData.openid
    //             }
    //           })


    //         }

    //       })
    //     }
    //   }
    // })
    wx.stopPullDownRefresh()
  },

  onShow() {
    var that = this

    // wx.getStorage({
    //   key: 'thumbup',
    //   success(res) {
    //     var i = that.data.nowId - 1

    //     if (i >= 0) {
    //       var thumbupTemp = `catsInfo[${i}].thumbup`


    //       that.setData({
    //         [thumbupTemp]: res.data
    //       })

    //     }
    //   }
    // })
    // wx.getStorage({
    //   key: 'thumbupnum',
    //   success(res) {
    //     var i = that.data.nowId - 1

    //     if (i >= 0) {
    //       var thumbupTempnum = `catsInfo[${i}].thumupnum`

    //       that.setData({
    //         [thumbupTempnum]: res.data
    //       })

    //     }
    //   }
    // })
    // wx.removeStorage({
    //   key: 'thumbupnum',
    //   success (res) {
    //   }
    // })
    // wx.removeStorage({
    //   key: 'thumbup',
    //   success (res) {
    //   }
    // })
  },

  onReachBottom: function (e) {
    page++

    console.log(name)
    this.getCatsInfo(name, page, name == '' ? locationFilter : '', name == '' ? speciesFilter : '', 1)
  },


  onPullDownRefresh: function () {


    this.onLoad(); //重新加载onLoad()
    page = 1
  },

  closeSearch: function () {
    this.setData({
      displaySearchBox: 'none'
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
  
  getCatsInfo: function (getName, getPage, getLocationFilter, getSpeciesFilter, getCat) {
    let that = this
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {

        name: getName,
        page: getPage,
        locationFilter: getLocationFilter,
        speciesFilter: getSpeciesFilter,
        tsvc: app.getCode(),
        beta: beta,
        openid: app.globalData.openid
      },

      success: res => {
        let cat = res.data
        console.log(cat)
        if (cat) {
          for (let i = 0; i < cat.length; i++) {
           
            cat[i].indexImg = cat[i].indexImg.slice(0, 52) + 'compressed_' + cat[i].indexImg.slice(52)
          }

          that.setData({
            catsInfo: getCat ? that.data.catsInfo.concat(cat) : cat,

          })
        }else{
          that.setData({
            bottomDisplay:'block'
          })
        }
      },
    })
  },
  getOpenid:function(that){
    let _this=this
    wx.login({
      
      success: function(res) {
        console.log("a")
        console.log(that.globalData.openid)
        
        let jscode = res.code
        console.log(jscode)
        if (res.code) {   
              //发起网络请求
              wx.request({
                
                url: 'https://wxapi.ufatfat.com/hustcats/user/getTestID',
                method:"POST",
                header:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                data: {
                  jscode: jscode,
                  beta:that.globalData.beta, tsvc: that.getCode(),openid:that.globalData.openid
                },
                success:(res)=>{
              console.log(res.data)
               that.globalData.openid = res.data

               _this.getCatsInfo('', page, locationFilter, speciesFilter)
               wx.setStorage({
                key:"openid",
                data:res.data
              })
                // wx.request({
                //   url:"https://wxapi.ufatfat.com/hustcats/user/userInfo",
                //   method:"POST",
                //   header:{
                //     'content-type':'application/x-www-form-urlencoded'
                //   },
                //   data:{
                    
                //     avatar:'',
                //     nickname:'',
                //     gender:'',
                //     beta:that.globalData.beta, tsvc: that.getCode(),openid:that.globalData.openid
                //   }
                // })
                },
               fail:(res)=>{
                
                 
                },
              },
              )
           
          
          
        
    } else {
             
    }
      
    }
    });
  

  },
})