//index.js
//获取应用实例
const app = getApp()
let page = 1
const globalData=app.globalData
const beta =app.globalData.beta
Page({
  data: {
    catsInfo: {},
    locationChosen: '',
    speciesChosen: '',
    locationFilter: [],
    speciesFilter: [],
    locationFilters: [],
    speciesFilters: [],
    locationFiltersChosen: ['','','',''],
    speciesFiltersChosen: [],
  
    speciesAll: 'filterChosen',
    tab: 'index',
    displaySearchBox:'none',
    locationDisplay:'none',
    speciesDisplay:'none',
    thumbup:0,
    thumbupnum:0,
    nowId:0,
    searchInput:'',
    a:'none'
   
  },
  onShareAppMessage: function () {

  },
  searchSubmit: function(e){
   
   
    page =1
   if(e.detail.value!=' ')
 {
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data: {
        name:e.detail.value,
        locationFilter:'',
        speciesFilter: '',
       
        page:page,
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
       
      },
      success:(res)=>{ 
            //利用箭头函数替换原来的that=this
        let cat = res.data
        console.log(cat)
        for (let i = 0; i < cat.length; i++) {
      
         cat[i].indexImg =cat[i].indexImg.slice(0,52)+'compressed_'+cat[i].indexImg.slice(52)
         }
        this.setData({
          catsInfo: cat
        })
       
      }
    })
  }
  },
  jumpto: function(e){
    
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
  
  locationChosen: function(){
    if(!this.data.locationChosen){
      this.setData({
        locationChosen: 'chosen',
        speciesChosen: '',
        locationDisplay:'block',
        speciesDisplay:'none',
        
      })
    }
      else{
        
        this.setData({
          locationChosen: '',
          locationDisplay:'none',
        })
      
      }
  },
  speciesChosen: function(){
    if(!this.data.speciesChosen)
      this.setData({
        locationChosen: '',
        speciesChosen: 'chosen',
        locationDisplay:'none',
        speciesDisplay:'block',
        
      })
      else{
        this.setData({
          speciesChosen: '',
          speciesDisplay:'none',
        })
      }
  },
  toggleSearch:function(){
    // if(this.data.displaySearchBox=="none")
    // {
    //   this.setData({
    //     displaySearchBox:"block",
    //   })
    // }
    // else{
    //   this.setData({
    //     displaySearchBox:"none"
    //   })
    // }
    this.setData({
      displaySearchBox:this.data.displaySearchBox=="none"?"block":"none",
     
    })
  },
  toggleLocationFilter: function(e){
    let locationFiltersChosen = this.data.locationFiltersChosen//表示地点是否被选中得数组
    var index = e.currentTarget.dataset.id;//被点击的地点的下标
    let filters = this.data.locationFilter
    locationFiltersChosen[index] = locationFiltersChosen[index] ? null : 'filterChosen'
    
    
 console.log(index)
    filters[index] = !filters[index] ? this.data.locationFilters[index].id: null
    this.setData({
      locationFilter: filters,
      locationFiltersChosen:locationFiltersChosen
    })
   
  },
  toggleSpeciesFilter: function(e){
   
    let locationFiltersChosen = this.data.speciesFiltersChosen
    var index = e.currentTarget.dataset.id;//被点击的地点的下标
  
    locationFiltersChosen[index] = locationFiltersChosen[index] ? null : 'filterChosen'
    
    let filters = this.data.speciesFilter
 
    filters[index] = !filters[index] ? this.data.speciesFilters[index].id: null
    this.setData({
      speciesFilter: filters,
      speciesFiltersChosen: locationFiltersChosen
    })
   
  },
  
  btnReset: function(){
    this.setData({
      locationFiltersChosen: [],
      speciesAll: 'filterChosen',
      speciesFiltersChosen: [],
      locationFilter: [],
      speciesFilter: [],
      locationFiltersChosen: ['','','',''],
    speciesFiltersChosen: [],
    
    })
  },
  btnDone: function(){
    this.setData({
      displaySearchBox:"none"
    })
    console.log(this.data.locationFilter)
    let locationFilter = this.data.locationFilter ? this.data.locationFilter.join(',').replace(/,{2,}/g, ','): ''
    let speciesFilter = this.data.speciesFilter ? this.data.speciesFilter.join(',').replace(/,{2,}/g, ',') : ''
    page = 1
    console.log(locationFilter)
   console.log(speciesFilter)
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data: {
       
        name:'',
       page:page,
        locationFilter: locationFilter[0]==','?locationFilter.slice(1):locationFilter,
        speciesFilter: speciesFilter[0]==','?speciesFilter.slice(1):speciesFilter,
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
      },
      
      success:res=>{        
       this.setData({
         catsInfo:res.data,
       
       })
       wx.pageScrollTo({
        scrollTop: 0,
        duration: 100
      })
    
         
      },
    })

  },
  onLoad: function(){
    let locationFilter = this.data.locationFilter ? this.data.locationFilter.join(',').replace(/,{2,}/g, ','): ''
    let speciesFilter = this.data.speciesFilter ? this.data.speciesFilter.join(',').replace(/,{2,}/g, ',') : ''
    console.log(locationFilter)
    console.log(speciesFilter)
    wx.request({
      url:"https://wxapi.ufatfat.com/hustcats/cat/getB",
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
      },
      success:res=>{
        let a=(res.data==0?"none":"block")
        console.log(a)
        this.setData({
          a:a
        })
       
      }
    })
    let that=this
    wx.login({
      
      success: function(res) {
       
        if (res.code) {
          //发起网络请求
        if(globalData.openid==""){
          wx.request({
            
            url: 'https://wxapi.ufatfat.com/hustcats/user/getopenid',
            method:"POST",
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            data: {
              jscode: res.code,
              tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
            },
            success:(res)=>{
           
           globalData.openid = res.data
            
           wx.request({
             url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
             method:"POST",
             header:{
              'content-type':'application/x-www-form-urlencoded'
            },
             data: {
              
               name:'',
               page: page,
               locationFilter: locationFilter[0]==','?locationFilter.slice(1):locationFilter,
               speciesFilter: speciesFilter[0]==','?speciesFilter.slice(1):speciesFilter,
               tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
             },
            
             success:res=>{        
              let cat = res.data
             console.log(cat)
              for (let i = 0; i < cat.length; i++) {
            
               cat[i].indexImg =cat[i].indexImg.slice(0,52)+'compressed_'+cat[i].indexImg.slice(52)
               }
               that.setData({
                 catsInfo: cat,
               
               })        
              
              
             
             },
           })
           
            
            },
           fail:(res)=>{
            
             
            },
          },
          )}else{
            wx.request({
              url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
              method:"POST",
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              data: {
               
                name:'',
                page: page,
                locationFilter: that.data.locationFilter.join(','),
                speciesFilter:that.data.speciesFilter.join(','),
                tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
              },
             
              success:res=>{        
                that.setData({
                  catsInfo: res.data,
                
                })        
                console.log(res.data)
              
              },
            })
          }
        } 
      }
    });
   
 
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getFilters',
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
      },
      success:res=>{
        this.setData({
          locationFilters: res.data.locationFilters,
          speciesFilters: res.data.speciesFilters
        })
        console.log(res.data)
      }
     
    })
    wx.getSetting({
      success (res){
    
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
        
              wx.request({
                url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
                method:'POST',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                data:{
                  avatar:res.userInfo.avatarUrl,
                  nickname:res.userInfo.nickName,
                  gender:res.userInfo.gender,
                  tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
                }
              })


            }
           
          })
        }
      }
    })
    wx.stopPullDownRefresh()
  },

