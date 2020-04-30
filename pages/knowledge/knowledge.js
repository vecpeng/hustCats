const app = getApp()
let foldA = true
let foldB = true
let foldC = true
Page({
  data: {
    height: 0,
    category: [],
    index: 0,
    content: {},
    search: 'knowledgeSearch.png',
    searchBarDisplay: '',
    displayA: 'none',
    displayB: 'none',
    displayC: 'none',
    advanceDisplay: 'none',
    contentDisplay: 'block'
  },
  onLoad: function (options) {



    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/wiki/getContent',
      data: {
        cid: 1
      },
      success: (res) => {
        this.setData({
          content: res.data
        })
      }
    })


    wx.getSystemInfo({
      complete: (res) => {
        this.setData({
          height: res.windowHeight
        })
      },
    })
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/wiki/getCategory',
      success: (res) => {
        let data = res.data
        this.setData({
          category: data
        })
      }
    })
  },
  toggleSearchBar: function () {
    if (this.data.searchBarDisplay == 'show')
      this.setData({
        searchBarDisplay: 'close',
        search: 'knowledgeSearch.png',
      })
    else
      this.setData({
        searchBarDisplay: 'show',
        search: 'knowledgeSearchActive.png',
      })
  },



  toggleFoldDisplayB: function () {
    console.log("ok")
    if (foldB) {

      foldB = false
      this.setData({
        displayB: 'block'
      })
      this.animate('.foldB', [{
          opacity: 1.0,
          rotate: 0
        },

        {
          opacity: 1.0,
          rotate: 180
        },
      ], 200, this.clearAnimation('.foldB', {
        opacity: true,
        rotate: true
      }), function () {

      }.bind(this))
    } else {
      foldB = true
      this.setData({
        displayB: 'none'
      })
      this.animate('.foldB', [{
          opacity: 1.0,
          rotate: 180
        },

        {
          opacity: 1.0,
          rotate: 0
        },
      ], 200, this.clearAnimation('.foldB', {
        opacity: true,
        rotate: true
      }), function () {

      }.bind(this))
    }
  },


  toggleFoldDisplayC: function () {
    console.log("ok")
    if (foldC) {
      this.setData({
        displayC: 'block'
      })
      foldC = false

      this.animate('.foldC', [{
          opacity: 1.0,
          rotate: 0
        },

        {
          opacity: 1.0,
          rotate: 180
        },
      ], 200, this.clearAnimation('.foldC', {
        opacity: true,
        rotate: true
      }), function () {

      }.bind(this))
    } else {
      foldC = true
      this.setData({
        displayC: 'none'
      })
      this.animate('.foldC', [{
          opacity: 1.0,
          rotate: 180
        },

        {
          opacity: 1.0,
          rotate: 0
        },
      ], 200, this.clearAnimation('.foldC', {
        opacity: true,
        rotate: true
      }), function () {

      }.bind(this))
    }
  },


  toggleFoldDisplayA: function () {
    console.log("ok")
    if (foldA) {

      foldA = false
      this.setData({
        displayA: 'block'
      })

      this.animate('.foldA', [{
          opacity: 1.0,
          rotate: 0
        },

        {
          opacity: 1.0,
          rotate: 180
        },
      ], 200, this.clearAnimation('.foldA', {
        opacity: true,
        rotate: true
      }), function () {

      }.bind(this))
    } else {
      foldA = true
      this.setData({
        displayA: 'none'
      })
      this.animate('.foldA', [{
          opacity: 1.0,
          rotate: 180
        },

        {
          opacity: 1.0,
          rotate: 0
        },
      ], 200, this.clearAnimation('.foldA', {
        opacity: true,
        rotate: true
      }), function () {

      }.bind(this))
    }
  },

  changeIndex: function (e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    if (index == 3) {
      this.setData({
        advanceDisplay: 'block',
        contentDisplay: 'none'
      })
    } else {

      this.setData({
        advanceDisplay: 'none',
        displayA: 'none',
        displayB: 'none',
        displayC: 'none'
      })

      if (!foldA) {
        foldA = true
        this.setData({
          displayA: 'none'
        })
        this.animate('.foldA', [{
            opacity: 1.0,
            rotate: 180
          },

          {
            opacity: 1.0,
            rotate: 0
          },
        ], 200, this.clearAnimation('.foldA', {
          opacity: true,
          rotate: true
        }), function () {

        }.bind(this))

      }
      if (!foldB) {
        foldC = true
        this.setData({
          displayC: 'none'
        })
        this.animate('.foldC', [{
            opacity: 1.0,
            rotate: 180
          },

          {
            opacity: 1.0,
            rotate: 0
          },
        ], 200, this.clearAnimation('.foldC', {
          opacity: true,
          rotate: true
        }), function () {

        }.bind(this))
      }

      if (!foldC) {
        foldC = true
        this.setData({
          displayC: 'none'
        })
        this.animate('.foldC', [{
            opacity: 1.0,
            rotate: 180
          },

          {
            opacity: 1.0,
            rotate: 0
          },
        ], 200, this.clearAnimation('.foldC', {
          opacity: true,
          rotate: true
        }), function () {

        }.bind(this))
      }
    }
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/wiki/getContent',
      data: {
        cid: index + 1
      },
      success: (res) => {
        this.setData({
          index: e.currentTarget.dataset.index,
          content: res.data
        })
      }
    })
    console.log(this.data)
  }
})