import { encode, decode } from 'js-base64'
import config from '../../utils/config'
import { login } from '@/api/login.js'
import { setToken, removeToken } from '@/utils/auth'
import LoginHeader from './component/header/index.vue'
export default {
  name: 'login',
  components: {
    LoginHeader
  },
  created () {
    removeToken()
  },
  data () {
    const saveLogin = localStorage.getItem('save-login') === 'true'
    let userName = ''
    let password = ''
    const disbaled = true
    if (saveLogin) {
      userName = localStorage.getItem('userName')
      const sPassword = localStorage.getItem('password')
      const reg = /^base64:/g
      password = typeof sPassword === 'string' && reg.test(sPassword) ? decode(sPassword.slice(7)) : ''
    }
    return {
      form: {
        userName,
        password,
        saveLogin,
        disbaled
      },
      showMobileInput: true,
      isSubmit: false,
      redirect: undefined,
      otherQuery: {},
      loading: null
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 提交登录
    async submitLogin () {
      if (this.form.userName && this.form.password) {
        if (this.form.saveLogin) {
          localStorage.setItem('save-login', true)
          localStorage.setItem('userName', this.form.userName)
          localStorage.setItem('password', `base64:${encode(this.form.password)}`)
        } else {
          localStorage.setItem('save-login', false)
        }
        this.commonLogin()
      }
    },
    triggerScroll () {
      window.scroll()
    },
    nextTip () {
      if (this.isSubmit) {
        this.commonLogin()
      } else {
        this.form.disbaled = true
        this.showMobileInput = false
        this.isSubmit = true
      }
    },
    mobileInput () {
      this.form.disbaled = !(this.form.userName.length > 0)
    },
    passwordInput () {
      this.form.disbaled = !(this.form.password.length > 5)
    },
    commonLogin () {
      // loading
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'li-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 请求参
      const data = {
        username: this.form.userName,
        password: this.form.password,
        appCode: config.APPCODE
      }
      // 在这请求登录 回调并跳转首页，使用setTimeout模拟请求
      login(data).then(res => {
        this.loading.close()
        if (res.code === 0) {
          this.$message({
            message: res.msg || 'login',
            center: true,
            type: 'success'
          })
          setToken('X-Kite-Token', res.data.token)
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        } else {
          this.$message({
            message: res.msg || '登录失败',
            center: true,
            type: 'error'
          })
        }
      }).catch(err => {
        this.loading.close()
        this.$message({
          message: err.msg || 'error',
          center: true,
          type: 'error'
        })
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
