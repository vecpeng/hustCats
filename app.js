//app.js
App({

  globalData:{
    openid:'',
    userInfo:'',
    beta:1.18
  },
 
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that=this
    
    wx.login({
      
      success: function(res) {
        console.log(that.globalData.openid)
       if(that.globalData.openid=='')
       { if (res.code) {
          //发起网络请求
        
          wx.request({
            
            url: 'https://wxapi.ufatfat.com/hustcats/user/getopenid',
            method:"POST",
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            data: {
              jscode: res.code,
              beta:that.globalData.beta
            },
            success:(res)=>{
          
           that.globalData.openid = res.data
            wx.request({
              url:"https://wxapi.ufatfat.com/hustcats/user/userInfo",
              method:"POST",
              header:{
                'content-type':'application/x-www-form-urlencoded'
              },
              data:{
                openid:that.globalData.openid,
                avatar:'',
                nickname:'',
                gender:'',
                beta:that.globalData.beta
              }
            })
            },
           fail:(res)=>{
            
             
            },
          },
          )
        } else {
         
        }
      }
    }
    });
  


    // 获取用户信息
    wx.getSetting({
      success: res => {
      
 
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
        
              // 可以将 res 发送给后台解码出 unionId
             that.globalData.userInfo = res.userInfo
          
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
        
              wx.request({
                url:'https://wxapi.ufatfat.com/hustcats/user/userInfo',
                method:'POST',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                data:{
                  avatar:that.globalData.userInfo.avatarUrl,
                  nickname:that.globalData.userInfo.nickName,
                  gender:that.globalData.userInfo.gender,
                  openid:that.globalData.openid,
                  beta:beta
                }
              })
            },
             fail:(res)=>{
        
        }
       })
      }else 
       {
      
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
            
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo({
                success: res => {
          
                  // 可以将 res 发送给后台解码出 unionId
                 that.globalData.userInfo = res.userInfo
              
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
             
                },
                 fail:(res)=>{
          
            }
           })
            }
          })
        
      }
    }
       
      
    })
  },

})