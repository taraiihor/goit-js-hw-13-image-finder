import "./css/style.css";
import galleryCard from "./templates/imege-gallery.hbs";
import debouce from "lodash.debounce";
import NewsApiService from "./js/apiService";
import LoadMoreBtn from "./js/load-more-btn";
const basicLightbox = require("basiclightbox");

const refs = {
  searchForm: document.querySelector("#search-form"),
  galleryImage: document.querySelector(".gallery"),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiServise = new NewsApiService();
refs.searchForm.addEventListener("input", debouce(onSearsh, 500));
loadMoreBtn.refs.button.addEventListener("click", onLoadMore);
refs.galleryImage.addEventListener("click", onModal);

function onSearsh(e) {
  e.preventDefault();
  newsApiServise.query = e.target.value;

  if (newsApiServise.query === "") {
    clearRender();
    loadMoreBtn.hide();
    return;
  }
  loadMoreBtn.show();
  loadMoreBtn.disable();
  newsApiServise.resetPage();
  newsApiServise.fetchArticle().then(artecles => {
    clearRender();
    renderGallryCard(artecles);
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  newsApiServise.fetchArticle().then(artecles => {
    renderGallryCard(artecles);
    loadMoreBtn.enable();
  });
}

function renderGallryCard(articles) {
  refs.galleryImage.insertAdjacentHTML("beforeend", galleryCard(articles));
}

function clearRender() {
  refs.galleryImage.innerHTML = "";
}

function onModal(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.src}" alt="" />`
  );
  instance.show();
}
