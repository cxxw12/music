<template>
  <div class="bottom-music">
    <div class="left">
      <div class="cd-black">
        <van-image
          round
          width="35px"
          height="35px"
          src="https://p1.music.126.net/ScOv8Ugzv5xgfv_Hmk_C6A==/109951163403156906.jpg"
        />
      </div>
      <p class="song-desc">流星雨又来临 - <span>魏晨</span></p>
    </div>
    <div class="right">
      <van-circle
        v-model:current-rate="currentRate"
        :rate="25"
        :speed="100"
        layer-color="#ebedf0"
        color="#333"
        size="30px"
        stroke-width="60"
      >
        <template #default>
          <i class="iconfont icon-24gf-play"></i>
        </template>
      </van-circle>
      <i class="iconfont icon-24gf-playlistMusic"></i>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let currentRate = ref(0);
    return {
      currentRate,
    };
  },
};
</script>
<style lang="less" scoped>
.bottom-music {
  position: fixed;
  width: 100%;
  height: 70px;
  bottom: 0;
  background: #fff;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    .cd-black {
      display: flex;
      background: #000;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    .song-desc {
      margin-left: 15px;
      font-size: 14px;
      span {
        color: #424242;
        font-size: 12px;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .van-circle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .iconfont {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-24gf-play:before {
      font-size: 12px;
    }
    .icon-24gf-playlistMusic:before {
      font-size: 25px;
      margin-left: 25px;
    }
  }
}
</style>