<script>
  import { ColourPickerModule } from './colour-picker.module'
  import store from '@app/app.store'

  export default {
    name: 'colour-picker',
    props: {
      name: String
    },
    data: () => ({
      hueInput: {
        value: 0
      }
    }),
    computed: {
      state () {
        return store.state.colourPicker[this.namespace]
      },
      hue () {
        return this.state.hue
      }
    },
    methods: {
      hueInputOnChange() {
        const { setHue } = this.dispatchers
        const { value: hue } = this.hueInput

        setHue({ hue })
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
    <label>{{ name }}</label>
    <input
      v-model.number="hueInput.value"
      @change="hueInputOnChange"
      type="range" 
      min=0
      max=360
    />
    <div>hue: {{ hue }}</div>
    <br/><br/>
  </div>
</template>

<style scoped lang="scss">
  label {
    display: block;
  }
</style>