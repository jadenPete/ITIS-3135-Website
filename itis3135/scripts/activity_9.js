window.addEventListener("load", () => {
	for (const slideshow of document.getElementsByClassName("slideshow")) {
		function increaseImage(delta) {
			const images = Array.from(slideshow.getElementsByClassName("slideshow-image"));

			const current =
				images.findIndex(image => image.classList.contains("current-slideshow-image"));

			const next = ((current + delta) % images.length + images.length) % images.length;

			images[current].classList.remove("current-slideshow-image");
			images[next].classList.add("current-slideshow-image");
		}

		slideshow
			.querySelector(".slideshow-previous")
			.addEventListener("click", () => increaseImage(1));

		slideshow
			.querySelector(".slideshow-next")
			.addEventListener("click", () => increaseImage(-1));
	}
});
