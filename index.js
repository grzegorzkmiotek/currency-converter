async function fetchExchangeRate(currencyCode) {
	const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Nie udało się...${response.statusText}`);
	}
	const data = await response.json();
	return data.rates[0].mid;
}

function convertCurrency(event) {
	event.preventDefault();
	const code = document.querySelector("#from-currency").value;
	const amount = document.querySelector("#amount").value;
	// if (rate) {
	// 	const result = rate * amount;
	// 	document.querySelector("#result").innerText = result.toFixed(2);
	// } else {
	// 	// wyświetlenie błędu użytkownikowi
	// }

	fetchExchangeRate(code)
		.then((rate) => {
			const result = rate * amount;
			document.querySelector("#result").innerText = result.toFixed(2);
		})
		.catch((error) => {
			console.error(`Wystąpił błąd! ${error}`);
			// document.createElement("li").innerText =
			// ''`Wystąpił błąd! ${error}`spróbuj później...'
		});
	return data?.rates?.[0]?.mid;
}
document
	.querySelector("#income-form")
	.addEventListener("submit", convertCurrency);
