<template>
  <div style="padding:30px;">
    <div class="app-container" >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style="margin-left: 20%" >
        <el-form-item label="策略状态:" prop="status"  align="center">
          <el-col :span="15">
            <el-select v-model="form.status" style="width: 100%">
              <el-option label="启动" :value= '1'/>
              <el-option label="不启动(尚未配置策略时选择)" :value= '0'/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="策略类型:" prop="type">
          <el-col :span="15">
            <el-select v-model="form.type" placeholder="please select"  style="width: 100%">
              <el-option label="拉活广告" :value="1"/>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="所属广告ID:" prop="adId">
          <el-col :span="15">
            <el-input v-model="form.adId"/>
          </el-col>
        </el-form-item>
        <el-form-item label="间隔时间(天):" prop="interval">
          <el-col :span="15">
          <el-input v-model.number="form.interval"/>
          </el-col>
        </el-form-item>
        <el-form-item label="每日时间区间(时):" >
          <el-col :span="15">
            <span>{{this.form.timeInDayByHourForTab}}</span>
            <span><el-button type="primary" @click="updateTimePeriod">修改</el-button></span>
          </el-col>
        </el-form-item>
        <el-form-item label="黑名单:" prop="blacklist">
          <el-checkbox :indeterminate="blackIsIndeterminate" v-model="blackCheckAll" @change="blackHandleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="blacklist" @change="blackHandleCheckedMediasChange">
            <el-checkbox v-for="media in awuMedias" :label="media.id" :key="media.id">{{media.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="白名单:" prop="whitelist">
          <el-checkbox :indeterminate="whiteIsIndeterminate" v-model="whiteCheckAll" @change="whiteHandleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="whitelist" @change="whiteHandleCheckedMediasChange">
            <el-checkbox v-for="media in awuMedias" :label="media.id" :key="media.id">{{media.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="策略生效时间">
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
        <el-form-item label="策略失效时间" >
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
export default {
  data () {
    return {
      form: {
        status: '1',
        type: '1',
        adId: '',
        interval: 0,
        timeInDayByHourForTab: [],
        startTime: '',
        endTime: ''
      },
      rules: {
        adId: [
          { required: true, message: '请输入控制广告ID', trigger: 'blur' }
        ],
        interval: [
          { type: 'number', required: true, message: '请输入间隔天数', trigger: 'blur' }
        ],
        startTime: [
          { type: 'date', required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }
        ]
      },
      blacklist: [],
      whitelist: [],
      whiteCheckAll: false,
      blackCheckAll: false,
      whiteIsIndeterminate: false,
      blackIsIndeterminate: false
    }
  },
  mounted () {
    this.$store.dispatch('queryMedias')
    this.initalizeLists()
  },
  activated () {
    this.initalizeLists()
  },
  computed: {
    ...mapGetters(['strategySaveForm', 'awuMedias']),
    tempArr () {
      let tempArr = []
      this.awuMedias.forEach((media) => {
        tempArr.push(media.id)
      })
      return tempArr
    }
    // timeInDayByHourForTab: {
    //   get () {
    //     return this.form.timeInDayByHourForTab
    //   },
    //   set (val) {
    //     this.timeInDayByHourForTab = val
    //   }
    // }
    // 这里为了使用element的全选功能(与计算属性冲突),而抛弃了非常优秀的vue自带的计算属性!!
    // 使用mounted 和 actived 方法替代黑白名单的初始化.
    // blacklist: {
    //   get () {
    //     return this.form.blacklist === '(空)' ? [] : this.form.blacklist
    //   },
    //   set (val) {
    //     this.blacklist = val
    //   }
    // },
    // whitelist: {
    //   get () {
    //     return this.form.whitelist === '(空)' ? [] : this.form.whitelist
    //   },
    //   set (val) {
    //     this.whitelist = val
    //   }
    // }
  },
  watch: {
    strategySaveForm: {
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
      const forms = this.form
      let timeInDayByHour = []
      this.form.timeInDayByHourForTab.forEach((time) => {
        var arr = time.split('-')
        var obj = {'start': arr[0], 'end': arr[1]}
        timeInDayByHour.push(obj)
      })
      console.log(JSON.stringify(timeInDayByHour))
      let temp = {'interval': forms.interval, 'whiteList': this.whitelist, 'blackNameList': this.blacklist, 'timeInDayByHour': timeInDayByHour}
      forms.strategy = JSON.stringify(temp)
      console.log('strategy:' + forms.strategy)
      console.log('forms2:' + JSON.stringify(forms))
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('saveOrUpdateStrategyInfo', forms).then((response) => {
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
    updateTimePeriod () {
      this.$prompt('请输入正确格式的时间范围', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        /* eslint-disable */
        inputPattern: /^([1-9][0-9]?\-[1-9][0-9]?(\,)*)*$/,
        inputErrorMessage: '时间区间格式不正确'
      }).then(({value}) => { // value 是个String
        this.form.timeInDayByHourForTab = value.split(',')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    resetForm (formName) {
      var name = {name: 'strategySaveForm'}
      this.$store.dispatch('deleteSendForm', name)
      this.resetCheckBox()
      this.$refs[formName].resetFields()
    },
    blackHandleCheckAllChange (val) {
      this.blacklist = val ? this.tempArr : []
      this.blackIsIndeterminate = false
    },
    whiteHandleCheckAllChange (val) {
      this.whitelist = val ? this.tempArr : []
      this.whiteIsIndeterminate = false
    },
    blackHandleCheckedMediasChange (value) {
      let checkedCount = value.length
      this.blackCheckAll = checkedCount === this.awuMedias.length
      this.blackIsIndeterminate = checkedCount > 0 && checkedCount < this.awuMedias.length
    },
    whiteHandleCheckedMediasChange (value) {
      let checkedCount = value.length
      this.whiteCheckAll = checkedCount === this.awuMedias.length
      this.whiteIsIndeterminate = checkedCount > 0 && checkedCount < this.awuMedias.length
    },
    initalizeLists: function () {
      this.whitelist = this.form.whitelist === '(空)' ? [] : this.form.whitelist
      this.blacklist = this.form.blacklist === '(空)' ? [] : this.form.blacklist
    },
    resetCheckBox () {
      this.whitelist = []
      this.blacklist = []
      this.whiteCheckAll = false
      this.whiteIsIndeterminate = false
      this.blackCheckAll = false
      this.blackIsIndeterminate = false
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
