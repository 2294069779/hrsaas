<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="新密码:" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 放置个人详情 -->
            <component :is="userComponent" />
            <!-- <user-info /> -->
          </el-tab-pane>
          <el-tab-pane label="岗位详情">
            <!-- 放置岗位详情 -->
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDeatilById } from '@/api/user'
import { saveUserDetailById } from '@/api/employess'
import userInfo from './components/user-info'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    userInfo,
    JobInfo
  },
  data() {
    return {
      userComponent: userInfo,
      JobInfo: JobInfo,
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度为6-9', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserDeatilById()
  },
  methods: {
    async getUserDeatilById() { // 查找用户基本信息
      this.userInfo = await getUserDeatilById(this.userId)
    },
    async saveUser() {
      try {
        await this.$refs.userForm.validate()

        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('修改成功')
      } catch (error) {
        this.$message.error(error)
      }
    }
  }

}
</script>

<style>

</style>
