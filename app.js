
function searchSongs() {
  const query = document.getElementById('search').value;
  //deezer endpoint - receives calls
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`;

  const script = document.createElement('script');

  script.src = `${url}&callback=displayResults`;
  
  document.body.appendChild(script);
}

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (data.data.length === 0) {
    resultsDiv.innerHTML = 'No results found.';
    return;
  }

    data.data.forEach(track => {
    const div = document.createElement('div');
    div.className = 'song';

    div.innerHTML = `
        <div class="song-info">
        <strong>${track.title}</strong> by <strong>${track.artist.name}</strong>
        </div>
        <button class="play-button" onclick="playPreview('${track.preview}')">▶</button>
        
    `;
    resultsDiv.appendChild(div);
  });
  
  returnTop();
}

function returnTop(){
    div=document.getElementById('returnTop');
    div.innerHTML=`
    <p> Didn't see the song you wanted? Try entering the name of the artist too!</p>
  <a href="#top">Back to top</a>
    `
}

function playPreview(url) {
  const player = document.getElementById('player');
  player.src = url;
  player.play();
}

var input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") { //press enter to search
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});
