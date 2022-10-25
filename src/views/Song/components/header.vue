<template>
  <div class="header">
    <van-icon name="arrow-down" />
    <div>
      <div>{{songName}}</div>
      <div class="singer">{{singer}}</div>
    </div>
    <div>
      <img src="../../../assets/img/share2.png" style="width: 25px"/>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    songName: String,
    singer: String
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 80px;
  width: 100%;
  color: #e6e2e2;
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .singer{
    color: #bdbed0;
  }
  .van-icon {
    font-size: 24px;
  }
}
</style>