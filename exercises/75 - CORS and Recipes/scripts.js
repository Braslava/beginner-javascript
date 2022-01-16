const baseEndpoint = 'https://api.openbrewerydb.org/breweries/';
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const display = document.querySelector('.breweries');

async function searchBrewery(query) {
  const res = await fetch(`${proxy}${baseEndpoint}?by_state=${query}`);
  const data = await res.json();
  return data;
}

async function handleSubmit(event) {
  event.preventDefault();
  console.log(form.query.value);
  fetchAndDisplay(form.query.value);
}

async function fetchAndDisplay(query) {
  // turn the form off
  form.submit.disabled = true;
  // submit search
  const breweries = await searchBrewery(query);
  console.log(breweries);
  form.submit.disabled = false;
  displayBreweries(breweries);
}

function displayBreweries(breweries) {
  console.log('Creatign HTML');
  const html = breweries.map(
    (brewery) =>
      `<div class="brewery">
      <h2>${brewery.name}</h2>
      <p>${brewery.city}, ${brewery.state}</p>
      <p>${brewery.country}</p>
      ${hasUrl(brewery)}
      </div>`
  );
  display.innerHTML = html.join('');
}

function hasUrl(brewery) {
  if (brewery.website_url) {
    return `<a href="${brewery.website_url}">See website &#8594</a>`;
  }
  return '';
}

form.addEventListener('submit', handleSubmit);

// On page Load run with dog
fetchAndDisplay('new_york');
