import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

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
  fetchCountries(input).then(data => {
    console.log(data);
    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length >= 2 && data.length <= 10) {
      const countries = data
        .map(
          item =>
            `<li class="country-item"><img src="${item.flags.svg}" alt="flag" width="50" height="40"> ${item.name.common}</li>`
        )
        .join('');

      refs.countryList.innerHTML = countries;
    } else {
      const country = data[0];
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
  });
}
