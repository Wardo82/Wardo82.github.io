function saveSearch() {
  var search_value = document.getElementById('input_search').value;
  localStorage.setItem("input_search", search_value);
}
