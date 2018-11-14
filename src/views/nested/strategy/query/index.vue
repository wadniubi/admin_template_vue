<template>
  <div style="padding:30px;">
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <el-form-item label="策略状态" prop="status">
          <el-col :span="30">
            <el-select v-model="form.status" placeholder="please select">
              <el-option label="启用" value="1"/>
              <el-option label="未启用" value="0"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="策略类型" prop="type">
          <el-col :span="30">
            <el-select v-model="form.type" placeholder="please select">
              <el-option label="拉活广告" value="1"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="所属广告ID" prop="adId" >
          <el-col :span="30">
            <el-input v-model="form.adId"/>
          </el-col>
        </el-form-item>
        <el-form-item label="生效时间" prop="effectiveTime">
          <el-col :span="30">
            <el-date-picker
              v-model="form.effectiveTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form', 1)">查找</el-button>
          <el-button @click="resetForm('form')">清空</el-button>
        </el-form-item>
        <el-form-item>
          <el-col :span="30">
            <el-button style="text-align: right" type="primary" icon="el-icon-plus" @click="addNewStrategy">新增</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="strategyInfos"
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
              <el-form-item label="间隔天数:"  class="table_info">
                <span>{{ props.row.interval }}</span>
              </el-form-item>
              <el-form-item label="(渠道ID)黑名单:"  class="table_info">
                <span>{{ props.row.blacklist}}</span>
              </el-form-item>
              <el-form-item label="(渠道ID)白名单:"  class="table_info">
                <span>{{ props.row.whitelist }}</span>
              </el-form-item>
              <el-form-item label="生效时间段(小时):"  class="table_info">
                <span>{{ props.row.timeInDayByHourForTab}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethod"  width="100" >
        </el-table-column>
        <el-table-column prop="id" label="策略ID" width="180" />
        <el-table-column prop="status" label="启用(1-y,0-n)" width="200"/>
        <el-table-column prop="adId" label="对应广告ID" width="200"/>
        <el-table-column prop="type" width="100" label="策略类型"/>
        <el-table-column prop="startTimeForTab" width="250" label="生效日期"></el-table-column>
        <el-table-column prop="endTimeForTab" width="250" label="截止日期"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
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
          :total="strategyInfos.length">
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
  computed: {
    ...mapGetters(['strategyInfos'])
  },
  data () {
    return {
      form: {
        status: '',
        type: '',
        effectiveTime: '',
        adId: ''
      },
      rules: {},
      listLoading: false,
      currentPage: 1,
      pageSize: 5
    }
  },
  methods: {
    onSubmit (formName, val) {
      const forms = this.form
      forms.page = val
      forms.size = this.pageSize
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('queryStrategyInfo', forms)
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
    addNewStrategy () {
      this.$router.push('/deepTask/strategySave')
    },
    handleClick (row) {
      this.$router.push('/deepTask/strategySave')
      this.$store.dispatch('sendSelectStrategyInfo', row)
    },
    handleDelete (row) {
      this.$store.dispatch('deleteSelectStrategy', row)
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
