// pages/addCats/addCats.js
const app = getApp()
const globalData=app.globalData
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    speciesName:'',
    locationName:'',
    tip:'',
    date:"",
    submitCats: 'submitCats',
    submitIf:true,
    uploadImgUrl:'',
   
  
    addCatsImgsdisplay:'block',
    inputDisplay:'none',
    speciesInputDisplay:'none',
    inputLocation:'',
    inputSpecies:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // 获取可用毛色
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getAvailableSpecies',
      data: {},
        success: (res) => {
          console.log(res.data)
          this.setData({
            speciesName: res.data,
          })
      }
    })
    //获取可用地点
    wx.request({
      url: 'https://wxapi.ufatfat.com/hustcats/cat/getAvailableLocations',
      data: {},
        success: (res) => {
         console.log(res.data)
          this.setData({
           locationName: res.data,
          })

      }
    })
  },
    // wx.getSetting({
     
    //   success (res){
    //     console.log("getsetting")
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           that.setData({
    //             nickName:res.userInfo.nickName,
    //             avatarUrl:res.userInfo.avatarUrl  
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  

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
  chooseImg: function(){
    let self = this
    wx.chooseImage({
      count: 1,
      success(res){
        let tempPaths = res.tempFilePaths
        self.setData({
          uploadImgUrl: res.tempFilePaths[0],
          addCatsImgsdisplay:'none',
        })
      }
    })
  },
  
  speciesDisplayNone:function(){
      if(this.data.speciesInputDisplay!='none')
      {
        this.setData({
          speciesInputDisplay:'none'
        })
      }
  },
  otherSpecies:function(){
    this.setData({
      speciesInputDisplay:'block'
    })
  },
  inputDisplayNone:function(){
    if(this.data.inputDisplay!='none')
    {
      this.setData({
        inputDisplay:'none'
      })
    }
  },

  speciesConfirm:function(e){
    console.log(e.detail.value)
    this.setData({
      inputSpecies:e.detail.value
    })
  },
  locationConfirm:function(e){
    console.log(e.detail.value)
    this.setData({
      inputLocation:e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log( e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  // 提交猫猫
  submitBtn:function(){
    console.log(this.data.submitIf)
   
      
    
    console.log(this.data.submitCats)
  },

  submitNewCatsInfo: function(e) {
   let that=this;
   
    console.log(e.detail.value)
    if(e.detail.value.name.length==0){
      this.setData({
       tip:'昵称不能为空！',
       submitIf:false
     })
   }else if(this.data.uploadImgUrl.length==0){
    this.setData({
     tip:'您还未上传照片',
     submitIf:false
   })
 }else if(e.detail.value.location.length==0){
    this.setData({
     tip:'地点不能为空！',
     submitIf:false
   })
 }else if(e.detail.value.sex.length==0){
  this.setData({
   tip:'性别不能为空！',
   submitIf:false
 })
}else if(e.detail.value.species.length==0){
  this.setData({
   tip:'毛色不能为空！',
   submitIf:false
 })
}else{
  console.log(globalData.openid)


  wx.uploadFile({
    url: 'https://api2.ufatfat.com/ai/checkUploadImg', 
    filePath: that.data.uploadImgUrl,
    name: 'uploadImg',
    success:res=>{
      console.log(res.data)
      if(res.data==1)
      {
        wx.navigateTo({
          url:"/pages/success/success",
         
      })
      wx.setStorage({
        key:'catId',
        data:res.data.errcode
      })
      wx.request({
        url: "https://wxapi.ufatfat.com/hustcats/cat/addCat",
        method: "POST",
        data: {
          openid: globalData.openid,
          name: e.detail.value.name,
          sex: e.detail.value.sex,
          location:e.detail.value.location,
          birthday: e.detail.value.birthday,
          species: e.detail.value.species,
          nature: e.detail.value.nature,
          father: e.detail.value.father,
          mother: e.detail.value.mother,
          guide: e.detail.value.guide,
          desc: e.detail.value.desc,
          friends:'',
          tags:'',
          
        
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
         
          console.log(that.data.uploadImgUrl)
          console.log(res.data.errcode)
          wx.uploadFile({
            url: 'https://wxapi.ufatfat.com/hustcats/cat/uploadCatPhotos', 
            filePath: that.data.uploadImgUrl,
            name: 'uploadImg',
            formData:{
              openid:globalData.openid,
              index:0,
              isIndex:1,
              catid:res.data.errcode,
          
              verified:1,
              desc:''
            },
            success (res){
                
              console.log(res.data)
             
            }
          })
       
        },
        err: function(err){
          console.log(err)
        }
         })
      
    

      }else{
        wx.showToast({
          title: "请上传猫图!",
          image:'/img/errRemind.png',
          duration: 2000
        })
      }
    }
  })


  
   
      }

      
      if(this.data.submitIf==false)
      {
        wx.showToast({
          title: this.data.tip,
          image:'/img/errRemind.png',
          duration: 2000
        })
        
      }
  
 },

otherLocation:function(){
  if(this.data.inputDisplay=='none')
  {
    this.setData({
      inputDisplay:'block'
    })
  }
}


})

   



