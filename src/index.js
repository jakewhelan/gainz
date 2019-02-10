const canvasElements = {
  detailTopElement: window.document.getElementById('detail-top'),
  backgroundTopElement: window.document.getElementById('bg-top'),
  detailBottomElement: window.document.getElementById('detail-bottom'),
  backgroundBottomElement: window.document.getElementById('bg-bottom'),
  shadowDetailElement: window.document.getElementById('shadow-detail'),
  trimmedElement: window.document.getElementById('trimmed'),
  untrimmedElement: window.document.getElementById('untrimmed')
}

const getCanvasLayers = ({ canvasElements }) => Object
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

const drawInitialImages = async () => {
  const canvasLayers = getCanvasLayers({ canvasElements });
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
}

const applyRandomColour = ({ context, image }) => {
  const randomNumber = Math.floor(Math.random() * (360 - 32 + 1)) + 32;
  const hueRotate = 150 * randomNumber / 16;
  const sourceHue = 0;

  context.clearRect(0 , 0, 300, 450);
  context.filter=`hue-rotate(${(hueRotate - sourceHue) | 0}deg)`;
  context.drawImage(image, 0, 0);
}

const render = async () => {
  const imageLayers = await drawInitialImages()
  window.document.body.onclick = () => {
    Object.values(imageLayers).forEach(imageLayer => {
      if (imageLayer.image.id === 'shadow-detail') return
      if (imageLayer.image.id === 'trimmed') return
      if (imageLayer.image.id === 'untrimmed') return

      applyRandomColour(imageLayer)
    })
  }
}

render()
