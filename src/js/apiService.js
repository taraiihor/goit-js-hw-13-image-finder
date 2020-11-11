// const BASE_URL = "https://pixabay.com/api/";
function fetchConteiner(searchQuery) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&per_page=12&key=8052974-676f52671a56653f7826cdc16`
  ).then(response => {
    return response.json();
  });
}
export default { fetchConteiner };
