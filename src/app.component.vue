<script>
  import Cape from './cape/cape.component.vue'
  import ColourPicker from './colour-picker/colour-picker.component.vue'

  export default {
    name: 'app',
    components: {
      Cape,
      ColourPicker
    }
  }
</script>

<template>
  <div>
    <Cape/>
    <div class="colour-pickers">
      <div class="inputs">
        <ColourPicker name="topDetail"/>
        <ColourPicker name="topBackground"/>
        <ColourPicker name="bottomDetail"/>
        <ColourPicker name="bottomBackground"/>
      </div>
      <div class="chart"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .colour-pickers {
    max-width: 600px;
    margin-left: 350px;
    display: flex;

    .inputs {
      flex: 1;
    }
    
    .chart {
      flex: 2;
      background-image: url('../assets/images/hsl-chart.png');
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>