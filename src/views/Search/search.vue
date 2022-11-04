<template>
  <div class="container" :style="{'background':background}">
    <div class="header" :style="{'background':background}">
      <i class="iconfont icon-zuojiantou icon" @click="goBack"></i>
      <div class="search">
        <van-field
          clearable
          v-model="state.search"
          placeholder=""
          @update:model-value = "getSearchList"
          @focus = "onFocus"
          :style="{'background':background}"
        />
      </div>
    </div>
    <search-list
      v-if="state.search && !state.detailFlag"
      :searchList="state.searchList"
      @change="handleKeyword"
    ></search-list>
    <search-detail v-else-if="state.detailFlag"></search-detail>
    <div v-else-if="!state.search && !state.detailFlag">
      <div class="history">
        <h4>历史</h4>
        <div class="history-right">
          <div class="content">
            <p>少年游</p>
            <p>伊人</p>
            <p>月光</p>
          </div>
          <i class="iconfont icon-shanchu"></i>
        </div>
      </div>
      <div class="hot">
        <h4>热搜榜</h4>
        <div class="hot-content">
          <div
            class="hot-item"
            v-for="(item, index) in state.hotList"
            :key="item.first"
          >
            <p :class="[{ prevNum: index < 3 }]">{{ index + 1 }}</p>
            <p :class="[{ prevName: index < 3 }]">{{ item.first }}</p>
          </div>
        </div>
      </div>
      <div class="prefecture">
        <h4>音乐专区</h4>
        <div class="prefecture-content">
          <div
            class="prefecture-item"
            :class="item.class"
            v-for="item in state.prefectureList"
            :key="item.class"
          >
            <div class="prefecture-top">
              <p>{{ item.title }}</p>
              <i class="iconfont" :class="item.icon"></i>
            </div>
            <div class="prefecture-bottom">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- <bottom-music></bottom-music> -->
</template>
<script>
import { getHotList, getSearchSuggest } from "../../api/search.js";
import { reactive, onMounted, ref, provide, readonly } from "vue";
import { debounce } from "../../utils/common.js";
import searchList from "./list.vue";
import searchDetail from "./detail.vue"
import { useRouter } from "vue-router";
export default {
  components: {
    searchList,
    searchDetail,
  },
  setup() {
    const router = useRouter()
    let state = reactive({
      hotList: [],
      prefectureList: [
        {
          title: "音乐人专区",
          icon: "icon-yinle",
          desc: "挖掘独立音乐宝藏",
          class: "red",
        },
        {
          title: "歌手分类",
          icon: "icon-ktv",
          desc: "挖掘独立音乐宝藏",
          class: "gray",
        },
        {
          title: "乐谱典藏馆",
          icon: "icon-yinfu",
          desc: "挖掘独立音乐宝藏",
          class: "blue",
        },
        {
          title: "经典专区",
          icon: "icon-shipin",
          desc: "挖掘独立音乐宝藏",
          class: "yellow",
        },
        {
          title: "Beat交易专区",
          icon: "icon-yinle",
          desc: "挖掘独立音乐宝藏",
          class: "orange",
        },
        {
          title: "影视原声专区",
          icon: "icon-shipin",
          desc: "挖掘独立音乐宝藏",
          class: "brown",
        },
      ],
      search: "",
      searchList: [],
      detailFlag: false,
    });
    let allResult = ref({})
    let background = ref('#fff')
    onMounted(async () => {
      let res = await getHotList();
      state.hotList = res.data.result.hots;
    });
    const getSearchList = debounce(async () => {
      if(state.search) {
        let params = {
          keywords: state.search,
          type: 'mobile'
        }
        let res = await getSearchSuggest(params);
        if (res.data.code == 200) {
          state.searchList = res.data.result.allMatch;
        }
      }
    }, 300)
    const handleKeyword = async (val) => {
      state.search = val;
      let params = {
        keywords: state.search
      }
      let res = await getSearchSuggest(params)
      allResult.value = res.data.result
      state.detailFlag = true
      background.value = '#f6f6f6'
    }
    provide('detail', readonly(allResult))
    const onFocus = () => {
      state.detailFlag = false,
      getSearchList()
      background.value = '#f6f6f6'
    }
    const goBack = () => {
      router.back()
    }
    return {
      state,
      allResult,
      background,
      getSearchList,
      handleKeyword,
      onFocus,
      goBack
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 0 10px;
  height: 100%;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    position: fixed;
    top: 10px;
    width: 96%;
    .icon {
      font-size: 30px;
    }
    .search {
      width: 100%;
      & /deep/.van-field__value {
        border-bottom: 1px solid #555;
        background: rgba(95, 94, 94, 0);
      }
    }
  }
  .history {
    display: flex;
    align-items: center;
    margin: 70px 15px 0 5px;
    .history-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 20px;
      width: calc(100% - 60px);
      .content {
        display: flex;
        justify-content: space-between;
        p {
          padding: 5px 10px;
          background: #eee;
          border-radius: 15px;
          margin-right: 10px;
        }
      }
      .iconfont {
        font-size: 22px;
      }
    }
  }
  .hot {
    margin: 20px 5px;
    .hot-content {
      display: flex;
      flex-wrap: wrap;
      box-shadow: 0 0 4px 0 rgb(195 195 195 / 50%);
      border-radius: 10px;
      padding-bottom: 15px;
      margin-top: 10px;
      .hot-item {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        margin-top: 15px;
        .prevNum {
          color: #d46061;
        }
        .prevName {
          font-weight: 500;
        }
        p {
          margin-left: 10px;
        }
      }
    }
  }
  .prefecture-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .prefecture-item {
      position: relative;
      height: 70px;
      flex: 0 0 48%;
      border-radius: 10px;
      margin-top: 15px;
      .prefecture-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 8px 8px 12px;
        position: absolute;
        top: 10px;
        width: 100%;
        color: #fff;
        .iconfont {
          font-size: 24px;
          color: #fff;
        }
      }
      .prefecture-bottom {
        position: absolute;
        width: 100%;
        height: 25px;
        background: rgba(95, 94, 94, 0.1);
        padding-left: 12px;
        display: flex;
        align-items: center;
        color: #e8e7e7;
        bottom: 0;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        font-size: 10px;
      }
      &.red {
        background-image: linear-gradient(-45deg, #fa9090 0%, #fd292f 100%);
      }
      &.gray {
        background-image: linear-gradient(-45deg, #dccec5 0%, #8b7d72 100%);
      }
      &.blue {
        background-image: linear-gradient(-45deg, #96cce8 0%, #54aec2 100%);
      }
      &.yellow {
        background-image: linear-gradient(-45deg, #f3deae 0%, #bf9d46 100%);
      }
      &.orange {
        background-image: linear-gradient(-45deg, #fdc663 0%, #fb8d2c 100%);
      }
      &.brown {
        background-image: linear-gradient(-45deg, #f3ba87 0%, #cf501e 100%);
      }
    }
  }
}
</style>