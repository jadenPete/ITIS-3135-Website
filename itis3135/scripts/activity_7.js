class NotImplementedError extends Error {
	constructor(...args) {
		super("A method has not been implemented.", ...args);
	}
}

class Computable {
	computed() {
		throw new NotImplementedError();
	}
}

// This should extend Computable too, but JavaScript doesn't allow multiple classes to be extended
class ComputableNumber extends Number {
	computed() {
		return this;
	}
}

class BinaryOperator extends Computable {
	constructor(lhs, rhs) {
		super();

		this.lhs = lhs;
		this.rhs = rhs;
	}

	static get precedence() {
		throw new NotImplementedError();
	}

	static get symbol() {
		throw new NotImplementedError();
	}

	toString() {
		return `${this.lhs} ${this.constructor.symbol} ${this.rhs}`;
	}
}

function binaryOperatorFactory(compute, precedence, symbol) {
	return class extends BinaryOperator {
		computed() {
			return compute(this.lhs.computed(), this.rhs.computed());
		}

		static get precedence() {
			return precedence;
		}

		static get symbol() {
			return symbol;
		}
	}
}

Exponentiation = binaryOperatorFactory((lhs, rhs) => lhs ** rhs, 0, "^");
Multiplication = binaryOperatorFactory((lhs, rhs) => lhs * rhs, 1, "*");
Modulo = binaryOperatorFactory((lhs, rhs) => lhs % rhs, 1, "%");
Division = binaryOperatorFactory((lhs, rhs) => lhs / rhs, 1, "/");
Addition = binaryOperatorFactory((lhs, rhs) => lhs + rhs, 2, "+");
Subtraction = binaryOperatorFactory((lhs, rhs) => lhs - rhs, 2, "-");

class Expression extends Computable {
	constructor (value) {
		super();

		this.value = value;
	}

	computed() {
		return this.value.computed();
	}e

	copy() {
		return new this.constructor(this.value);
	}

	toString() {
		return `(${this.value})`
	}
}

class Evaluator {
	static operators = new Map([
		Exponentiation,
		Multiplication,
		Modulo,
		Division,
		Addition,
		Subtraction
	].map(operator => [operator.symbol, operator]));

	constructor(input) {
		this.input = input;
	}

	get last() {
		return this.stack[this.stack.length - 1];
	}

	evaluate() {
		this.numberDivisor = null;
		this.stack = [];

		for (let i = 0; i < this.input.length; i++) {
			if (this.input[i] == "(") {
				this.handleLeftParenthesis();
			} else if (this.input[i] == ")") {
				this.handleRightParenthesis(i);
			} else if (this.input[i].match(/^\d$/)) {
				this.handleDigit(i);
			} else if (this.input[i] == ".") {
				this.numberDivisor = 10;
			} else {
				this.handleOperator(i);
			}

			console.log(this.stack.toString());
		}

		this.popPrecedingOperands(this.stack.length);

		console.log(this.stack.toString());
	}

	handleDigit(i) {
		const digit = parseInt(this.input[i]);

		if (this.stack.length == 0) {
			this.stack.push(new Expression(new ComputableNumber(digit)));
		} else if (this.last.value instanceof ComputableNumber) {
			if (this.numberDivisor) {
				this.last.value = new ComputableNumber(
					(this.last.value * this.numberDivisor + digit) / this.numberDivisor
				);

				this.numberDivisor *= 10;
			} else {
				this.last.value = new ComputableNumber(this.last.value * 10 + digit);
			}
		} else {
			this.numberDivisor = null;

			this.last.value = new ComputableNumber(digit);
		}
	}

	handleLeftParenthesis() {
		const expression = new Expression();

		if (this.stack.length == 0) {
			this.stack.push(new Expression());
		}

		this.stack.push(this.last.value = expression);
	}

	handleOperator(i) {
		if (this.stack.length == 0) {
			throw new EvaluationError("Stray operator", i);
		}

		const operator = this.constructor.operators.get(this.input[i]);

		if (!operator) {
			throw new EvaluationError("Unknown operator", i);
		}

		this.popPrecedingOperands(i, operator.precedence);

		const rhs = new Expression();

		this.last.value = new operator(this.last.copy(), rhs);

		this.stack.push(rhs);
	}

	handleRightParenthesis(i) {
		if (this.stack.length == 0) {
			throw new EvaluationError("Stray closing paranthesis", i);
		}

		this.popPrecedingOperands(i);

		this.stack.pop();
	}

	popPrecedingOperands(i, precedence = Infinity) {
		while (
			this.stack.length > 1 &&
			this.stack[this.stack.length - 2].value instanceof BinaryOperator &&
			this.stack[this.stack.length - 2].value.constructor.precedence <= precedence
		) {
			if (!this.last.value) {
				throw new EvaluationError("Incomplete operation", i);
			}

			this.stack.pop();
		}
	}

	result() {
		return this.stack[0].computed();
	}
}

class EvaluationError extends Error {
	constructor(message, i, ...args) {
		super(`${message} at index ${i}.`, ...args);
	}
}

window.addEventListener("load", () => {
	for (const calculator of document.getElementsByClassName("calculator")) {
		const input = calculator.querySelector(".calculator-input");

		for (const button of calculator.getElementsByClassName("literal-button")) {
			button.addEventListener("click", () => {
				input.value += button.textContent;
			});
		}

		calculator.querySelector(".clear-button").addEventListener("click", () => {
			input.value = "";
		});

		calculator.querySelector(".backspace-button").addEventListener("click", () => {
			input.value = input.value.substring(0, input.value.length - 1);
		});

		calculator.querySelector(".enter-button").addEventListener("click", () => {
			const evaluator = new Evaluator(input.value);

			try {
				evaluator.evaluate();

				input.setAttribute("placeholder", "");

				input.value = evaluator.result();
			} catch (error) {
				input.setAttribute("placeholder", error.message);

				input.value = "";
			}
		})
	}
});
