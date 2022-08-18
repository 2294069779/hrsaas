// 员工
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共有{{ page.total }}条员工信息</span>
        <template v-slot:after>
          <el-button size="samll" type="warning">导入</el-button>
          <el-button size="samll" type="danger">导出</el-button>
          <el-button size="samll" type="primary">新增员工</el-button>
        </template>
      </PageTools>

      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row type="flex" justify="center" align="middle" style="height:60px">
          <el-pagination layout="prev,pager,next" :page-page="page.page" :page-size="page.size" :total="page.total" @current-change="changePage" />
        </el-row>
      </el-card>

    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employess'
import EmployeeEnum from '@/utils/constant/employees'
export default {
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }

    }
  },
  created() {
    this.getEmployeeList() // 获取员工基本信息
  },
  methods: {
    async getEmployeeList() { // 获取员工
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 分页改变
    changePage(newpage) {
      this.page.page = newpage
      this.getEmployeeList()
    },
    // 员工聘用形式枚举
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('你确定删除该员工吗？')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        this.$message.error(error)
      }
    }

  }

}
</script>

 <style>

 </style>
