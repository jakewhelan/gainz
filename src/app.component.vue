<script>
  import { AppModule } from './app.module'
  import Cape from './cape/cape.component.vue'
  import ColourPicker from './colour-picker/colour-picker.component.vue'

  export default {
    name: 'app',
    components: {
      Cape,
      ColourPicker
    },
    beforeCreate() {
      this.$store.registerModule(...AppModule)
    },
    mounted() {
      console.log('yay', this)
    }
  }
</script>

<template>
  <div>
    <Cape/>
    <div class="colour-pickers">
      <ColourPicker name="topDetail"/>
      <ColourPicker name="topBackground"/>
      <ColourPicker name="bottomDetail"/>
      <ColourPicker name="bottomBackground"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .colour-pickers {
    margin-left: 350px;
  }
</style>