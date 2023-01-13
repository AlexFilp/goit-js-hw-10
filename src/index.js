import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './asyncFetchCountries';

Notify.init({
  position: 'center-top',
  showOnlyTheLastOne: true,
  cssAnimationStyle: 'zoom',
  fontSize: '19px',
  width: '420px',
});

const DEBOUNCE_DELAY = 300;

const refs = {
  formInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.formInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  const input = e.target.value.trim();
  if (input === '') {
    return;
  }
  fetchCountries(input)
    .then(fetchedCountries => {
      console.log(fetchedCountries);
      if (fetchedCountries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (
        fetchedCountries.length >= 2 &&
        fetchedCountries.length <= 10
      ) {
        const countries = fetchedCountries
          .map(
            item =>
              `<li class="country-item"><img src="${item.flags.svg}" alt="flag" width="50" height="40"> ${item.name.common}</li>`
          )
          .join('');

        refs.countryList.innerHTML = countries;
      } else {
        const country = fetchedCountries[0];
        refs.countryInfo.innerHTML = `<h1 class="country-title">
        <img class="country-img" src="${
          country.flags.svg
        }" alt="flag" width="120" />
        ${country.name.common}
      </h1>
      <p class="country-text">Capital: <span class="country-span">${
        country.capital
      }</span></p>
      <p class="country-text">Population: <span class="country-span">${
        country.population
      }</span></p>
      <p class="country-text">Languages: <span class="country-span">${Object.values(
        country.languages
      ).join(', ')}</span></p>`;
      }
    })
    .catch(error => console.log(error.name));
}
