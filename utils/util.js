const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const logout = () => {
  var app = getApp()
  wx.clearStorageSync()
  app.globalData.sichu_user = null
  wx.redirectTo({
    url: '/pages/login/login',
  })
}

module.exports = {
  formatTime: formatTime,
  logout: logout
}
