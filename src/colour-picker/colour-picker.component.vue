<script>
  import { ColourPickerModule } from './colour-picker.module'
  import store from '@app/app.store'

  export default {
    name: 'colour-picker',
    props: {
      name: String
    },
    computed: {
      state () {
        return store.state.colourPicker[this.namespace]
      },
      colour () {
        return this.state.colour
      }
    },
    beforeCreate() {
      const { dispatchers, namespace } = new ColourPickerModule({
        name: this.$options.propsData.name
      })
      this.namespace = namespace
      this.dispatchers = dispatchers
    }
  }
</script>

<template>
  <div>
    <input/>
    {{ name }} |!| {{ namespace }} |!| {{ colour }}
  </div>
</template>

<style scoped lang="scss">

</style>