class Like {
  static selectors = {
    root: '[data-js-like]',
  }

  static stateClasses = {
    isActive: 'is-active',
  }

  constructor(element) {
    this.rootElement = element;
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

  static initAll(selector = this.selectors.root) {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => new Like(element));
  }
}

// Инициализация всех лайков на странице
document.addEventListener('DOMContentLoaded', () => {
  Like.initAll();
});

export default Like