const rootSelector = '[data-js-like]'

class Like {
  selectors = {
    root: rootSelector,
  }

  static stateClasses = {
    isActive: 'is-active',
  }

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.onLikeClick = this.onLikeClick.bind(this);
    this.bindEvents();
    this.restoreState();
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onLikeClick);
  }

  onLikeClick(e) {
    e.preventDefault();
    this.toggleState();
  }

  toggleState() {
    this.rootElement.classList.toggle(Like.stateClasses.isActive);
    this.saveLikeState();
  }

  saveLikeState() {
    const itemId = this.rootElement.dataset.likeId || 'default';
    const isActive = this.rootElement.classList.contains(Like.stateClasses.isActive);
    localStorage.setItem(`likeState_${itemId}`, isActive);
  }

  restoreState() {
    const itemId = this.rootElement.dataset.likeId || 'default';
    const isActive = localStorage.getItem(`likeState_${itemId}`) === 'true';
    if (isActive) {
      this.rootElement.classList.add(Like.stateClasses.isActive);
    }
  }

  destroy() {
    this.rootElement.removeEventListener('click', this.onLikeClick);
  }
}

class LikeCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Like(element)
    })
  }
}

export default LikeCollection