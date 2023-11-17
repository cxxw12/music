<template>
  <div class="header">
    <div class="left">
      <i class="iconfont icon-60fanhui-1"></i>
      <h4>评论({{total}})</h4>
    </div>
    <i class="iconfont icon-fenxiang"></i>
  </div>
</template>

<script>
export default {
  props: {
    total: Number
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px 0 15px;
  .left {
    display: flex;
    align-items: center;
    i {
      margin-right: 15px;
    }
  }
  i {
    font-size: 20px;
  }
}
</style>