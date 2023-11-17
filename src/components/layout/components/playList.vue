<template>
  <div class="container">
    <div class="header">
      <h4>
        当前播放<span class="count">({{ songPlayList.length }})</span>
      </h4>
      <div class="play-option">
        <div>
          <i class="iconfont icon-xunhuan"></i
          ><span class="option-text">列表循环</span>
        </div>
        <div class="option-icon">
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-tianjiashoucang"></i>
          <i class="iconfont icon-shanchu1"></i>
        </div>
      </div>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in songPlayList"
        :key="item.id"
        class="song-item"
        @click="playSong(index)"
      >
        <p :class="[{ 'curent-song': index == songIndex }]">
          {{ item.name }}<span class="singer">-{{ item.ar[0].name }}</span>
        </p>
        <van-icon name="cross" @click="deleteSong(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import { useSongStore } from "../../../store/song.js";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const songStore = useSongStore();
    const { songPlayList, songIndex } = storeToRefs(songStore);
    const playSong = (index) => {
      songStore.$patch((state) => {
        state.songIndex = index;
      });
      getSong()
    };
    const getSong = () => {
      songStore.getSongUrls(songStore.songPlayList[songStore.songIndex].id);
      songStore.getSongDetails(songStore.songPlayList[songStore.songIndex].id);
      songStore.id = songStore.songPlayList[songStore.songIndex].id;
      songStore.$patch((state) => {
        state.songDesc.isPlay = true
      })
    }
    const deleteSong = (index) => {
      songStore.$patch((state) => {
        if(index < state.songIndex) {
          state.songIndex--;
        }else if (index == state.songIndex) {
          getSong()
        }
        state.songPlayList.splice(index, 1)
      });
    };
    return {
      songPlayList,
      songIndex,
      playSong,
      deleteSong,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 96%;
  margin-left: 2%;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  bottom: 10px;
  padding: 25px 15px;
  .header {
    position: absolute;
    top: 25px;
    width: 96%;
    padding-right: 15px;
    .count {
      font-size: 12px;
      color: #787878;
    }
    .play-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #797979;
      margin-top: 10px;
      .icon-xunhuan {
        margin-right: 10px;
      }
      .option-text {
        color: #272727;
      }
      i {
        font-size: 22px;
      }
      .option-icon {
        i {
          margin-left: 20px;
        }
      }
    }
  }
  .van-popup {
    overflow: hidden;
  }
  .list {
    margin-top: 60px;
    overflow: auto;
    height: calc(100% - 40px);
    &::-webkit-scrollbar {
      display: none;
    }
    .song-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      .curent-song {
        color: #bf5858 !important;
        .singer {
          color: #bf5858 !important;
        }
      }
      .singer {
        font-size: 12px;
        color: #797979;
      }
      .van-icon-cross:before {
        color: #797979;
      }
    }
  }
}
</style>
