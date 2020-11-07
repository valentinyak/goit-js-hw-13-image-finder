const KEY = '18971005-ed9d64a9f1a2bb3296a1c2dd7';

export default {
  options: {
    image_type: 'photo',
    orientation: 'horizontal',
    q: '',
    key: KEY,
    page: 1,
    per_page: 12,
  },

  createFetchURL(base_url, options) {
    let fetchURL = base_url;

    for (const key in options) {
      fetchURL += key + '=' + options[key] + '&';
    }

    return fetchURL;
  },

  makeFetch(base_url, options) {
    return fetch(this.createFetchURL(base_url, options));
  },

  currentSerchQuery: '',
};
