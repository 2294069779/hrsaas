<template>
  <div>
    <el-upload
      :class="{disabled: fileComputed}"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      list-type="picture-card"
      :file-list="fileList"
      :limit="1"
      action="#"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      // file是点击删除的文件
    //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      // this.fileList.push(file)
      this.fileList = fileList.map(item => item)
    }
  }

}

</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}

</style>
