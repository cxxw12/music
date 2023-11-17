<template>
  <div class="bottom-music" @click.stop="getSongDetail" v-if="songUrl">
    <div class="left">
      <div class="cd-black">
        <van-image round width="35px" height="35px" :src="songDesc.picUrl" />
      </div>
      <p class="song-desc">
        {{ songDesc.song }} - <span>{{ songDesc.singer }}</span>
      </p>
    </div>
    <div class="right">
      <van-circle
        v-model:current-rate="currentRate"
        :rate="0"
        :speed="100"
        layer-color="#ebedf0"
        color="#333"
        size="30px"
        stroke-width="60"
        @click.stop="playMusic"
      >
        <template #default>
          <i class="iconfont icon-24gf-play" v-if="!songDesc.isPlay"></i>
          <van-icon name="pause" v-else />
        </template>
      </van-circle>
      <i
        class="iconfont icon-24gf-playlistMusic"
        @click.stop="playListShow = true"
      ></i>
    </div>
    <audio
      :src="songUrl"
      id="audio"
      ref="audio"
      autoplay
      @timeupdate="timeupdate"
    ></audio>
  </div>
  <van-popup
    v-model:show="playListShow"
    position="bottom"
    :style="{ height: '65%' }"
  >
    <template #default>
      <play-list></play-list>
    </template>
  </van-popup>
</template>
<script>
import { useRouter } from "vue-router";
import { ref, getCurrentInstance } from "vue";
import { storeToRefs } from "pinia";
import { useSongStore } from "../../store/song";
import playList from "./components/playList.vue";
export default {
  components: {
    playList,
  },
  setup() {
    let currentRate = ref(0);
    let playListShow = ref(false);
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const songStore = useSongStore();
    const { songUrl, songDesc } = storeToRefs(songStore); //使用storeToRefs函数将state里的数据解构出来实现响应式
    proxy.$nextTick(() => {
      proxy.$refs.audio.currentTime = songStore.songDesc.currentTime;
      currentRate.value =
        (songStore.songDesc.currentTime / songStore.songDesc.duration) *
        1000 *
        100;
      if (songStore.songDesc.isPlay) {
        proxy.$refs.audio.play();
        timeupdate();
      } else {
        proxy.$refs.audio.pause();
      }
    });
    const timeupdate = () => {
      songStore.$patch((state) => {
        state.songDesc.currentTime = proxy.$refs.audio.currentTime;
      });
      currentRate.value =
        (proxy.$refs.audio.currentTime / proxy.$refs.audio.duration) * 100;
      if (proxy.$refs.audio.currentTime == proxy.$refs.audio.duration) {
        songStore.$patch((state) => {
          state.songIndex++;
        });
        songStore.getSongUrls(songStore.songPlayList[songStore.songIndex].id);
        songStore.getSongDetails(
          songStore.songPlayList[songStore.songIndex].id
        );
        songStore.id = songStore.songPlayList[songStore.songIndex].id;
      }
    };
    const playMusic = () => {
      if (songStore.songDesc.isPlay) {
        songStore.songDesc.isPlay = false;
        proxy.$refs.audio.pause();
      } else {
        songStore.songDesc.isPlay = true;
        proxy.$refs.audio.play();
      }
    };
    const getSongDetail = () => {
      router.push({
        path: "/song/play",
      });
    };
    return {
      currentRate,
      songStore,
      songUrl,
      songDesc,
      playListShow,
      timeupdate,
      playMusic,
      getSongDetail,
    };
  },
};
</script>
<style lang="less" scoped>
.bottom-music {
  // position: fixed;
  width: 100%;
  height: 70px;
  // bottom: 0;
  background: #fff;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
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
  .van-overlay {
    z-index: 100;
    .wrapper {
      height: 100%;
      width: 100%;
    }
  }
}
</style>