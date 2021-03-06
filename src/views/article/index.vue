<template>
  <div class="article">
    <div class="article-list-container" v-if="isList">
      <div class="search-container">
          <div class="search-item">
          <el-select v-model="search.tag" clearable placeholder="标签">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="search.state" clearable placeholder="状态">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            placeholder="标题"
            v-model="search.title"
            clearable>
          </el-input>
        </div>
        <div class="button-container">
          <el-button type="primary" plain @click="handleSearch">搜索</el-button>
          <el-button type="primary" plain>新建文章</el-button>
        </div>
      </div>
      <div class="list-container" v-loading="isFetching">
        <el-table
          :data="articleList"
          border
          style="width: 100%">
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="tagName" label="标签">
          </el-table-column>
          <el-table-column prop="author" label="作者">
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column prop="formatData" label="创建时间">
          </el-table-column>
          <el-table-column prop="formatUpdateAt" label="更新时间">
          </el-table-column>
          <el-table-column prop="address" label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row._id)">编辑</el-button>
              <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-else class="article-main">
      <router-view ></router-view>
    </div>
  </div>
</template>
<script>
import { _getArticleList, _deleteArticle } from '@/service/article.js'
import { _getTagList } from '@/service/tag.js'

export default {
  name: 'articleList',
  data() {
    return {
      isFetching: false,
      articleList: null,
      total: 0,
      tableData: [],
      value: '',
      options: {},
      visible: false,
      stateOptions: [
        {
          label: '发布',
          value: 'publish'
        },
        {
          label: '草稿',
          value: 'draft'
        }
      ],
      limit: 10,
      currentPage: 1,
      search: {
        title: '',
        state: '',
        tag: ''
      }
    }  
  },
  computed: {
    isList() {
      return this.$route.name === 'articleList'
    },
    offset () {
      return (this.currentPage - 1) * this.limit || 0
    }
  },
  methods: {
    handlePopoverShow() {
      this.visible = !this.visible
    },
    handleDelete (index, row) {
      this.$confirm(`此操作将永久删除 “${row.title}” 该文章, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const queryParams = {
          _id: row._id
        }
        await _deleteArticle({ queryParams })
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.fetchArticles()
        loading.close()
        this.$notify({
          title: '成功',
          type: 'success',
          message: '删除成功!'
        })
      }).catch((e) => {
        console.log(e)
        this.$notify.info({
          title: '消息',
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (page) {
      this.fetchArticles()
    },
    handleSearch() {
      this.currentPage = 1
      this.fetchArticles()
    },
    async fetchArticles () {
      this.isFetching = true
      let conditions = {
        ...this.search,
        limit: this.limit,
        offset: this.offset
      }
      let queryParams = {}
      Object.keys(conditions).map(key => {
        conditions[key] && (queryParams[key] = conditions[key])
      })
      try {
        const res = await _getArticleList({queryParams})
        this.articleList = res.list.map( list => {
          return {
            ...list,
            tagName: this.options[list.tag],
            formatData: new Date(list.createAt).Format("yyyy-MM-dd hh:mm:ss"),
            formatUpdateAt: new Date(list.updateAt).Format("yyyy-MM-dd hh:mm:ss"),
          }
        })
        this.total = res.total
      } catch (error) {
        console.error(error)
      }
      this.isFetching = false
    },
    async getTagList() {
      const res = await _getTagList()
      const _options = new Map()
      res.list.forEach(tag => {
        _options[tag.tagValue]= tag.tagName
      });
      this.options = _options;
    },
    handleEdit (index, id) {
      this.$router.push({
        name: "articleEdit",
        params: {
          articleId: id
        }
      })
    }
  },
  beforeMount() {
    this.getTagList()
    this.fetchArticles()
  }
}
</script>
<style lang="sass">
.article
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

