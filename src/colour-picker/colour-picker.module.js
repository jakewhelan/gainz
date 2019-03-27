import { CoreModule } from '@core/core.module'

export class ColourPickerModule extends CoreModule {
  constructor(args) {
    super({
      ...args,
      parent: 'colourPicker'
    })
  }

  get state() {
    return {
      hue: 0
    }
  }

  get typeNames () {
    return [
      'SET_HUE'
    ]
  }

  get actions () {
    const { SET_HUE } = this.types.actions

    return {
      setHue: ({ commit }, { hue }) => {
        const { SET_HUE } = this.types.mutations
        commit(SET_HUE, { hue })
      }
    }
  }

  get mutations () {
    const { SET_HUE } = this.types.mutations
  
    return {
      [SET_HUE] (state, payload) {
        state.hue = payload.hue
      }
    }
  }
}