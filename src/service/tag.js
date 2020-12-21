import baseURL from './index'
import Vue from 'vue'

const _getTagList = async (queryParams) => {
  console.log('queryParams', queryParams)
  let result
  const req = {
    url: `${baseURL}/getTagList`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '获取标签列表错误'
    })
    console.error(err)
  }
  return result
}

const _deleteTag = async ({queryParams}) => {
  let result
  const req = {
    url: `${baseURL}/deleteTag`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '删除标签错误'
    })
    console.error(err)
  }
  return result
}

const _createTagItem = async (queryParams) => {
  let result
  const req = {
    url: `${baseURL}/createTagItem`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '新建标签错误'
    })
    console.error(err)
  }
  return result
}

const _updateTagItem = async (queryParams) => {
  let result
  const req = {
    url: `${baseURL}/updateTagItem`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '编辑标签错误'
    })
    console.error(err)
  }
  return result
}

export { _getTagList, _deleteTag, _createTagItem, _updateTagItem }
