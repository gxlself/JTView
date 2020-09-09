// import request from '@/utils/request'

export function login (data) {
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   data
  // })
  return new Promise((resolve, reject) => {
    // const { username, password } = data
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          token: 'xxx',
          username: 'xxx'
        },
        msg: '成功'
      })
    }, 1000)
  })
}
