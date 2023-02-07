function addFeelFormHandler() {
	document.querySelector(".feel-form").addEventListener("submit", event => {
		event.preventDefault();

		const name = document.getElementById("name-input").value;
		const adverb = document.getElementById("adverb-input").value;
		const adjective = document.getElementById("adjective-input").value;

		alert(
			`Mobility Automatic welcomes you, ${name}.\nWe're glad you're doing ${adverb} ${adjective}!`
		);
	});
}

function addPerryFunctions() {
	const messages = new Map(
		Object.entries({
			"visit-doofenshmirtz": "(Slides down a secret metal chute)",
			"foil-doofenshmirtz-plan": "(Menacing staring)",
			"return-to-phineas-and-ferb": "There you are, Perry!",
			"put-on-hat": "A platypus! Perry the Platypus!",
			"make-clicking-noises": "Kr kr kr kr kr kr kr…"
		})
	);

	for (const [className, message] of messages) {
		document.querySelector(`.perry-function-button.${className}`)
			.addEventListener("click", () => {
				alert(message);
			});
	}
}

function setCurrentDate() {
	const date = new Date();

	const timeString = new Intl.DateTimeFormat("en", {
		timeStyle: "short"
	}).format(date);

	const weekdayString = new Intl.DateTimeFormat("en", {
		weekday: "long"
	}).format(date);

	const dayString = new Intl.DateTimeFormat("en", {
		day: "numeric"
	}).format(date);

	const monthString = new Intl.DateTimeFormat("en", {
		month: "long",
	}).format(date);

	const yearString = new Intl.DateTimeFormat("en", {
		year: "numeric",
	}).format(date);

	document.querySelector(".current-date").textContent =
		`Today is ${timeString} on ${weekdayString}, ${dayString} ${monthString}, ${yearString}.`;
}

window.addEventListener("load", () => {
	setCurrentDate();
	setInterval(() => setCurrentDate(), 60000);

	addFeelFormHandler();
	addPerryFunctions();
});
