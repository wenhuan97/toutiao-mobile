import request from '@/utils/request'

// 获取联想建议（自动补全）
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
// 获取搜索历史记录
export const getSearchHistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
// 删除用户搜索历史
export const deleteAllHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
