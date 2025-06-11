function searchSongs() {
  const query = document.getElementById('search').value;
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`;

  // Using JSONP for CORS bypass
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
      <strong>${track.title}</strong> by ${track.artist.name}<br>
      <button onclick="playPreview('${track.preview}')">▶ Play Preview</button>
    `;
    resultsDiv.appendChild(div);
  });
}

function playPreview(url) {
  const player = document.getElementById('player');
  player.src = url;
  player.play();
}
