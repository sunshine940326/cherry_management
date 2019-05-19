<template>
  <div class="tag-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标签名：">
        <el-input v-model="form.tagName"></el-input>
      </el-form-item>
      <el-form-item label="value：">
        <el-input v-model="form.tagValue"></el-input>
      </el-form-item>
    </el-form>

    <div class="bottom-button">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
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
      console.log('markdownValue', md)
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
        this.isEdit ? await _updateArticle({queryParams}) : await _createArticleItem({queryParams})
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
      const queryParams = {
        id: this.$route.params.articleId
      }
      const res = await _getArticleList({queryParams})
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
