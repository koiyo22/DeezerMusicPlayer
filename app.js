
let queue = [];
const player = document.getElementById('player');

function searchSongs() {
  const query = document.getElementById('search').value;
  //deezer endpoint
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp`;

  const script = document.createElement('script');

  script.src = `${url}&callback=displayResults`;
  
  document.body.appendChild(script);
}

var input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") { //press enter to search
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (data.data.length === 0) {
    resultsDiv.innerHTML = 'Oooops, no results found. 🫣';
    return;
  }

    data.data.forEach(track => {
    const div = document.createElement('div');
    div.className = 'song';

    div.innerHTML = `
        <div class="song-info">
        <strong>${track.title}</strong> by <strong>${track.artist.name}</strong>
        </div>
        
        <div class="button-group">
          <button class="add-queue-button" onclick="addToQueue('${track.preview}', '${track.title.replace(/'/g,"\\'")}', '${track.artist.name.replace(/'/g,"\\'")}')">➕</button>
          <button class="play-button" onclick="playPreview('${track.preview}')">▶</button>
        </div>
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
  player.src = url;
  player.play();
}

function addToQueue(previewUrl, title, artist){
  queue.push({previewUrl,title,artist});
  showQueue();
}

function showQueue(title,artist){
  const div = document.getElementById('queue');
  div.innerHTML = `
  <div class="queue">
    <strong>Queue:</strong>
      <ol>
        ${queue.map(song => `<li>${song.title} <em>by</em> ${song.artist}</li>`).join('')}
      </ol>
  </div><br>
  <div class="queue-group">
    <button class="clear-queue-button" onclick="clearQueue()">🚮 Clear</button>
    <button class="play-queue-button" onclick="playFirstSong()">▶ Play</button>
    <button class="skip-song-button" onclick="skipSong()">⏭  Skip</button>
  </div>
  `;
}

//only loads and plays first song
function playFirstSong() {
  if (queue.length > 0) {
    player.src = queue[0].previewUrl;
    player.play();
  }
  
}

function clearQueue(){
  queue=[];
  console.log("queue now cleared")
  showQueue();
}

function skipSong(){
  if (queue.length > 0) {
   const nextSong = queue.shift();
    playPreview(nextSong.previewUrl);
  }
  showQueue();
}

//continue queue
player.addEventListener('ended', function() {
  if (queue.length > 0) {
    //play the next song after current one
    const nextSong = queue.shift();
    playPreview(nextSong.previewUrl);
    showQueue();
  }
});
