<template>
  <div class="content-all">
    <router-view />
    <div class="buttom">
      <buttom-music v-if="songUrl && isBottomMusic"></buttom-music>
      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import { useSongStore } from "./store/song";
import { storeToRefs } from "pinia";
import buttomMusic from "./components/layout/bottomMusic.vue";
import tabBar from "./components/layout/tabbar.vue"
export default {
  components: {
    buttomMusic,
    tabBar
  },
  setup() {
    const songStore = useSongStore();
    const { songUrl, isBottomMusic } = storeToRefs(songStore);
    return {
      songUrl,
      isBottomMusic
    };
  },
};
</script>

<style scoped>
html,
body {
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
.buttom {
  position: fixed !important;
  bottom: 0;
  width: 100%;
  z-index: 4;
}
</style> 

