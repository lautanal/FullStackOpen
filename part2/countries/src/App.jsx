import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";
import Filter from "./components/Filter";

const App = () => {
  const [newFilter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => {
      setCountries(response.data);
    })
  }, [])

  const handleFilterChange = event => {
    setFilter(event.target.value);
    setCountriesToShow(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      {countriesToShow.length === 1 ? <Country country={countriesToShow[0]} />
        : countriesToShow.length < 10 ? <Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>
        : <div>Too many matches, specify another filter</div>
      }
    </div>
  )
}

export default App