<template>
  <div>
    <div class="like">
      <p class="title">你可能感兴趣</p>
      <div class="artists">
        <van-image round width="60px" height="60px" :src="artists[0].img1v1Url" />
        <div class="artists-content">
          <span>歌手：{{artists[0].name}}</span><span class="alia">({{artists[0].alia[0]}})</span>
        </div>
      </div>
    </div>
    <song-list></song-list>
  </div>
</template>
<script>
import { inject, ref } from 'vue'
import songList from './songList.vue'
export default {
  components: {
    songList,
  },
  setup() {
    const detail = inject('detail')
    let artists = ref(detail.value.artists)
    return{
      artists,
      detail,
    }
  }
}
</script>
<style lang="less" scoped>
  .like {
    background: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    .title {
      color: #7b7b7b;
      font-size: 12px;
      margin-bottom: 15px;
    }
    .artists {
      display: flex;
      align-items: center;
      .artists-content {
        margin-left: 15px;
        .alia {
          color: #7b7b7b;
        }
      }
    }
  }
</style>