$(document).ready(function() {
	for (const link of document.getElementsByClassName("speaker-link")) {
		link.addEventListener("click", event => {
			const title = event.currentTarget.getAttribute("title");

			fetch(`json_files/${title}.json`).then(response => response.json()).then(json => {
				const speaker = json["speakers"][0];

				document.querySelector(".speaker-description").innerHTML = speaker["text"];
				document.querySelector(".speaker-name").innerHTML = speaker["speaker"];
				document.querySelector(".speaker-month").innerHTML = speaker["month"];
				document.querySelector(".speaker-image").src = speaker["image"];
				document.querySelector(".speaker-title").innerHTML = speaker["title"];
			})
		});
	}
}); // end ready
