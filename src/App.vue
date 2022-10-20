<template>
  <div class="content-all">
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    store.dispatch("getMusicList");
    /* ;
    store.dispatch("getMusicList");
    console.log(store.state.bottomMusic); */
  },
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
.content-all {
  height: 100%;
}
</style> 

