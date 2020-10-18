<template>
  <!-- vue3 可以使用多个标签了，内部是将多个标签放到一个Fragment中 -->
  <div id="nav">
    <!-- Component 是当前要渲染的组件 -->
    <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/course" icon="orders-o">
        课程
      </van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager-o">
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss"></style>
