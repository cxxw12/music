<template>
  <div class="header">
    <van-icon name="arrow-down" @click="goHistory" />
    <div>
      <div>{{ songName }}</div>
      <div class="singer">{{ singer }}</div>
    </div>
    <div>
      <img src="../../../assets/img/share2.png" style="width: 25px" />
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useSongStore } from "../../../store/song";
import { useRouter } from "vue-router";
export default {
  props: {
    songName: String,
    singer: String,
  },
  setup() {
    const router = useRouter()
    function goHistory() {
      const songStore = useSongStore();
      const { songUrl, songDesc } = storeToRefs(songStore);
      console.log(songDesc)
      // history.go(-1)
      router.back()
    }
    return {
      goHistory,
    };
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 80px;
  width: 100%;
  color: #e6e2e2;
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .singer {
    color: #bdbed0;
  }
  .van-icon {
    font-size: 24px;
  }
}
</style>