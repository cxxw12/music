<template>
  <van-tabbar route  active-color="#fa3d43" v-if="isTab">
    <van-tabbar-item icon="home-o" to="/home">发现</van-tabbar-item>
    <van-tabbar-item icon="search">播客</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/user">我的</van-tabbar-item>
    <van-tabbar-item icon="setting-o">关注</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { storeToRefs } from "pinia"
import { useSongStore } from "../../store/song"
export default {
  setup() {
    const songStore = useSongStore()
    const { isTab } = storeToRefs(songStore) 
    return {
      isTab
    }
  }
};
</script>
<style lang="less" scoped>
</style>