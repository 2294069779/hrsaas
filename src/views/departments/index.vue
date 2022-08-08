<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用一个行列 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDeptsindex" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDeptsindex" @delDepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
    <adddept :show-dialog="showDialog" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranlist } from '@/utils/index'
import adddept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    adddept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false,
      node: null // 记录当前点击的node节点
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, managet: '负责人' }
      this.departs = tranlist(result.depts, '')
      console.log(result)
    },
    addDeptsindex(node) {
      this.showDialog = true
      this.node = node
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
