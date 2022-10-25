<template>
  <div class="container" @click="state.isLyric = !state.isLyric">
    <header-top :singer="state.singer" :songName="state.song"></header-top>
    <div class="header-background">
      <div class="background">
        <van-image
          fit="cover"
          :src="state.picUrl"
          class="cover-img"
          width="100%"
          heigth="100vh"
          position="top"
        />
      </div>
    </div>
    <div class="content">
      <div class="cd" v-if="!state.isLyric">
        <div class="cd-opacity">
          <div
            class="cd-black"
            :style="{ 'animation-play-state': state.animationShow }"
          >
            <van-image round width="200px" height="200px" :src="state.picUrl" />
          </div>
        </div>
      </div>
      <div class="lyric" v-else> 
        <scroll-list class="lyricList" :data="state.lyric" ref="lyricList">
          <div>
            <p class="lrcitem" v-for="item in state.lyric" :key="item.time">{{item.lrcitem}}</p>
          </div>
        </scroll-list>
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
          </div>
          <div class="option-icon">
            <img src="../../assets/img/more2.png" />
          </div>
        </div>
        <div class="progress-time">
          <p class="prev-time">{{ format(state.currentTime) }}</p>
          <div
            class="progress"
            ref="progress"
            id="progress"
            @click="progressClick"
          >
            <div
              class="progress-prev"
              :style="{ width: state.curProgress }"
            ></div>
            <div
              @touchstart.prevent="progressTouchStart"
              @touchmove.prevent="progressTouchMove"
              @touchend.prevent="progressTouchEnd"
              class="progress-circle"
              :style="{ left: state.curProgress }"
            ></div>
          </div>
          <p class="next-time">{{ format(state.duration) }}</p>
        </div>
        <div class="bottom-icon">
          <div class="option-icon">
            <img src="../../assets/img/suiji.png" />
          </div>
          <div class="option-icon">
            <img src="../../assets/img/prev.png" />
          </div>
          <div class="option-icon" @click="playSong" v-if="state.showplay">
            <img
              src="../../assets/img/play.png"
              style="width: 50px; height: 50px"
            />
          </div>
          <div class="option-icon" @click="stopSong" v-else>
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
          :src="state.url"
          id="audio"
          ref="audio"
          @timeupdate="timeupdate"
        ></audio>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, ref, getCurrentInstance } from "vue";
import { getSongUrl, getLyric, getSongDetail } from "../../api/song.js";
import { useStore } from "vuex";
import headerTop from "./components/header.vue";
import scrollList from "./components/scroll.vue"
export default {
  components: {
    headerTop,
    scrollList
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = route.query.id;
    let state = reactive({
      showplay: true,
      url: "",
      lyric: [], //歌词
      picUrl: "", //歌曲封面
      arId: "", //歌手id
      animationShow: "paused", //cd旋转
      curProgress: "0",
      currentTime: 0,
      duration: "",
      clientX: 0,
      isLyric: false,
      singer: '',
      song: ''
    });
    let touch = reactive({
      initiated: true,
      startX: 0,
      prevX: 0,
      endX: 0,
    });
    const { proxy } = getCurrentInstance();
    onMounted(() => {
      getSongUrls();
      getLyrics();
      getSongDetails();
      store.commit("getButtomMusic", state);
    });
    // 获取歌曲url
    const getSongUrls = async () => {
      let res = await getSongUrl(id);
      state.url = res.data.data[0].url;
    };
    // 获取歌曲详情
    const getSongDetails = async () => {
      let res = await getSongDetail(id);
      state.picUrl = res.data.songs[0].al.picUrl;
      state.arId = res.data.songs[0].ar[0].id;
      state.singer = res.data.songs[0].ar[0].name;
      state.song = res.data.songs[0].al.name;
    };
    // 获取歌词
    const getLyrics = async () => {
      let res = await getLyric(id);
      let lycc = res.data.lrc.lyric;
      let lyclist = lycc.split("\n");
      let re = /\[\d{2}:\d{2}\.\d{2,3}\]/; //匹配时间
      for (let i in lyclist) {
        if (lyclist[i]) {
          let date = lyclist[i].match(re); //匹配时间
          date = date[0].slice(1, -1); //去除【】
          let timelist = date.split(":"); //以:分割
          let m = timelist[0]; //分
          let s = timelist[1]; //秒
          let time = parseFloat(m) * 60 + parseFloat(s); //计算时间
        }
      }
      for (let i in lyclist) {
        if (lyclist[i]) {
          let date = lyclist[i].match(re); //匹配时间
          date = date[0].slice(1, -1); //去除【】
          let timelist = date.split(":"); //以:分割
          let m = timelist[0];
          let s = timelist[1];
          let time = parseFloat(m) * 60 + parseFloat(s); //计算时间
          let lrcitem = lyclist[i].replace(re, ""); //获取歌词
          state.lyric.push({time, lrcitem});
        }
      }
      console.log(state.lyric);
    };
    // 播放
    function playSong() {
      state.showplay = false;
      state.animationShow = "running";
      proxy.$refs.audio.play();
    }
    // 暂停
    function stopSong() {
      state.showplay = true;
      state.animationShow = "paused";
      proxy.$refs.audio.pause();
    }
    // 进度条设置
    function timeupdate() {
      state.currentTime = proxy.$refs.audio.currentTime;
      state.duration = proxy.$refs.audio.duration;
      state.curProgress =
        (proxy.$refs.audio.currentTime / proxy.$refs.audio.duration) * 100 +
        "%";
      if (proxy.$refs.audio.currentTime == proxy.$refs.audio.duration) {
        state.showplay = true;
        state.animationShow = "paused";
        proxy.$refs.audio.pause();
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
      touch.endX = event.offsetX ;
      // touch.prevX = 0;
    }
    function progressTouchStart() {
      touch.initiated = true;
      touch.startX = event.touches[0].pageX;
      console.log(touch);
    }
    function progressTouchMove() {
      if (!touch.initiated) {
        return;
      }
      touch.prevX = event.touches[0].pageX - touch.startX + touch.endX;
      if(touch.prevX <= proxy.$refs.progress.clientWidth) {
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
    return {
      state,
      touch,
      playSong,
      stopSong,
      timeupdate,
      format,
      progressTouchStart,
      progressTouchMove,
      progressTouchEnd,
      progressClick,
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
      }
      @keyframes myfirst {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .cd-opacity {
        width: 300px;
        height: 300px;
        background: rgba(255, 255, 255, 0.16);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
    }
    .lyric {
      position: absolute;
      top: 100px;
      text-align: center;
      width: 100%;
      bottom: 200px;
      color: #bdbed0;
      overflow: hidden;
      .lyricList {
        overflow: hidden;
        .lrcitem {
          padding-top: 10px;
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