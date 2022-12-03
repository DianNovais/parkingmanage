import "./Panel.css";

import useParking from "../../hooks/useParking";
import SearchBar from "../SearchBar/SearchBar";

const Panel = () => {

  const { vagancyView, handleFreeVagancies, query } = useParking();

  

  return (
    <div className="panel_container">
      <SearchBar />
      <table>
        <thead>
          <tr>
            <th>número</th>
            <th>veículo</th>
          </tr>
        </thead>
        <tbody>
          {vagancyView &&
            vagancyView.map((item) => (
              <tr key={item.id}>
                <td className="td_container">
                  {item.number}
                  {!item.free ? (
                    <i
                      onClick={() =>
                        handleFreeVagancies(
                          item.id,
                          item.number,
                          item.currentParking
                        )
                      }
                      className="bi bi-exclamation-octagon-fill icon_free"
                    ></i>
                  ) : (
                    <span></span>
                  )}
                </td>
                {item.vehicle ? (
                  <td>{item.vehicle}</td>
                ) : (
                  <td className="free_vagancy">Livre.</td>
                )}
              </tr>
            ))}
          {vagancyView.length < 1 && query === "" && (
            <tr>
              <td>Selecione um Estacionamento.</td>
            </tr>
          )}
          {vagancyView.length < 1 && query !== "" && (
            <tr>
              <td>Nenhum resultado encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Panel;
