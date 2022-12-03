// CSS
import "./Vacancy.css";
// Hooks context
import useParking from "../../hooks/useParking";
//Hooks
import { useState, useEffect } from "react";

//Components
import SearchBar from "../SearchBar/SearchBar";

const Vacancy = () => {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(false);

  const [id, setId] = useState(0);
  const [number, setNumber] = useState(0);
  const [vehicle, setVehicle] = useState("");
  const [currentParking, setCurrentParking] = useState(0);

  const [vaganciesFree, setVaganciesFree] = useState([]);
  const [vaganciesOccupied, setVaganciesOccupied] = useState([]);

  // use context
  const { vagancyView, handleAddVagancies, setQuery } = useParking();

  useEffect(() => {
     setVaganciesFree(vagancyView.filter((item) => {
      return item.free === true;
    }));
  
     setVaganciesOccupied(vagancyView.filter((item) => {
      return item.free === false;
    }));

  }, [vagancyView])
  
  

  const modalView = () => {
    setSelected(false);
    if(modal){
      setModal(false);
    }else{
      setQuery("");
      setModal(true);
    }
  }

  const handleSelected = (itemId, itemNumber, ItemparkingId) => {
    setSelected(true);
    setId(itemId);
    setNumber(itemNumber);
    setCurrentParking(ItemparkingId);
    setQuery("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = handleAddVagancies(id, number, vehicle, currentParking);
    if(res){
      setError(res);
      return;
    }
    setSelected(false);
    setId(0);
    setNumber(0);
    setVehicle("");
    setCurrentParking(0);
  }

  return (
    <div className="vacancy_container">
      <div className="add_vacancy box_option" onClick={() => modalView()}>
        <i className="bi bi-plus-circle-dotted"></i>
        <div className="box_option_content" >
          <h3>
            Adicionar Veículo
          </h3>
        </div>
      </div>
      <div className="occupied_vacancy box_option">
        <i className="bi bi-car-front-fill"></i>
        <div className="box_option_content">
          <h3>Vagas ocupadas:&nbsp;</h3>
          <b>{vaganciesOccupied.length}</b>
        </div>
      </div>
      <div className="free_vacancy box_option">
        <i className="bi bi-car-front-fill"></i>
        <div className="box_option_content">
          <h3>Vagas livres:&nbsp;</h3>
          <b>{vaganciesFree.length}</b>
        </div>
      </div>
      <div className={modal ? "modal_container" : "modal_none"}>
        <div className="modal_content">
          <p className="btn_close_modal" onClick={() => modalView()}>
            X
          </p>
          <h3>{vaganciesFree.length > 0 ? "Escolha a Vaga:" : "Escolha um Estacionamento Primeiro!"}</h3>
          {!selected && <SearchBar />}
          <ul className={selected ? "modal_none" : ""}>
            {vaganciesFree.map((item) => (
              <li key={item.id} onClick={() => handleSelected(item.id, item.number, item.currentParking)}>{item.number}</li>
            ))}
          </ul>
          <form className={!selected ? "modal_none" : ""} onSubmit={handleSubmit}>
            <label>
              <p>Info do Veículo:</p>
              <input
                type="text"
                placeholder="Coloque um nome"
                onChange={(e) => setVehicle(e.target.value)}
                value={vehicle}
              />
            </label>
            {error && (
              <div className="error_container">
                <p>{error}</p>
              </div>
            )}
            <div className="submit_container">
              <input type="submit" className="btn_submit" value="Adicionar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Vacancy;
