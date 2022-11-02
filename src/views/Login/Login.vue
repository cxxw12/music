<template>
  <div class="content">
    <div class="head">
      <img src="@/assets/img/logo.png" alt="" />
    </div>
    <div>
      <img :src="qrImg"/>
    </div>
    <div class="bottom">
      <div class="top-bottom">
        <router-link to="http://localhost:3000/login/phone">
          <button>手机号登陆</button>
        </router-link>
        <div class="next-bottom">
          <button @click="handleLogin">游客登陆</button>
        </div>
         <div class="next-bottom">
          <button @click="login">二维码登陆</button>
        </div>
      </div>
      <div class="bottom-icon">
        <div class="icon-radio"><i class="iconfont icon-weixin"></i></div>
        <div class="icon-radio"><i class="iconfont icon-QQ"></i></div>
        <div class="icon-radio"><i class="iconfont icon-xinlangweibo"></i></div>
        <div class="icon-radio">
          <i class="iconfont icon-airudiantubiaohuizhi-zhuanqu_yiwutong"></i>
        </div>
      </div>
      <div class="degree">
        <input type="radio" disabled checked="checked" />
        <p>
          登陆及已同意《用户协议》《隐私政策》《儿童隐私政策》《天翼账号服务协议》
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { anonimousLogin, loginRrKey, loginRrCreate } from "../../api/login";
import { useRouter } from "vue-router"
import { ref, onMounted } from "vue"
export default {
  setup() {
    const router = useRouter();
    let qrImg = ref("")
    //游客登陆
    async function handleLogin() {
      const res = await anonimousLogin()
      localStorage.setItem('cookie', res.data.cookie)
      localStorage.setItem('userId', res.data.userId)
      router.push({
        path: "/home",
        name: "Home"
      })
    }
    async function getLoginStatus(cookie = '') {
      const res = await loginRrKey({cookie: cookie})
    }
    // 二维码登陆
    async function login() {
      const cookie = localStorage.getItem('cookie')
      getLoginStatus(cookie)
      const res = await loginRrKey()
      const key = res.data.data.unikey
      const res2 = await loginRrCreate(key)
      qrImg.value = res2.data.data.qrimg
      router.push({
        path: "/qr",
        name: 'Qr',
        query: {
          qrImg: qrImg.value
        }
      })
    }
    onMounted(() =>{
      const cookie = localStorage.getItem('cookie')
      if(cookie) {
        router.push({
        path: "/home",
        name: "Home"
        })
      }
    })
    return {
      handleLogin,
      login,
      qrImg
    }
  }
};
</script>

<style scoped lang="less">
.content {
  height: 100vh;
  background: @theme-color;
  position: relative;
  .head {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 7rem;
      border: 10px solid #cc2b25;
      border-radius: 50%;
    }
  }
  .bottom {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .top-bottom {
      button {
        width: 20rem;
        height: 3rem;
        font-size: 1.3rem;
        color: @theme-color;
        border: none;
        border-radius: 5rem;
        font-weight: 800;
      }
    }
    .next-bottom {
      margin-top: 15px;
    }
    .bottom-icon {
      display: flex;
      justify-content: space-around;
      margin-top: 2rem;
      .icon-radio {
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid #fff;
        border-radius: 5rem;
        text-align: center;
        line-height: 2.5rem;
        i {
          color: #fff;
          font-size: 1.6rem;
        }
      }
    }
    .degree {
      margin-top: 1rem;
      input {
        width: 0.6rem;
        height: 0.6rem;
      }
      p {
        font-size: 0.5rem;
        display: inline;
        color: #434040;
      }
    }
  }
}
</style>