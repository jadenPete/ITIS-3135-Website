window.addEventListener("load", () => {
	for (const tab of document.getElementsByClassName("tab")) {
		tab.addEventListener("click", () => {
			Array.from(document.getElementsByClassName("active")).forEach(active => {
				active.classList.remove("active");
			});

			tab.classList.add("active");

			for (const tabContent of document.getElementsByClassName("tab-content")) {
				if (tabContent.dataset.tabFor == tab.dataset.tab) {
					tabContent.classList.add("active");
				}
			}
		});
	}
});
