<template>
  <img :src="imgSrc"/>
</template>
<script >
import { onMounted } from "vue";
import { loginStatus, loginRrCheck } from "../../api/login";
import { useRoute, useRouter } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    let imgSrc = route.query.qrImg
    let key = route.query.key
    onMounted(async () => {
      let timer
      timer = setInterval(async () => {
        const statusRes = await loginRrCheck(key)
        if (statusRes.data.code === 800) {
          alert('二维码已过期,请重新获取')
          clearInterval(timer)
        }
        if (statusRes.data.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          alert('授权登录成功')
          let res = await loginStatus(statusRes.data.cookie)
          localStorage.setItem('cookie', statusRes.data.cookie)
          localStorage.setItem('account', JSON.stringify(res.data.data.account))
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