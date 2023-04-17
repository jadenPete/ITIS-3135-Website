$(document).ready(function(){
	fetch("facultyList.json").then(response => response.json()).then(json => {
		const faculty = document.getElementById("faculty")

		for (const member of json["facultymembers"]) {
			const image = document.createElement("img");
			const name = document.createElement("h2");
			const department = document.createElement("h3");
			const bio = document.createElement("p");

			image.src = member["image"];
			name.textContent = member["full_name"]
			department.textContent = member["department"];
			bio.textContent = member["bio"];

			faculty.appendChild(image);
			faculty.appendChild(name);
			faculty.appendChild(department);
			faculty.appendChild(bio);
		}
	});
});
