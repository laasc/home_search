<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default  {
  mounted() {
    this.$nextTick(() => {
      document.onkeydown = function () {
        if (window.event && window.event.keyCode == 123) {
          alert("F12被禁用");
          event.keyCode = 0;
          event.returnValue = false;
          return false
        }
      }

    })
  }
}
</script>
