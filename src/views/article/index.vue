<template>
  <div class="article">
    <div class="article-list-container" v-if="isList">
      <div class="search-container">
        <div class="search-item">
          <el-select v-model="value" clearable placeholder="标签">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" clearable placeholder="状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            placeholder="标题"
            v-model="input"
            clearable>
          </el-input>
        </div>
        <div class="button-container">
          <el-button type="primary" plain>搜索</el-button>
          <el-button type="primary" plain>新建文章</el-button>
        </div>
      </div>
      <div class="list-container">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </div>
    <div v-else class="article-main">
      <router-view ></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articleList',
  data() {
    return {
      isList: this.$route.name === 'articleList',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>
<style lang="sass">
.article
  @extend .p5
  height: calc(100% - 100px)
  overflow: auto
  .search-container
    @extend %flex, %space-between, .mb5
    .el-input
      @extend .mr2
      width: 200px
  .search-item, .button-container
    flex-shrink: 0
  .pagination
    float: right
</style>

