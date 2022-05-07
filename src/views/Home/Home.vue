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
      <div class="search_tips" :class="maskOpen?'mask_tips':''">tips: 按 Ctrl + ~ 键自动对焦搜索框，再次按 Ctrl + ~ 键解除搜索框对焦，按 Enter
        键自动搜索
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
            <a-tooltip placement="top">
              <template slot="title">
                <span>博客主页</span>
              </template>
              <a-button @click="goBlog" type="primary" shape="round" icon="home" size="small" style="margin-left:12px;"/>
            </a-tooltip>

    </div>


    <iframe v-if="iframeUrlBase.type === 'iframe'" class="bg_img" width="100%" height="100%" :src="iframeUrlBase.src"
            frameborder="0"></iframe>
    <img v-else class="bg_img" :src="imageUrlBase.preview" alt="bg">

    <div :class="maskOpen?'mask':'hidden'"></div>

    <a-drawer
        title="背景图"
        placement="right"
        class="drawer_wrap"
        :closable="false"
        :width="720"
        :visible="visible"
        @close="onClose"
    >
      <a-tabs :activeKey="darwsTabsActive" @change="callback">
        <a-tab-pane :tab="item.name" :key="index" v-for="(item, index) in tabDataList">
          <div class="tab_pane_box">
            <div class="draw_img_box" @click="changeBgImg(items, item)" v-for="(items, key) in item.list" :key="key">
              <a-card-grid style="width:100%;height: 100%;padding: 0;">
                <div class="draw_bg_img">
                  <img :src="items.preview" :alt="items.name">
                </div>
                <div class="draw_bg_name">{{ items.name }}</div>
              </a-card-grid>
            </div>

          </div>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>


  </div>
</template>

<script>
import defaultHome from "@/constant/defaultHome";

import {COVER_HOST} from "../../tool/imgBase";
import {getLocalStorage, setLocalStorage} from "../../utils/stroage";
import dataList, {DEFAULT_COVER} from "@/constant/defaultTabPane";


export default {
  name: "Home",
  data() {
    return {
      isBaidu: true,
      darwsTabsActive: 0,
      searchValue: "", //搜索框内容
      maskOpen: false, // mask
      baseUrl: COVER_HOST,
      isUserIframe: true, //是否使用iframe
      linkDataList: defaultHome.keyContentMap.myLike,
      isGhostStyle: false, // 是否选中白色背景背景
      iframeUrlBase: DEFAULT_COVER,
      imageUrlBase: "/comic/cover_7.jpg",
      visible: false,
      tabDataList: dataList
    }
  },
  created() {
    this.handlerFocusSearch()
    if (getLocalStorage("ghost_style")) {
      this.isGhostStyle = getLocalStorage("ghost_style") === "currentWhite";
    }
    if(getLocalStorage("currentImage")) {
      this.iframeUrlBase = getLocalStorage("currentImage")
    }

  },
  mounted() {
    this.$nextTick(() => {
      setLocalStorage("ghost_style", this.isGhostStyle ? "currentWhite" : "currentGhost")
    })
  },
  methods: {
    // 跳转博客
    goBlog() {
      window.open(`https://myfanfou.top`);
    },
    // 点选背景图片
    changeBgImg(items, item) {
      console.log(items)
      this.iframeUrlBase = {...items}
      setLocalStorage("currentImage", items)
      this.$forceUpdate();
    },
    // 切换抽屉tab栏
    callback(key) {
      this.darwsTabsActive = key;
    },
    // 关闭抽屉
    onClose() {
      this.visible = false;
    },
    // 切换透明度
    changeSwitch(e) {
      this.isGhostStyle = e;
      // 设置当前机器配置
      setLocalStorage("ghost_style", e ? "currentWhite" : "currentGhost")
    },
    // 按ctrl focus聚焦搜索框
    handlerFocusSearch() {
      let that = this;
      // eslint-disable-next-line no-unused-vars
      let keyUp = false;
      if (keyUp) return;
      document.onkeydown = function (event) {
        let e = event || window.event;
        if ((e.ctrlKey) && (e.keyCode === 192)) {
          keyUp = true;
          setTimeout(() => {
            keyUp = false;
          }, 1000)
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
      this.visible = true;
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

.drawer_wrap {
  .tab_pane_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    .draw_img_box {
      padding: 0 10px;
      width: 25%;
      min-height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;

      .draw_bg_img {
        width: 100%;
        height: 150px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .draw_bg_name {
        text-align: center;
        margin: 5px 0;
      }
    }
  }

}

</style>
