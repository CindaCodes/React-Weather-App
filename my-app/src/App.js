import "./Weather.css";
import WeatherSearch from "./WeatherSearch";

function App() {
  return (
    <div className="App">
      <WeatherSearch />
      <footer>
        This project was coded by{" "}
        <a
          href="https://www.linkedin.com/in/jacinda-bietz-3158a0338/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jacinda Bietz
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/CindaCodes/React-Weather-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-sourced on GitHub
        </a>{" "}
        and{" "}
        <a
          href="https://cinda-codes-weather.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
}

export default App;
