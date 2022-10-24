<template>
  <div class="player">
    <transition name="normal" >
      <div class="normal-player">
        <div class="background">
          <div class="filter"></div>
          <img :src="state.picUrl" style="width:100%; height: 100%">
        </div>
      </div>
    </transition>
    <div>
      <div class="cd"></div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted, ref } from "vue";
import { getSongUrl, getLyric, getSongDetail } from "../../api/song.js";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    let id = route.query.id;
    let state = reactive({
      url: "",
      lyric: [], //歌词
      picUrl: "", //歌曲封面
      arId: "", //歌手id
    });
    onMounted(() => {
      getSongUrls();
      getLyrics();
      getSongDetails();
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
          state.lyric.push([time, lrcitem]);
        }
      }
      console.log(state.lyric);
    };
    return {
      state,
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
</style>