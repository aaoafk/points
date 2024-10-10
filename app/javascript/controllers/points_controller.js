// import { Controller } from "@hotwired/stimulus"
// import JSConfetti from 'js-confetti'

// export default class extends Controller {
// 		static targets = ["value"]

// 		connect() {
// 				this.value = 0
// 				this.jsConfetti = new JSConfetti()
// 		}

// 		increment() {
// 				this.value++
// 				this.updateValue()
// 				this.jsConfetti.addConfetti()
// 		}

// 		decrement() {
// 				this.value--
// 				this.updateValue()
// 				this.jsConfetti.addConfetti({
// 						emojis: ['💩'],
// 						emojiSize: 50,
// 						confettiNumber: 30,
// 				})
// 		}

// 		updateValue() {
// 				this.valueTarget.textContent = this.value
// 		}

// 		updateServer(newValue) {
// 				const nameId = this.element.dataset.nameId
// 				fetch(`/names/${nameId}`, {
// 						method: 'PATCH',
// 						headers: {
// 								'Content-Type': 'application/json',
// 								'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
// 						},
// 						body: JSON.stringify({ name: { points: newValue } })
// 				})
// 		}
// }

import { Controller } from "@hotwired/stimulus"
import JSConfetti from 'js-confetti'

export default class extends Controller {
  static targets = ["value", "card"]

  connect() {
    this.jsConfetti = new JSConfetti()
  }

  increment(event) {
    const card = event.target.closest('[data-points-target="card"]')
    const valueTarget = card.querySelector('[data-points-target="value"]')
    let currentValue = parseInt(valueTarget.textContent)
    valueTarget.textContent = currentValue + 1
    this.jsConfetti.addConfetti()
    this.updateServer(card.dataset.nameId, currentValue + 1)
  }

  decrement(event) {
    const card = event.target.closest('[data-points-target="card"]')
    const valueTarget = card.querySelector('[data-points-target="value"]')
    let currentValue = parseInt(valueTarget.textContent)
    valueTarget.textContent = currentValue - 1
    this.showPoopEmojis()
    this.updateServer(card.dataset.nameId, currentValue - 1)
  }

  showPoopEmojis() {
    this.jsConfetti.addConfetti({
      emojis: ['💩'],
      emojiSize: 50,
      confettiNumber: 30,
    })
  }

  updateServer(nameId, newValue) {
    fetch(`/names/${nameId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({ name: { points: newValue } })
    })
  }
}
