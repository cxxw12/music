<template>
  <div class="header">
    <img src="../../assets/img/more.png" />
    <div class="search">
      <van-field v-model="value" placeholder="分身情人-魏晨" @focus="gotoSearch"/>
    </div>
    <img src="../../assets/img/mkf.png" />
  </div>
</template>

<script>
import { useRouter } from "vue-router" 
export default {
  setup() {
    const router = useRouter()
    function gotoSearch() {
      router.push({
        path: '/search'
      })
    }
    return {
      gotoSearch
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  background: #f1f1ef;
  align-items: center;
  padding: 15px;
  .search {
    background: #fff;
    border-radius: 20px;
    width: 80%;
    .van-cell {
      border-radius: 20px;
    }
  }
  img {
    height: 24px;
    width: 24px;
  }
}
</style>