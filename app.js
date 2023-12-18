const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;

    //setting default value to dropdowns using selected
    //If you want to set a default or selected value in the dropdowns using JavaScript, you can use the selected property of the <option> element.

    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//Function to update the flag according to the country code.
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];

  let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let image = element.parentElement.querySelector("img");

  image.src = newSource;
};

//function to get the exchange rate

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Function to update the exchange rate and display the result
const updateExchangeRate = async () => {
  let Amount = document.querySelector(".amount input");
  let AmountValue = parseFloat(Amount.value);

  // Check if the input is not a valid number or is empty
  if (isNaN(AmountValue) || Amount.value.trim() === "") {
    // Set a default value of 1
    AmountValue = 1;
    Amount.value = "1";
  } else {
    // If the input is a valid number, update the value
    Amount.value = AmountValue.toString();
  }

  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;

  let response = await fetch(URL);

  let data = await response.json();
  let rate = data[toCurrency.value.toLowerCase()];
  let finalamount = AmountValue * rate;
  // Display the conversion result
  msg.innerText = `${AmountValue} ${fromCurrency.value} = ${finalamount} ${toCurrency.value} `;
  console.error(`Failed to fetch data. Status: ${response.status}`);
};

window.addEventListener("keydown", async (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
      await updateExchangeRate();
  }
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


