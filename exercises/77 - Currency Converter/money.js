const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const fromAmountInput = document.querySelector('[name="from_amount"]');
const toAmount = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
const endpoint = 'https://api.frankfurter.app/latest';
const ratesByBase = {};

const currencies = {
  EUR: 'Euro',
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
};

function generateOptions(options) {
  return Object.entries(options)
    .map(
      // destructuring of the array
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
    )
    .join('');
}

async function fetchRates(from = 'EUR') {
  const res = await fetch(`${endpoint}?from=${from}`);
  const rates = await res.json();
  // destructuring - same as data[rates] because data contains a rates property
  // const { rates } = data;
  console.log(rates);
  return rates;
}

async function convert(amount, from, to) {
  // return the same amount as input if to and from are the same
  if (to === from) {
    return amount;
  }
  // first check if we already have the rates to convert from the input currency
  if (!ratesByBase[from]) {
    console.log(
      `Oh no, we dont have ${from} to convert to ${to}. So gets go get it!`
    );
    const rates = await fetchRates(from);
    console.log(rates);
    // store the rates for next call
    ratesByBase[from] = rates;
  }
  // convert the amount that was passed in
  const rate = ratesByBase[from].rates[to];
  console.log(rate);
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

function formatCurrency(amount, currency) {
  // first option could be chnaged to user's locale
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleInput(e) {
  const rawAmount = await convert(
    fromAmountInput.value,
    fromSelect.value,
    toSelect.value
  );
  console.log(rawAmount);
  // const roundedAmount = Math.round(rawAmount * 100) / 100;
  toAmount.innerText = formatCurrency(rawAmount, toSelect.value);
}

const optionsHTML = generateOptions(currencies);
// populate the select options elements on page load
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener('input', handleInput);
