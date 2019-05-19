<template>
  <div class="tag">
    <el-table
      :data="tagData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tagValue"
        label="value"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间">
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="更新时间">
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { _getTagList, _deleteTag } from '@/service/tag.js'

export default {
  name: 'articleList',
  data() {
    return {
      isFetching: false,
      tagData: [],
    }  
  },
  methods: {
    async getTagList() {
      this.isFetching = true
      try {
        const res = await _getTagList()
        this.tagData = res.list
      } catch (error) {
        console.error(error)
      }
      this.isFetching = false
      
    },
    handleEdit (index, row) {
      this.$router.push({
        name: "tagEdit",
        params: {
          tagId: row._id
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(`此操作将永久删除 “${row.tagName}” 该标签, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const queryParams = {
          _id: row._id
        }
        await _deleteTag({queryParams})
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.getTagList()
        loading.close()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  beforeMount() {
    this.getTagList()
  }
}
</script>
<style lang="sass">
.tag
  @extend .p5, %scroll
  height: calc(100% - 100px)
  .search-container
    @extend %flex, %space-between, .mb5
    .el-input
      @extend .mr2
      width: 200px
  .search-item, .button-container
    flex-shrink: 0
  .pagination
    float: right
  .article-list-container
    @extend %hf
  .list-container
    @extend %scroll
    height: calc(100% - 80px)
    .el-table
      @extend %hf
    .el-table__body-wrapper
      @extend %scroll
      height: calc(100% - 42px)
</style>

