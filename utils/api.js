'use strict';
import Promise from './es6-promise.min'


module.exports = {

  HOST_WORK: 'https://api.douban.com/',
  LATEST: 'v2/movie/top250',

//   get (url) {
//     return new Promise((resolve, reject) => {
//       console.log(url)
//       wx.request({
//         url: url,
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         success: function (res) {
//           resolve(res)
//         },
//         fail: function (res) {
//           reject(res)
//         }
//       })
//     })
//   }
    get (url){
        wx.request({
          url: url,
          header: {
              'Content-Type': 'application/json'
          }, // 设置请求的 header
          success: function(res){
            // success
            console.log(url)
            console.log(res)
            return res
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
};
