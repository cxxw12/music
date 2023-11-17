<template>
  <div class="header">
    <img src="../../assets/img/more.png" @click="show = true" />
    <div class="search">
      <van-field v-model="value" placeholder="分身情人-魏晨" @focus="gotoSearch"/>
    </div>
    <img src="../../assets/img/mkf.png" />
  </div>
  <van-popup v-model:show="show" position="left" :style="{ height: '100%', width:' 85%',background: '#f6f6f6' }" >
    <template #default>
      <user-set></user-set>
    </template>
  </van-popup>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router" 
import userSet from "../layout/userSet.vue"
export default {
  components: {
    userSet
  },
  setup() {
    const router = useRouter()
    let show = ref(false)
    function gotoSearch() {
      router.push({
        path: '/search'
      })
    }
    return {
      show,
      gotoSearch,
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
.van-popup {
  background: #f6f6f6;
}
</style>