<template>
  <div class="tag">
    <div v-if="isList">
      <el-table
        :data="userData"
        border
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="user"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="formatData"
          label="创建时间">
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="更新时间">
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div v-else class="article-main">
      <router-view ></router-view>
    </div>
  </div>
</template>
<script>
import { _getUserList, _deleteUser } from '@/service/user'

export default {
  name: 'articleList',
  data() {
    return {
      isFetching: false,
      userData: [],
    }  
  },
  computed: {
    isList() {
      return this.$route.name === 'userList'
    }
  },
  methods: {
    async getUserList() {
      this.isFetching = true
      try {
        const res = await _getUserList()
        this.userData = res.list.map( list => {
          return {
            ...list,
            formatData: new Date(list.createAt).Format("yyyy-MM-dd hh:mm:ss"),
          }
        })
      } catch (error) {
        console.error(error)
      }
      this.isFetching = false
    },
    handleEdit (index, row) {
      this.$router.push({
        name: "userEdit",
        params: {
          userId: row._id
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(`此操作将永久删除 “${row.user}” 该用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const queryParams = {
          _id: row._id
        }
        await _deleteUser({queryParams})
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.getUserList()
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
    this.getUserList()
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

