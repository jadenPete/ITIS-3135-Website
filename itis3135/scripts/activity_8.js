const names = [];
const salaries = [];

function addSalary(event) {
	const formData = new FormData(event.currentTarget);

	names.push(formData.get("name"));
	salaries.push(parseFloat(formData.get("salary")));

	focusSalaryNameInput();

	event.preventDefault();
}

function displaySalaries() {
	const table = document.getElementById("salaries-table");

	table.querySelector("tbody").remove();

	const body = document.createElement("tbody");

	for (let i = 0; i < Math.min(names.length, salaries.length); i++) {
		const row = document.createElement("tr");

		const name = document.createElement("td");
		const salary = document.createElement("td");

		name.textContent = names[i];
		salary.textContent = formatSalary(salaries[i]);

		row.appendChild(name);
		row.appendChild(salary);

		body.appendChild(row);
	}

	table.appendChild(body);
}

function displayStatistics() {
	document.querySelector(".average-salary").textContent = formatSalary(
		salaries.reduce((sum, current) => sum + current) / salaries.length
	);

	document.querySelector(".highest-salary").textContent = formatSalary(Math.max(...salaries));
}

function focusSalaryNameInput() {
	document.getElementById("name-input").focus();
}

function formatSalary(salary) {
	return `$${salary.toFixed(2)}`;
}

document.querySelector(".salary-form").addEventListener("submit", event => addSalary(event));
document.querySelector(".show-salaries-button").addEventListener("click", () => displaySalaries());
document.querySelector(".show-statistics-button")
	.addEventListener("click", () => displayStatistics());

focusSalaryNameInput();
