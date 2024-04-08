const Countries = ({ countriesToShow, setCountriesToShow }) => {
  return countriesToShow.map((country) => (
    <div key={country.name.common}>
      {country.name.common} &nbsp; &nbsp;
      <button onClick={() => setCountriesToShow([country])}>show data</button>
    </div>
  ))
}

export default Countries