<template>
  <div style="padding:30px;">
    <div class="app-container">
      <el-form ref="form" :model="form" label-width="100px" :inline="true">
        <!--<el-form-item label="应用名称" prop="id">-->
        <!--<el-input v-model="form.id"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="广告商ID" prop="channelId">-->
        <!--<el-input v-model="form.channelId"/>-->
        <!--</el-form-item>-->
        <el-form-item label="广告状态" prop="status">
          <el-col :span="30">
            <el-select v-model="form.status" placeholder="please select">
              <el-option label="启用" value="1"/>
              <el-option label="未启用" value="0"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="任务名称" prop="name" w>
          <el-col :span="30">
            <el-input v-model="form.name"/>
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
            <el-button style="text-align: right" type="primary" icon="el-icon-plus" @click="addNewAd">新增</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="adInfo"
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
              <el-form-item label="启用(1-y,0-n):"  class="table_info">
                <span>{{ props.row.status}}</span>
              </el-form-item>
              <el-form-item label="广告商ID:"  class="table_info">
                <span>{{ props.row.channelId }}</span>
              </el-form-item>
              <el-form-item label="图标url:    "  class="table_info">
                <span>{{ props.row.icon }}</span>
              </el-form-item>
              <el-form-item label="deepLink: "  class="table_info">
                <span>{{ props.row.deepLink }}</span>
              </el-form-item>
              <el-form-item label="包名: " class="table_info">
                <span>{{ props.row.packageName }}</span>
              </el-form-item>
              <el-form-item label="包大小:" class="table_info">
                <span>{{ props.row.packageSize }}</span>
              </el-form-item>
              <el-form-item label="标题:" class="table_info">
                <span>{{ props.row.subtitle }}</span>
              </el-form-item>
              <el-form-item label="预下载(1-y,0-n):" class="table_info">
                <span>{{ props.row.downloadable }}</span>
              </el-form-item>
              <el-form-item :v-show="props.row.downloadable == 1" label="下载链接:        " class="table_info">
                <span>{{ props.row.downloadLink }}</span>
              </el-form-item>
              <el-form-item label="下载数量:" class="table_info">
                <span>{{ props.row.downloadNumber }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethod"  width="100" >
        </el-table-column>
        <el-table-column prop="id" label="应用ID" width="180" />
        <el-table-column prop="appName" label="应用名称" width="200"/>
        <el-table-column prop="name" label="广告名称" width="200"/>
        <el-table-column prop="price" width="100" label="收益(厘)"/>
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
          :total="adInfo.length">
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
    ...mapGetters(['adInfo'])
  },
  methods: {
    onSubmit (formName, val) {
      const forms = this.form
      forms.page = val
      forms.size = this.pageSize
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('queryAdInfo', forms)
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
    addNewAd () {
      this.$router.push('/deepTask/adSave')
    },
    handleClick (row) {
      this.$router.push('/deepTask/adSave')
      this.$store.dispatch('sendSelectAdInfo', row)
    },
    handleDelete (row) {
      this.$store.dispatch('deleteSelectAdInfo', row)
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
