const errorLabel = document.getElementById("error");

async function fetchExchangeRate(currencyCode) {
	const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}`;
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`Nie udało się...${response.statusText}`);
		}
		const data = await response.json();
		return data?.rates?.[0]?.mid;
	} catch {
		throw new Error(`Błąd Api`);
	}
}

function convertCurrency(event) {
	event.preventDefault();
	errorLabel.innerText = "";
	const code = document.querySelector("#from-currency").value;
	const amount = document.querySelector("#amount").value;

	fetchExchangeRate(code)
		.then((rate) => {
			if (rate) {
				const result = rate * amount;
				document.querySelector("#result").innerText = result.toFixed(2);
			} else {
				errorLabel.innerText = "Wystąpił błąd";
			}
		})
		.catch(() => {
			errorLabel.innerText = "Wystąpił błąd";
		});
}
document
	.querySelector("#income-form")
	.addEventListener("submit", convertCurrency);
