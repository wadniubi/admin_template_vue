<template>
  <div style="padding:30px;">
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item label="媒体名称" prop="name" w>
          <el-col :span="30">
            <el-input v-model="form.name"/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form', 1)">查找</el-button>
          <el-button @click="resetForm('form')">清空</el-button>
        </el-form-item>
        <el-form-item>
          <el-col :span="30">
            <el-button style="text-align: right" type="primary" icon="el-icon-plus" @click="save">新增</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="mediaInfos"
        max-height="500"
        style="width:100%"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"  class="demo-table-expand">
              <el-form-item label="key: "  class="table_info">
                <span>{{ props.row.key }}</span>
              </el-form-item>
              <el-form-item label="包名: "  class="table_info">
                <span>{{ props.row.packageName }}</span>
              </el-form-item>
              <el-form-item label="回调接口: "  class="table_info">
                <span>{{ props.row.callBackUrl }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethod"  width="100" >
        </el-table-column>
        <el-table-column prop="id" label="ID" width="200" />
        <el-table-column prop="name" label="名称" width="250"/>
        <el-table-column prop="exchangeRate" width="100" label="金币转化倍率"/>
        <el-table-column prop="profitRate" width="100" label="媒体利润（%）"/>
        <el-table-column prop="costRate" width="100" label="客户利润（%）"/>
        <el-table-column prop="standardReward" width="100" label="基本奖励【优先】（厘）"/>
        <el-table-column prop="remark" with= "200" label="描述" />
        <el-table-column
          fixed="right"
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        background
        :page-size="pageSize"
        :pager-count="5"
        layout="total, prev, pager, next"
        :total="mediaInfos.length">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  mounted: function () {
    this.onSubmit('form', this.currentPage)
  },
  activated: function () {
    this.onSubmit('form', this.currentPage)
  },
  data () {
    return {
      form: {
        status: '',
        name: '',
        effectiveTime: ''
      },
      rules: {},
      listLoading: false,
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    ...mapGetters(['mediaInfos'])
  },
  methods: {
    onSubmit (formName, val) {
      const forms = this.form
      forms.page = val
      forms.size = this.pageSize
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('awpQueryMediaInfo', forms)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleCurrentChange (val) {
      this.onSubmit('form', val)
    },
    save () {
      this.$router.push('/deepTask/mediaSave')
    },
    handleClick (row) {
      this.$router.push('/deepTask/mediaSave')
      this.$store.dispatch('awpSendSelectMediaInfo', row)
    },
    handleDelete (row) {
      this.$store.dispatch('awpDelMediaInfo', row)
    },
    indexMethod (index) {
      return index + 1
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table_info {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
