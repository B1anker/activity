<template>
  <div class="title-wrap">
    <img class="title" v-if="type === 'title'" src="../assets/title.png" alt="">
    <img class="share-title" v-if="type === 'share-title'" src="../assets/share-title.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'title-wrap',

  props: {
    type: String
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';

.title-wrap {
  width: 3.2rem;
  margin: .2rem auto 0 auto;

  .title {
    @include set-width-height(100%, 1.5rem);
  }

  .share-title {
    @include set-width-height(100%, 1.3rem);
  }
}
</style>
