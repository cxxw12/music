import { createApp } from 'vue'

import { ElCarousel, ElProgress, ElInput, ElSkeleton, ElSkeletonItem } from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './assets/font/iconfont.css'
import './utils/service'
import './assets/css/main.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

createApp(App).
    use(Vant).
    use(ElCarousel).
    use(ElProgress).
    use(ElInput).
    use(ElSkeleton).
    use(ElSkeletonItem).
    use(VueLazyload).
    use(pinia).
    use(router).use(store).
    mount('#app')



