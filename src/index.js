import * as basicLightbox from 'basiclightbox';
import apiService from './api-service';
import refs from './refs';
import template from './template.hbs';

import 'basiclightbox/dist/basicLightbox.min.css';
import './styles.css';

const BASE_URL = 'https://pixabay.com/api/?';
let allListItems = null;
const startBodyHeight = document.body.scrollHeight;

refs.formEl.addEventListener('submit', loadPhotos);
refs.loadMoreBtnEl.addEventListener('click', () => {
  makeRequestAndRenderMarkup().then(doScroll);
  apiService.increasePage();
});
refs.galleryListEl.addEventListener('click', showLargePhoto);

function loadPhotos(event) {
  event.preventDefault();

  allListItems = document.querySelectorAll('li');
  apiService.options.q = event.target.elements.query.value;

  if (apiService.currentSerchQuery === '') {
    rememberCurrentSearchQuery();
  } else if (
    apiService.currentSerchQuery !== event.target.elements.query.value
  ) {
    apiService.options.page = 1;
    rememberCurrentSearchQuery();
  } else if (
    apiService.currentSerchQuery === event.target.elements.query.value
  ) {
    return;
  }

  if (allListItems) {
    clearMarkup();
  }

  makeRequestAndRenderMarkup();
  apiService.increasePage();

  refs.loadMoreBtnEl.removeAttribute('disabled');
}

function renderMarkup(markup) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  allListItems.forEach(element => {
    element.remove();
  });
}

async function makeRequestAndRenderMarkup() {
  // return apiService
  //   .makeFetch(BASE_URL, apiService.options)
  //   .then(response => response.json())
  //   .then(template)
  //   .then(renderMarkup);
  try {
    const response = await apiService.makeFetch(BASE_URL, apiService.options);
    const parsedResponse = await response.json();
    const markup = await template(parsedResponse);
    return renderMarkup(markup);
  } catch (error) {
    throw error;
  }
}

function rememberCurrentSearchQuery() {
  apiService.currentSerchQuery = event.target.elements.query.value;
}

function doScroll() {
  window.scrollTo({
    top: document.body.scrollHeight - window.innerHeight - startBodyHeight,
    behavior: 'smooth',
  });
}

function showLargePhoto(event) {
  if (event.target.nodeName === 'IMG') {
    const instance = basicLightbox.create(`
      <div class="modal">
        <img src="${event.target.alt}" alt="" />
      </div>
      `);
    instance.show();
  }
}
