// 公司设置

<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px"><el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog1"> 新增角色</el-button></el-row>
            <el-table border :data="list">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px">

              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="公司信息">
            <!-- //提示消息 -->
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改&quot;" type="info" show-icon :closable="false" />
            <!-- //表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称"><el-input v-model="formData.name" disabled style="width:400px" /></el-form-item>
              <el-form-item label="公司地址"><el-input v-model="formData.companyAddress" disabled style="width:400px" /></el-form-item>
              <el-form-item label="邮箱"><el-input v-model="formData.mailbox" disabled style="width:400px" /></el-form-item>
              <el-form-item label="备注"><el-input v-model="formData.remarks" disabled style="width:400px" type="textarea" :rows="3" /></el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <!-- 编辑弹层 -->
      <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      // 分配权限弹窗
      <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expand-all="true"
          :default-checked-keys="selectCheck"
          node-key="id"
        />
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
            <el-button size="small" @click="btnPermCancel">取消</el-button>
          </el-col>
        </el-row>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, updateRole, getRoleDetail, addRole, assignPerm } from '@/api/setting'
import { mapGetters } from 'vuex'
import { tranlist } from '@/utils'
import { getPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1,
        pagesize: 3,
        total: 0
      },
      formData: {},
      showDialog: false, // 控制弹层显示
      roleForm: {},
      rules: { name: [{ required: true, message: '角色名称为空', trigger: 'blur' }] },
      title: '编辑功能',
      loading: false,
      showPermDialog: false, // 控制分配权限弹窗
      permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null, // 用来记录分配角色的id
      defaultProps: {
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 角色列表
    this.getCompanyInfo() // 公司信息
  },
  methods: {
    async getRoleList() {
      this.loading = true
      const { total, rows } = await getRoleList(this.page)
      this.page.total = parseInt(total)
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      // newPage是当前点击的页码
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    // 获取公司名称
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    // 删除角色
    async deleteRole(id) {
      try {
        await this.$confirm('是否删除该角色')
        await deleteRole(id)
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch {
        this.$message.error('删除失败')
      }
    },
    // 获取数据渲染
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog1()
    },
    showDialog1() {
      if (!this.roleForm.id) {
        this.title = '新增功能'
      } else {
        this.title = '编辑功能'
      } this.showDialog = true
    },
    // 点击ok
    async btnOK() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        this.$message.error(error)
      }
    },
    btnCancel() {
      this.roleForm = {}
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    // 分配权限按钮
    async assignPerm(id) {
      this.permData = tranlist(await getPermissionList(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetail(id) // permIds是当前角色所拥有的权限点数据
      this.selectCheck = permIds
      this.showPermDialog = true
    },
    // 分配权限确定按钮
    async btnPermOK() {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel() {
      this.selectCheck = []
      this.showPermDialog = false
    }

  }
}
</script>

<style>

</style>
