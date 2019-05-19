import baseURL from './index'
import Vue from 'vue'

const _createUser = async ({queryParams}) => {
  let result
  console.log('quertParams', queryParams)
  const req = {
    url: `${baseURL}/createUser`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '删除用户错误'
    })
    console.error(err)
  }
  return result
}
export { _createUser }
