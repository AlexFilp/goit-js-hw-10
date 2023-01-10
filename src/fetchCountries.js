export const fetchCountries = fetchCountriesFunc;

function fetchCountriesFunc(name) {
  return fetch(
    'https://restcountries.com/v3.1/name/uk?fields=name,capital,population,languages,flags'
  )
    .then(response => response.json())
    .then(data => console.log(data));
}
