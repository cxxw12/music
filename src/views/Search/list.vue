<template>
  <div class="search-list">
    <!-- <div v-if="searchList.length == 0">暂无数据</div> -->
    <div
      v-for="item in searchList"
      :key="item.keyword"
      class="search-list-item"
      @click="getKeyword(item.keyword)"
    >
      <van-icon name="search" color="#989898" />{{ item.keyword }}
    </div>
  </div>
</template>
<script>
import { getCurrentInstance } from "vue";
export default {
  props: {
    searchList: Array,
  },
  setup() {
    const proxy = getCurrentInstance()
    const getKeyword = async (val) => {
      console.log(val)
      proxy.emit('change', val)
    }
    return {
      getKeyword
    }
  },
};
</script>
<style lang="less" scoped>
.search-list {
  margin: 70px 15px 0 5px;
  overflow: scroll;
  .search-list-item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f4f4f4;
    font-size: 14px;
    .van-icon-search:before {
      font-size: 17px;
      margin-right: 10px;
    }
  }
}
</style>