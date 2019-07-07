document.getElementById('my-form').onsubmit = function() {
    return save_valid_search();
};

function save__valid_search() {
  // Get value from input form before loading next page
  var search_value = document.getElementById('input_search').value;
  // Set the pattern that must be used in order to search for a room
  var input_format = new RegExp("^[0-9]\.[0-9]\.[0-9]$");

  // Test validity of input
  if (input_format.test(search_value)) { // If it matches
    localStorage.setItem("input_search", search_value); // Store it on localStorage
  } else {
    alert("Wrong input format. The rooms should be of the form: 1.10.23");
    return false;
  }

  return true;
}
