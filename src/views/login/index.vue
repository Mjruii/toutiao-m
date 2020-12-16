<template>
    <div class="login-container">
      <!-- 标题 -->
      <van-nav-bar
       class="app-nav-bar"
        title="注册/登录"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 表单 -->
      <van-form @submit="onLogin" ref="login-form" @failed="onFailed" :show-error="false" :show-error-message="false" validate-first>
        <van-field
          v-model="user.mobile"
          icon-prefix="iconfont"
          left-icon="shouji"
          name="mobile"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          name="code"
          icon-prefix="iconfont"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          :rules="formRules.code"
        >
          <template #button>
            <van-count-down v-if="isCountDown" :time="1000*60" format="ss s" @finish="isCountDown=false"></van-count-down>
            <van-button class="send-btn" v-else @click.prevent="onSendSms" size="small" round   :loading="isSendSmsloading">发送验证码</van-button>
          </template>
        </van-field>
        <!-- 按钮 -->
        <div class="login-btn-wrap">
          <van-button type="primary" block class="login-btn">登录</van-button>
        </div>
      </van-form>
    </div>
</template>
<script>
import { login, sendSms } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        code: '246810',
        mobile: '17090086870'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDown: false,
      isSendSmsloading: false
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        Toast.success('登陆成功')
        this.$store.commit('setUser', data.data)
      } catch (error) {
        Toast.fail('登陆失败')
        console.log('fail', error)
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 请求验证码
        this.isSendSmsloading = true
        await sendSms(this.user.mobile)
        this.isCountDown = true
      } catch (error) {
        console.dir(error)
        let message = ''
        if (error && error.response && error.response.status === '429') {
          message = '请稍后再试'
        } else if (error && error.name === 'mobile') {
          message = error.message
        } else {
          message = '未知错误'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsloading = false
    }
  }
}
</script>
<style lang="less">
.login-container{
    .send-btn{
      width: 76px;
      height: 23px;
      background-color: #ededed;
      .van-button--default{
        padding: 0 !important;
      }
      .van-button_text{
        font-size: 10px;
        color: #666666;

      }
  }
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border:none;
      .van-button_text{
        font-size: 15px;
      }
    }
  }
}
</style>
