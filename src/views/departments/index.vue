<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <treeTools slot-scope="{ data }" :tree-node="data" @deld="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>

      <addDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranlist } from '@/utils/index'
import addDept from './components/add-dept.vue'

export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      company: { },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranlist(result.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartments(node.id) // 直接调用子组件中的方法 传入一个id
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
