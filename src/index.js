import apiService from './api-service';
import template from './template.hbs';

import './styles.css';

fetch(
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=sun&key=18971005-ed9d64a9f1a2bb3296a1c2dd7',
)
  .then(response => response.json())
  .then(template)
  .then(createMarkup);

console.log(template());

function createMarkup(markup) {
  document.body.insertAdjacentHTML('beforeend', markup);
}
