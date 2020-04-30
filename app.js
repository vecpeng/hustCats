//app.js
App({

  globalData:{
    openid:'',
    userInfo:''
  },
 
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that=this
    
    wx.login({
      
      success: function(res) {
       if(that.globalData.openid)
       { if (res.code) {
          //发起网络请求
        
          wx.request({
            
            url: 'https://wxapi.ufatfat.com/hustcats/user/getopenid',
            data: {
              jscode: res.code
            },
            success:(res)=>{
            console.log(res.data)
           that.globalData.openid = res.data
          
            },
           fail:(res)=>{
            
             
            },
          },
          )
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    }
    });
  


    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("get")
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("ok")
              // 可以将 res 发送给后台解码出 unionId
             that.globalData.userInfo = res.userInfo
          
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
              console.log(that.globalData.userInfo)
              wx.request({
                url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
                method:'POST',
                data:{
                  avatar:that.globalData.userInfo.avatarUrl,
                  nickname:that.globalData.userInfo.nickName,
                  gender:that.globalData.userInfo.gender,
                  openid:that.globalData.openid
                }
              })
            },
             fail:(res)=>{
          console.log(res.data)
        }
       })
      }else 
       {
         console.log("no")
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              console.log("okok")
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo({
                success: res => {
                  console.log("ok")
                  // 可以将 res 发送给后台解码出 unionId
                 that.globalData.userInfo = res.userInfo
              
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                  console.log(that.globalData.userInfo)
                },
                 fail:(res)=>{
              console.log(res.data)
            }
           })
            }
          })
        
      }
    }
       
      
    })
  },

})