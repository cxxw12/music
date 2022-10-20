<template>
  <div class="recommend-song">
    <div class="header">
      <div class="left">
        <van-icon name="replay" />
        <h3>一人一首华语经典</h3>
      </div>
      <div class="right">
        <div class="play-icon"></div>
        播放
      </div>
    </div>
    <div class="song-list">
      <div>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.recommend-song {
  margin: 15px;
  .header {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .van-icon {
        font-size: 25px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      border: 1px solid #ebebeb;
      border-radius: 15px;
      padding: 4px 12px;
      .play-icon {
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-left: 8px solid #323232;
        border-bottom: 6px solid transparent;
        margin-right: 3px;
      }
    }
  }
}
</style>