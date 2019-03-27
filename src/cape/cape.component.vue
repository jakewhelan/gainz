<script>
  export default {
    name: 'cape',
    data: () => ({
      imageLayers: null
    }),
    computed: {
      canvasElements() {
        return {
          detailTopElement: this.$refs.detailTop,
          backgroundTopElement: this.$refs.bgTop,
          detailBottomElement: this.$refs.detailBottom,
          backgroundBottomElement: this.$refs.bgBottom,
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
            console.log(image.id)
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
      async render () {
        this.imageLayers = await this.drawInitialImages()
      },
      capeOnClick () {
        Object.values(this.imageLayers).forEach(imageLayer => {
          if (imageLayer.image.id === 'shadow-detail') return
          if (imageLayer.image.id === 'trimmed') return
          if (imageLayer.image.id === 'untrimmed') return

          this.applyRandomColour(imageLayer)
        })
      }
    },
    async mounted () {
      await this.render()
    },
  }
</script>

<template>
  <div @click="capeOnClick">
    <canvas ref="detailTop" id="detail-top" width=300 height=450></canvas>
    <canvas ref="bgTop" id="bg-top" width=300 height=450></canvas>
    <canvas ref="detailBottom" id="detail-bottom" width=300 height=450></canvas>
    <canvas ref="bgBottom" id="bg-bottom" width=300 height=450></canvas>
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