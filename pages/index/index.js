//index.js
//获取应用实例
const app = getApp()
Page({  //《==这个函数是注册当前页面的 
  /**
   * 页面的初始数据
   */
   data: {
    detailObj: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isPlay:true 
  },
  
  // 控制音乐播放
  musicControl() {
    let isPlay = !this.data.isPlay;
    // 更新isPlay的状态
    this.setData({ isPlay });
    if (isPlay) { // 音乐播放
      wx.playBackgroundAudio({
        dataUrl: 'http://win.web.ri01.sycdn.kuwo.cn/e1c12417b82117916ed6c4112e9ed813/5ba35d45/resource/n2/55/10/1768934230.mp3',
        title: '红尘情歌',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      });

    } else { // 音乐暂停
      wx.pauseBackgroundAudio()
    }

    // 更新isPlay的状态
    this.setData({ isPlay });
  },

 //处理事件
  handleClick(){
    //点击联系客服图片，拨号
    wx.makePhoneCall({
      phoneNumber:'17718205067'
    })
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    }) 
  },

  onLoad: function () {
    this.musicControl();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    // 监听背景音乐的播放
    wx.onBackgroundAudioPlay(() => {
       console.log('音乐播放');
       this.setData({
         isPlay: true 
       })
  
    })

    // 监听音乐暂停。
    wx.onBackgroundAudioPause(() => {
       console.log('音乐暂停');
       this.setData({
        isPlay: false 
       })
    })


  },
  
  onReady: function () {
    this.musicControl();
  },
})
