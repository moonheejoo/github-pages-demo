const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi (search, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyC3AMAl7E3_ZB70RdRD25lLy8JYu4unO6g',
    q: search,
    per_page: 5
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
/* Object destructuring */
  const { snippet } =  result;
  console.log(result);
  console.log(snippet);
  return (
      `<a href=" https://www.youtube.com/watch?v=${result.id.videoId}">
        <div class="thumbnail display">
          <img class="thumbnail" src="${snippet.thumbnails.medium.url}">
          <h2>${snippet.title}</h2> ${snippet.description}
        </div>
      </a>`
    );
}

  function displayYouTubeSearchData(data) {
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
  }

  function watchSubmit() {
    $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query,displayYouTubeSearchData);
  });
  }

  $(watchSubmit);
