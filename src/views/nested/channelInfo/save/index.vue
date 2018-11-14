<template>
  <div style="padding:30px;">
    <div class="app-container" >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style="margin-left: 20%" >
        <el-form-item label="渠道ID:" prop="id"  align="center">
          <el-col :span="15">
            <el-input v-model="form.id"/>
          </el-col>
        </el-form-item>
        <el-form-item label="渠道名称:" prop="name"  align="center">
          <el-col :span="15">
          <el-input v-model="form.name"/>
          </el-col>
        </el-form-item>
        <el-form-item label="描述:" prop="remark">
          <el-col :span="15">
            <el-input v-model="form.remark"/>
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
        createTime: '',
        lastModifiedTime: ''
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
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['channelInfoSaveForm'])
  },
  watch: {
    channelInfoSaveForm: {
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
          this.$store.dispatch('awpSaveChannelInfo', this.form).then((response) => {
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
      var name = {name: 'channelInfoSaveForm'}
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
