import { useEffect, useState } from "react";
import "./App.css";
import MoviesDisplay from "./assets/MoviesDisplay";
import axios from "axios";
import { flushSync } from "react-dom";
import Navigation from "./assets/Navigation";

function App() {
  const [search, setSearch] = useState("");
  const [isVis, setIsVis] = useState(false);
  const initialURL = "http://www.omdbapi.com/?apikey=1ac21173&s=";
  const [url, setURL] = useState("");
  const [isVisible, setIsVisible] = useState("none");
  const [page, SetPage] = useState(1);
  const [currentPage, setCurrentPage] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);

  //Makes API calls on URL change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);

        //If response to the API call failed
        if (!resp.data.Response) {
          console.log("failed");
          setCurrentPage([]);
          setFilteredResponse([]);
          return;
        }

        //If response to the API call is true then we app response to state variables
        if (resp.data.Response !== "False") {
          const resp1 = await resp.data.Search;
          flushSync(() => {
            setCurrentPage(resp1);
            setFilteredResponse(resp1);
          });
          setIsVis(true);
        }
        //If there are no records found to the search provided
        else {
          setIsVis(false);
          alert("No records found");
          setCurrentPage([]);
          setFilteredResponse([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // invoke fetch data
    fetchData();
  }, [url]);

  //Handles Inpur field
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //Handles the filter menu
  const handleFilter = (props) => {
    setIsVisible("none");
    const filterValue = props;
    if (filterValue === "all") {
      setCurrentPage(filteredResponse);
      return;
    }
    const newList = filteredResponse.filter(
      (movie) => movie.Type === filterValue
    );
    setCurrentPage(newList);
  };

  //Handles search button click and form submit.
  //Appends the user search text with URL and fetches the API data
  const handleSearch = (e) => {
    e.preventDefault();
    setURL(initialURL + search + "&page=" + page);
  };
  const handleIsVisible = (a) => {
    setIsVisible(a);
  };

  //Handles Home action
  const handleHome = (a) => {
    a.preventDefault();
    setIsVis(false);
    setCurrentPage([]);
    setSearch("");
    setURL("");
    setFilteredResponse([]);
  };

  return (
    <div className="container">
      {isVis && (
        <Navigation
          handleHome={handleHome}
          handleFilter={handleFilter}
          isVisible={isVisible}
          handleIsVisible={handleIsVisible}
        />
      )}
      <main>
        {!isVis && <h1>MOVIES SEARCH</h1>}
        <form>
          <input
            type="text"
            placeholder="Enter a movie"
            value={search}
            onChange={handleChange}
            className="imput"
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </form>

        <section>
          {isVis && (
            <MoviesDisplay result={currentPage} url={url}></MoviesDisplay>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
