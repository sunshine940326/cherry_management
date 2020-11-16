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
            v-if="!child.hidden"
            v-for="child in route.children" 
            :index="route.path + '/' + child.path" 
            :key="route.path + '/' + child.path">
            {{ child.meta.title }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'menuItem',
  data() {
    return {
      isCollapse: false
    }
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
