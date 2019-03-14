const baseURL=              "http://www.xiongmaoyouxuan.com"

function getData(specificInterface){
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return  new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL+specificInterface,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if(res.data.code===200){
          resolve(res)
        }
       },
      fail: function (res) {
        wx.showModal({
          title: '加载出错',
        })
       },
      complete: function (res) { 
        wx.hideLoading()
      },
    })
  })
}
export default getData