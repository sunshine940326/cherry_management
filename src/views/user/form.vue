<template>
  <div class="tag-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.password"></el-input>
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
import { _getUserList, _createUser } from '@/service/user'

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
      return this.$route.name === 'userEdit'
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
    async getUserList() {
      const queryParams = {
        userId: this.$route.params.userId
      }
      const res = await _getUserList({ queryParams })
      return res.list[0]
    }
  },
  async beforeMount () {
    this.form = this.isEdit ? await this.getUserList() : {}
  }
}
</script>
<style lang="sass" scoped>
.bottom-button
  float: right
</style>
