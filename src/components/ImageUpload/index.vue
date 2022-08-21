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
      :before-upload="beforeUpload"
      :http-request="upload"
      action="#"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
    <el-dialog title="预览 图片" :visible.sync="showDialog" style="width:50%">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>

</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDQhkX5OSGp8ShiV4PVMyMWR7YmmW3LPFr', // 身份识别 ID
  SecretKey: 'SehV4OTIsDI8j5BZicGemeGcjaCYvEJ9' // 身份密钥
})
// export default {
//   data() {
//     return {
//       fileList: [], // 图片地址设置为数组
//       showDialog: false, // 控制显示弹层
//       imgUrl: '',
//       currentFileUid: '',
//       showPercent: false,
//       percent: 0
//     }
//   },
//   computed: {
//     fileComputed() {
//       return this.fileList.length === 1
//     }
//   },
//   methods: {
//     preview(file) {
//       // 这里应该弹出一个层 层里是点击的图片地址
//       this.imgUrl = file.url
//       this.showDialog = true
//     },
//     handleRemove(file) {
//       // file是点击删除的文件
//     //   将原来的文件给排除掉了 剩下的就是最新的数组了
//       this.fileList = this.fileList.filter(item => item.uid !== file.uid)
//     },
//     changeFile(file, fileList) {
//       // this.fileList.push(file)
//       this.fileList = fileList.map(item => item)
//     },
//     // 上传检查操作
//     beforeUpload(file) {
//       const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
//       if (!types.includes(file.type)) {
//         this.$message.error('上传图片只能是JPG、GIF、BMP、PNG 格式')
//         return false
//       }
//       //  检查大小
//       const maxSize = 5 * 1024 * 1024
//       if (maxSize < file.size) {
//         this.$message.error('图片大小最大不能超过5M')
//         return false
//       }
//       //   已经确定当前上传的就是当前的这个file了
//       this.currentFileUid = file.uid
//       this.showPercent = true
//       return true
//     },
//     // 进行上传操作
//     upload(params) {
//       if (params.file) {
//         cos.putObject({
//           Bucket: 'mi-1313417575', /* 填入您自己的存储桶，必须字段 */
//           Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
//           Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
//           StorageClass: 'STANDARD',
//           Body: params.file, // 上传文件对象
//           onProgress: (params) => {
//             this.percent = params.percent * 100
//           }
//         }, (err, data) => {
//           // data中有一个statusCode === 200 的时候说明上传成功
//           if (!err && data.statusCode === 200) {
//             //   此时说明文件上传成功  要获取成功的返回地址
//             // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
//             // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
//             // 需要知道当前上传成功的是哪一张图片
//             this.fileList = this.fileList.map(item => {
//               // 去找谁的uid等于刚刚记录下来的id
//               if (item.uid === this.currentFileUid) {
//                 // 将成功的地址赋值给原来的url属性
//                 return { url: 'http://' + data.Location, upload: true }
//                 // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
//                 // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
//               }
//               return item
//             })
//             // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图

//             this.showPercent = false // 隐藏进度条
//             this.percent = 0 // 进度归0
//           }
//         })
//       }
//     }

//   }
// }
export default {
  data() {
    return {
      fileList: [],
      showDialog: false, // 控制图片的显示或者隐藏
      imgUrl: '', // 存储点击的图片地址
      currentFileUid: '', // 用一个变量 记住当前上传的图片id
      percent: 0,
      showPercent: false // 默认不显示进度条
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
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
    handleRemove(file) {
      // file是点击删除的文件
    //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 修改文件时触发
    // 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
    // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // file.uid
      this.currentFileUid = file.uid // 记住当前的uid
      this.showPercent = true
      return true
    },
    // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
    upload(params) {
      if (params.file) {
        //  上传文件到腾讯云
        cos.putObject({
          Bucket: 'mi-1313417575', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-guangzhou', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // 需要判断错误与成功
          if (!err && data.statusCode === 200) {
            // 如果没有失败表示成功了
            // 此时认为上传成功了
            // this.currentFileUid
            // 仍然有个小问题， 比如此时我们正在上传，但是调用了保存，保存在上传过程中进行，
            // 此时上传还没有完成  此时可以这样做 ： 给所有上传成功的图片 加一个属性 upload: true
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                //   upload为true表示 该图片已经成功上传到服务器，地址已经是腾讯云的地址了  就不可以执行保存了
                return { url: 'http://' + data.Location, upload: true } // 将本地的地址换成腾讯云地址
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 1000)

            // 将腾讯云地址写入到fileList上 ，保存的时候 就可以从fileList中直接获取图片地址

            // 此时注意，我们应该记住 当前上传的是哪个图片  上传成功之后，将图片的地址赋值回去
          }
        })
      }
    }
  }
}

</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}

</style>
