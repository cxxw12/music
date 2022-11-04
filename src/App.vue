<template>
  <div class="content-all">
    <router-view />
    <buttom-music v-if="songUrl"></buttom-music>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useSongStore } from "./store/song"
import { storeToRefs } from "pinia"
import buttomMusic from './components/layout/bottomMusic.vue'
export default {
  components: {
    buttomMusic,
  },
  setup() {
    const store = useStore();
    const songStore = useSongStore()
    const { songUrl } = storeToRefs(songStore)
    store.dispatch("getMusicList");
    return {
      songUrl
    }
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

