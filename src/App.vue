<template>
  <div id="app">
    <span class="text">ABCDEFG</span>
    <router-view />
  </div>
</template>

<script>
export default {};
const debounce = func => {
  let timer;
  return event => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        func();
      },
      100,
      event
    );
  };
};

const alterRootFontSize = (function() {
  const html = document.querySelector("html");
  return function() {
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + "px";
    console.log("alter font-size");
  };
})();

window.addEventListener("DOMContentLoaded", () => {
  alterRootFontSize();
});

window.addEventListener("resize", debounce(alterRootFontSize));
</script>

<style lang="scss">
.text {
  font-family: "Days One";
  font-size: 1rem;
  color: orange;
}
</style>
