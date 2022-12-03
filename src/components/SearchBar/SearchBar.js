import "./SearchBar.css"
import useParking from "../../hooks/useParking";


const SearchBar = () => {

  const { ParkingNumber, setQuery, query } = useParking();

  return (
    <div className={ParkingNumber ? "search_container" : "display_none"}>
      <i className="bi bi-search"></i>
      <input
        type="number"
        placeholder="Número da vaga..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

export default SearchBar;
