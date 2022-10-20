import { createApp } from 'vue'

import { ElCarousel, ElProgress, ElInput, ElSkeleton, ElSkeletonItem } from 'element-plus'
import 'element-plus/dist/index.css'

import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

createApp(App).
    use(Vant).
    use(ElCarousel).
    use(ElProgress).
    use(ElInput).
    use(ElSkeleton).
    use(ElSkeletonItem).
    use(VueLazyload).
    use(router).use(store).
    mount('#app')



