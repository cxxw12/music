<template>
  <div class="search-detail">
    <van-tabs v-model:active="active">
      <van-tab title="综合">
        <compre-detail></compre-detail>
      </van-tab>
      <van-tab title="单曲">单曲</van-tab>
      <van-tab title="歌单">专辑</van-tab>
      <van-tab title="歌手">歌手</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { ref } from 'vue'
import compreDetail from './components/comprehensive.vue'
export default {
  components: {
    compreDetail
  },
  setup() {
  let active = ref(0)
    return {
      active,
    }
  }
};
</script>
<style lang="less" scoped>
.search-detail {
  margin: 70px 15px 0 5px;
  /deep/.van-tabs__nav {
    background: #f6f6f6 !important;
  }
  /deep/.van-tabs__content {
    margin-top: 15px !important;
  }
}
</style>