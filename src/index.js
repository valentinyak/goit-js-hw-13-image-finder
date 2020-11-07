import * as basicLightbox from 'basiclightbox';
import apiService from './api-service';
import refs from './refs';
import template from './template.hbs';
import './styles.css';

const BASE_URL = 'https://pixabay.com/api/?';
let allListItems = null;

refs.formEl.addEventListener('submit', loadPhotos);
refs.loadMoreBtnEl.addEventListener('click', () => {
  makeRequest().then(doScroll);
  increasePage();
});
refs.galleryListEl.addEventListener('click', showLargePhoto);

function loadPhotos(event) {
  event.preventDefault();

  allListItems = document.querySelectorAll('li');
  // apiService.options.q = refs.inpulEl.value;
  apiService.options.q = 'dog';

  if (apiService.currentSerchQuery === '') {
    rememberCurrentSearchQuery();
  } else if (apiService.currentSerchQuery !== refs.inpulEl.value) {
    apiService.options.page = 1;
    rememberCurrentSearchQuery();
  } else if (apiService.currentSerchQuery === refs.inpulEl.value) {
    return;
  }

  if (allListItems) {
    clearMarkup();
  }

  makeRequest();
  increasePage();
}

function createMarkup(markup) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  allListItems.forEach(element => {
    element.remove();
  });
}

function makeRequest() {
  return apiService
    .makeFetch(BASE_URL, apiService.options)
    .then(response => response.json())
    .then(template)
    .then(createMarkup);
}

function rememberCurrentSearchQuery() {
  apiService.currentSerchQuery = refs.inpulEl.value;
}

function increasePage() {
  apiService.options.page += 1;
}

function doScroll() {
  window.scrollTo({
    top: 800 * (apiService.options.page - 2),
    behavior: 'smooth',
  });
}

function showLargePhoto(event) {
  // const instance = basicLightbox.create(`
  //     <img src="https://pixabay.com/get/5ee0d44b4854b108f5d0846096293f77123edee5564c704f752b7cd39448c45d_1280.jpg">
  // `);
  // instance.show();

  const array = [...document.querySelectorAll('li')];
  array.find((element, index) => {
    if (element === event.target.parentNode.parentNode) {
      console.log(index);
    }
  });
}
