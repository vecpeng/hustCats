// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    fontWeightYunyuan: '',
    fontWeightZisong: '',
    fontWeightQinyuan: '',
    fontWeightJimao: '',
    fontWeightAll: 'bold',
  },
  // 事件处理函数
  onLoad(option) {
    // console.log(option.id)
    // this.setData({
    //   fontWeightAll:'',
    // })
    this.selectComponent('#myMap').onload(option);
  },

  yunyuanTap() {
    this.setData({
      fontWeightYunyuan: 'bold',
      fontWeightZisong: '',
      fontWeightQinyuan: '',
      fontWeightJimao: '',
      fontWeightAll: '',
    });
    this.selectComponent('#myMap').yunyuanTap();
  },
  zisongTap() {
    if (this.data.scale == 13) {
      this.setData({
        scale: 16,
      });
    }
    this.setData({
      fontWeightYunyuan: '',
      fontWeightZisong: 'bold',
      fontWeightQinyuan: '',
      fontWeightJimao: '',
      fontWeightAll: '',
    });
    this.selectComponent('#myMap').zisongTap();
  },
  qinyuanTap() {
    if (this.data.scale == 13) {
      this.setData({
        scale: 16,
      });
    }
    this.setData({
      fontWeightYunyuan: '',
      fontWeightZisong: '',
      fontWeightQinyuan: 'bold',
      fontWeightJimao: '',
      fontWeightAll: '',

    });
    this.selectComponent('#myMap').qinyuanTap();
  },

  jimaoTap() {
    if (this.data.scale == 13) {
      this.setData({
        scale: 16,
      });
    }
    this.setData({
      fontWeightYunyuan: '',
      fontWeightZisong: '',
      fontWeightQinyuan: '',
      fontWeightJimao: 'bold',
      fontWeightAll: '',
    });
    this.selectComponent('#myMap').jimaoTap();
  },
  allTap() {
    this.setData({
      fontWeightYunyuan: '',
      fontWeightZisong: '',
      fontWeightQinyuan: '',
      fontWeightJimao: '',
      fontWeightAll: 'bold',
    });
    this.selectComponent('#myMap').allTap();
  },
});
