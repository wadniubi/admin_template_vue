<template>
  <!--仅显示有嵌套子路由且hidden不为隐藏的子路由-->
  <div v-if="!item.hidden&&item.children" >
    <!--当只有一个子嵌套路由且子路由不再有子路由的时候,直接显示在当前菜单-->
    <router-link v-if="hasOneShowingChild(item.children)&&!onlyOneChild.children" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item  :index="resolvePath(onlyOneChild.path)">
        <i v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :class="elCoinCreate(onlyOneChild)"></i>   <!--elementui的组件是有限的,可以参照大牛封装svg组件,可以自定义图标-->
        <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </router-link>
    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <i v-if="item.meta&&item.meta.icon" :class="elCoinCreate(item)"></i>
        <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
      </template>

      <template v-if="!child.hidden" v-for="child in item.children">
        <SidebarItem v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></SidebarItem>

        <router-link v-else :to="resolvePath(child.path)" :key="child.name||child.path">
          <el-menu-item :index="resolvePath(child.path)">
            <i v-if="child.meta&&child.meta.icon" :class="elCoinCreate(child)"></i>
            <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      require: true,
      type: Object
    },
    basePath: {
      require: true,
      type: String
    }
  },
  data () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild (children) {
      console.log('children' + JSON.stringify(children))
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath (...paths) {
      return path.resolve(this.basePath, ...paths)// node.js中的解析路径,其实相当于拼接
    },
    elCoinCreate (item) {
      return 'el-icon-' + item.meta.icon
    }
  }
}
</script>

<style scoped>
</style>
