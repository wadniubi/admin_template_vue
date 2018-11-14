export function timeJudger (time, timelimit) {
  const d = new Date(time)
  const now = Date.now()
  const diff = Math.ceil((now - d) / 1000 / 60) // minutes
  if (timelimit < diff) {
    return false
  } else {
    return true
  }
}
export function formatDate (nows) {
  if (typeof (nows) === 'undefined') {
    return '请输入合法日期!'
  }
  var now = new Date(nows)
  var year = now.getFullYear()
  var month = now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  var date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  var hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  var minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  var second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
export function formatTimePeriod (timeArr) {
  var newTimeArr = []
  if (typeof (timeArr) === 'undefined' || timeArr.length === 0) {
    return ['0-24']
  }
  timeArr.forEach((time) => {
    newTimeArr.push(time.start + '-' + time.end)
  })
  return newTimeArr
}

export function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  var newobj = {}
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr])
  }
  return newobj
}

export function windowsSaveLoginData (authInfo) {
  window.sessionStorage.setItem('last_modified_time', JSON.stringify(new Date().getTime()))// 更新活跃时间
  window.sessionStorage.setItem('auth_info', JSON.stringify(authInfo))
}

export function windowsGetLoginData () {
  let lastModifiedTime = JSON.parse(window.sessionStorage.getItem('last_modified_time')) // last_modified_time
  let authInfo = JSON.parse(window.sessionStorage.getItem('auth_info'))// user_info
  return {'lastModifiedTime': lastModifiedTime, 'authInfo': authInfo}
}

export function clearWindowsLoginData () {
  window.sessionStorage.removeItem('last_modified_time') // session删除
  window.sessionStorage.removeItem('auth_info')
}
