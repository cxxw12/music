<template>
  <div class="song-list">
    <div class="title">
      <h4>单曲</h4>
      <div class="right">
        <div class="play-icon"></div>
        播放
      </div>
    </div>
    <div v-for="item in songs" :key="item.id" class="song-item" @click="playSong(item.id)">
      <div>
        <p>{{ item.name }}</p>
        <p class="song-desc">{{ item.artists[0].name }}  -  {{ item.album.name }}</p>
      </div>
      <div>
        <i class="iconfont icon-bofang"></i>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, ref } from "vue";
import { getSongUrl } from "../../../api/song";
export default {
  setup() {
    const detail = inject("detail");
    let songs = ref(detail.value.songs);
    const playSong = (id) => {
      console.log(id)
    }
    return {
      songs,
      detail,
      playSong
    };
  },
};
</script>
<style lang="less" scoped>
.song-list {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  .title {
    padding: 1px 5px 8px 5px;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
      border: 1px solid #ebebeb;
      border-radius: 15px;
      padding: 4px 12px;
      font-size: 12px;
      .play-icon {
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 6px solid #323232;
        border-bottom: 5px solid transparent;
        margin-right: 5px;
      }
    }
  }
  .song-item {
    border-bottom: 1px solid #f4f4f4;
    padding: 8px 5px 8px 5px;
    color: #222222;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont {
      color: #afafaf;
      font-size: 20px;
      margin-left: 10px;
    }
    .song-desc {
      font-size: 12px;
      color: #777777;
      height: 24px;
      line-height: 24px;
      margin-top: 3px;
    }
  }
}
</style>
