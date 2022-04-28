<template>
  <div class="card_wrapper" :class="isGhostStyle?'':'ghost'">
    <!-- 搜索logo -->
    <div class="search_logo_container">
      <img class="search_logo" @click="changeSearchLogo" v-if="isBaidu" src="~@/assets/images/baidu.png" alt="百度">
      <img class="search_logo" @click="changeSearchLogo" v-else src="~@/assets/images/google.png" alt="谷歌">
    </div>

    <!-- 搜索输入框 -->
    <div class="search_wrapper">
      <a-input-search
          ref="search_input"
          class="search"
          v-model="searchValue"
          placeholder="请输入搜索内容"
          enter-button="搜索"
          size="large"
          @search="onSearch"
          @focus="setMaskOpen"
          @blur="maskOpen = false"
      />
      <div class="search_tips" :class="maskOpen?'mask_tips':''">tips: 按 Ctrl 键自动对焦搜索框，再次按 Ctrl 键解除搜索框对焦，按 Enter 键自动搜索
      </div>
    </div>

    <!-- 快捷卡 -->
    <div class="card_fast_wrapper">
      <div class="card_fast">
        <a-card>
          <a :href="resource.link" target="_blank" v-for="(resource, index) in linkDataList" :key="index">
            <a-card-grid style="width:25%;text-align:center">

              <a-avatar
                  shape="square"
                  :src="resource.icon"
              />
              <div class="resource_name">{{ resource.name }}</div>
            </a-card-grid>
          </a>
        </a-card>
      </div>
    </div>


    <div class="fix_group">
      <a-switch checked-children="白底" @change="changeSwitch" un-checked-children="透明" :checked="isGhostStyle"/>
      <a-tooltip placement="top">
        <template slot="title">
          <span>切换背景图</span>
        </template>
        <a-button @click="development" type="primary" shape="round" icon="picture" size="small"
                  style="margin-left:12px;"/>
      </a-tooltip>
<!--      <a-tooltip placement="top">-->
<!--        <template slot="title">-->
<!--          <span>设为主页</span>-->
<!--        </template>-->
<!--        <a-button @click="development" type="primary" shape="round" icon="home" size="small" style="margin-left:12px;"/>-->
<!--      </a-tooltip>-->

    </div>


    <iframe v-if="true" class="bg_img" width="100%" height="100%" :src=" baseUrl + iframeUslBase"
            frameborder="0"></iframe>
    <img v-else class="bg_img" src="../../../static/comic/cover_7.jpg" alt="bg">

    <div :class="maskOpen?'mask':'hidden'"></div>

  </div>
</template>

<script>
import defaultHome from "@/constant/defaultHome";

import {COVER_HOST} from "../../tool/imgBase";
import {delLocalStorage, getLocalStorage, setLocalStorage} from "../../utils/stroage";
export default {
  name: "Home",
  data() {
    return {
      isBaidu: true,
      searchValue: "", //搜索框内容
      maskOpen: false, // mask
      baseUrl: COVER_HOST,
      linkDataList: defaultHome.keyContentMap.myLike,
      isGhostStyle: false, // 是否选中白色背景背景
      iframeUslBase: "/cover-01/index.html"
    }
  },
  created() {
    this.handlerFocusSearch()
    if(getLocalStorage("ghost_style")) {
      this.isGhostStyle = getLocalStorage("ghost_style") === 1
    }

  },
  mounted() {
    this.$nextTick(() => {
      setLocalStorage("ghost_style", this.isGhostStyle?1:0)
    })
  },
  methods: {
    // 切换透明度
    changeSwitch(e) {
      this.isGhostStyle = e;
      // 设置当前机器配置
      setLocalStorage("ghost_style", e?1:0)
    },
    // 按ctrl focus聚焦搜索框
    handlerFocusSearch() {
      let that = this;
      document.onkeydown = function (event) {
        let e = event || window.event;
        if (e.key === "Control") {
          that.setMaskOpen()
        }

      }
    },
    // 设置聚焦背景
    setMaskOpen() {
      if (this.maskOpen) {
        this.$refs.search_input.blur();
        this.maskOpen = false
      } else {
        this.$refs.search_input.focus();
        this.maskOpen = true
      }

    },
    // 切换logo
    changeSearchLogo() {
      this.isBaidu = !this.isBaidu;
    },

    development() {
      alert("别急，还在开发中")
    },

    // 搜索
    onSearch() {
      if (this.searchValue.length < 1) {
        this.$message.error('请输入搜索内容');
        return;
      }
      // if (searchAll) {
      //   navigate(`/search?q=${value}`);
      //   return;
      // }
      if (this.isBaidu) {
        window.open(`https://www.baidu.com/s?wd=${this.searchValue}`);
      } else {
        window.open(`https://www.google.com/search?q=${this.searchValue}`);
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import './Home.scss';
@import './ghost.css';

</style>
