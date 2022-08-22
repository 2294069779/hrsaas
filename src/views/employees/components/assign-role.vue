// 分配角色
<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
    <!--  -->
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDeatilById } from '@/api/user'
import { assignRoles } from '@/api/employess'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null,
      require: true
    }
  },
  data() {
    return {
      list: [], // 角色列表
      roleIds: [] // 用户有哪些角色
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() { // 获取用户角色列表
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDeatilById(id) {
      // 这里不能直接调用id，因为props传过来的异步，这个先执行
      const { roleIds } = await getUserDeatilById(id)
      this.roleIds = roleIds
    },
    async btnOk() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$message.success('分配角色成功')
      this.$emit('update:showRoleDialog', false)
    },
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }

  }

}
</script>

<style>

</style>
