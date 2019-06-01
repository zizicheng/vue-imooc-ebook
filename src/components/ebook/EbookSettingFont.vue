<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div
          class="preview"
          :style="{ fontSize: fontSizeList[0].fontSize + 'px' }"
        >
          A
        </div>
        <div
          class="select-wrapper"
          v-for="(item, index) of fontSizeList"
          :key="index"
          :style="
            index === 0 || index === fontSizeList.length - 1 ? flexRadio : ''
          "
          @click="setFontSize(item.fontSize)"
        >
          <div class="line" :style="index === 0 ? noBorder : ''"></div>
          <div class="point-wrapper">
            <div class="point" v-show="defaultFontSize === item.fontSize">
              <div class="small-point"></div>
            </div>
          </div>
          <div
            class="line"
            :style="index === fontSizeList.length - 1 ? noBorder : ''"
          ></div>
        </div>
        <div
          class="preview"
          :style="{
            fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'
          }"
        >
          A
        </div>
      </div>
      <div class="setting-font-family" @click="showFontFamilyPopup">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text">{{ defaultFontFamily }}</span>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FONT_SIZE_LIST } from "../../utils/book";
import { saveFontSize } from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";
export default {
  mixins: [ebookMixin],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST,
      noBorder: {
        borderTop: "none",
        flex: "0 0 0"
      },
      flexRadio: {
        flex: "0.5"
      }
    };
  },
  methods: {
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize);
      saveFontSize(this.fileName, fontSize);
      this.currentBook.rendition.themes.fontSize(fontSize + "px");
    },
    showFontFamilyPopup() {
      this.setFontFamilyVisible(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 101;
  bottom: px2rem(48);
  left: 0;
  width: 100%;
  height: px2rem(90);
  background-color: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    display: flex;
    flex: 2;
    height: 100%;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .select-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      .line {
        flex: 1;
        height: 0;
        border-top: px2rem(1) solid #ccc;
      }
      .point-wrapper {
        flex: 0 0 0;
        position: relative;
        width: 0;
        height: px2rem(7);
        border-left: px2rem(1) solid #ccc;
        .point {
          position: absolute;
          top: px2rem(-7);
          left: px2rem(-10);
          width: px2rem(20);
          height: px2rem(20);
          margin-left: -px2rem(10);
          border-radius: 50%;
          background-color: #fff;
          border: px2rem(1) solid #ccc;
          box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
          @include center;
          .small-point {
            width: px2rem(5);
            height: px2rem(5);
            border-radius: 50%;
            background-color: #000;
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
    }
    .setting-font-family-icon-wrapper {
      @include center;
    }
  }
}
</style>
