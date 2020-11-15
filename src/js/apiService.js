export default class NewsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  fetchArticle() {
    const BASE_URL = "https://pixabay.com/api/";
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=8052974-676f52671a56653f7826cdc16`;
    return fetch(url).then(response => {
      this.incrementPage();
      return response.json();
    });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
