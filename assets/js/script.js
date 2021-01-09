/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
console.log("hello");
function buildQueryURL() {
  var keyword = $("#keyword").val().trim();
  var startYear = $("#startYear");
  var endYear = $("#endYear");
  var buildURL = "";
  var beginDate = $("#startYear").val().trim();
  var endDate = $("#endYear").val().trim();
  console.log(beginDate);
  console.log(endDate);
  console.log(keyword);
  if (beginDate.length>0 && endDate.length>0) {
    buildURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ keyword + "&begin_date=" + beginDate + "0101" + "&end_date=" + endDate + "1231" + "&api-key=NU7AETvuYfXmDmu68QXqolIAKVt0GaBh";
  }
  else {
    buildURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ keyword + "&api-key=NU7AETvuYfXmDmu68QXqolIAKVt0GaBh";
  }
  console.log(buildURL);
  return buildURL;
}
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} NYTData - object containing NYT API data
 */
function updatePage(response) {
  var results = response;
  var numberGet = $("#numberGet").val();
  console.log(results);
  console.log(results.response.docs[0].headline.main);
  for (var i = 0; i < numberGet; i++) {
    console.log(numberGet);
    console.log(results.response.docs[i].headline.main);
    var thisTitle = results.response.docs[i].web_url;
    var title = $("<a>").text(results.response.docs[i].headline.main);
    var abstract = $("<p>").text(results.response.docs[i].abstract);
    var year = $("<p>").text(results.response.docs[i].pub_date);
    
    var container = $("<div>");
    container.attr("class", "container articleContainer");

    title.attr("class","title");
    title.attr("href",thisTitle);
    abstract.attr("class","abstract");
    year.attr("class","year");
    $("#articles").append(container);
    $(container).append(title);
    $(container).append(year);
    $(container).append(abstract);
  }
}
// Function to empty out the articles
function clear() {
  $("#articles").empty();
}
$("#run-search").on("click", function(event) {
  console.log("hello");
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();
  // Empty the region associated with the articles
  clear();
  // Build the query URL for the ajax request to the NYT API
  var queryURL = buildQueryURL();
  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  updatePage(response);
});
});
// .on("click") function associated with the clear button
$("#clear-all").on("click", clear);