<template>
  <div style="padding:30px;">
    <div class="app-container" >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style="margin-left: 20%" >
        <el-form-item label="媒体ID:" prop="id"  align="center">
          <el-col :span="15">
            <el-input v-model="form.id"/>
          </el-col>
        </el-form-item>
        <el-form-item label="媒体名称:" prop="name"  align="center">
          <el-col :span="15">
            <el-input v-model="form.name"/>
          </el-col>
        </el-form-item>
        <el-form-item label="描述:" prop="remark">
          <el-col :span="15">
            <el-input v-model="form.remark"/>
          </el-col>
        </el-form-item>
        <el-form-item label="KEY:" prop="key">
          <el-col :span="15">
            <el-input v-model="form.key"/>
          </el-col>
        </el-form-item>
        <el-form-item label="金币转化倍率:" prop="exchangeRate">
          <el-col :span="15">
            <el-input type="number" v-model.number="form.exchangeRate"/>
          </el-col>
        </el-form-item>
        <el-form-item label="包名:" prop="packageName">
          <el-col :span="15">
            <el-input v-model="form.packageName"/>
          </el-col>
        </el-form-item>
        <el-form-item label="媒体利润（%）:" prop="profitRate">
          <el-col :span="15">
            <el-input type="number" v-model.number="form.profitRate"/>
          </el-col>
        </el-form-item>
        <el-form-item label="客户利润（%）:" prop="costRate">
          <el-col :span="15">
            <el-input type="number" v-model.number="form.costRate"/>
          </el-col>
        </el-form-item>
        <el-form-item label="基本奖励(厘）:" prop="standardReward">
          <el-col :span="15">
            <el-input type="number" v-model.number="form.standardReward"/>
          </el-col>
          <span style="color: red;font-size: 20px">【优先于利润率计算】</span>
        </el-form-item>
        <el-form-item label="callBackUrl:" prop="callBackUrl">
          <el-col :span="15">
            <el-input v-model="form.callBackUrl"/>
          </el-col>
        </el-form-item>
        <el-form-item style="margin-left: 20%">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        remark: '',
        key: '',
        exchangeRate: '0',
        packageName: '',
        profitRate: '0',
        costRate: '0',
        standardReward: '0',
        callBackUrl: ''
      },
      rules: {
        id: [
          { required: true, trigger: 'blur' }
        ],
        name: [
          { required: true, trigger: 'blur' }
        ],
        remark: [
          { required: false, trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入唯一key', trigger: 'blur' }
        ],
        exchangeRate: [
          { type: 'number', required: true, message: '分转化为渠道的汇率 100 即1分 = 100渠道端代币', trigger: 'blur' }
        ],
        packageName: [
          { required: false, message: '媒体包名', trigger: 'blur' }
        ],
        profitRate: [
          { type: 'number', required: true, message: '给媒体的利润分成 例: 80 即80%', trigger: 'blur' }
        ],
        costRate: [
          { type: 'number', required: false, message: '给用户的利润分成 例: 80 即80%', trigger: 'blur' }
        ],
        standardReward: [
          { type: 'number', required: true, message: '广告基本奖励优先配置 单位厘', trigger: 'blur' }
        ],
        callBackUrl: [
          { required: true, message: '后台回调接口', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['mediaInfoSaveForm'])
  },
  watch: {
    mediaInfoSaveForm: {
      handler (newForm, oldForm) {
        console.log('newForm:' + newForm + JSON.stringify(newForm))
        this.form = newForm
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('awpSaveMediaInfo', this.form).then((response) => {
            this.$message.success('成功保存!')
            console.log('saveSuccess: ' + response)
            this.resetForm(formName)
          }).catch((error) => {
            this.$message.error('保存失败!请联系管理员' + error.message)
          })
        } else {
          this.$message.error('error 请检查输入合法性!')
          return false
        }
      })
    },
    resetForm (formName) {
      var name = {name: 'mediaInfoSaveForm'}
      this.$store.dispatch('deleteSendForm', name)
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
