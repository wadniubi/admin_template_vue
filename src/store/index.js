import Vue from 'vue'
import Vuex from 'vuex'
import {asyncRouterMap, constantRouterMap} from '@/router'
import {loginByUsername, logout} from '../api/login'
import {formatDate, formatTimePeriod, windowsSaveLoginData, clearWindowsLoginData} from '../util/tools'
import {getAdInfo, saveOrUpdate, delAdInfo, queryStrategyInfo, saveOrUpdateStrategy, queryMedias,
  getChannelInfo, saveChannelInfo, delChannelInfo,
  getMediaInfo, saveMediaInfo, delMediaInfo} from '../api'
import router from '../router'

Vue.use(Vuex)

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const store = new Vuex.Store({
  state: {
    authInfo: {
      roles: [],
      userName: ''
    },
    routers: constantRouterMap,
    addRouters: [],
    sidebar: {
      isOpened: true
    },
    adInfo: [], // 广告列表
    strategyInfos: [], // 策略列表
    channelInfos: [], // 广告商列表
    mediaInfos: [], // 渠道列表
    awuMedias: [], // 黑白名单媒体列表
    saveForm: {}, // 广告修改功能跳转数据
    strategySaveForm: {}, // 策略修改功能跳转数据
    channelInfoSaveForm: {}, // 广告商修改功能跳转数据
    mediaInfoSaveForm: {} // 渠道修改功能跳转数据
  },
  mutations: {
    /* 登陆 */
    'SET_AUTH_INFO': (state, authInfo) => {
      state.authInfo = authInfo
    },
    'SET_ROUTERS': (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    'SET_SIDEBAR': (state) => {
      state.sidebar.isOpened = !state.sidebar.isOpened
    },
    /* 登陆 */
    /* appwakeupinfo start */
    'SET_ADINFO': (state, adInfo) => {
      state.adInfo = adInfo
    },
    'SET_SELECT_AD_INFO': (state, {saveForm}) => {
      state.saveForm = saveForm
    },
    'DELETE_SEND_FORM': (state, name) => {
      state[name] = {}
    },
    /* appwakeupinfo end */
    /* strategyinfo start */
    'SET_STRATEGY_INFO': (state, strategyInfos) => {
      state.strategyInfos = strategyInfos
    },
    'SET_SELECT_STRATEGY_INFO': (state, {saveForm}) => {
      state.strategySaveForm = saveForm
    },
    'SET_AWU_MEDIAS': (state, list) => {
      state.awuMedias = list
    },
    /* strategyinfo end */
    /* channelinfo start */
    'SET_CHANNEL_INFO': (state, list) => {
      state.channelInfos = list
    },
    'SET_SELECT_CHANNEL_INFO': (state, save) => {
      state.channelInfoSaveForm = save
    },
    /* channelinfo end */
    /* mediainfo start */
    'SET_MEDIA_INFO': (state, list) => {
      state.mediaInfos = list
    },
    'SET_SELECT_MEDIA_INFO': (state, mediaInfoSave) => {
      state.mediaInfoSaveForm = mediaInfoSave
    }
    /* mediainfo end */
  },
  getters: {
    authInfo: state => state.authInfo,
    addRouters: state => state.addRouters,
    permission_routers: state => state.routers,
    sidebar: state => state.sidebar,
    adInfo: state => state.adInfo,
    strategyInfos: state => state.strategyInfos,
    channelInfos: state => state.channelInfos,
    mediaInfos: state => state.mediaInfos,
    saveForm: state => state.saveForm,
    strategySaveForm: state => state.strategySaveForm,
    channelInfoSaveForm: state => state.channelInfoSaveForm,
    mediaInfoSaveForm: state => state.mediaInfoSaveForm,
    awuMedias: state => state.awuMedias
  },
  actions: {
    GenerateRoutes ({commit}, data) {
      return new Promise(resolve => {
        const roles = data.roles
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        console.log('addRouters', accessedRouters)
        resolve()
      })
    },
    LoginByUsername ({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const authInfo = response.authInfo
          commit('SET_AUTH_INFO', authInfo)
          windowsSaveLoginData(authInfo)
          const roles = authInfo.roles
          let accessedRouters
          if (roles.indexOf('admin') >= 0) {
            accessedRouters = asyncRouterMap
          } else {
            accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
          }
          commit('SET_ROUTERS', accessedRouters)
          router.addRoutes(accessedRouters)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        logout(this.state.userName).then(() => {
          commit('SET_AUTH_INFO', {})
          clearWindowsLoginData()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    ToggleSidebar: function ({commit}) {
      commit('SET_SIDEBAR')
    },
    sendSelectAdInfo: function ({commit}, saveForm) {
      commit('SET_SELECT_AD_INFO', {saveForm})
    },
    deleteSendForm ({commit}, conditionData) {
      commit('DELETE_SEND_FORM', conditionData.name)
    },
    queryAdInfo ({commit}, conditionData) {
      getAdInfo(conditionData).then((response) => {
        const result = response.data
        result.forEach(adInfo => {
          adInfo.startTimeForTab = formatDate(adInfo.startTime)
          adInfo.endTimeForTab = formatDate(adInfo.endTime)
        })
        commit('SET_ADINFO', result)
      }).catch((error) => {
        console.log('error queryAdInfo!' + error.message)
      })
    },
    saveOrUpdateADInfo ({commit}, conditionData) {
      saveOrUpdate(conditionData).then(() => {
        console.log('成功')
      }).catch((error) => {
        console.log('error saveOrUpdateADInfo!' + error.message)
      })
    },
    deleteSelectAdInfo ({commit}, conditionData) {
      delAdInfo(conditionData).then(() => {
        console.log('成功')
      }).catch((error) => {
        console.log('error saveOrUpdateADInfo!' + error.message)
      })
    },
    queryStrategyInfo ({commit}, conditionData) {
      queryStrategyInfo(conditionData).then((response) => {
        console.log('策略查询成功')
        const result = response.data
        result.forEach(strategyInfo => {
          strategyInfo.startTimeForTab = formatDate(strategyInfo.startTime)
          strategyInfo.endTimeForTab = formatDate(strategyInfo.endTime)
          const strategy = JSON.parse(strategyInfo.strategy)
          strategyInfo.interval = strategy.interval
          strategyInfo.blacklist = typeof (strategy.blackNameList) === 'undefined' || strategy.blackNameList.length === 0 ? '(空)' : strategy.blackNameList
          strategyInfo.whitelist = typeof (strategy.whiteList) === 'undefined' || strategy.whiteList.length === 0 ? '(空)' : strategy.whiteList
          strategyInfo.timeInDayByHourForTab = formatTimePeriod(strategy.timeInDayByHour)
        })
        commit('SET_STRATEGY_INFO', result)
      }).catch((error) => {
        console.log('error queryStrategyInfo!' + error.message)
      })
    },
    sendSelectStrategyInfo ({commit}, saveForm) {
      commit('SET_SELECT_STRATEGY_INFO', {saveForm})
    },
    saveOrUpdateStrategyInfo ({commit}, conditionData) {
      saveOrUpdateStrategy(conditionData).then((response) => {
        console.log('策略更新成功')
      }).catch((error) => {
        console.log('error saveOrUpdateStrategyInfo!' + error.message)
      })
    },
    queryMedias ({commit}, conditionData) {
      queryMedias(conditionData).then((response) => {
        commit('SET_AWU_MEDIAS', response.data)
        console.log('成功')
      }).catch((error) => {
        console.log('error preQueryMedias!' + error.message)
      })
    },
    awpQueryChannelInfo ({commit}, conditionData) {
      getChannelInfo(conditionData).then((response) => {
        const result = response.data
        commit('SET_CHANNEL_INFO', result)
      }).catch((error) => {
        console.log('失败!' + error.message)
      })
    },
    awpSendSelectChannelInfo ({commit}, data) {
      console.log('channelSaveForm:' + JSON.stringify(data))
      commit('SET_SELECT_CHANNEL_INFO', data)
    },
    awpSaveChannelInfo ({commit}, conditionData) {
      saveChannelInfo(conditionData).then((response) => {
        console.log('广告商查询成功')
        return response
      }).catch((error) => {
        console.log('失败!' + error.message)
        return error
      })
    },
    awpDelChannelInfo ({commit}, conditionData) {
      delChannelInfo(conditionData.id).then(() => {
        console.log('广告商删除成功')
      }).catch((error) => {
        console.log('失败!' + error.message)
      })
    },
    /* mediaInfo */
    awpSendSelectMediaInfo ({commit}, saveForm) {
      commit('SET_SELECT_MEDIA_INFO', saveForm)
    },
    awpQueryMediaInfo ({commit}, conditionData) {
      getMediaInfo(conditionData).then((response) => {
        const result = response.data
        commit('SET_MEDIA_INFO', result)
      }).catch((error) => {
        console.log('error queryMediaInfo!' + error.message)
      })
    },
    awpSaveMediaInfo ({commit}, conditionData) {
      saveMediaInfo(conditionData).then(() => {
        console.log('媒体保存成功')
      }).catch((error) => {
        console.log('失败!' + error.message)
      })
    },
    awpDelMediaInfo ({commit}, conditionData) {
      delMediaInfo(conditionData.id).then(() => {
        console.log('媒体删除成功')
      }).catch((error) => {
        console.log('失败!' + error.message)
      })
    }
  }
})

export default store
