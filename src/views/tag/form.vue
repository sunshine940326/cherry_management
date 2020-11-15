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
      <el-button type="primary" @click="handleSubmit">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</div>
</template>
<script>
import { _createTagItem, _getTagList } from '@/service/tag.js'

export default {
  name: 'articleForm',
  data() {
    return {
      form: {
        tagName: '',
        tagValue: ''
      }
    }
  },
  computed: {
    isEdit() {
      return this.$route.name === 'tagEdit'
    }
  },
  methods: {
    async handleSubmit () {
      try {
        await _createTagItem(this.form)
        this.$notify({
          title: '成功',
          message: '新建分类成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            name: "tagList"
          })
        }, 1500)
      } catch (err) {
        console.log(err)
      }
    },
    handleCancel () {
      history.go(-1)
    },
    async getTagList() {
      const queryParams = {
        tagId: this.$route.params.tagId
      }
      const res = await _getTagList({ queryParams })
      return res.list[0]
    }
  },
  async beforeMount () {
    this.form = this.isEdit ? await this.getTagList() : {}
  }
}
</script>
<style lang="sass" scoped>
.bottom-button
  float: right
</style>
