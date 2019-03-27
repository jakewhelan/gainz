import $store from '@app/app.store'

export class CoreModule {
  constructor({ name, parent = '' }) {
    if (!name) throw new Error('Name is a required argument')

    this.name = name
    this.parent = parent
    this.namespaced = true

    this.register()
  }

  register () {
    if (this.parent && !this.$store.state[this.parent]) this.registerParent()

    const { state, actions, mutations, namespaced } = this

    $store.registerModule(
      this.path, 
      { 
        state, 
        actions, 
        mutations, 
        namespaced 
      }
    )
  }

  registerParent () {
    $store.registerModule(this.parent, { state: {}, namedspaced: true })
  }

  get parentModule () {
    return this.parent
  }

  get namespace () {
    const parent = this.parentModule
      ? `${this.parentModule}/`
      : ''

    return `${parent}${this.name}`
  }
  
  get path () {
    return [
      this.parentModule,
      this.namespace
    ]
  }

  get types () {
    return {}
  }

  get state () {
    return {}
  }

  get actions () {
    return {}
  }

  get mutations () {
    return {}
  }

  get dispatchers () {
    const { dispatch } = this.$store
    return Object
      .keys(this.actions)
      .reduce((acc, cur) => {
        const actionPath = `${this.namespace}/${cur}`

        return {
          ...acc,
          [cur]: (...args) => dispatch(actionPath, ...args)
        }
      }, {})
  }
}