<template>
  <div class="container">
    <header-top :singer="songDesc.singer" :songName="songDesc.song"></header-top>
    <div class="header-background">
      <div class="background">
        <van-image
          fit="cover"
          :src="songDesc.picUrl"
          class="cover-img"
          width="100%"
          heigth="100vh"
          position="top"
        />
      </div>
    </div>
    <div class="content">
      <div @click="switchLyric">
        <div class="cd" v-if="!isLyric">
          <div
            class="cd-black"
            :style="{ 'animation-play-state': animationShow }"
          >
            <van-image round width="200px" height="200px" :src="songDesc.picUrl" />
          </div>
        </div>
        <div class="lyric" v-else>
          <scroll-list
            class="lyricList"
            :data="lyric.lines"
            ref="lyricList"
          >
            <div>
              <p
                class="lrcitem"
                ref="lyricLine"
                v-for="(item, index) in lyric.lines"
                :key="item.key"
                :class="{ current: currentLineNum === index }"
              >
                {{ item.txt }}
              </p>
            </div>
          </scroll-list>
        </div>
      </div>
      <div class="footer">
        <div class="bottom-icon">
          <div class="option-icon">
            <img src="../../assets/img/shoucang.png" />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/download.png" />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/song.png" />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/comment2.png" />
            <!-- <p>999+</p> -->
          </div>
          <div class="option-icon">
            <img src="../../assets/img/more2.png" />
          </div>
        </div>
        <div class="progress-time">
          <p class="prev-time">{{ format(currentTime) }}</p>
          <div
            class="progress"
            ref="progress"
            id="progress"
            @click="progressClick"
          >
            <div
              class="progress-prev"
              :style="{ width: curProgress }"
            ></div>
            <div
              @touchstart.stop="progressTouchStart"
              @touchmove.stop="progressTouchMove"
              @touchend.stop="progressTouchEnd"
              class="progress-circle"
              :style="{ left: curProgress }"
            ></div>
          </div>
          <p class="next-time">{{ format(songDesc.duration / 1000) }}</p>
        </div>
        <div class="bottom-icon">
          <div class="option-icon">
            <img src="../../assets/img/suiji.png" />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/prev.png" />
          </div>
          <div
            class="option-icon"
            @click.stop="playSong"
            v-if="!songDesc.isPlay"
          >
            <img
              src="../../assets/img/play.png"
              style="width: 50px; height: 50px"
            />
          </div>
          <div class="option-icon" @click.stop="stopSong" v-else>
            <img
              src="../../assets/img/stop (2).png"
              style="width: 50px; height: 50px"
            />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/next.png" />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/playlist.png" />
          </div>
        </div>
        <audio
          :src="songUrl"
          id="audio"
          ref="audio"
          autoplay
          @timeupdate="timeupdate"
        ></audio>
      </div>
    </div>
  </div>
