<template>
  <!-- 声明在setup可以使用异步通信 -->
  <!-- <Suspense>
    <template #fallback>
      <h1>Loading...</h1>
    </template> -->
    <div>
      <top-nav></top-nav>
      <swiper-com></swiper-com>
      <recommend-list></recommend-list>
      <recommend-song></recommend-song>
      <router-view></router-view>
    </div>
  <!-- </Suspense> -->
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import topNav from "../components/homeList/topNav.vue";
import swiperCom from "../components/homeList/swiperCom.vue";
import recommendList from "../components/homeList/recommendList.vue";
import recommendSong from "../components/homeList/recommendSong.vue";
export default {
  name: "Home",
  components: {
    topNav,
    swiperCom,
    recommendList,
    recommendSong,
  },
  setup() {
    const active = ref(0);
    const router = useRouter()
    const gotoUser = () => {
      console.log(router.options.routes)
      router.push({
        // name: "homeUser",
        path: '/user'
      });
    }
    // change(index) {
    //   active.value = index
    // }
    return {
      active,
      gotoUser
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
.van-tabbar {
  position: relative;
  padding-bottom: 0;
}
</style>