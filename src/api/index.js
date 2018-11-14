import request from '@/util/request.js'

export function getAdInfo (params) {
  return request({
    url: '/app-wake-up-info/query',
    method: 'post',
    data: params
  })
}

export function saveOrUpdate (params) {
  return request({
    url: '/app-wake-up-info/save',
    method: 'post',
    data: params
  })
}

export function delAdInfo (params) {
  return request({
    url: '/app-wake-up-info/query', // 待修改
    method: 'post',
    data: params
  })
}

export function queryStrategyInfo (params) {
  return request({
    url: '/ad-dispatch-strategy/query', // 待修改
    method: 'post',
    data: params
  })
}
export function saveOrUpdateStrategy (params) {
  return request({
    url: '/ad-dispatch-strategy/save',
    method: 'post',
    data: params
  })
}

export function queryMedias () {
  return request({
    url: '/media-info/query',
    method: 'post',
    data: {}
  })
}

export function getChannelInfo (params) {
  return request({
    url: '/channel-info/query',
    method: 'post',
    data: params
  })
}

export function saveChannelInfo (params) {
  return request({
    url: '/channel-info/save',
    method: 'post',
    data: params
  })
}

export function delChannelInfo (params) {
  return request({
    url: `/channel-info/delete/${params}`,
    method: 'post',
    data: {}
  })
}

export function getMediaInfo (params) {
  return request({
    url: '/media-info/query',
    method: 'post',
    data: params
  })
}

export function saveMediaInfo (params) {
  return request({
    url: '/media-info/save',
    method: 'post',
    data: params
  })
}

export function delMediaInfo (params) {
  return request({
    url: `/channel-info/delete/${params}`,
    method: 'post',
    data: {}
  })
}
