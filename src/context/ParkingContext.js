import { createContext, useState, useEffect } from "react";

export const ParkingContext = createContext({});

export const ParkingProvider = ({ children }) => {
  const [dataParking, setDataParking] = useState([]);
  const [ParkingNumber, setParkingNumber] = useState(0);
  const [vagancyData, setVagancyData] = useState([]);
  const [vagancyView, setVagancyView] = useState([]);
  const [newDataVagancies, setNewDataVagancies] = useState([]);
  const [error, setError] = useState("");


  const [query, setQuery] = useState("");
  const [newQuery, setNewQuery] = useState([]);

  useEffect(() => {
    if(query === "" && newDataVagancies.length < 1){
      setVagancyView(
        vagancyData.filter((item) => {
          return item.currentParking === ParkingNumber;
        })
      );
    }else if(query === "" && newDataVagancies.length > 0){
      setVagancyView(
        newDataVagancies.filter((item) => {
          return item.currentParking === ParkingNumber;
        })
      );
    }else{
      const local = JSON.parse(localStorage.getItem("vagancies"));
      const vagaciesFilter = local.filter((item) => {
        return item.number == query;
      });
      setNewQuery(vagaciesFilter);
    }
    
  }, [query]);

  useEffect(() => {
    setVagancyView(newQuery.filter((item) => {
      return item.currentParking === ParkingNumber; 
    }));
  }, [newQuery])

  useEffect(() => {
    try {
      const localParking = localStorage.getItem("parkings");
      if (localParking) {
        setDataParking(JSON.parse(localParking));
      }
      const localVagancies = localStorage.getItem("vagancies");
      if (localVagancies) {
        setVagancyData(JSON.parse(localVagancies));
      }
    } catch (error) {
      console.log(error);
      return setError("algo deu errado no local.");
    }
  }, []);

  useEffect(() => {
    if (newDataVagancies.length > 0) {
      setVagancyView(
        newDataVagancies.filter((item) => {
          return item.currentParking === ParkingNumber;
        })
      );
      
    }
  }, [newDataVagancies]);


  useEffect(() => {
    if (newDataVagancies.length > 0) {
      localStorage.setItem("vagancies", JSON.stringify(newDataVagancies));
      
    }
  }, [newDataVagancies]);

  const addParking = (name, vagancy) => {
    if (name.length > 7 ) {
      return "Por favor adicione apenas 7 caracteres";
    }else if(name.length < 1){
      return "Por favor não deixe campos em branco";
    }
    if (vagancy > 100) {
      return "Numero limite de vagas [100]";
    }
    if (vagancy < 1){
      return "Adicione mais Vagas";
    }

    const newParking = {
      id: Date.now(),
      name,
      vagancy,
    };

    const parkingsDataHere = localStorage.getItem("parkings");
    if (parkingsDataHere) {
      const parkingsParse = JSON.parse(parkingsDataHere);

      const addNew = [...parkingsParse, newParking];
      setDataParking(addNew);
      const nameJson = JSON.stringify(addNew);
      localStorage.setItem("parkings", nameJson);
    } else {
      const addNew = [newParking];
      setDataParking(addNew);
      const nameJson = JSON.stringify(addNew);
      localStorage.setItem("parkings", [nameJson]);
    }

    let i = 0;
    while (i < vagancy) {
      const newVagancy = {
        currentParking: newParking.id,
        id: i,
        number: i + 1,
        vehicle: "",
        free: true,
      };

      const vaganciesDataHere = localStorage.getItem("vagancies");

      if (vaganciesDataHere) {
        const vaganciesParse = JSON.parse(vaganciesDataHere);

        const addNewVagancy = [...vaganciesParse, newVagancy];

        const vagancyJson = JSON.stringify(addNewVagancy);

        localStorage.setItem("vagancies", vagancyJson);

        setVagancyData(addNewVagancy);
      } else {
        const addNewVagancy = [newVagancy];

        const vagancyJson = JSON.stringify(addNewVagancy);

        localStorage.setItem("vagancies", vagancyJson);

        setVagancyData(newVagancy);
      }
      i++;
    }
  };

  const handleParking = (id) => {
    setParkingNumber(id);
    if (newDataVagancies.length > 0) {
      setVagancyView(
        newDataVagancies.filter((item) => {
          return item.currentParking === id;
        })
       
      );
      console.log("passou");
    } else {
      setVagancyView(
        vagancyData.filter((item) => {
          return item.currentParking === id;
        })
      );
    }
  };

  const handleAddVagancies = (id, number, vehicle, currentParking) => {
    if(vehicle.length < 2){
      return "Mínimo 3 caracters"
    }
    if (vagancyView && vagancyData) {
      const vagancyFilter = vagancyView.filter((item) => {
        return item.id !== id;
      });
      const secundaryVagancies = vagancyData.filter((item) => {
        return item.currentParking !== currentParking;
      });

      vagancyFilter.push({
        currentParking,
        free: false,
        vehicle,
        id,
        number,
      });

      setNewDataVagancies([...secundaryVagancies, ...vagancyFilter]);
      setParkingNumber(currentParking);
    }

  };

  const handleFreeVagancies = (id, number, currentParking) => {
    if (vagancyView && vagancyData) {
      const vagancyFilter = vagancyView.filter((item) => {
        return item.id !== id;
      });
      const secundaryVagancies = vagancyData.filter((item) => {
        return item.currentParking !== currentParking;
      });

      vagancyFilter.push({
        currentParking,
        free: true,
        vehicle: "",
        id,
        number,
      });

      setNewDataVagancies([...secundaryVagancies, ...vagancyFilter]);
      setParkingNumber(currentParking);
    }

  };

  return (
    <ParkingContext.Provider
      value={{
        addParking,
        handleParking,
        handleAddVagancies,
        handleFreeVagancies,
        setParkingNumber,
        setQuery,
        query,
        ParkingNumber,
        vagancyView,
        dataParking,
        vagancyData,
        error,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};
