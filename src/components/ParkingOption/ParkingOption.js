import "./ParkingOption.css"

import useParking from "../../hooks/useParking";
import { useState } from "react";

const ParkingOption = () => {
  const {addParking, dataParking, handleParking} = useParking();


  // Modal
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [vagancy, setVagancy] = useState(0);
  const [error, setError] = useState("");

  const modalView = () => {
    if(modal){
      setModal(false);
    }else{
      setModal(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addParking(name, vagancy);
    if(res){
      setError(res);
      return;
    }
    setName("");
    setVagancy(0);
  }


  return (
    <div className="parking_option">
        <h2>Estacionamentos:</h2>
        <ul>
          {dataParking.map((item) => (
            <li key={item.id} onClick={() => handleParking(item.id)}>{item.name}</li>
          ))}
          <li onClick={() => modalView()}>Add new+</li>
        </ul>
        <div className={ modal ? "modal_container" : "modal_none"}>
          <div className="modal_content">
            <p className="btn_close_modal" onClick={() => modalView()}>X</p>
            <h3>Novo Estacionamento</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Nome do Estacionamento:</p>
                <input type="text" placeholder="Coloque um nome" onChange={(e) => setName(e.target.value)} value={name}/>
              </label>
              <label>
                <p>Quantidade de vagas:</p>
                <input type="number" placeholder="Coloque a quantidade" onChange={(e) => setVagancy(e.target.value)} value={vagancy}/>
              </label>
              {error && (
                <div className="error_container">
                  <p>{error}</p>
                </div>
              )}
              <div className="submit_container">
                <input type="submit" className="btn_submit" value="Adicionar"/>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default ParkingOption