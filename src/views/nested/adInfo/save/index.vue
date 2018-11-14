<template>
  <div style="padding:30px;">
    <div class="app-container" >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style="margin-left: 20%" >
        <el-form-item label="应用名称:" prop="appName"  align="center">
          <el-col :span="15">
          <el-input v-model="form.appName"/>
          </el-col>
        </el-form-item>
        <el-form-item label="任务名称:" prop="name">
          <el-col :span="15">
          <el-input v-model="form.name"/>
          </el-col>
        </el-form-item>
        <el-form-item label="广告商ID:" prop="channelId">
          <el-col :span="15">
            <el-input v-model="form.channelId"/>
          </el-col>
        </el-form-item>
        <el-form-item label="启动:" prop="status">
          <el-col :span="15">
          <el-select v-model="form.status" style="width: 100%">
            <el-option label="启动" :value= '1'/>
            <el-option label="不启动(尚未配置策略时选择)" :value= '0'/>
          </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="标题名称:" prop="subtitle">
          <el-col :span="15">
          <el-input v-model="form.subtitle"/>
          </el-col>
        </el-form-item>
        <el-form-item label="图标(url):" prop="icon">
          <el-col :span="15">
          <el-input v-model="form.icon"/>
          </el-col>
        </el-form-item>
        <el-form-item label="包名:" prop="packageName">
          <el-col :span="15">
          <el-input v-model="form.packageName"/>
          </el-col>
        </el-form-item>
        <el-form-item label="包大小(M):" prop="packageSize">
          <el-col :span="15">
          <el-input type="number" v-model.number="form.packageSize"/>
          </el-col>
        </el-form-item>
        <el-form-item label="deepLink:" prop="deepLink">
          <el-col :span="15">
          <el-input v-model="form.deepLink"/>
          </el-col>
        </el-form-item>
        <el-form-item label="下载量:" prop="downloadNumber">
          <el-col :span="15">
          <el-input type="number" v-model.number="form.downloadNumber"/>
          </el-col>
        </el-form-item>
        <el-form-item label="下载后拉活:" prop="downloadable">
          <el-col :span="15">
          <el-select v-model="form.downloadable" placeholder="please select" style="width: 100%">
            <el-option label="支持" :value="1"/>
            <el-option label="不支持" :value="0"/>
          </el-select>
          </el-col>
        </el-form-item>
        <el-form-item v-show="form.downloadable==1" label="下载链接" prop="downloadable">
          <el-col :span="15">
          <el-input v-model="form.downloadLink"/>
          </el-col>
        </el-form-item>
        <el-form-item label="广告奖励(厘)" prop="price">
          <el-col :span="15">
          <el-input type="tel" v-model.number="form.price"/>
          </el-col>
        </el-form-item>
        <el-form-item label="广告生效时间">
          <el-col :span="15">
            <el-form-item prop="startTime">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                placeholder="Pick start dateTime"
                style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="广告失效时间" >
          <el-col :span="15">
            <el-form-item prop="endTime">
              <el-date-picker v-model="form.endTime" type="datetime" placeholder="Pick end dateTime" style="width: 100%;"/>
            </el-form-item>
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
// import {deepCopy} from '@/util/tools'
export default {
  data () {
    return {
      form: {
        appName: '',
        name: '',
        status: '0',
        channelId: '',
        subtitle: '',
        icon: '',
        packageName: '',
        packageSize: '',
        deepLink: '',
        downloadNumber: '',
        downloadable: '0',
        downloadLink: '',
        price: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        appName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '请输入标题名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入图标url', trigger: 'blur' }
        ],
        packageName: [
          { required: true, message: '请输入包名名称', trigger: 'blur' }
        ],
        packageSize: [
          { type: 'number', required: true, message: '请输入包大小', trigger: 'blur' }
        ],
        deepLink: [
          { required: true, message: '请输入deepLink', trigger: 'blur' }
        ],
        downloadNumber: [
          { type: 'number', required: true, message: '请输入下载数量', trigger: 'blur' }
        ],
        price: [
          { type: 'number', required: true, message: '请输入任务奖励', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['saveForm'])
  },
  watch: {
    saveForm: {
      handler (newForm, oldForm) {
        console.log('newForm:' + JSON.stringify(newForm))
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
          console.log('thisForm:' + JSON.stringify(this.form))
          this.$store.dispatch('saveOrUpdateADInfo', this.form).then((response) => {
            this.$message.success('成功保存!')
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
      var name = {name: 'saveForm'}
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
