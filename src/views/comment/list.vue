<template>
  <div class="container">
    <header-top :total="total"></header-top>
    <song-detail></song-detail>
    <div class="divide"></div>
    <div class="list">
      <div class="top">
        <h5>评论区</h5>
        <div class="right">
          <h5>推荐</h5>
          <h5>最热</h5>
          <h5>最新</h5>
        </div>
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item.time" :title="item.content" /> -->
        <div v-for="item in list" :key="item.time" class="list-item">
          <van-image
            round
            width="40px"
            height="40px"
            lazy-load
            :src="item.user.avatarUrl"
          />
          <div class="item-right">
            <div class="item-top">
              <div>
                <p class="nickname">{{item.user.nickname}}</p>
                <p class="timeStr">{{item.timeStr}}</p>
              </div>
              <div>
                <span class="likedCount">{{item.likedCount}}</span>
                <i class="iconfont icon-z-like"></i>
              </div>
            </div>
            <div class="content">
              {{item.content}}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import headerTop from "./components/headers.vue";
import songDetail from "./components/songDetail.vue";
import { getCommentsList } from "../../api/comments";
import { storeToRefs } from "pinia";
import { useSongStore } from "../../store/song";
export default {
  components: {
    headerTop,
    songDetail,
  },
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const total = ref(0)
    const songStore = useSongStore();
    const { id } = storeToRefs(songStore);
    const onLoad = async () => {
      let params = {
        id: id.value,
        limit: 1,
      };
      let res = await getCommentsList(params);
      list.value = res.data.hotComments;
      total.value = res.data.total
    };

    return {
      list,
      onLoad,
      loading,
      finished,
      total
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  // padding: 20px 15px;
  .divide {
    height: 8px;
    width: 100%;
    background: #f7f7f7;
  }
  .list {
    padding: 15px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        display: flex;
        align-items: center;
        h5 {
          margin-left: 20px;
        }
      }
    }
    .list-item {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 10px;
      .item-right{
        width: calc(100% - 48px);
        .item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .nickname {
            font-size: 14px;
          }
          .timeStr {
            font-size: 12px;
            color: #a6a6a6;
            margin-top: 3px;
          }
          .likedCount {
            color: #868686;
            font-size: 13px;
            padding-right: 5px;
          }
        }
        .content {
          padding: 12px 0;
          border-bottom: 1px solid #f4f4f4;
        }
      }
    }
  }
}
</style>