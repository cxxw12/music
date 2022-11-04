import { defineStore } from 'pinia'
import { Toast } from 'vant';
import 'vant/es/toast/style';
import { getSongUrl, getSongDetail } from "../api/song";
export const useSongStore = defineStore('song', {
  state: () => {
    return { 
      songUrl: '',
      id: '',
      songDesc: {
        picUrl: '',
        arId: '',
        singer: '',
        song: '',
        isPlay: false,
        currentTime: 0,
        duration: 0
      },
    }
  },
  actions: {
    async getSongUrls(id) {
      try {
        let res = await getSongUrl(id);
        this.songUrl = res.data.data[0].url;
      } catch(error) {
        Toast.fail(error.message || '发生未知错误')
        return error
      }
    },
    async getSongDetails(id) {
      try {
        let res = await getSongDetail(id);
        this.songDesc.picUrl = res.data.songs[0].al.picUrl;
        this.songDesc.arId = res.data.songs[0].ar[0].id;
        this.songDesc.singer = res.data.songs[0].ar[0].name;
        this.songDesc.song = res.data.songs[0].name;
        this.songDesc.duration = res.data.songs[0].dt;
        // this.songDesc.currentTime = 0;
        console.log(res.data.songs[0].dt)
      } catch(error) {
        Toast.fail(error.message || '发生未知错误')
        return error
      }
    }
  },
})