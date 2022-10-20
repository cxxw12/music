<template>
  <!-- 声明在setup可以使用异步通信 -->
  <Suspense>
    <!-- 懒加载页面 -->
    <!-- fallback请求中显示 -->
    <template #fallback>
      <h1>Loading...</h1>
    </template>
    <keep-alive>
      <div>
        <top-nav></top-nav>
        <swiper-com></swiper-com>
        <recommend-list></recommend-list>
        <recommend-song></recommend-song>
        <!-- <icon-list></icon-list>
        <music-list></music-list>
        <vidoe-list></vidoe-list>
        <radio-list></radio-list>

        <list-botton></list-botton> -->
        <van-tabbar v-model="active" active-color="#fa3d43">
          <van-tabbar-item icon="home-o">发现</van-tabbar-item>
          <van-tabbar-item icon="search" dot>播客</van-tabbar-item>
          <van-tabbar-item icon="friends-o" badge="5">我的</van-tabbar-item>
          <van-tabbar-item icon="setting-o" badge="20">关注</van-tabbar-item>
        </van-tabbar>
      </div>
    </keep-alive>
  </Suspense>
</template>

<script>
import { ref } from "vue";
import topNav from "../components/homeList/topNav.vue";
import swiperCom from "../components/homeList/swiperCom.vue";
import recommendList from "../components/homeList/recommendList.vue"
import recommendSong from "../components/homeList/recommendSong.vue"
export default {
  name: "Home",
  components: {
    topNav,
    swiperCom,
    recommendList,
    recommendSong
  },
  setup() {
    const active = ref(0);
    // change(index) {
    //   active.value = index
    // }
    return {
      active,
    };
  },
};
</script>

<style lang="less">
h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-image: linear-gradient(to right, #f4251d, #ffb9b9);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: 1s infinite alternate moiveAnimation;
}
@keyframes moiveAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.1;
  }
}
</style>