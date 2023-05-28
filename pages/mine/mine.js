// pages/mine/mine.js
const app = getApp();
const {
  getAllOrders,
} = require('../../api/api.js');
Page({
  data: {
    isLogined: false,
    avatarUrl: "",
    nickName: "", //用户昵称
    hasAddress: false,
    address: {},
    orders: [],
    page: 1, // 设置加载的第几次，默认是第一次
    size: 8, // 每次加载的数据条数
    total: null, //返回数据的个数(可以传空)
    searchLoading: true, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    scrollHeight:1000

  },
  onLoad() {
    let res = wx.getSystemInfoSync();

    let boxHeight = res.windowHeight;

    this.data.scrollHeight = boxHeight;
  },
  login: function () {
  },

  payOrders() {
    wx.navigateTo({
      url: '../fail/fail'
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  searchScrollLower: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        page: that.data.page + 1, //每次触发上拉事件，把page+1
        isFromSearch: false //触发到上拉事件，把isFromSearch设为为false
      });
      that.informationQuery();
    }
  },

  informationQuery() {
    const params = {
      page: this.data.page,
      size: this.data.size
    }
    console.log(params);
    getAllOrders({data: params}).then(res => {
      if (res.data.data.data.data.length > 0) {
        let searchList = [];
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加
        searchList = this.data.orders.concat(res.data.data.data.data)
        this.setData({
          orders: searchList, //获取数据数组
          searchLoading: true //把"上拉加载"的变量设为false，显示  
        });
        //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      } else {
        this.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示 
          searchLoading: false //把"上拉加载"的变量设为false，隐藏  
        });
      }
    })
  },

})