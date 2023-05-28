// pages/orders/orders.js
const {
  getOrderDetail,
  payment
} = require('../../api/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orders: [],
    id: {},
    data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    var listCarts = JSON.parse(options.listCarts)
    this.setData({
      listCarts,
      total: options.totalMoney
    })
    const that = this;
    let hasAddress = wx.getStorageSync('hasAddress'),
      address = wx.getStorageSync('address')
    that.setData({
      hasAddress,
      address,
      newProducts: wx.getStorageSync('newProducts')
    })
    let order_id = options.order_id;
    this.data.id = order_id
    console.log(this.data.id);
    // getOrderDetail(order_id).then(res => {
    //   const that = this;
    //   that.setData({
    //     orders: res.data.data.snap_items,
    //     total: res.data.data.total_price
    //   })
    // })
  },

  toPay() {
    if (!this.data.hasAddress) {
      wx.showToast({
        title: '请添加收货地址',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const that = this;
    let hasAddress = wx.getStorageSync('hasAddress'),
      address = wx.getStorageSync('address')
    console.log(address);
    that.setData({
      hasAddress,
      address,
      newProducts: wx.getStorageSync('newProducts')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})