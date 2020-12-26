import './../styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="App-content-container">
        <h1>News</h1>
        <video src="#" width="525" height="300" controls>
          <track
            label="English"
            kind="subtitles"
            srclang="en"
            src="captions/en.vtt"
            default
          />
        </video>
        <div className="App-news"></div>
        <div className="App-news"></div>
        <div className="App-news"></div>
      </div>
    </div>
  );
}

export default App;
