const app = getApp();
let foldA = true;
let foldB = true;
let foldC = true;
let foldD = true;
const { beta } = app.globalData;
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
    proDisplay: 'none',
    contentDisplay: 'block',
    displayD: 'none',
  },
  onShareAppMessage() {

  },
  onLoad(options) {
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/wiki/getContent',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cid: 1,
        tsvc: app.getCode(),
        beta,
        openid: app.globalData.openid,
      },
      success: (res) => {
        this.setData({
          content: res.data,
        });
      },
    });

    wx.getSystemInfo({
      complete: (res) => {
        this.setData({
          height: res.windowHeight,
        });
      },
    });
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/wiki/getCategory',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        tsvc: app.getCode(), beta, openid: app.globalData.openid,
      },
      success: (res) => {
        const { data } = res;
        this.setData({
          category: data,
        });
      },
    });
  },
  toggleSearchBar() {
    if (this.data.searchBarDisplay == 'show') {
      this.setData({
        searchBarDisplay: 'close',
        search: 'knowledgeSearch.png',
      });
    } else {
      this.setData({
        searchBarDisplay: 'show',
        search: 'knowledgeSearchActive.png',
      });
    }
  },

  toggleFoldDisplayD() {
    if (foldD) {
      this.setData({
        displayD: 'block',
      });
      foldD = false;

      this.animate('.foldD', [{
        opacity: 1.0,
        rotate: 0,
      },

      {
        opacity: 1.0,
        rotate: 180,
      },
      ], 200, this.clearAnimation('.foldD', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    } else {
      foldD = true;
      this.setData({
        displayD: 'none',
      });
      this.animate('.foldD', [{
        opacity: 1.0,
        rotate: 180,
      },

      {
        opacity: 1.0,
        rotate: 0,
      },
      ], 200, this.clearAnimation('.foldD', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    }
  },

  toggleFoldDisplayB() {
    if (foldB) {
      foldB = false;
      this.setData({
        displayB: 'block',
      });
      this.animate('.foldB', [{
        opacity: 1.0,
        rotate: 0,
      },

      {
        opacity: 1.0,
        rotate: 180,
      },
      ], 200, this.clearAnimation('.foldB', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    } else {
      foldB = true;
      this.setData({
        displayB: 'none',
      });
      this.animate('.foldB', [{
        opacity: 1.0,
        rotate: 180,
      },

      {
        opacity: 1.0,
        rotate: 0,
      },
      ], 200, this.clearAnimation('.foldB', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    }
  },

  toggleFoldDisplayC() {
    if (foldC) {
      this.setData({
        displayC: 'block',
      });
      foldC = false;

      this.animate('.foldC', [{
        opacity: 1.0,
        rotate: 0,
      },

      {
        opacity: 1.0,
        rotate: 180,
      },
      ], 200, this.clearAnimation('.foldC', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    } else {
      foldC = true;
      this.setData({
        displayC: 'none',
      });
      this.animate('.foldC', [{
        opacity: 1.0,
        rotate: 180,
      },

      {
        opacity: 1.0,
        rotate: 0,
      },
      ], 200, this.clearAnimation('.foldC', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    }
  },

  toggleFoldDisplayA() {
    if (foldA) {
      foldA = false;
      this.setData({
        displayA: 'block',
      });

      this.animate('.foldA', [{
        opacity: 1.0,
        rotate: 0,
      },

      {
        opacity: 1.0,
        rotate: 180,
      },
      ], 200, this.clearAnimation('.foldA', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    } else {
      foldA = true;
      this.setData({
        displayA: 'none',
      });
      this.animate('.foldA', [{
        opacity: 1.0,
        rotate: 180,
      },

      {
        opacity: 1.0,
        rotate: 0,
      },
      ], 200, this.clearAnimation('.foldA', {
        opacity: true,
        rotate: true,
      }), () => {

      });
    }
  },

  changeIndex(e) {
    const { index } = e.currentTarget.dataset;

    if (index == 3) {
      this.setData({
        advanceDisplay: 'block',
        contentDisplay: 'none',
        proDisplay: 'none',
      });
    } else if (index == 4) {
      this.setData({
        proDisplay: 'block',
        contentDisplay: 'none',
        advanceDisplay: 'none',
      });
    } else {
      this.setData({
        proDisplay: 'none',
        advanceDisplay: 'none',
        displayA: 'none',
        displayB: 'none',
        displayC: 'none',
      });

      if (!foldA) {
        foldA = true;
        this.setData({
          displayA: 'none',
        });
        this.animate('.foldA', [{
          opacity: 1.0,
          rotate: 180,
        },

        {
          opacity: 1.0,
          rotate: 0,
        },
        ], 200, this.clearAnimation('.foldA', {
          opacity: true,
          rotate: true,
        }), () => {

        });
      }
      if (!foldB) {
        foldC = true;
        this.setData({
          displayC: 'none',
        });
        this.animate('.foldC', [{
          opacity: 1.0,
          rotate: 180,
        },

        {
          opacity: 1.0,
          rotate: 0,
        },
        ], 200, this.clearAnimation('.foldC', {
          opacity: true,
          rotate: true,
        }), () => {

        });
      }

      if (!foldC) {
        foldC = true;
        this.setData({
          displayC: 'none',
        });
        this.animate('.foldC', [{
          opacity: 1.0,
          rotate: 180,
        },

        {
          opacity: 1.0,
          rotate: 0,
        },
        ], 200, this.clearAnimation('.foldC', {
          opacity: true,
          rotate: true,
        }), () => {

        });
      }
    }
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/wiki/getContent',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cid: index + 1,
        tsvc: app.getCode(),
        beta,
        openid: app.globalData.openid,
      },
      success: (res) => {
        this.setData({
          index: e.currentTarget.dataset.index,
          content: res.data,

        });
      },
    });
  },
});
