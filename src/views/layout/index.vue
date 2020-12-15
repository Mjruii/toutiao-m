<template>
    <div>
        <!-- 路由出口 -->
        <router-view></router-view>
        <!-- 底部导航栏 -->
        <van-tabbar v-model="active" route>
            <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item name="search" icon="question-o" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item name="friends" icon="pause-circle-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item name="setting" icon="friends-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
  name: 'loginIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less">
</style>
