<template>
  <div class="article-form">
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mark-down :autoSave='true' :initialValue="initialValue" @on-save="handleMDChange"></mark-down>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tag" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="form.state" label="draft">草稿</el-radio>
        <el-radio v-model="form.state" label="publish">发布</el-radio>
      </el-form-item>
    </el-form>
    <div class="article-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="onSubmit" type="primary">{{ this.isEdit ? '更新文章' : '立即创建'}}</el-button>
    </div>
  </div>
</div>
</template>
<script>
import MarkDown from 'vue-meditor'
import { _createArticleItem, _updateArticle, _getArticleList } from '@/service/article.js'
import { _getTagList } from '@/service/tag.js'

export default {
  name: 'articleForm',
  components:{
    MarkDown
  },
  data() {
    return {
      form: {
        title: '',
        desc: '',
        content: '',
        author: '',
        state: 'draft',
        tag: ''
      },
      initialValue: '',
      options: [],
      value: '',
      radio: '1'
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'articleEdit'
    }
  },
  methods: {
    handleMDChange(md){
      this.$notify({
        title: '同步成功',
        type: 'success'
      })
      this.form.content = md.markdownValue
    },
    async onSubmit () {
      // const queryParams = {
      //   ...this.form,
      //   id: this.$route.params.articleId || null,
      // }
      const { content, desc, title, state, tag, author } = this.form
      const queryParams = {
        id: this.$route.params.articleId || null,
        content,
        desc,
        title,
        state,
        tag,
        author
      }
      try {
        this.isEdit ? await _updateArticle(queryParams) : await _createArticleItem(queryParams)
        this.$notify({
          title: '成功',
          message: this.isEdit ? '修改文章成功' : '新建文章成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            name: "articleList"
          })
        }, 1500)
      } catch (err) {
        console.log(err)
      }
    },
    handleCancel () {
      history.go(-1)
    },
    async getArticleDetail() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const queryParams = {
        id: this.$route.params.articleId
      }
      const res = await _getArticleList({queryParams})
      loading.close()
      this.initialValue = res.list[0].content
      return res.list[0]
    },
    async getTagList() {
      const res = await _getTagList()
      this.options = res.list.map(item => {
        return {
          value: item.tagValue,
          label: item.tagName
        }
      })
    }
  },
  async beforeMount () {
    this.getTagList()
    this.form = this.isEdit ? await this.getArticleDetail() : {}
  }
}
</script>
<style lang="sass">
.article-form
  .el-form-item__content
    @extend %text-left
  .article-footer
    @extend %text-right
  .markdown
    @extend %border-radius, %border
</style>
