import { Controller } from "@hotwired/stimulus";
import JSConfetti from 'js-confetti';

export default class extends Controller {
		static targets = ["value", "card"];

		connect() {
				this.jsConfetti = new JSConfetti();
		}

		// The use of `closest` here really reveals a good understanding of the DOM
		increment(event) {
				const card = event.target.closest('[data-points-target="card"]');
				const valueTarget = card.querySelector('[data-points-target="value"]');
				let currentValue = parseInt(valueTarget.textContent);
				valueTarget.textContent = currentValue + 1;
				this.jsConfetti.addConfetti();
				this.updateServer(card.dataset.nameId, currentValue + 1);
		}

		decrement(event) {
				const card = event.target.closest('[data-points-target="card"]');
				const valueTarget = card.querySelector('[data-points-target="value"]');
				let currentValue = parseInt(valueTarget.textContent);
				valueTarget.textContent = currentValue - 1;
				this.showPoopEmojis();
				this.updateServer(card.dataset.nameId, currentValue - 1);
		}

		showPoopEmojis() {
				this.jsConfetti.addConfetti({
						emojis: ['💩'],
						emojiSize: 50,
						confettiNumber: 30,
				});
		}

		updateServer(nameId, newValue) {
				// Updates UI
				const rootTemplate = document.querySelector('#turbo-stream-template-points-counter');
				const turboStreamElement = rootTemplate.content.cloneNode(true);
				const spanElement = turboStreamElement.querySelector('template').content.querySelector('#name--points');
				spanElement.innerHTML = newValue;
				document.body.querySelector(`#name_${nameId}`).appendChild(turboStreamElement);

				// Need to update the server using fetch API
				fetch(`/names/${nameId}`, {
						method: "PATCH",
						headers: {
								'Content-Type': 'application/json',
								'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
						},
						body: JSON.stringify({id: nameId, name: { points: newValue }})
				});
		}
}
