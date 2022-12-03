import "./Home.css";

import ParkingOption from "../../components/ParkingOption/ParkingOption";
import Vacancy from "../../components/Vacancy/Vacancy";
import Panel from "../../components/Panel/Panel";

const Home = () => {
  return (
    <div className="home_container">
      <div className="top_home_container">
        <h2>Bem vindo !</h2>
      </div>
      <div className="home_content">
        <ParkingOption />
        <Vacancy />
        <Panel />
      </div>
    </div>
  );
};

export default Home;
