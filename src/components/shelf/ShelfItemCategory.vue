<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div
        class="shelf-item-category-item"
        v-for="(item, index) in data.itemList"
        :key="index"
      >
        <img :src="item.cover" alt="cover" class="shelf-item-category-img" />
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShelfItemCategory",
  props: {
    data: Object
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-item-category {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shelf-item-category-list {
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    padding: 0 px2rme(2.5);
    box-sizing: border-box;
    .shelf-item-category-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      height: 33.33%;
      padding: px2rem(2.5);
      box-sizing: border-box;
      .shelf-item-category-img {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
  .shelf-item-category-bg {
    width: 100%;
    height: 100%;
    font-size: px2rem(30);
    background: #fff;
    color: #ccc;
    @include center;
  }
}
</style>
