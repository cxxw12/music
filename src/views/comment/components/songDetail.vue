<template>
  <div class="song">
    <div class="cd-black">
      <van-image round width="28px" height="28px" :src="songDesc.picUrl" />
    </div>
    <p class="song-desc">
      {{ songDesc.song }} - <span>{{ songDesc.singer }}</span>
    </p>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useSongStore } from "../../../store/song";
export default {
  setup() {
    const songStore = useSongStore();
    const { songDesc } = storeToRefs(songStore);
    return {
      songDesc,
    };
  },
};
</script>

<style lang="less" scoped>
.song {
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 15px;
  padding: 0 15px;
  .cd-black {
    display: flex;
    background: #000;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
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
</style>