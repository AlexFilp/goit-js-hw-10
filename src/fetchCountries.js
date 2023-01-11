export const fetchCountries = fetchCountriesFunc;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountriesFunc(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`
  )
    .then(response => {
      if (!response.ok) {
        Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => error);
}
