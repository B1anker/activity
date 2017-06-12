<template>
  <x-dialog v-model="visible">
    <div class="info">
      <div class="content">
        <p v-for="(item, index) in content">{{ item }}</p>
      </div>
      <button class="button" @click="handleClick">{{ buttonText || '确认' }}</button>
    </div>
  </x-dialog>
</template>

<script>
import { XDialog } from 'vux'

export default {
  name: 'info',

  render (createElement) {
    console.log(createElement)
    return createElement('p', this.$slots.default)
  },

  props: {
    buttonText: String,
    content: Array
  },

  data () {
    return {
      visible: false
    }
  },

  components: {
    XDialog
  },

  watch: {
    visible (newVal) {
      return newVal
    }
  },

  methods: {
    handleClick () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scope>
@import '../style/tool';
div.weui-dialog {
  border-radius: .1rem;
}

.info {
  padding: .1rem;

  .content {
    margin: .25rem 0;
    font-size: .18rem;
    line-height: 1.8em;
    color: #393939;
  }

  .button{
    @include set-width-height(100%, .35rem);
    background-color: $base-color;
    font-size: .18rem;
    color: white;
  }
}
</style>
