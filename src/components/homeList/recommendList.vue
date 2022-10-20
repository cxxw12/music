<template>
  <div class="recommendList">
    <div class="header">
      <h3>推荐歌单</h3>
      <div class="more">更多<van-icon name="arrow" @click="getMore"/></div>
    </div>
    <div class="song-list">
      <ul>
        <li class="item" v-for="item in state.musicList" :key="item.id" @click="getDetail(item.id, item.picUrl)">
          <div>
            <div class="count">
              <van-icon name="audio" />
              {{handleCount(item.playCount)}}
            </div>
            <img v-lazy="item.picUrl" class="music-img"/>
            <p class="desc">{{ item.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPerson } from "../../api/index";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    let state = reactive({ musicList: [] });
    onMounted(async () => {
      let res = await getPerson(8);
      state.musicList = reactive(res.data.result);
    });
    function getMore() {
      console.log('更多')
    }
    function getDetail(id, picUrl) {
      router.push({
        path: '/recommendList',
        query: {
          id: id,
          picUrl: picUrl
        }
      })
    }
    function handleCount(value) {
      return Math.ceil(value / 10000) + "万";
    }
    return {
      state,
      getMore,
      getDetail,
      handleCount
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #f1f1ef;
  margin-top: 10px;
  align-items: center;
  .more {
    border: 1px solid #f1f1ef;
    border-radius: 20px;
    padding: 5px 5px 5px 15px;
  }
}
.song-list {
  padding: 0 10px;
  ul {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
  .item {
    flex: 0 0 30%;
    padding: 0 1%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
    .desc {
      text-overflow:ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .count {
      color: #fff;
      background: rgba(144, 147, 153, 0.7);
      border-radius: 10px;
      font-size: 10px;
      text-align: right;
      width: 68px;
      padding: 2px 5px;
      position: absolute;
      right: 8px;
      top: 8px;
    }
  }
}
</style>