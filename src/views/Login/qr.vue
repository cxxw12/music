<template>
  <img :src="imgSrc"/>
</template>
<script >
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { anonimousLogin, loginRrKey, loginRrCreate, loginRrCheck, loginStatus } from "../../api/login";
import { useRoute, useRouter } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    let imgSrc = route.query.qrImg
    onMounted(async () => {
      let timer
      timer = setInterval(async () => {
        const statusRes = await checkStatus(key)
        if (statusRes.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer)
        }
        if (statusRes.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          alert('授权登录成功')
          await loginStatus(statusRes.cookie)
          localStorage.setItem('cookie', statusRes.cookie)
          router.push({
            path: "/home",
            name: "Home",
          });
        }
      }, 3000)
    })
    return {
      imgSrc
    }
  }
}
</script>