onShow(){
  var that=this
 
  wx.getStorage({
    key: 'thumbup',
    success (res) {
      var i=that.data.nowId-1
     
      if(i>=0){
      var thumbupTemp=`catsInfo[${i}].thumbup`
    
     
     that.setData({
        [thumbupTemp]:res.data
     })

    }
    }
  })
  wx.getStorage({
    key: 'thumbupnum',
    success (res) {
      var i=that.data.nowId-1
   
      if(i>=0){
      var thumbupTempnum=`catsInfo[${i}].thumupnum`
     
     that.setData({
        [thumbupTempnum]:res.data
     })

    }
    }
  })
  wx.clearStorage()
},
  
  onReachBottom: function(e){
    page++
    let locationFilter = this.data.locationFilter ? this.data.locationFilter.join(',').replace(/,{2,}/g, ','): ''
    let speciesFilter = this.data.speciesFilter ? this.data.speciesFilter.join(',').replace(/,{2,}/g, ',') : ''
    console.log(locationFilter)
    console.log(speciesFilter)
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data: {
     
       name:'',
       page:page,
       locationFilter: locationFilter[0]==','?locationFilter.slice(1):locationFilter,
        speciesFilter: speciesFilter[0]==','?speciesFilter.slice(1):speciesFilter,
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
      },
      success:res=>{    
        if(res.data){
          let cat = res.data
       
          for (let i = 0; i < cat.length; i++) {
        
           cat[i].indexImg =cat[i].indexImg.slice(0,52)+'compressed_'+cat[i].indexImg.slice(52)
           }
           console.log(cat)
          this.setData({
            catsInfo: this.data.catsInfo.concat(res.data)
          })        
        }
      },
    })
  },


  onPullDownRefresh: function () {
    
   
    this.onLoad(); //重新加载onLoad()
    page=1
  },

  closeSearch:function(){
      this.setData({
        displaySearchBox:'none'
      })
  },
  changeTab: function(e){
    let thatTab = e.currentTarget.dataset.tab
    if(this.data.tab == thatTab)
      return
    this.setData({
      tab: thatTab
    })
   
  },
  bindGetUserInfo (e) {
   
    wx.request({
      url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
      method:"POST",
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        avatar:e.detail.userInfo.avatarUrl,
        nickname:e.detail.userInfo.nickName,
        gender:e.detail.userInfo.gender,
        openid:globalData.openid,
        tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
      },
      success:res=>{
      
      }
    })
  }
})

function jsonAdd(d, s){
  for(var p in s){
    d[p] = s[p]
  }
  return d 
}