// index.js

const {
  getItems
} = require('../../api/api.js');

// 获取应用实例
const app = getApp()

Page({
  data: {
    id: 1,
    nae: "",
    decription: "",
    crate_time: "",
    upate_time: "",
    items: [{
        img: {
          url: "/images/banner-4a.png",
        }
      },
      {
        img: {
          url: "/images/banner-3a.png"
        }
      },
      {
        img: {
          url: "/images/banner-2a.png",
        }
      },
      {
        img: {
          url: "/images/banner-1a.png"
        }
      }
    ],
    swiperCurrent: " ",
    theme_1: '/images/1@theme.png',
    theme_2: '/images/2@theme.png',
    theme_3: '/images/3@theme.png',
    products: [{}],
  },
  swiperChange: function (e) { //指示图标
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  onLoad: function () {
    const that = this;

    // 获得首页商品
    getItems().then(res => {
      console.log(res.data.data)
      that.setData({
        products: res.data.data
      })
    })
  },
})