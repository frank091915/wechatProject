// pages/home/home.js
import toGetData from "../../request/request.js"
Page({

  /**
   * 页面的初始数据
   */
  // handleClick(e){
  //   console.log(e)
  // },
  data: {
    category:[],
    items:[],
    choosencategoryid:"",
    nextIndex:"",
    isEnd:false
  },
  chooseCategory(e){
    const {choosencategoryid}                                               =e.currentTarget.dataset
    toGetData(`/api/tab/${choosencategoryid}?start=0`).then((res)=>{
      this.setData({
        list: res.data.data.items.list,
        choosencategoryid,
        isEnd: res.data.data.items.isEnd
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    toGetData("/api/tabs?sa=").then(res=>{
      const category = res.data.data.list.slice(1)
      this.setData({
        category,
        choosencategoryid:category[0].id
      },()=>{
        console.log(this.data.choosencategoryid)
        toGetData(`/api/tab/${this.data.category[0].id}?start=${this.data.nextIndex}`).then((res)=>{     console.log(res)
          this.setData({
            list: res.data.data.items.list,
            nextIndex: res.data.data.items.nextIndex,
            isEnd: res.data.data.items.isEnd
          })
        })
      })
    })
  },
  scrolltoupper(e){
    toGetData(`/api/tab/${this.data.choosencategoryid}?start=0`).then(
      (res)=>{
        this.setData({
          list: res.data.data.items.list,
          isEnd: res.data.data.items.isEnd

        })
      }
    )
  },
  scrolltolower(e) {
    console.log("bindscrolltolower",this.data.nextIndex)
    toGetData(`/api/tab/${this.data.choosencategoryid}?start=${this.data.nextIndex}`).then(
      (res) => {
        console.log(res)
        this.setData({
          list: this.data.list.concat(res.data.data.items.list),
          nextIndex: res.data.data.items.nextIndex,
          isEnd: res.data.data.items.isEnd

        },()=>{
          console.log(this.data)
        })
      }
    )
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

  }
})