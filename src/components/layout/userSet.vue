<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <van-image
          round
          width="30px"
          height="30px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <p>Goodnight淡年华...</p>
      </div>
    </div>
    <div class="cell-group">
      <van-cell-group inset>
        <van-cell title="我的消息" icon="envelop-o" is-link />
        <van-cell title="云贝中心" value="签到" icon="sign" is-link />
        <van-cell title="创作者中心" icon="brush-o" is-link />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="音乐服务" class="title" />
        <van-cell title="云村有票" icon="free-postage" is-link />
        <van-cell title="商城" icon="cart-o" is-link />
        <van-cell title="多多西西口袋" icon="logistics" is-link />
        <van-cell title="Beat交易平台" icon="chart-trending-o" is-link />
        <van-cell title="游戏专区" icon="tv-o" is-link />
        <van-cell title="口袋彩铃" icon="bullhorn-o" is-link />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="其他" class="title" />
        <van-cell title="设置" icon="setting-o" is-link />
        <van-cell title="夜间模式" icon="exchange" is-link>
          <template #value>
            <van-switch
              v-model="checked"
              active-color="#ee0a24"
              inactive-color="#dcdee0"
              size="18px"
            />
          </template>
        </van-cell>
        <van-cell title="定时关闭" icon="clock-o" is-link />
        <van-cell title="个性装扮" icon="flower-o" is-link />
        <van-cell title="在线听歌免流量" icon="location-o" is-link />
        <van-cell title="音乐黑名单" icon="failure" is-link />
        <van-cell title="青少年模式" icon="user-circle-o" is-link />
        <van-cell title="音乐闹钟" icon="clock-o" is-link />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="我的订单" icon="orders-o" is-link />
        <van-cell title="优惠券" icon="coupon-o" is-link />
        <van-cell title="分享网易云音乐" icon="qr" is-link />
        <van-cell title="个人信息收集与使用清单" icon="contact" is-link />
        <van-cell title="个人信息与隐私保护" icon="user-o" is-link />
        <van-cell title="关于" icon="link-o" is-link />
      </van-cell-group>
    </div>
    <div class="logout" @click="handleLogout">退出登录/关闭</div>
  </div>
</template>
<script>
import { ref } from "vue";
import { logout } from "../../api/login";
export default {
  setup() {
    const checked = ref(false);
    const handleLogout = async () => {
      await logout();
    };
    return { checked, handleLogout };
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 20px 15px;
  .header {
    .left {
      display: flex;
      align-items: center;
      p {
        margin-left: 15px;
      }
    }
  }
  .cell-group {
    // margin-top: 15px;
    :deep(van-cell-group--inset) {
      margin: 15px 0 0 0;
      .van-icon {
        display: flex;
        align-items: center;
      }
      .title {
        color: #9e9e9e;
        font-size: 12px;
      }
    }
  }
  .logout {
    background: #fff;
    margin-top: 15px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #d04348;
    border-radius: 10px;
  }
}
</style>