//index.js
//获取应用实例
const app = getApp()
let page = 1
let thisPage = 'index'

Page({
  data: {
    catsInfo: {},
    modelDisplay: 'none',
    filterDisplay: 'none',
    locationDisplay: 'block',
    speciesDisplay: 'none',
    locationChosen: 'chosen',
    speciesChosen: '',
    locationFilter: [],
    speciesFilter: [],
    locationFilters: [],
    speciesFilters: [],
    locationFiltersChosen: ['', '', ''],
    speciesFiltersChosen: [],
    locationAll: 'filterChosen',
    speciesAll: 'filterChosen',
    tab: 'index',
  },
  searchSubmit: function(e){
   
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/searchCats',
      data: {
        name: e.detail.value
      },
      success:(res)=>{//利用箭头函数替换原来的that=this
        console.log(res)
        this.setData({
          catsInfo: res.data
        })
      }
    })
  },
  jumpto: function(e){
    wx.navigateTo({
      url: '/pages/catinfo/catinfo?id=' + e.currentTarget.dataset.id,
    })
  },
  locationChosen: function(){
    if(!this.data.locationChosen)
      this.setData({
        locationChosen: 'chosen',
        speciesChosen: '',
        locationDisplay: 'block',
        speciesDisplay: 'none',
      })
  },
  speciesChosen: function(){
    if(!this.data.speciesChosen)
      this.setData({
        locationChosen: '',
        speciesChosen: 'chosen',
        locationDisplay: 'none',
        speciesDisplay: 'block',
      })
  },
  toggleLocationFilter: function(e){
    if(e.currentTarget.dataset.id == 'all'){
      this.setData({
        locationAll: 'filterChosen',
        locationFiltersChosen: []
      })
      return
    }
    let data = this.data.locationFiltersChosen
    data[e.currentTarget.dataset.id-1] = data[e.currentTarget.dataset.id-1] ? null : 'filterChosen'
    if(data.indexOf('filterChosen') == -1)
      this.setData({
        locationAll: 'filterChosen'
      })
    else
      this.setData({
        locationAll: ''
      })
    let filters = this.data.locationFilter
    filters[e.currentTarget.dataset.id] = !filters[e.currentTarget.dataset.id] ? e.currentTarget.dataset.id : null
    this.setData({
      locationFilter: filters,
      locationFiltersChosen: data
    })
  },
  toggleSpeciesFilter: function(e){
    if(e.currentTarget.dataset.id == 'all'){
      this.setData({
        speciesAll: 'filterChosen',
        speciesFiltersChosen: []
      })
      return
    }
    let data = this.data.speciesFiltersChosen
    data[e.currentTarget.dataset.id-1] = data[e.currentTarget.dataset.id-1] ? null : 'filterChosen'
    if(data.indexOf('filterChosen') == -1)
      this.setData({
        speciesAll: 'filterChosen'
      })
    else
      this.setData({
        speciesAll: ''
      })
    let filters = this.data.speciesFilter
    filters[e.currentTarget.dataset.id] = !filters[e.currentTarget.dataset.id] ? e.currentTarget.dataset.id : null
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
   
    let locationFilter = this.data.locationFilter ? this.data.locationFilter.join(',').replace(/,{2,}/g, ',').substr(1) : ''
    let speciesFilter = this.data.speciesFilter ? this.data.speciesFilter.join(',').replace(/,{2,}/g, ',').substr(1) : ''
    page = 1
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      data: {
        page: page,
        locationFilter: locationFilter,
        speciesFilter: speciesFilter
      },
      success:res=>{        
        console.log(res.data)
        this.setData({
          catsInfo: res.data,
          filterDisplay: 'none'
        })        
      },
    })

  },
  onLoad: function(){
   
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      data: {
        page: page,
        locationFilter: this.data.locationFilter.join(','),
        speciesFilter: this.data.speciesFilter.join(',')
      },
      success:res=>{        
        this.setData({
          catsInfo: res.data
        })        
      },
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getFilters',
      success:res=>{
        this.setData({
          locationFilters: res.data.locationFilters,
          speciesFilters: res.data.speciesFilters
        })
      }
    })
  },
  onReachBottom: function(e){
    page++
 
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getCatsInfo',
      data: {
        page: page,
        locationFilter: this.data.locationFilter.join(','),
        speciesFilter: this.data.speciesFilter.join(',')
      },
      success:res=>{    
        if(res.data){
          this.setData({
            catsInfo: this.data.catsInfo.concat(res.data)
          })        
        }
      },
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
})

function jsonAdd(d, s){
  for(var p in s){
    d[p] = s[p]
  }
  return d 
}