import { Controller } from "@hotwired/stimulus";
import JSConfetti from 'js-confetti';

export default class extends Controller {
	static targets = ["value", "card"];

	connect() {
		const jsConfettiCanvas = document.getElementById("confetti")
		this.jsConfetti = new JSConfetti({ jsConfettiCanvas });
	}

	// The use of `closest` here really reveals a good understanding of the DOM
	increment(event) {
		const card = event.target.closest('[data-points-target="card"]');
		const valueTarget = card.querySelector('[data-points-target="value"]');
		let currentValue = parseInt(valueTarget.textContent);
		valueTarget.textContent = currentValue + 1;
		this.displayConfetti();
		this.updateServer(card.dataset.nameId, currentValue + 1);
	}

	decrement(event) {
		const card = event.target.closest('[data-points-target="card"]');
		const valueTarget = card.querySelector('[data-points-target="value"]');
		let currentValue = parseInt(valueTarget.textContent);
		valueTarget.textContent = currentValue - 1;
		this.displayConfetti();
		this.updateServer(card.dataset.nameId, currentValue - 1);
	}

	displayConfetti() {
		setTimeout(() => {
			const emojis = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😍', '🥰', '😘', '😗', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭'];
			const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
			this.jsConfetti.addConfetti({
				emojis: Array.from(randomEmoji),
				emojiSize: 40,
				confettiNumber: 40,
			});
		}, 500)
	}

	updateServer(nameId, newValue) {
		// Updates UI
		const rootTemplate = document.querySelector('#turbo-stream-template-points-counter');
		const turboStreamElement = rootTemplate.content.cloneNode(true);
		const spanElement = turboStreamElement.querySelector('template').content.querySelector('#name--points');
		spanElement.innerHTML = newValue;
		document.body.querySelector(`#name_${nameId}`).appendChild(turboStreamElement);

		// Update the Server using fetch API
		fetch(`/names/${nameId}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
			},
			body: JSON.stringify({ id: nameId, name: { points: newValue } })
		});
	}
}
