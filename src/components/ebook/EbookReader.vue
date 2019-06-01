<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from "../../utils/localStorage";
import Epub from "epubjs";

export default {
  mixins: [ebookMixin],
  methods: {
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.rendition.themes.fontSize(fontSize + "px");
        this.setDefaultFontSize(fontSize);
      }
    },
    initTheme() {
      let defaultTheme = getTheme();
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      this.rendition.themes.select(defaultTheme);
    },
    initRendition() {
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight
        //method 支持微信能使用
        //method: "default"
      });
      const location = getLocation(this.fileName);
      this.display(location, () => {
        this.initFontFamily();
        this.initFontSize();
        this.initTheme();
        this.initGlobalStyle();
        this.refreshLocation();
      });
      this.rendition.hooks.content.register(contents => {
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
        );
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
        );
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
        );
        contents.addStylesheet(
          `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
        );
      });
    },
    initGesture() {
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX;
        const interval = event.timeStamp - this.touchStartTime;
        if (interval < 500 && offsetX > 40) {
          this.prevPage();
        } else if (interval < 500 && offsetX < -40) {
          this.nextPage();
        } else {
          this.toggleTitleAndMenu();
        }
        event.preventDefault();
        event.stopPropagation();
      });
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
        this.setFontFamilyVisible(false);
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
        this.setFontFamilyVisible(false);
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(!this.menuVisible);
    },
    hideTitleAndMenu() {
      this.setMenuVisible(false);
      this.setSettingVisible(-1);
    },
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}`;
      console.log(url);
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      this.book.ready.then(() => {
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
          .then(() => {
            this.setBookAvailable(true);
            this.refreshLocation();
          });
      });
    }
  },
  mounted() {
    const fileName = this.$route.params.fileName.replace(/\|/g, "/");
    this.setFileName(fileName).then(() => {
      this.initEpub();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
