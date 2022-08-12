<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treeTools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <treeTools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>

    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'

export default {
  components: {
    treeTools
  },
  data() {
    return {
      company: { name: '某某开发学习公司', manager: '负责人' },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
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
