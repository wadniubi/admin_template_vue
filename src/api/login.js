
export function loginByUsername (username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result
      if (username === 'admin') {
        result = {
          authInfo: {
            roles: ['admin', 'editor'],
            userName: 'admin'
          }
        }
      } else {
        result = {
          authInfo: {
            roles: ['editor'],
            userName: 'editor'
          }
        }
      }
      console.log(result)
      resolve(result)
    }, 500)
  })
}

export function logout (username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = {
        status: true
      }
      resolve(result)
    }, 500)
  })
}
