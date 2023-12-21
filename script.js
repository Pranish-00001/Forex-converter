function convert() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const resultContainer = document.getElementById("result-container");

    // Check for valid input
    if (isNaN(amount) || amount <= 0 || !from || !to) {
        resultContainer.innerHTML = "Please enter valid input.";
        return;
    }

    // API_ADDITION
    const apiKey = '9d0cd831c2112fc021fbe8e1';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === "success") {
                const conversionRate = data.conversion_rate;
                const convertedAmount = (amount * conversionRate).toFixed(2);
                resultContainer.innerHTML = `${amount} ${from} is equal to ${convertedAmount} ${to}`;
            } else {
                // Display the specific error message received from the API
                resultContainer.innerHTML = `Error: ${data.error || "Unknown error"}`;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            resultContainer.innerHTML = "Error in currency conversion. Please try again later.";
        });
}
