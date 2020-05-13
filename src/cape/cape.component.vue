<script>
  import $store from '@app/app.store'
  
  export default {
    name: 'cape',
    data: () => ({
      imageLayers: null
    }),
    computed: {
      canvasElements() {
        return {
          topDetailElement: this.$refs.topDetail,
          topBackgroundElement: this.$refs.topBg,
          bottomDetailElement: this.$refs.bottomDetail,
          bottomBackgroundElement: this.$refs.bottomBg,
          shadowDetailElement: this.$refs.shadowDetail,
          trimmedElement: this.$refs.trimmed,
          untrimmedElement: this.$refs.untrimmed
        }
      }
    },
    methods: {
      getCanvasLayers ({ canvasElements }) {
        return Object
          .entries(canvasElements)
          .reduce((acc, [key, element]) => {
            return [
              ...acc,
              new Promise((resolve, reject) => {
                const done = (image) => {
                  resolve({
                    key,
                    element,
                    context: element.getContext("2d"),
                    image
                  })
                }
                
                const image = new Image(300, 450)
                image.onload = done.bind({}, image)
                image.id = element.id
                image.src = `./assets/images/${element.id}.png`
              })
            ]
          }, [])
      },
      async drawInitialImages () {
        const canvasLayers = this.getCanvasLayers({ canvasElements: this.canvasElements });
        const imageLayers = await Promise
          .all(canvasLayers)
          .then(canvasLayers => canvasLayers.reduce((acc, { key, context, image, element }) => {
            if (image.id !== 'trimmed') context.drawImage(image, 0, 0)

            return {
              ...acc, 
              [key]: {
                context,
                image,
                element
              }
            }
          }, {}))

        return imageLayers
      },
      applyRandomColour ({ context, image }) {
        const randomNumber = Math.floor(Math.random() * (360 - 32 + 1)) + 32;
        const hueRotate = 150 * randomNumber / 16;
        const sourceHue = 0;

        context.clearRect(0 , 0, 300, 450);
        context.filter=`hue-rotate(${(hueRotate - sourceHue) | 0}deg)`;
        context.drawImage(image, 0, 0);
      },
      applyHue (hue, { context, image }) {
        context.clearRect(0 , 0, 300, 450);
        context.filter=`hue-rotate(${hue}deg)`;
        context.drawImage(image, 0, 0);
      },
      capeOnClick () {
        Object.values(this.imageLayers).forEach(imageLayer => {
          if (imageLayer.image.id === 'shadow-detail') return
          if (imageLayer.image.id === 'trimmed') return
          if (imageLayer.image.id === 'untrimmed') return

          this.applyRandomColour(imageLayer)
        })
      },
      subscribeToColourPickers () {
        const colourPickers = [
          'colourPicker/topDetail/SET_HUE',
          'colourPicker/topBackground/SET_HUE',
          'colourPicker/bottomDetail/SET_HUE',
          'colourPicker/bottomBackground/SET_HUE'
        ]

        $store.subscribe(({ type, payload }) => {
          if (colourPickers.includes(type)) {
            const elementName = type.split('/')[1]
            const { hue } = payload
            this.applyHue(hue, this.imageLayers[`${elementName}Element`])
          }
        })
      },
      async render () {
        this.imageLayers = await this.drawInitialImages()
      }
    },
    async mounted () {
      await this.render()
      this.subscribeToColourPickers()
    },
  }
</script>

<template>
  <div @click="capeOnClick">
    <canvas ref="topDetail" id="top-detail" width=300 height=450></canvas>
    <canvas ref="topBg" id="top-bg" width=300 height=450></canvas>
    <canvas ref="bottomDetail" id="bottom-detail" width=300 height=450></canvas>
    <canvas ref="bottomBg" id="bottom-bg" width=300 height=450></canvas>
    <canvas ref="shadowDetail" id="shadow-detail" width=300 height=450></canvas>
    <canvas ref="trimmed" id="trimmed" width=300 height=450></canvas>
    <canvas ref="untrimmed" id="untrimmed" width=300 height=450></canvas>
  </div>
</template>

<style lang="scss" scoped>
  canvas {
    height: 450px;
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>