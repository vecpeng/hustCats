let mapContext
let id = -1
const app = getApp()
const beta = app.globalData.beta
Component({
  data: {
    longitude: 114.419003,
    latitude: 30.513027,
    markers: null,
    scale: 13,
    polyline:[{
      points:[{latitude:30.506154,longitude:114.429785},
{latitude:30.505687,longitude:114.435353},
{latitude:30.508839,longitude:114.434195},
{latitude:30.510133,longitude:114.435053},
{latitude:30.511187,longitude:114.435482},
{latitude:30.511816,longitude:114.436759},
{latitude:30.511788,longitude:114.437038},
{latitude:30.513304,longitude:114.437982},
{latitude:30.514293,longitude:114.437907},
{latitude:30.514912,longitude:114.434860},
{latitude:30.516169,longitude:114.434549},
{latitude:30.516474,longitude:114.432360},
{latitude:30.516151,longitude:114.432135},
{latitude:30.516483,longitude:114.431180},
{latitude:30.515957,longitude:114.430976},
{latitude:30.516437,longitude:114.429195},
{latitude:30.518397,longitude:114.429753},
{latitude:30.519626,longitude:114.408789},
{latitude:30.519644,longitude:114.407480},
{latitude:30.516687,longitude:114.407587},
{latitude:30.516095,longitude:114.404347},
{latitude:30.512472,longitude:114.404304},
{latitude:30.512592,longitude:114.401858},
{latitude:30.513036,longitude:114.401740},
{latitude:30.513137,longitude:114.400259},
{latitude:30.511455,longitude:114.399873},
{latitude:30.511668,longitude:114.401000},
{latitude:30.510069,longitude:114.401493},
{latitude:30.509810,longitude:114.400334},
{latitude:30.506556,longitude:114.401450},
{latitude:30.507665,longitude:114.410462},
{latitude:30.506002,longitude:114.430075}],
      color:"#425e3c",
      width: 2,
    
      
    }]
  },
  methods: {
    onload: function (option) {
      console.log(option.id)
      if (option) {
        id = option.id
        console.log(id)

      }
      let that = this
      wx.request({
        url: "https://wxapi.ufatfat.com/hustcats/cat/getCatMapInfo",
        method: "POST",

        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          tsvc: app.getCode(),beta:beta,openid:app.globalData.openid
        },
        success: res => {
          console.log(res.data)
          let markers = [];

          for (let i = 0; i < res.data.length; i++) {

            let temp = {}
            let tempPoint = {}

            temp.id = res.data[i].id

            if (id == temp.id) {
              console.log(id)
              that.setData({
                latitude: res.data[i].latitude,
                longitude: res.data[i].longitude,
                scale: 18
              })
            }

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
    mapTap: function (e) {
      console.log(e.detail)
      wx.navigateTo({
        url: '/pages/catinfo/catinfo?id=' + e.detail.markerId,
      })
    },
    yunyuanTap: function () {


      let longitude = (114.433193 - parseFloat(this.data.longitude).toFixed(6)) / 10
      let latitude = (30.514899 - parseFloat(this.data.latitude).toFixed(6)) / 10
      let that = this
      if (this.data.scale != 16)
        setTimeout(
          function () {
            that.setData({
              scale: 16

            })
          }, 200

        )
      for (let i = 0; i < 10; i++) {
        setTimeout(
          function () {
            that.setData({
              longitude:parseFloat(that.data.longitude+longitude),
              latitude: parseFloat(that.data.latitude+latitude),

            })
          }, 30 * i

        )

      }




    },
    zisongTap: function () {
      if (this.data.scale != 16) {
        setTimeout(
          function () {
            that.setData({
              scale: 16

            })
          }, 200

        )
      }
      let longitude = (114.402400 - parseFloat(this.data.longitude).toFixed(6)) / 10
      let latitude = (30.511501 - parseFloat(this.data.latitude).toFixed(6)) / 10
      let that = this
      for (let i = 0; i < 10; i++) {
        setTimeout(
          function () {
            that.setData({
              longitude:parseFloat(that.data.longitude+longitude),
              latitude: parseFloat(that.data.latitude+latitude)
            })
          }, 30 * i
        )
      }


    },
    qinyuanTap: function () {
      let that = this
      if (this.data.scale != 16) {
        setTimeout(
          function () {
            that.setData({
              scale: 16

            })
          }, 200

        )
      }
      console.log(parseFloat(this.data.longitude).toFixed(6))
      let longitude = (114.421922 - parseFloat(this.data.longitude).toFixed(6)) / 10
      let latitude = (30.510216 - parseFloat(this.data.latitude).toFixed(6)) / 10
        console.log(longitude)
      for (let i = 0; i < 10; i++) {
        setTimeout(
          function () {
            that.setData({
              longitude:parseFloat(that.data.longitude+longitude),
              latitude: parseFloat(that.data.latitude+latitude)
            })
          }, 30 * i
        )
      }

    },

    jimaoTap: function () {
      let that = this

      console.log("jimao")
      if (this.data.scale != 16) {
        setTimeout(
          function () {
            that.setData({
              scale: 16

            })
          }, 200

        )
      }
      let longitude = (114.412000 - parseFloat(this.data.longitude).toFixed(6)) / 10
      let latitude = (30.516681 - parseFloat(this.data.latitude).toFixed(6)) / 10

      for (let i = 0; i < 10; i++) {
        setTimeout(
          function () {
            console.log(that.data.latitude)
            that.setData({
              longitude:parseFloat(that.data.longitude+longitude),
              latitude: parseFloat(that.data.latitude+latitude)
            })
          }, 30 * i
        )
      }
      console.log(parseFloat(this.data.latitude).toFixed(6))
    },
    allTap: function () {
      if (this.data.scale != 13) {
        setTimeout(
          function () {
            that.setData({
              scale: 13

            })
          }, 200

        )
      }
 console.log(this.data.scale)
      let longitude = (114.419003 - parseFloat(this.data.longitude).toFixed(6)) / 10
      let latitude = (30.513027 - parseFloat(this.data.latitude).toFixed(6)) / 10
      let that = this
      for (let i = 0; i < 10; i++) {
        setTimeout(
          function () {
            that.setData({
              longitude:parseFloat(that.data.longitude+longitude),
              latitude: parseFloat(that.data.latitude+latitude)
            })
          }, 30 * i
        )
      }


    },
  }
})