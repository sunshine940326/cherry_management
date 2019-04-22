<template>
  <div class="el-menu-vertical">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu router :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <template v-for="route in $router.options.routes[0].children">
        <el-menu-item v-if="!route.children || route.children.length == 1" :index="route.path" :key="route.path">
          <i class="el-icon-menu"></i>
          {{ route.meta.title }}
        </el-menu-item>
        <el-submenu v-else :index="route.path" :key="route.path">
          <template slot="title">
            <i class="el-icon-menu"></i>{{ route.meta.title }}</template>
          <el-menu-item 
            v-for="child in route.children" 
            :index="route.path + '/' + child.path" 
            :key="route.path + '/' + child.path">
            {{ child.meta.title }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>

    <!-- <el-menu 
      router
      default-active="1-4-1" 
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="abc">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/article">文章列表</el-menu-item>
          <el-menu-item index="/article/create">创建文章</el-menu-item>
          <el-menu-item index="/article/edit">编辑文章</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="c">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="d">
          <span slot="title">选项4</span>
          <el-menu-item index="e">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu> -->
  </div>
</template>
<script>
export default {
  name: 'menuItem',
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: 'article',
          icon: 'el-icon-location'
        }
      ] 
    }
  },
  beforeMount() {
    console.log('$router.options', this.$router.options)
  }
}
</script>

<style lang="sass">
.el-menu-vertical
  @extend %hf
  .el-menu
    @extend %hf, %text-left, %flex-column
    width: 200px
</style>
