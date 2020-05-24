// pages/identify/identify.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      uploadImg:'',
      identifyResult:'',
      resultDisplay:"none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  uploadImg:function(){
   wx.chooseImage({
     count:1,
     success:res=>{
       this.setData({
         uploadImg:res.tempFilePaths
       })
    
     }
   })
  },

  
  identify:function(){
   if(this.data.uploadImg!='')
  { wx.showLoading({
    title: '加载中',
  })
  
   let that =this
    wx.uploadFile({
      filePath: that.data.uploadImg[0],
      name: 'uploadImg',
      url:"https://api2.ufatfat.com/ai/identifyAnimalSpecies",
      success:res=>{
       console.log(res.data)
       let result=JSON.parse(res.data).result
       
       for(let i=0;i<result.length;i++)
       {result[i].score = result[i].score.slice(0,6)*100
        result[i].score =parseFloat(result[i].score).toFixed(2)
       }
        this.setData({
          identifyResult:result,
          resultDisplay:"block"
        })
        wx.hideLoading({
          
        })
      }
    })
  }
  },
  closeImg:function(){
   
      this.setData({
        resultDisplay:'none',
        uploadImg:''
      })
  }
})