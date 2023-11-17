<template>
  <div class="container">
    <div class="header-background">
      <div class="background">
        <van-image
          fit="cover"
          :src="state.picUrl"
          class="cover-img"
          width="100%"
          heigth="260px"
          position="top"
        />
      </div>
    </div>
    <div class="header">
      <van-image
        fit="cover"
        :src="state.picUrl"
        width="100px"
        heigth="100px"
        position="top"
        radius="10px"
      />
      <div class="desc">
        {{ state.desc }}
      </div>
    </div>
    <div class="center">
      <div
        class="center-item"
        style="border-right: 1px solid #ececec; height: 20px; margin-top: 10px"
      >
        <img src="../../assets/img/subscribed.png" class="center-icon" />
        <p>{{ state.subscribedCount }}</p>
      </div>
      <div
        class="center-item"
        style="border-right: 1px solid #ececec; height: 20px; margin-top: 10px"
      >
        <img src="../../assets/img/comment.png" class="center-icon" />
        <!-- <i class="iconfont icon-faxian"></i> -->
        <p>{{ state.commentCount }}</p>
      </div>
      <div class="center-item">
        <img src="../../assets/img/share.png" class="center-icon" />
        <p>{{ state.shareCount }}</p>
      </div>
    </div>
    <div style="margin-top: 25px;">
      <div>
        <div class="list-header">
          <img src="../../assets/svg/player.svg" class="player-icon" @click="playAll" />
          <p>全部播放(共{{ state.musicList.length }}首)</p>
        </div>
      </div>
      <div
        v-for="(item, index) in state.musicList"
        :key="item.id"
        class="song-item"
        @click="playMusic(item.id)"
      >
        <div class="sort">{{ index + 1 }}</div>
        <div>
          <p class="song-name">{{ item.name }}</p>
          <p class="singer">{{ item.ar[0].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { reactive, onMounted } from "vue";
import { getRecommendDetailList } from "../../api/song.js";
import { useSongStore } from "../../store/song.js"
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const songStore = useSongStore()
    let id = route.query.id;
    const playMusic = (id) => {
      songStore.getSongUrls(id)
      songStore.getSongDetails(id)
      songStore.songDesc.isPlay = true
      songStore.id = id
    }
    let state = reactive({
      musicList: [],
      picUrl: "",
      desc: "",
      commentCount: 0,
      shareCount: 0,
      subscribedCount: 0,
    });
    let setBgColor = { background: `url(${state.picUrl}) no repeat` };
    onMounted(async () => {
      console.log(router.options.routes)
      let res = await getRecommendDetailList(id);
      state.musicList = reactive(res.data.playlist.tracks);
      state.desc = reactive(res.data.playlist.description);
      state.picUrl = reactive(res.data.playlist.coverImgUrl);
      state.commentCount = reactive(res.data.playlist.commentCount);
      state.shareCount = reactive(res.data.playlist.shareCount);
      state.subscribedCount = reactive(res.data.playlist.subscribedCount);
    });
    const playAll = () => {
      songStore.$patch((states) => {
        states.songPlayList = state.musicList;
        states.songIndex = 0
      });
      songStore.getSongUrls(state.musicList[0].id)
      songStore.getSongDetails(state.musicList[0].id)
      songStore.songDesc.isPlay = true
      songStore.id = state.musicList[0].id
    }
    return {
      state,
      setBgColor,
      playMusic,
      playAll
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  .header-background {
    position: relative;
    overflow: hidden;
    height: 240px;
    border-radius: 0 0 60% 60% / 0 0 10% 10%;
    .background {
      position: absolute;
      width: 100%;
      height: 240px;
      z-index: 1;
      filter: blur(25px);
      .cover-img {
        width: 100%;
        height: 240px;
        position: relative;
        transform: scale(1.5);
        z-index: 2;
      }
    }
  }
  .header {
    position: absolute;
    padding-left: 15px;
    top: 70px;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .desc {
      padding-top: 5px;
      width: calc(100% - 120px);
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #f6f5f4;
      opacity: 0.9;
    }
  }
  .center {
    display: flex;
    width: 64%;
    border-radius: 20px;
    position: absolute;
    top: 220px;
    height: 40px;
    z-index: 3;
    margin-left: 18%;
    font-size: 10px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgba(205, 203, 203, 0.5);
    .center-item {
      flex: 33.3%;
      display: flex;
      align-items: center;
      justify-content: center;
      .center-icon {
        width: 22px;
        margin-right: 10px;
      }
    }
  }
  .song-item {
    display: flex;
    align-items: center;
    border-top: 1px solid #e5e7e9;
    padding: 5px 10px 5px 15px;
    .singer {
      color: #787a7c;
      font-size: 12px;
      margin-top: 2px;
    }
    .song-name {
      color: #444;
      font-size: 13px;
    }
    .sort {
      color: #787a7c;
      font-size: 12px;
      margin-right: 15px;
    }
  }
  .list-header {
    display: flex;
    height: 40px;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .player-icon {
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }
}
</style>