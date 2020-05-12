//index.js
//获取应用实例
const app = getApp()
let page = 1
let thisPage = 'index'
const globalData=app.globalData
Page({
  data: {
    test:0,
    catsInfo: {},
    modelDisplay: 'none',
    filterDisplay: 'none',
    locationChosen: '',
    speciesChosen: '',
    locationFilter: [],
    speciesFilter: [],
    locationFilters: [],
    speciesFilters: [],
    locationFiltersChosen: ['','','',''],
    speciesFiltersChosen: [],
    locationAll: 'filterChosen',
    speciesAll: 'filterChosen',
    tab: 'index',
    displaySearchBox:'none',
    locationDisplay:'none',
    speciesDisplay:'none',
    thumbup:0,
    thumbupnum:0,
    nowId:0,
    searchInput:''
   
  },
  onShareAppMessage: function () {

  },
  searchSubmit: function(e){
   
   
    page =1
   if(e.detail.value!=' ')
 {
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      data: {
        name:e.detail.value,
        locationFilter:'',
        speciesFilter: '',
        openid:globalData.openid,
        page:page
       
      },
      success:(res)=>{ 
            //利用箭头函数替换原来的that=this
        let cat = res.data
       
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
  // jumpToAdd: function(){
  //   wx.navigateTo({
  //     url:"/pages/addCats/addCats",
      
  //   })
  //   .log("jump")
  // },
  locationChosen: function(){
    if(!this.data.locationChosen){
      this.setData({
        locationChosen: 'chosen',
        speciesChosen: '',
        locationDisplay:'block',
        speciesDisplay:'none'
     
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
    if(this.data.displaySearchBox=="none")
    {
      this.setData({
        displaySearchBox:"block",
      })
    }
    else{
      this.setData({
        displaySearchBox:"none"
      })
    }
  },
  toggleLocationFilter: function(e){
    let data = this.data.locationFiltersChosen
    var index;
    for(let i=0; i<this.data.locationFilters.length;i++)
    {
      if(this.data.locationFilters[i].id==e.currentTarget.dataset.id){
      index=i
      break;
    }
    }
    data[index] = data[index] ? null : 'filterChosen'
    if(data.indexOf('filterChosen') == -1)
      this.setData({
        locationAll: 'filterChosen'
      })
    else
      this.setData({
        locationAll: ''
      })
    let filters = this.data.locationFilter
   
    filters[e.currentTarget.dataset.id ] = !filters[e.currentTarget.dataset.id ] ? e.currentTarget.dataset.id : null
    this.setData({
      locationFilter: filters,
      locationFiltersChosen: data
    })
   
  },
  toggleSpeciesFilter: function(e){
    console.log(e)
    if(e.currentTarget.dataset.id == 'all'){
      this.setData({
        speciesAll: 'filterChosen',
        speciesFiltersChosen: []
      })
      return
    }
    let data = this.data.speciesFiltersChosen
    var index;
    for(let i=0; i<this.data.speciesFilters.length;i++)
    {
      if(this.data.speciesFilters[i].id==e.currentTarget.dataset.id){
      index=i
      break;
    }
    }
    data[index] = data[index] ? null : 'filterChosen'
    if(data.indexOf('filterChosen') == -1)
      this.setData({
        speciesAll: 'filterChosen'
      })
    else
      this.setData({
        speciesAll: ''
      })
    let filters = this.data.speciesFilter
    
    filters[index] = !filters[index] ? e.currentTarget.dataset.id : null
    this.setData({
      speciesFilter: filters,
      speciesFiltersChosen: data
    })
  
  },
  toggleFilter: function(){
    if(this.data.modelDisplay == 'none')
      this.setData({
        modelDisplay: 'block',
      })
    else
      this.setData({
        modelDisplay: 'none',
      })
      if(this.data.filterDisplay == 'none')
        this.setData({
          filterDisplay: 'block',
        })
      else
        this.setData({
          filterDisplay: 'none',
        })
      
  },
  btnReset: function(){
    this.setData({
      locationAll: 'filterChosen',
      locationFiltersChosen: [],
      speciesAll: 'filterChosen',
      speciesFiltersChosen: [],
      locationFilter: [],
      speciesFilter: []
    })
  },
  btnDone: function(){
    this.setData({
      displaySearchBox:"none"
    })
    let locationFilter = this.data.locationFilter ? this.data.locationFilter.join(',').replace(/,{2,}/g, ',').substr(1) : ''
    let speciesFilter = this.data.speciesFilter ? this.data.speciesFilter.join(',').replace(/,{2,}/g, ',').substr(1) : ''
    page = 1
    
   
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      data: {
        openid:globalData.openid,
        name:'',
       page:page,
        locationFilter: locationFilter,
        speciesFilter: speciesFilter 
      },
      
      success:res=>{        
       this.setData({
         catsInfo:res.data
       })
    
          filterDisplay: 'none'
      },
    })

  },
  onLoad: function(){
    wx.stopPullDownRefresh()
    let that=this
    wx.login({
      
      success: function(res) {
       
        if (res.code) {
          //发起网络请求
        if(globalData.openid==""){
          wx.request({
            
            url: 'https://wxapi.ufatfat.com/hustcats/user/getopenid',
            data: {
              jscode: res.code
            },
            success:(res)=>{
           
           globalData.openid = res.data
            
           wx.request({
             url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
             data: {
               openid:globalData.openid,
               name:'',
               page: page,
               locationFilter: that.data.locationFilter.join(','),
               speciesFilter:that.data.speciesFilter.join(',')
             },
            
             success:res=>{        
              let cat = res.data
       
              for (let i = 0; i < cat.length; i++) {
            
               cat[i].indexImg =cat[i].indexImg.slice(0,52)+'compressed_'+cat[i].indexImg.slice(52)
               }
               that.setData({
                 catsInfo: cat,
               
               })        
               console.log(cat)
              
             
             },
           })
           
            
            },
           fail:(res)=>{
            
             
            },
          },
          )}else{
            wx.request({
              url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
              data: {
                openid:globalData.openid,
                name:'',
                page: page,
                locationFilter: that.data.locationFilter.join(','),
                speciesFilter:that.data.speciesFilter.join(',')
              },
             
              success:res=>{        
                that.setData({
                  catsInfo: res.data,
                
                })        
               
              
              },
            })
          }
        } 
      }
    });
   
 
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getFilters',
      success:res=>{
        this.setData({
          locationFilters: res.data.locationFilters,
          speciesFilters: res.data.speciesFilters
        })
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
                data:{
                  avatar:res.userInfo.avatarUrl,
                  nickname:res.userInfo.nickName,
                  gender:res.userInfo.gender,
                }
              })


            }
           
          })
        }
      }
    })
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
 
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      data: {
     
       openid: globalData.openid,
       name:'',
       page:page,
        locationFilter: this.data.locationFilter.join(','),
        speciesFilter: this.data.speciesFilter.join(',')
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
      
      data:{
        avatar:e.detail.userInfo.avatarUrl,
        nickname:e.detail.userInfo.nickName,
        gender:e.detail.userInfo.gender,
        openid:globalData.openid
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