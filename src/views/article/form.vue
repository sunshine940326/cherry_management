<template>
  <div class="article-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mark-down></mark-down>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
      </el-form-item>
    </el-form>
    <div class="article-footer">
      <el-button disabled>取消</el-button>
      <el-button type="primary">立即创建</el-button
    </div>
  </div>
</div>
</template>
<script>
import MarkDown from 'vue-meditor'
export default {
  name: 'articleForm',
  components:{
    MarkDown
  },
  data() {
    return {
      form: {
        name: null,
      },
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
      value: '',
      radio: '1'
    }
  }
}
</script>
<style lang="sass">
.article-form
  .el-form-item__content
    @extend %text-left
  .article-footer
    @extend %text-right
</style>
