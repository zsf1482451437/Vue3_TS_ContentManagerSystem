<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- 账号密码登陆 -->
      <el-tab-pane name="account">
        <template #label>
          <el-icon><User /></el-icon>
          <span>账号登录</span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <!-- 手机验证码登陆 -->
      <el-tab-pane name="phone">
        <template #label>
          <el-icon><Cellphone /></el-icon>
          <span>手机登录</span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="login"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { User, Cellphone } from '@element-plus/icons'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    User,
    Cellphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 属性
    // 记住密码
    const isKeepPassword = ref(false)
    // 子组件信息
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginAccount>>()
    // 当前登陆方式
    const currentTab = ref('account')
    // 方法
    const login = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 手机验证码登陆的逻辑
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
