import API from "./js/apiService";
import galleryCard from "./templates/imege-gallery";
import debouce from "lodash.debounce";
const refs = {
  searchForm: document.querySelector("#search-form"),
  galleryImage: document.querySelector(".gallery"),
  loadBtn: document.querySelector(".load-more-btn"),
};

refs.searchForm.addEventListener("input", debouce(onSearsh, 500));

function onSearsh(e) {
  e.preventDefault();
  clearRender();
  const searchQuery = refs.searchForm.elements.query.value;
  API.fetchConteiner(searchQuery)
    .then(renderGallryCard)
    .catch(error => error.log);
}

function renderGallryCard(gallery) {
  const markup = galleryCard(gallery);
  refs.galleryImage.innerHTML = markup;
  console.log(markup);
}

function clearRender() {
  refs.galleryImage.innerHTML = "";
}
