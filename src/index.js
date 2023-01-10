import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

fetchCountries();

const refs = {
  formInput: document.querySelector('#search-box'),
};

refs.formInput.addEventListener('input', onInput);

function onInput(e) {
  const input = e.target.value;
  console.log(input);
}
