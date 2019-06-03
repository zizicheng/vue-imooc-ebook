<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div
        class="ebook-loading-item"
        v-for="(item, index) in data"
        :key="index"
      >
        <div
          class="ebook-loading-line-wrapper"
          v-for="(subItem, subIndex) in item"
          :key="subIndex"
        >
          <transition name="switch-width">
            <div
              class="ebook-loading-line"
              v-show="subIndex === currentIndex"
            ></div>
          </transition>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [[{}, {}, {}], [{}, {}, {}]],
      currentIndex: 0,
      indexs: [0, 1, 2]
    };
  },
  methods: {
    switch() {
      let nextIndex = this.indexs.indexOf(this.currentIndex) + 1;
      if (nextIndex > 2) {
        nextIndex = 0;
      }
      this.currentIndex = this.indexs[nextIndex];
    }
  },
  mounted() {
    this.task = setInterval(() => {
      this.switch();
    }, 600);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook-loading {
  position: relative;
  width: px2rem(63);
  height: px2rem(40);
  background: transparent;
  border: px2rem(1.5) solid #d7d7;
  border-radius: px2rem(3);
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: px2rem(7) px2rem(7);
      overflow: hideen;
      box-sizing: border-box;
      .ebook-loading-line-wrapper {
        flex: 1;
        @include left;
        overflow: hidden;
        .ebook-loading-line {
          flex: 1;
          height: px2rem(2);
          background: #d7d7;
        }
        .ebook-loading-mask {
          flex: 0 0 0;
          width: 0;
          height: px2rem(2);
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: px2rem(1.5);
      height: 100%;
      background: #d7d7;
    }
  }
}
</style>
