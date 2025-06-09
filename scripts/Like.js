class Like {
  selectors = {
    root: '[data-js-like]',
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    
    // Проверка наличия элемента
    if (!this.rootElement) {
      console.error(`Element with selector '${this.selectors.root}' not found!`)
      return
    }

    // Привязываем контекст
    this.onLikeClick = this.onLikeClick.bind(this)
    
    this.bindEvents()
  }

  bindEvents() {
    this.rootElement.addEventListener('click', this.onLikeClick)
  }

  onLikeClick(e) {
    e.preventDefault() // Предотвращаем стандартное поведение, если нужно
    this.rootElement.classList.toggle(this.stateClasses.isActive)
    
    // Дополнительная логика может быть здесь
    this.saveLikeState()
    this.updateLikeCounter()
  }

  saveLikeState() {
    // Сохранение состояния в localStorage или на сервер
    const isActive = this.rootElement.classList.contains(this.stateClasses.isActive)
    localStorage.setItem('likeState', isActive)
  }

  updateLikeCounter() {
    // Логика обновления счетчика лайков
    const counter = this.rootElement.querySelector('.like-counter')
    if (counter) {
      const currentCount = parseInt(counter.textContent) || 0
      const newCount = this.rootElement.classList.contains(this.stateClasses.isActive) 
        ? currentCount + 1 
        : currentCount - 1
      counter.textContent = Math.max(0, newCount) // Не даем уйти в минус
    }
  }

  destroy() {
    // Очистка событий при необходимости
    this.rootElement.removeEventListener('click', this.onLikeClick)
  }

  async saveLikeState() {
    const isActive = this.rootElement.classList.contains(this.stateClasses.isActive)
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        body: JSON.stringify({ liked: isActive })
      })
      // Обработка ответа
    } catch (error) {
      console.error('Like error:', error)
    }
  } 
}

export default Like