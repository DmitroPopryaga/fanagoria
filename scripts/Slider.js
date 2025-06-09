class Slider {
  selectors = {
    root: '[data-js-slider]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.isDown = false
    this.startX = 0 
    this.scrollLeft = 0
    this.initEvents()
  }

  initEvents() {
    this.rootElement.addEventListener('mousedown', this.onMouseDown)
    this.rootElement.addEventListener('mouseleave', this.onMouseLeave)
    this.rootElement.addEventListener('mouseup', this.onMouseUp)
    this.rootElement.addEventListener('mousemove', this.onMouseMove)
  }

  onMouseDown(e) {
    this.isDown = true
    this.rootElement.classList.toggle(this.stateClasses.isActive)
    this.startX = e.pageX - this.rootElement.offsetLeft
    this.scrollLeft = this.rootElement.scrollLeft
  }

  onMouseLeave() {
    this.isDown = false
    this.rootElement.classList.toggle(this.stateClasses.isActive)
  }

  onMouseUp() {
    this.isDown = false
    this.rootElement.classList.toggle(this.stateClasses.isActive)
  }

  onMouseMove() {
    if (!this.isDown) return
    e.preventDedault()
    const x = e.pageX - this.rootElement.offsetLeft
    const walk = (x - this.startX) * 2 
    this.rootElement.scrollLeft = this.scrollLeft - walk
  }
}


// export default Slider