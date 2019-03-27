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
      colour: '#ffffff'
    }
  }

  get types () {
    const SET_COLOUR = `${this.namespace}/SET_COLOUR`

    return {
      SET_COLOUR
    }
  }

  get actions () {
    const { SET_COLOUR } = this.types

    return {
      setColour: ({ commit }, { colour }) => commit(SET_COLOUR, { colour })
    }
  }

  get mutations () {
    const { SET_COLOUR } = this.types
  
    return {
      [SET_COLOUR] (state, payload) {
        state.colour = payload.colour
      }
    }
  }
}