</template>
<script>
// import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, getCurrentInstance, toRefs, onBeforeUnmount } from "vue";
import { getLyric } from "../../api/song.js";
import { storeToRefs } from "pinia"
import { useSongStore } from "../../store/song"
import headerTop from "./components/header.vue";
import scrollList from "./components/scroll.vue";
import Lyric from "lyric-parser";
export default {
  components: {
    headerTop,
    scrollList,
  },
  setup() {
    const songStore = useSongStore()
    const { songUrl, songDesc } = storeToRefs(songStore)
    let state = reactive({
      showplay: true,
      lyric: {}, //歌词
      picUrl: "", //歌曲封面
      arId: "", //歌手id
      animationShow: "paused", //cd旋转
      curProgress: "0",
      clientX: 0,
      isLyric: false,
      singer: "",
      song: "",
      currentLineNum: 0,
      currentTime: ''
    });
    let touch = reactive({
      initiated: true,
      startX: 0,
      prevX: 0,
      endX: 0,
    });
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      proxy.$nextTick(() => {
        proxy.$refs.audio.currentTime = songStore.songDesc.currentTime
        state.currentTime = songStore.songDesc.currentTime
         state.curProgress =
        (songStore.songDesc.currentTime / songStore.songDesc.duration * 1000) * 100 +
        "%";
        if(songStore.songDesc.isPlay) {
          proxy.$refs.audio.play()
          state.animationShow = "running"
        } else {
          proxy.$refs.audio.pause()
        }
      })
    });
    // 获取歌词
    const getLyrics = async () => {
      let res = await getLyric(songStore.id);
      state.lyric = new Lyric(res.data.lrc.lyric, handleLyric);
      proxy.$refs.lyricList.refresh();
      state.currentLineNum = 0;
      proxy.$refs.lyricList.scrollTo(0, 0, 1000);
      state.animationShow = "running";
    };
    const handleLyric = ({ lineNum, txt }) => {
      state.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = proxy.$refs.lyricLine[lineNum - 5];
        proxy.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        proxy.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    };
    // 播放
    function playSong() {
      songStore.songDesc.isPlay = true;
      state.animationShow = "running";
      if(JSON.stringify(state.lyric) != '{}') {
        state.lyric.play();
      }
      proxy.$refs.audio.play();
      state.currentTime = proxy.$refs.audio.currentTime
      songStore.$patch(states => {
        states.songDesc.currentTime = proxy.$refs.audio.currentTime
      })
    }
    // 暂停
    function stopSong() {
      songStore.songDesc.isPlay = false;
      state.animationShow = "paused";
      proxy.$refs.audio.pause();
      if(state.isLyric) {
        state.lyric.stop();
      }
      state.currentTime = proxy.$refs.audio.currentTime
      songStore.$patch(states => {
        states.songDesc.currentTime = proxy.$refs.audio.currentTime
      })
    }
    // 进度条设置
    function timeupdate() {
      if(proxy.$refs.audio) {
        songStore.$patch(states => {
          states.songDesc.currentTime = proxy.$refs.audio.currentTime
        })
        state.currentTime = proxy.$refs.audio.currentTime
        state.curProgress =
          (proxy.$refs.audio.currentTime / proxy.$refs.audio.duration) * 100 +
          "%";
        if (proxy.$refs.audio.currentTime == proxy.$refs.audio.duration) {
          state.showplay = true;
          state.animationShow = "paused";
          proxy.$refs.audio.pause();
        }
        if (songStore.songDesc.isPlay && state.isLyric && JSON.stringify(state.lyric) != '{}') {
          state.lyric.seek(proxy.$refs.audio.currentTime * 1000);
        }
      }
    }
    // 格式化时间
    function format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = interval % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    }
    function progressClick() {
      state.curProgress =
        (event.offsetX / proxy.$refs.progress.clientWidth) * 100 + "%";
      proxy.$refs.audio.currentTime =
        proxy.$refs.audio.duration *
        (event.offsetX / proxy.$refs.progress.clientWidth);
      touch.endX = event.offsetX;
      state.lyric.seek(proxy.$refs.audio.currentTime * 1000);
    }
    function progressTouchStart() {
      touch.initiated = true;
      touch.startX = event.touches[0].pageX;
    }
    function progressTouchMove() {
      if (!touch.initiated) {
        return;
      }
      touch.prevX = event.touches[0].pageX - touch.startX + touch.endX;
      if (touch.prevX <= proxy.$refs.progress.clientWidth) {
        state.curProgress =
          (touch.prevX / proxy.$refs.progress.clientWidth) * 100 + "%";
        proxy.$refs.audio.currentTime =
          proxy.$refs.audio.duration *
          (touch.prevX / proxy.$refs.progress.clientWidth);
      }
    }
    function progressTouchEnd() {
      touch.initiated = false;
      touch.endX = touch.prevX;
    }
    function switchLyric() {
      if(state.isLyric) {
        state.lyric.stop();
      } else if (!state.isLyric && JSON.stringify(state.lyric) == '{}') {
        getLyrics()
      }
      state.isLyric = !state.isLyric
    }
    onBeforeUnmount(() => {
      songStore.$patch(states => {
        states.songDesc.currentTime = proxy.$refs.audio.currentTime
      })
    })
    return {
      songDesc,
      ...toRefs(state),
      touch,
      songUrl,
      playSong,
      stopSong,
      timeupdate,
      format,
      progressTouchStart,
      progressTouchMove,
      progressTouchEnd,
      progressClick,
      switchLyric
    };
  },
};
</script>
<style lang="less" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    .background {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      filter: blur(50px);
    }
  }
}
.container {
  position: relative;
  .header-background {
    position: relative;
    overflow: hidden;
    height: 100vh;
    .background {
      position: absolute;
      width: 100%;
      height: 100vh;
      z-index: 1;
      filter: blur(25px);
      .cover-img {
        width: 100%;
        height: 100vh;
        position: relative;
        transform: scale(1.5);
        z-index: 2;
      }
    }
  }
  .content {
    position: absolute;
    z-index: 3;
    top: 0;
    width: 100%;
    height: 100%;
    .cd {
      top: 15%;
      left: calc(50% - 150px);
      position: absolute;
      .cd-black {
        width: 280px;
        height: 280px;
        background: #000;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        animation: myfirst 15s infinite linear;
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.16);
      }
      @keyframes myfirst {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    .lyric {
      position: absolute;
      top: 100px;
      text-align: center;
      width: 100%;
      bottom: 200px;
      color: #bdbed0;
      .lyricList {
        height: 500px;
        overflow: hidden;
        .lrcitem {
          padding-top: 10px;
          &.current {
            color: #fff;
          }
        }
      }
    }
    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      .bottom-icon {
        display: flex;
        height: 100px;
        align-items: center;
        .option-icon {
          flex: 0 0 20%;
          text-align: center;
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
      .progress-time {
        display: flex;
        align-items: center;
        width: 94%;
        margin-left: 3%;
        .prev-time {
          color: rgba(255, 255, 255, 0.8);
        }
        .next-time {
          color: rgba(255, 255, 255, 0.6);
        }
        .progress {
          width: 90%;
          margin: 2%;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 5px;
          position: relative;
          .progress-prev {
            background: rgba(255, 255, 255, 0.8);
            position: absolute;
          }
          .progress-circle {
            background: #fff;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            top: -2px;
            position: absolute;
          }
        }
      }
    }
  }
}
</style>