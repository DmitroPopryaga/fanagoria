class MouseScrollX {
  selectors = {
    root: '[data-js-mouse-scroll-x]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    if (!this.rootElement) {
      console.error('Slider root element not found!')
      return
    }

    this.isDown = false
    this.startX = 0
    this.scrollLeft = 0
    this.scrollSpeed = 3

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)

    this.init()
  }

  init() {
    this.initStyles()
    this.initEvents()
  }

  initStyles() {
    this.rootElement.style.cursor = 'grab'
    this.rootElement.style.userSelect = 'none'
    this.rootElement.style.overflowX = 'auto'
    this.rootElement.style.scrollBehavior = 'smooth'
  }

  initEvents() {
    this.rootElement.addEventListener('mousedown', this.onMouseDown)
    this.rootElement.addEventListener('mouseleave', this.onMouseLeave)
    this.rootElement.addEventListener('mouseup', this.onMouseUp)
    this.rootElement.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseDown(e) {
    this.isDown = true
    this.rootElement.classList.add(this.stateClasses.isActive)
    this.rootElement.style.cursor = 'grabbing'
    this.startX = e.pageX - this.rootElement.offsetLeft
    this.scrollLeft = this.rootElement.scrollLeft
  }

  onMouseLeave() {
    this.resetState()
  }

  onMouseUp() {
    this.resetState()
  }

  onMouseMove(e) {
    if (!this.isDown) return
    e.preventDefault()
    const x = e.pageX - this.rootElement.offsetLeft
    const walk = (x - this.startX) * this.scrollSpeed
    this.rootElement.scrollLeft = this.scrollLeft - walk
  }

  resetState() {
    this.isDown = false
    this.rootElement.classList.remove(this.stateClasses.isActive)
    this.rootElement.style.cursor = 'grab'
  }

  destroy() {
    this.rootElement.removeEventListener('mousedown', this.onMouseDown)
    this.rootElement.removeEventListener('mouseleave', this.onMouseLeave)
    this.rootElement.removeEventListener('mouseup', this.onMouseUp)
    this.rootElement.removeEventListener('mousemove', this.onMouseMove)
  }
}

export default MouseScrollX