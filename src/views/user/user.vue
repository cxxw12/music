<template>
  <div>1111111111</div>
</template>
<script>
import { getAccount } from "../../api/user"
import {
  reactive,
  onMounted,
  getCurrentInstance,
  toRefs,
  onBeforeUnmount,
} from "vue";
export default {
  setup() {
    const session = JSON.parse(localStorage.getItem('account'))
    onMounted(() => {
      // account()
      // console.log
    })
    const account = async() => {
      let params = {
        uid: session.id,
        cookie: localStorage.getItem('cookie')
      }
      let res = await getAccount(params)
      console.log(res)
    }
    return {
      // account
    }
  }
}
</script>