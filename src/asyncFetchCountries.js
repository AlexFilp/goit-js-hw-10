export const fetchCountries = fetchCountriesFunc;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function fetchCountriesFunc(name) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  );
  console.log(response);
  if (!response.ok) {
    Notify.failure('Oops, there is no country with that name');
  }
  const fetchedCountries = await response.json();

  return fetchedCountries;
}
