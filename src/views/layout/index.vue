<template>
  <div class="layout_container">
    <div class="left-menu">
      <menu-item></menu-item>
    </div>
    <div class="right">
      <div class="right-breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item 
            :to="{ path: route.path }" 
            v-for="(route, index) in routerList" :key="index"
            >
            {{route.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import menuItem from '@/components/menu/index.vue'

export default {
  components: {
    menuItem
  },
  data() {
    return {
      routerList: []
    };
  },
  watch: {
    $route() {
      this.filterRouter()
    }
  },
  methods: {
    filterRouter() {
      this.routerList = this.$route.matched.map(item => {
        return {
          path: item.path,
          name: item.meta.title
        }
      })
    }
  },
  beforeMount() {
    this.filterRouter()
  }
}
</script>
<style lang="sass">
.layout_container
  @extend %wf, %hf, %flex
  .right
    flex-grow: 1
  .right-breadcrumb
    @extend .p5, %border-b
</style>

