let mapContext
const app = getApp()
const beta = app.globalData.beta
Component({
  data: {
    longitude: 114.419003,
    latitude: 30.513027,
  
    scale: 13
  },
  methods: {
    onload: function () {
      
      let that = this
      wx.request({
        url: "https://wxapi.ufatfat.com/hustcats/cat/getCatMapInfo",
        method:"POST",

          header:{
              'content-type':'application/x-www-form-urlencoded'
            },
        data:{
          beta:beta
        },
        success: res => {
          console.log(res.data)
          let markers = [];
          
          for (let i = 0; i < res.data.length; i++) {

            let temp = {}
            let tempPoint={}

            temp.id = res.data[i].id
            temp.longitude = res.data[i].longitude
            temp.latitude = res.data[i].latitude
            // tempPoint.longitude = res.data[i].longitude
            // tempPoint.latitude = res.data[i].latitude
            temp.iconPath = "/img/mapIcon.jpg"
            temp.width = "50rpx"
            temp.height = "80rpx"
            temp.callout = {
              content: res.data[i].name,
              fontSize: "30rpx",
              borderRadius: '20rpx',
              bgColor: "#666666",
              color: "#FFFFFf",
              display: "BYCLICK",
              anchorY: "-5",
              padding: "15rpx"

            }
       
            // if(tempPoint.latitude!=null&&tempPoint.longitude!=null)
            // {points.push(tempPoint)}
            markers.push(temp)
          }
        //   console.log(points)
        //   mapContext = wx.createMapContext("myMap",that)
        // console.log(mapContext)
        // mapContext.includePoints(
        //   {points:points,
        //   success:()=>{
        //     console.log("success")
        //   }}
        // )
        // console.log(mapContext)
          
          this.setData({
            markers: markers
          })
        }
      })
    },
    mapTap:function(e){
      console.log(e.detail)
      wx.navigateTo({
       url: '/pages/catinfo/catinfo?id=' + e.detail.markerId,
      })
   },
    yunyuanTap: function () {
    
    
      let longitude = (114.433193 - this.data.longitude) / 10
      let latitude = (30.514899 - this.data.latitude) / 10
      let that = this
      if(this.data.scale==13)
      setTimeout(
        function () {
          that.setData({
            scale:16
           
          })
        }, 200
        
      )
      for(let i=0;i<10;i++)
      {
        setTimeout(
        function () {
          that.setData({
            longitude: that.data.longitude + longitude,
            latitude: that.data.latitude + latitude,
           
          })
        },30*i
        
      )
     
      }
     
     


    },
    zisongTap: function () {
      if (this.data.scale == 13) {
        setTimeout(
          function () {
            that.setData({
              scale:16
             
            })
          }, 200
          
        )
      }
      let longitude = (114.402400 - this.data.longitude) / 10
      let latitude = (30.511501 - this.data.latitude) / 10
      let that = this
      for(let i=0;i<10;i++)
      {
        setTimeout(
        function () {
          that.setData({
            longitude: that.data.longitude + longitude,
            latitude: that.data.latitude + latitude
          })
        },30*i
      )
      }


    },
    qinyuanTap: function () {
      let that = this
      if (this.data.scale == 13) {
        setTimeout(
          function () {
            that.setData({
              scale:16
             
            })
          }, 200
          
        )
      }
      let longitude = (114.421922 - this.data.longitude) / 10
      let latitude = (30.510216 - this.data.latitude) / 10
     
      for(let i=0;i<10;i++)
      {
        setTimeout(
        function () {
          that.setData({
            longitude: that.data.longitude + longitude,
            latitude: that.data.latitude + latitude
          })
        },30*i
      )
      }

    },

    jimaoTap: function () {
      let that = this
    
    
      if (this.data.scale == 13) {
        setTimeout(
          function () {
            that.setData({
              scale:16
             
            })
          }, 200
          
        )
      }
      let longitude = (114.412000 - this.data.longitude) / 10
      let latitude = (30.516681 - this.data.latitude) / 10
   
      for(let i=0;i<10;i++)
      {
        setTimeout(
        function () {
          that.setData({
            longitude: that.data.longitude + longitude,
            latitude: that.data.latitude + latitude
          })
        },30*i
      )
      }
    },
    allTap: function () {
      if (this.data.scale == 16) {
        setTimeout(
          function () {
            that.setData({
              scale:13
             
            })
          }, 200
          
        )
      }
    
      let longitude = (114.419003 - this.data.longitude) / 10
      let latitude = ( 30.513027 - this.data.latitude) / 10
      let that = this
      for(let i=0;i<10;i++)
      {
        setTimeout(
        function () {
          that.setData({
            longitude: that.data.longitude + longitude,
            latitude: that.data.latitude + latitude
          })
        },30*i
      )
      }


    },
  }
})